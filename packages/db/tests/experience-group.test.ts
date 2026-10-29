import assert from 'node:assert/strict'

import { test } from 'node:test'

import { getTableColumns } from 'drizzle-orm'

import { getTableConfig as pgConfig } from 'drizzle-orm/pg-core'

import { getTableConfig as mysqlConfig } from 'drizzle-orm/mysql-core'

import {
  createExperienceGroupSchema,
  createExperienceSchema,
  updateExperienceSchema,
} from '../../schema/src/experience.schema'

import { experienceGroupIssue } from '../src/experience-group'

import { isMysql } from '../src/dialect/active'

import { experiences } from '../src/schema'

const groupId = '019a0000-0000-7000-8000-000000000001'

const otherGroupId = '019a0000-0000-7000-8000-000000000002'

const position = {
  title: 'Engineer',
  company: 'Example',
  description: 'Independent role details',

  location: 'Jakarta',
  type: 'full-time',
  startDate: '2020-01-01T00:00:00.000Z',

  endDate: '2022-01-01T00:00:00.000Z',
  currentlyWorking: false,
  skills: ['TypeScript'],
  status: 'draft',
  order: 0,
}

test('legacy positions remain ungrouped even with an identical company', () => {
  assert.equal(createExperienceSchema.parse(position).groupId, undefined)

  assert.equal(experienceGroupIssue(undefined, 'Example', { company: 'Example' }), undefined)
})

test('explicit membership, switching and null detachment preserve role fields', () => {
  for (const id of [groupId, otherGroupId, null]) {
    const parsed = updateExperienceSchema.parse({ ...position, id: groupId, groupId: id })

    assert.equal(parsed.groupId, id)

    assert.equal(parsed.description, position.description)

    assert.deepEqual(parsed.skills, position.skills)

    assert.equal(parsed.startDate, position.startDate)
  }

  assert.equal(updateExperienceSchema.parse({ ...position, id: groupId }).groupId, undefined)
})

test('group identifiers must be UUIDs', () => {
  for (const value of ['', 'Example', 42]) {
    assert.equal(createExperienceSchema.safeParse({ ...position, groupId: value }).success, false)
  }
})

test('group labels and company are trimmed, nonempty and bounded', () => {
  assert.deepEqual(
    createExperienceGroupSchema.parse({ company: ' Example ', label: ' 2020-2022 ' }),
    { company: 'Example', label: '2020-2022' },
  )

  for (const values of [
    { company: ' ', label: 'First' },
    { company: 'Example', label: ' ' },
    { company: 'Example', label: 'a'.repeat(257) },
  ]) {
    assert.equal(createExperienceGroupSchema.safeParse(values).success, false)
  }
})

test('reject missing groups and different company identities, allow repeated stints', () => {
  assert.equal(experienceGroupIssue(groupId, 'Example', undefined), 'missing')

  assert.equal(experienceGroupIssue(groupId, 'Other', { company: 'Example' }), 'company')

  assert.equal(experienceGroupIssue(groupId, 'example', { company: 'Example' }), 'company')

  for (const id of [groupId, otherGroupId]) {
    assert.equal(experienceGroupIssue(id, ' Example ', { company: 'Example' }), undefined)
  }

  assert.equal(experienceGroupIssue(null, 'Other', undefined), undefined)
})

test('dialect schema keeps membership nullable and preserves positions on group deletion', () => {
  assert.equal(getTableColumns(experiences).groupId.notNull, false)

  const config = isMysql ? mysqlConfig(experiences) : pgConfig(experiences)

  const fk = config.foreignKeys.find((key) =>
    key.reference().columns.some((column) => column.name === 'group_id'),
  )

  assert.ok(fk)

  assert.equal(fk.onDelete, 'set null')

  assert.ok(config.indexes.some((index) => index.config.name === 'experiences_group_id_idx'))
})
