import assert from 'node:assert/strict'
import { test } from 'node:test'
import { FieldApi, FormApi } from '@tanstack/react-form'
import { addExperiencePositionSchema } from '@portofolio/schema/experience.schema'
import {
  newGroupSchema,
  newPositionDefaults,
  newPositionSchema,
  positionPayload,
  refreshAfterCommit,
} from './experience-position-form'

const sourceId = '019a0000-0000-7000-8000-000000000001'
const valid = () => ({
  ...newPositionDefaults({ location: 'Remote', type: 'full-time' }),
  title: ' Engineer ',
  description: ' Work ',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  skills: ' TypeScript\n\n React \n',
  achievements: ' First \n Second\n',
})
function setup(
  values = valid(),
  submit: (value: ReturnType<typeof valid>) => void | Promise<void> = () => {},
) {
  const form = new FormApi({
    defaultValues: values,
    validators: { onChange: newPositionSchema },
    onSubmit: async ({ value }) => submit(value),
  })
  form.mount()
  const fields = (['startDate', 'endDate', 'skills', 'achievements'] as const).map((name) => {
    const field = new FieldApi({ form, name })
    field.mount()
    return field
  })
  return { form, fields }
}

test('invalid UI dates block mutation and errors belong to the UI fields', async () => {
  for (const [startDate, endDate, key] of [
    ['', '2024-12-31', 'startDate'],
    ['2024-02-30', '2024-12-31', 'startDate'],
    ['2024-01-01', '', 'endDate'],
    ['2024-12-31', '2024-01-01', 'endDate'],
    ['2024-01-01', 'bad', 'endDate'],
  ] as const) {
    let saves = 0
    const { form, fields } = setup({ ...valid(), startDate, endDate }, () => {
      saves++
    })
    await form.handleSubmit()
    assert.equal(saves, 0)
    assert.ok(fields.find((field) => field.name === key)?.state.meta.errors.length)
    assert.equal(form.state.isSubmitting, false)
  }
})

test('valid submit normalizes ISO dates, trims ordered arrays and preserves raw multiline form state', async () => {
  let payload: ReturnType<typeof addExperiencePositionSchema.parse> | undefined
  const { form } = setup(valid(), (value) => {
    payload = addExperiencePositionSchema.parse(positionPayload(sourceId, value))
  })
  form.setFieldValue('skills', ' TypeScript\n\n React \n\n')
  assert.equal(form.state.values.skills, ' TypeScript\n\n React \n\n')
  await form.handleSubmit()
  assert.ok(payload)
  assert.equal(payload.position.startDate, '2024-01-01T00:00:00.000Z')
  assert.equal(payload.position.endDate, '2024-12-31T00:00:00.000Z')
  assert.equal(payload.position.title, 'Engineer')
  assert.deepEqual(payload.position.skills, ['TypeScript', 'React'])
  assert.deepEqual(payload.position.achievements, ['First', 'Second'])
  assert.equal(form.state.values.achievements, ' First \n Second\n')
  assert.equal(payload.position.status, 'draft')
  assert.equal(payload.sourceId, sourceId)
})

test('current position omits stale end date and cross-field errors clear on change', async () => {
  let saves = 0
  const { form, fields } = setup({ ...valid(), endDate: '' }, (value) => {
    saves++
    assert.equal(positionPayload(sourceId, value).position.endDate, undefined)
  })
  await form.handleSubmit()
  assert.ok(fields[1]?.state.meta.errors.length)
  const current = new FieldApi({ form, name: 'currentlyWorking' })
  current.mount()
  current.handleChange(true)
  await form.handleSubmit()
  assert.equal(saves, 1)
  assert.equal(form.getFieldMeta('endDate')?.errors.length, 0)
})

test('array item issues are attributed to multiline fields', async () => {
  const { form, fields } = setup({
    ...valid(),
    skills: 'x'.repeat(257),
    achievements: 'x'.repeat(1001),
  })
  await form.handleSubmit()
  assert.ok(fields[2]?.state.meta.errors.length)
  assert.ok(fields[3]?.state.meta.errors.length)
})

test('submission stays pending through mutation and refresh, rejects and allows retry without resetting input', async () => {
  let release: () => void = () => {}
  let rejectRefresh: (error: Error) => void = () => {}
  let refreshErrors = 0
  let attempt = 0
  const { form } = setup(valid(), async () => {
    attempt++
    if (attempt === 1) throw new Error('synthetic rejection')
    await new Promise<void>((resolve) => {
      release = resolve
    })
    await refreshAfterCommit(
      () =>
        new Promise((_, reject) => {
          rejectRefresh = reject
        }),
      () => {
        refreshErrors++
      },
    )
  })
  await assert.rejects(form.handleSubmit(), /synthetic rejection/)
  assert.equal(form.state.isSubmitting, false)
  assert.equal(form.state.values.title, ' Engineer ')
  const pending = form.handleSubmit()
  // Async field validation must finish before onSubmit begins.
  await new Promise((resolve) => setTimeout(resolve, 0))
  assert.equal(form.state.isSubmitting, true)
  assert.equal(form.state.canSubmit, false)
  await form.handleSubmit()
  assert.equal(attempt, 2)
  release()
  await new Promise((resolve) => setTimeout(resolve, 0))
  assert.equal(form.state.isSubmitting, true)
  await form.handleSubmit()
  assert.equal(attempt, 2)
  rejectRefresh(new Error('synthetic refresh failure'))
  await pending
  assert.equal(refreshErrors, 1)
  assert.equal(attempt, 2)
  assert.equal(form.state.isSubmitting, false)
})

test('committed refresh failure and timeout settle with one notification', async () => {
  for (const refresh of [() => Promise.reject(new Error('offline')), () => new Promise(() => {})]) {
    let errors = 0
    await refreshAfterCommit(
      refresh,
      () => {
        errors++
      },
      5,
    )
    assert.equal(errors, 1)
  }
})

test('inline group validation uses latest company, blocks invalid label, supports retry', async () => {
  let company = 'Example'
  const calls: Array<string> = []
  const schema = newGroupSchema(() => company)
  const form = new FormApi({
    defaultValues: { label: ' Team ' },
    validators: { onChange: schema },
    onSubmit: ({ value }) => {
      calls.push(`${company}:${value.label.trim()}`)
    },
  })
  form.mount()
  const field = new FieldApi({ form, name: 'label' })
  field.mount()
  company = ''
  await form.handleSubmit()
  assert.equal(calls.length, 0)
  assert.ok(field.state.meta.errors.length)
  company = 'Updated'
  await form.validate('change')
  await form.handleSubmit()
  assert.deepEqual(calls, ['Updated:Team'])
  field.handleChange(' ')
  await form.handleSubmit()
  assert.equal(calls.length, 1)
})
