import assert from 'node:assert/strict'
import { test } from 'node:test'
import { experienceTranslations, experiences } from '../src/schema/index'
import {
  createExperienceSchema,
  experienceAchievementsSchema,
  updateExperienceSchema,
} from '../../schema/src/experience.schema'

const legacyInput = {
  title: 'Engineer',
  description: 'Existing description',
  company: 'Company',
  location: 'Jakarta',
  type: 'contract',
  startDate: '2025-01-01T00:00:00.000Z',
  endDate: '2026-01-01T00:00:00.000Z',
  currentlyWorking: true,
  skills: ['TypeScript'],
  status: 'draft',
  order: 0,
}

test('legacy inputs remain valid; omitted update lists do not clear saved achievements', () => {
  assert.equal(createExperienceSchema.parse(legacyInput).achievements, undefined)
  assert.equal(
    updateExperienceSchema.parse({ ...legacyInput, id: 'existing' }).achievements,
    undefined,
  )
})

test('lists preserve order, trim text, allow removal of all bullets and reject invalid data', () => {
  assert.deepEqual(experienceAchievementsSchema.parse([' Second ', 'First']), ['Second', 'First'])
  assert.deepEqual(
    createExperienceSchema.parse({ ...legacyInput, achievements: [] }).achievements,
    [],
  )
  for (const invalid of [null, 'bullet', [1], ['  '], ['x'.repeat(1001)], Array(51).fill('x')]) {
    assert.equal(experienceAchievementsSchema.safeParse(invalid).success, false)
  }
  const result = updateExperienceSchema.parse({
    ...legacyInput,
    id: 'existing',
    achievements: ['New'],
  })
  assert.equal(result.description, legacyInput.description)
  assert.deepEqual(result.achievements, ['New'])
})

test('both dialects provide a non-null default list and nullable legacy translation fallback', () => {
  assert.equal(experiences.achievements.notNull, true)
  assert.equal(experiences.achievements.hasDefault, true)
  assert.equal(experienceTranslations.achievements.notNull, false)
  assert.equal(experienceTranslations.achievements.hasDefault, false)
  const mysql = process.env.DATABASE_PROVIDER === 'mysql'
  assert.equal(experiences.achievements.getSQLType(), mysql ? 'json' : 'text')
  if (mysql) {
    const bullets = ['First', 'Kedua']
    // mysql2 decodes JSON on read; Drizzle serializes it on write.
    assert.equal(experiences.achievements.mapToDriverValue(bullets), JSON.stringify(bullets))
  } else {
    assert.equal(experiences.achievements.dimensions, 1)
    assert.deepEqual(experiences.achievements.default, [])
  }
})
