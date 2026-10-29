import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import type { TestContext } from 'node:test'
import { getTableColumns, getTableName } from 'drizzle-orm'
import type { AnyColumn } from 'drizzle-orm'
import { PgDialect } from 'drizzle-orm/pg-core'
import { MySqlDialect } from 'drizzle-orm/mysql-core'
import { activeDialect } from '../src/dialect/active'
import { experienceGroups, experiences, profile, user } from '../src/schema'
import { assertSelectable, catalogQuery, planTable, readCatalog } from '../src/dump-plan'
import { exportDump } from '../src/dump-export'
import type { DumpSource, Manifest } from '../src/dump-export'

const mysql = activeDialect === 'mysql'
const schemaName = mysql ? 'portfolio' : 'public'
const wrap = (rows: Array<unknown>) => (mysql ? [rows, []] : rows)
const catalogRows = (columns: Array<string>, table = 'experiences') =>
  columns.map((column_name) => ({
    schema_name: schemaName,
    table_name: table,
    column_name,
  }))
const modern = Object.values(getTableColumns(experiences)).map((column) => column.name)
const legacy = modern.filter((name) => !['achievements', 'group_id'].includes(name))
const parse = (columns: Array<string>) => readCatalog(wrap(catalogRows(columns)), activeDialect)

test('PG RowList and mysql2 tuples normalize; malformed results fail closed', () => {
  const rows = catalogRows(legacy)
  assert.deepEqual(
    readCatalog(rows, 'postgresql'),
    readCatalog([rows, [{ name: 'field' }]], 'mysql'),
  )
  for (const invalid of [
    null,
    {},
    [],
    [[]],
    [{}],
    [{ schema_name: null, table_name: null, column_name: null }],
    [...rows, { schema_name: 'other', table_name: null, column_name: null }],
  ]) {
    assert.throws(() => readCatalog(invalid, activeDialect))
  }
  assert.equal(
    readCatalog(
      wrap([{ schema_name: schemaName, table_name: null, column_name: null }]),
      activeDialect,
    ).tables.size,
    0,
  )
})

test('catalog SQL scopes PG to current_schema and MySQL to DATABASE', () => {
  const pg = new PgDialect().sqlToQuery(catalogQuery('postgresql')).sql
  const my = new MySqlDialect().sqlToQuery(catalogQuery('mysql')).sql
  assert.match(pg, /current_schema\(\)/)
  assert.match(my, /DATABASE\(\)/)
  assert.match(pg, /information_schema\.columns/)
  assert.match(my, /t\.table_schema = namespace\.schema_name/)
})

test('legacy plan keeps camelCase aliases and original typed columns/codecs', () => {
  const plan = planTable(experiences, parse(legacy))
  assert.equal(plan.selection.startDate, experiences.startDate)
  assert.equal(plan.selection.currentlyWorking, experiences.currentlyWorking)
  assert.equal(plan.selection.skills, experiences.skills)
  assert.deepEqual(plan.missingColumns, [
    { key: 'groupId', column: 'group_id' },
    { key: 'achievements', column: 'achievements' },
  ])
  assert.equal(plan.selection.achievements, undefined)
  const full = planTable(experiences, parse(modern))
  assert.deepEqual(full.selection, getTableColumns(experiences))
  assert.deepEqual(full.missingColumns, [])
  // Date, array, JSON and boolean selections retain each dialect's own decoder.
  for (const table of [experiences, user, profile]) {
    const cols: Record<string, AnyColumn> = getTableColumns(table)
    const catalog = readCatalog(
      wrap(
        catalogRows(
          Object.values(cols).map((c) => c.name),
          getTableName(table),
        ),
      ),
      activeDialect,
    )
    for (const [key, column] of Object.entries(planTable(table, catalog).selection)) {
      assert.equal(column, cols[key])
      assert.equal(column.mapFromDriverValue, cols[key]!.mapFromDriverValue)
    }
  }
  assert.equal(plan.selection.currentlyWorking.mapFromDriverValue(true), true)
  assert.deepEqual(plan.selection.skills.mapFromDriverValue(['one']), ['one'])
})

test('missing tables differ from zero mapped columns; unknown columns remain visible', () => {
  const catalog = parse(['retired_column'])
  const empty = planTable(experiences, catalog)
  assert.deepEqual(empty.unknownColumns, ['retired_column'])
  assert.throws(() => assertSelectable(empty), /No mapped columns/)
  const missing = planTable(experienceGroups, catalog)
  assert.equal(missing.missingTable, true)
  assert.doesNotThrow(() => assertSelectable(missing))
})

