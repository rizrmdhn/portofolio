import assert from 'node:assert/strict'
import { test } from 'node:test'
import { addExperiencePositionSchema } from '../../schema/src/experience.schema'
import { addPositionInTransaction } from '../../queries/src/experience-position'
import type { PositionTransaction } from '../../queries/src/experience-position'
import type { Experience, ExperienceGroup } from '../../types/src/experience.types'

const id = '019a0000-0000-7000-8000-000000000001'
const groupId = '019a0000-0000-7000-8000-000000000002'
const source: Experience = {
  id,
  groupId: null,
  company: 'Example',
  title: 'Original',
  description: 'Original description',
  location: 'Remote',
  type: 'full-time',
  startDate: '2020-01-01',
  endDate: null,
  currentlyWorking: true,
  skills: ['Original'],
  achievements: ['Original achievement'],
  status: 'published',
  order: 2,
  createdAt: new Date(),
  updatedAt: null,
}
const payload = {
  sourceId: id,
  stint: 'same',
  position: {
    title: 'New role',
    description: 'New description',
    location: 'Remote',
    type: 'full-time',
    startDate: '2024-01-01T00:00:00.000Z',
    currentlyWorking: true,
    skills: [],
    achievements: [],
  },
}
const input = () => addExperiencePositionSchema.parse(payload)

function fixture(initial = source, existing: Array<ExperienceGroup> = []) {
  let row = structuredClone(initial)
  let groups = structuredClone(existing)
  let positions: Array<Experience> = []
  let tail = Promise.resolve()
  const events: Array<string> = []
  async function transaction(request = input(), fail = false) {
    // Model a database row lock held until commit/rollback. A second locking
    // reader observes the committed membership, never its pre-lock snapshot.
    const previous = tail
    let unlock!: () => void
    tail = new Promise<void>((resolve) => {
      unlock = resolve
    })
    await previous
    const before = structuredClone({ row, groups, positions })
    const tx: PositionTransaction = {
      lockSource: () => {
        events.push('lock')
        return Promise.resolve(structuredClone(row))
      },
      getGroup: (key) => Promise.resolve(groups.find((group) => group.id === key)),
      createGroup: (data) => {
        events.push('group')
        const group = { ...data, id: `${groupId}-${groups.length}`, createdAt: new Date() }
        groups.push(group)
        return Promise.resolve(group)
      },
      attachSource: (_key, key) => {
        events.push('attach')
        row.groupId = key
        return Promise.resolve()
      },
      insertPosition: (data) => {
        events.push('insert')
        if (fail) return Promise.reject(new Error('insert failure'))
        const position = {
          ...source,
          ...data,
          id: `new-${positions.length}`,
          endDate: data.endDate ?? null,
        }
        positions.push(position)
        return Promise.resolve(position)
      },
    }
    try {
      return await addPositionInTransaction(tx, request)
    } catch (error) {
      ;({ row, groups, positions } = before)
      throw error
    } finally {
      unlock()
    }
  }
  return { transaction, events, state: () => ({ row, groups, positions }) }
}

test('schema accepts omitted end date for current work and defaults draft', () => {
  assert.equal(input().position.endDate, undefined)
  assert.equal(input().position.status, 'draft')
  for (const patch of [
    { startDate: 'invalid' },
    { currentlyWorking: false },
    { endDate: '2023-01-01T00:00:00.000Z' },
  ]) {
    assert.equal(
      addExperiencePositionSchema.safeParse({
        ...payload,
        position: { ...payload.position, ...patch },
      }).success,
      false,
    )
  }
  assert.equal(
    addExperiencePositionSchema.safeParse({
      ...payload,
      position: {
        ...payload.position,
        currentlyWorking: false,
        endDate: '2025-01-01T00:00:00.000Z',
      },
    }).success,
    true,
  )
  assert.equal(
    addExperiencePositionSchema.safeParse({ ...payload, sourceId: 'bad' }).success,
    false,
  )
})

