import assert from 'node:assert/strict'
import { test } from 'node:test'
import { groupExperiences, summarizeGroup, supersededAt } from './experience-groups.ts'

function position(id: string, groupId?: string | null, startDate: Date | string = '2020-01-01') {
  return {
    id,
    groupId,
    startDate,
    company: 'Same company',
    title: `Title ${id}`,
    description: `Description ${id}`,
    achievements: [`Achievement ${id}`],
    skills: ['TypeScript'],
  }
}

test('null and legacy missing membership remain independent even at the same company', () => {
  const legacy = { id: 'legacy', company: 'Same company', startDate: '2020-01-01' }
  const records = [position('one', null), legacy, position('two', null)]
  const entries = groupExperiences(records)
  assert.deepEqual(
    entries.map((entry) => entry.positions),
    records.map((record) => [record]),
  )
  assert.equal(new Set(entries.map((entry) => entry.key)).size, records.length)
})

test('explicit groups anchor at first occurrence without reordering independent API entries', () => {
  const records = [
    position('old', 'stint', '2018-01-01'),
    position('independent', null, '2025-01-01'),
    position('new', 'stint', '2022-01-01'),
    position('last', null, '2026-01-01'),
  ]
  assert.deepEqual(
    groupExperiences(records).map((entry) => entry.positions.map((p) => p.id)),
    [['new', 'old'], ['independent'], ['last']],
  )
})

test('distinct explicit return stints at the same company stay separate', () => {
  const records = [position('a', 'first'), position('b', 'return'), position('c', 'first')]
  const entries = groupExperiences(records)
  assert.deepEqual(
    entries.map((entry) => entry.positions.map((p) => p.id)),
    [['a', 'c'], ['b']],
  )
  assert.deepEqual(
    entries.map((entry) => entry.key),
    ['group:first', 'group:return'],
  )
})

test('sorts dates chronologically across years, Date objects and offsets, with stable API ties', () => {
  const records = [
    position('older', 'g', '2023-12-01'),
    position('tie-first', 'g', new Date('2024-01-01T00:00:00Z')),
    position('tie-second', 'g', '2024-01-01T07:00:00+07:00'),
    position('newest', 'g', '2024-02-01'),
  ]
  assert.deepEqual(
    groupExperiences(records)[0]?.positions.map((p) => p.id),
    ['newest', 'tie-first', 'tie-second', 'older'],
  )
})

test('invalid cached dates sort last and retain input order on ties', () => {
  const records = [
    position('bad-a', 'g', ''),
    position('valid', 'g'),
    position('bad-b', 'g', 'bad'),
  ]
  assert.deepEqual(
    groupExperiences(records)[0]?.positions.map((p) => p.id),
    ['valid', 'bad-a', 'bad-b'],
  )
})

test('preserves every complete record exactly once without mutating input or record content', () => {
  const records = [
    position('a', 'g'),
    position('b', null),
    position('c', 'g', '2025-01-01'),
    position('d', 'solo'),
  ]
  const before = structuredClone(records)
  const entries = groupExperiences(Object.freeze(records))
  const flattened = entries.flatMap((entry) => entry.positions)
  assert.equal(flattened.length, records.length)
  for (const record of records) {
    assert.equal(flattened.filter((candidate) => candidate === record).length, 1)
  }
  assert.deepEqual(records, before)
  assert.deepEqual(groupExperiences(records), entries)
  assert.deepEqual(groupExperiences([]), [])
})

function role(startDate: string, endDate: string | null, extra: Record<string, unknown> = {}) {
  return {
    startDate,
    endDate,
    currentlyWorking: endDate === null,
    type: 'full-time',
    location: 'Remote',
    ...extra,
  }
}

test('group summary spans earliest start to latest end and lifts shared metadata', () => {
  const summary = summarizeGroup([
    role('2023-06-01', '2024-12-31'),
    role('2022-01-01', '2023-05-31'),
  ])
  assert.equal(summary.start.toISOString().slice(0, 10), '2022-01-01')
  assert.equal(summary.end?.toISOString().slice(0, 10), '2024-12-31')
  assert.equal(summary.type, 'full-time')
  assert.equal(summary.location, 'Remote')
})

test('group summary is ongoing when any position is current and drops differing metadata', () => {
  const summary = summarizeGroup([
    role('2024-01-01', null, { type: 'internship', location: 'Samarinda' }),
    role('2022-01-01', '2023-12-31'),
  ])
  assert.equal(summary.end, null)
  assert.equal(summary.type, undefined)
  assert.equal(summary.location, undefined)
})

test('group summary never lifts an empty location', () => {
  const summary = summarizeGroup([
    role('2024-01-01', '2024-06-01', { location: '' }),
    role('2023-01-01', '2023-06-01', { location: '' }),
  ])
  assert.equal(summary.location, undefined)
})

test('a later role supersedes an earlier role still flagged current', () => {
  const positions = [
    role('2026-04-01', null),
    role('2025-12-15', null),
    role('2024-01-01', '2025-12-14'),
  ]
  assert.deepEqual(supersededAt(positions), [null, '2026-04-01', null])
})

test('each stale current role ends at the next later start, not the newest', () => {
  const positions = [role('2023-01-01', null), role('2025-01-01', null), role('2024-01-01', null)]
  assert.deepEqual(supersededAt(positions), ['2024-01-01', null, '2025-01-01'])
})

test('concurrent roles with equal starts both stay current', () => {
  assert.deepEqual(supersededAt([role('2024-01-01', null), role('2024-01-01', null)]), [null, null])
})