function fixture(t: TestContext) {
  const dir = mkdtempSync(join(tmpdir(), 'portfolio-dump-test-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  const selected: Array<unknown> = []
  const messages: Array<string> = []
  const source: DumpSource = {
    execute: (query) => {
      const dialect = mysql ? new MySqlDialect() : new PgDialect()
      const text = dialect.sqlToQuery(query).sql
      if (text.includes('information_schema')) return Promise.resolve(wrap(catalogRows(legacy)))
      if (text.includes('experience_groups'))
        return Promise.reject({ cause: { code: mysql ? 'ER_NO_SUCH_TABLE' : '42P01' } })
      return Promise.resolve([])
    },
    select: (columns) => ({
      from: () => {
        selected.push(columns)
        return Promise.resolve([{ id: 'test-id', currentlyWorking: true, skills: ['one'] }])
      },
    }),
  }
  const options = {
    source,
    provider: activeDialect,
    tables: [
      ['experiences', experiences],
      ['experienceGroups', experienceGroups],
    ] as Parameters<typeof exportDump>[0]['tables'],
    legacy: true,
    outDir: dir,
    previous: null as Manifest | null,
    log: (message: string) => messages.push(message),
  }
  return { dir, source, selected, messages, options }
}

test('legacy export preserves manifest hashes/comparisons and records absent structures separately', async (t) => {
  const f = fixture(t)
  const manifest = await exportDump(f.options)
  assert.equal(manifest.experiences!.count, 1)
  assert.match(manifest.experiences!.hash, /^[a-f0-9]{12}$/)
  assert.equal(manifest.experienceGroups, undefined)
  assert.equal(existsSync(join(f.dir, 'experienceGroups.json')), false)
  const metadata = JSON.parse(readFileSync(join(f.dir, '_metadata.json'), 'utf8'))
  assert.equal(metadata.provider, activeDialect)
  assert.equal(metadata.tables[1].missingTable, true)
  assert.equal(metadata.tables[0].missingColumns.length, 2)
  assert.equal(
    f.messages.some((message) => message.includes('test-id')),
    false,
  )
  const second = fixture(t)
  await exportDump({ ...second.options, previous: manifest })
  assert.ok(second.messages.some((message) => message.includes('(unchanged)')))
})

test('strict mode never introspects or removes columns', async (t) => {
  const f = fixture(t)
  f.source.execute = () => {
    throw new Error('strict must not introspect')
  }
  await exportDump({ ...f.options, legacy: false })
  assert.deepEqual(f.selected, [undefined, undefined])
})

test('catalog, permission, connection, schema-race and SELECT failures never produce a completion marker', async (t) => {
  for (const stage of ['catalog', 'probe', 'select', 'strict']) {
    const f = fixture(t)
    const failure = new Error(`failure-${stage}`)
    if (stage === 'catalog') f.source.execute = () => Promise.reject(failure)
    if (stage === 'probe') {
      const execute = f.source.execute
      let calls = 0
      f.source.execute = (query) => (++calls === 1 ? execute(query) : Promise.reject(failure))
    }
    if (stage === 'select' || stage === 'strict')
      f.source.select = () => ({ from: () => Promise.reject(failure) })
    await assert.rejects(
      exportDump({ ...f.options, legacy: stage !== 'strict' }),
      (error) => error === failure,
    )
    assert.equal(existsSync(join(f.dir, '_manifest.json')), false)
  }
})

test('hidden existing table and empty selections fail rather than silently skip data', async (t) => {
  const f = fixture(t)
  const execute = f.source.execute
  let calls = 0
  f.source.execute = (query) => (++calls === 3 ? Promise.resolve([]) : execute(query))
  await assert.rejects(exportDump(f.options), /Catalog visibility mismatch/)
  assert.equal(existsSync(join(f.dir, '_manifest.json')), false)
  const empty = fixture(t)
  empty.source.execute = () => Promise.resolve(wrap(catalogRows(['retired_column'])))
  await assert.rejects(exportDump(empty.options), /No mapped columns/)
  assert.equal(existsSync(join(empty.dir, '_manifest.json')), false)
})

test('partial files never get a manifest and missing-table permission errors propagate', async (t) => {
  const partial = fixture(t)
  let selections = 0
  partial.source.select = () => ({
    from: () =>
      ++selections === 1
        ? Promise.resolve([{ id: 'fixture' }])
        : Promise.reject(new Error('late read failure')),
  })
  await assert.rejects(exportDump({ ...partial.options, legacy: false }), /late read failure/)
  assert.equal(existsSync(join(partial.dir, 'experiences.json')), true)
  assert.equal(existsSync(join(partial.dir, '_manifest.json')), false)
  for (const code of ['42501', 'ER_TABLEACCESS_DENIED_ERROR', 'ECONNRESET']) {
    const f = fixture(t)
    const execute = f.source.execute
    let calls = 0
    const failure = { cause: { code } }
    f.source.execute = (query) => (++calls === 3 ? Promise.reject(failure) : execute(query))
    await assert.rejects(exportDump(f.options), (error) => error === failure)
    assert.equal(existsSync(join(f.dir, '_manifest.json')), false)
  }
})