test('same existing group preserves every source field', async () => {
  const original = { ...source, groupId }
  const f = fixture(original, [
    { id: groupId, company: source.company, label: 'First stint', createdAt: new Date() },
  ])
  const result = await f.transaction()
  assert.equal(result.experience.groupId, groupId)
  assert.deepEqual(f.state().row, original)
  assert.deepEqual(f.events, ['lock', 'insert'])
  assert.deepEqual(result.experience.skills, [])
  assert.deepEqual(result.experience.achievements, [])
})

test('ungrouped source creates nothing until save; save attaches both', async () => {
  const f = fixture()
  assert.equal(f.state().groups.length, 0)
  assert.deepEqual(f.state().row, source)
  const result = await f.transaction()
  assert.equal(f.state().row.groupId, result.experience.groupId)
  assert.deepEqual(f.state().row, { ...source, groupId: result.group.id })
  assert.deepEqual(f.events, ['lock', 'group', 'attach', 'insert'])
})

test('new employment stint leaves source and its membership unchanged', async () => {
  for (const membership of [null, groupId]) {
    const original = { ...source, groupId: membership }
    const f = fixture(
      original,
      membership
        ? [{ id: groupId, company: source.company, label: 'Original', createdAt: new Date() }]
        : [],
    )
    const result = await f.transaction({ ...input(), stint: 'new' })
    assert.notEqual(result.group.id, membership)
    assert.deepEqual(f.state().row, original)
    assert.equal(f.events.includes('attach'), false)
  }
})

test('missing source/group and company mismatch fail before writes', async () => {
  const missingSource = { lockSource: () => Promise.resolve(undefined) } as PositionTransaction
  await assert.rejects(addPositionInTransaction(missingSource, input()), /Experience/)
  const missing = fixture({ ...source, groupId })
  await assert.rejects(missing.transaction(), /Experience group/)
  assert.deepEqual(missing.events, ['lock'])
  const mismatch = fixture({ ...source, groupId }, [
    { id: groupId, company: 'Other', label: 'Other', createdAt: new Date() },
  ])
  await assert.rejects(mismatch.transaction(), /saved company/)
  assert.deepEqual(mismatch.events, ['lock'])
})

test('insert failure rolls back source attachment and new group', async () => {
  const f = fixture()
  await assert.rejects(f.transaction(input(), true), /insert failure/)
  assert.deepEqual(f.state(), { row: source, groups: [], positions: [] })
})

test('locking source through commit makes concurrent first additions reuse one group', async () => {
  const f = fixture()
  const results = await Promise.all([f.transaction(), f.transaction()])
  assert.equal(f.state().groups.length, 1)
  assert.equal(results[0].group.id, results[1].group.id)
  assert.equal(f.state().positions.length, 2)
})

// Compile the production locking-read shape without opening a connection.
// Run this file once per DATABASE_PROVIDER so the table and driver agree.
test('active dialect supports a source SELECT FOR UPDATE locking read', async () => {
  const { experiences } = await import('../src/schema/index')
  const { eq } = await import('drizzle-orm')
  const { isMysql } = await import('../src/dialect/active')
  const { drizzle } = isMysql
    ? await import('drizzle-orm/mysql2')
    : await import('drizzle-orm/postgres-js')
  const query = drizzle
    .mock()
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .for('update')
    .toSQL()
  assert.match(query.sql, /for update$/i)
  assert.deepEqual(query.params, [id])
})

test('client company and group fields cannot override the saved source', async () => {
  const parsed = addExperiencePositionSchema.parse({
    ...payload,
    company: 'Forged',
    groupId,
    position: { ...payload.position, company: 'Forged', groupId },
  })
  const f = fixture()
  const result = await f.transaction(parsed)
  assert.equal(result.experience.company, source.company)
  assert.notEqual(result.experience.groupId, groupId)
  assert.equal(result.experience.title, payload.position.title)
  assert.equal(result.experience.description, payload.position.description)
})
