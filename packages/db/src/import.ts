/**
 * Dialect-agnostic data importer — the counterpart to `db:dump`.
 *
 * Reads a dump directory produced by `db:dump` (one `<exportKey>.json` per
 * table) and writes the rows into whichever database `DATABASE_PROVIDER` /
 * `DATABASE_URL` currently point at. Because the schema is dialect-neutral, the
 * same JSON loads into Postgres or MySQL.
 *
 * Usage (from packages/db):
 *   DATABASE_PROVIDER=mysql DATABASE_URL=mysql://... pnpm db:import [dumpDir] [--truncate]
 *
 *   dumpDir     defaults to the most recent ./dump_* directory
 *   --truncate  wipe every target table (reverse FK order) before inserting;
 *               otherwise the import is idempotent — rows are inserted when new
 *               and updated in place when their id already exists.
 *
 * Conversions handled at the boundary:
 *   - timestamps: ISO `...T...Z` or Postgres `... ...+00` →
 *     `YYYY-MM-DD HH:MM:SS.SSS` UTC for MySQL `datetime`. Postgres accepts
 *     either form, so only MySQL is rewritten.
 *   - arrays / json / booleans / uuid: handled by drizzle on insert.
 * Ids and timestamps are inserted explicitly so `$default`/`uuidv7` do not
 * regenerate them.
 */
import dotenv from 'dotenv'
import { isValid, parseISO } from 'date-fns'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../../../apps/web/.env') })

// Dynamic imports so dotenv runs before client.ts → env/server validation.
const { eq } = await import('drizzle-orm')
const { db } = await import('./client')
const { activeDialect, isMysql } = await import('./dialect/active')
const schema = await import('./schema')

type Row = Record<string, unknown>

// Minimal structural view of the (canonically Postgres-typed) executor; the
// real dialect was chosen at runtime in ./client.
interface Exec {
  insert: (table: unknown) => { values: (values: Array<Row>) => Promise<unknown> }
  update: (table: unknown) => {
    set: (values: Row) => { where: (where: unknown) => Promise<unknown> }
  }
  delete: (table: unknown) => { where: (where: unknown) => Promise<unknown> }
  select: (columns: Row) => { from: (table: unknown) => Promise<Array<Row>> }
}
const exec = db as unknown as Exec

// Parent-before-child order so foreign keys resolve. Keys are the schema export
// names used by db:dump for the JSON filenames.
const IMPORT_ORDER = [
  'user',
  'session',
  'account',
  'verification',
  'profile',
  'projects',
  'projectImages',
  'viewEvents',
  'experiences',
  'certifications',
  'education',
  'achievements',
  'applicationSettings',
  'techStackCategories',
  'techStackItems',
  'activityLog',
  'socialLinks',
] as const

const CHUNK = 500
const TIMESTAMP_WITH_OPTIONAL_TZ =
  /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(?:\.(\d{1,6}))?(?:\s?(Z|[+-]\d{2}(?::?\d{2})?))?$/

function resolveDumpDir(): string {
  const arg = process.argv.slice(2).find((a) => !a.startsWith('--'))
  if (arg) {
    const dir = resolve(process.cwd(), arg)
    if (!existsSync(dir)) throw new Error(`Dump directory not found: ${dir}`)
    return dir
  }

  const dumps = readdirSync(process.cwd())
    .filter((name) => name.startsWith('dump_'))
    .sort()
    .reverse()

  if (dumps.length === 0) {
    throw new Error(
      'No dump directory given and no ./dump_* directory found. Run `pnpm db:dump` first.',
    )
  }
  return resolve(process.cwd(), dumps[0]!)
}

/** Timestamp string → MySQL `datetime` literal (UTC, millisecond precision). */
function toMysqlDateTime(value: string): string {
  const match = TIMESTAMP_WITH_OPTIONAL_TZ.exec(value)
  if (!match) return value

  const [, date, time, fraction = '', timezone] = match
  const millis = fraction.padEnd(3, '0').slice(0, 3)

  if (!timezone) {
    return `${date} ${time}.${millis}`
  }

  const normalizedTimezone =
    timezone === 'Z'
      ? 'Z'
      : `${timezone.slice(0, 3)}:${timezone.slice(3).replace(':', '').padEnd(2, '0')}`
  const iso = `${date}T${time}.${millis}${normalizedTimezone}`
  const parsed = parseISO(iso)

  if (!isValid(parsed)) {
    throw new Error(`Invalid timestamp in dump: ${value}`)
  }

  return parsed.toISOString().slice(0, 23).replace('T', ' ')
}

function normalizeRow(row: Row): Row {
  if (!isMysql) return row
  const out: Row = {}
  for (const [key, value] of Object.entries(row)) {
    out[key] =
      typeof value === 'string' && TIMESTAMP_WITH_OPTIONAL_TZ.test(value)
        ? toMysqlDateTime(value)
        : value
  }
  return out
}

function chunk<T>(items: Array<T>, size: number): Array<Array<T>> {
  const out: Array<Array<T>> = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

const dumpDir = resolveDumpDir()
const truncate = process.argv.includes('--truncate')

console.log(
  `Importing into ${activeDialect} from ${dumpDir}${truncate ? ' (truncate mode)' : ''}\n`,
)

// Optional truncate, in reverse FK order so children go first.
if (truncate) {
  for (const key of [...IMPORT_ORDER].reverse()) {
    const table = (schema as Record<string, unknown>)[key]
    if (!table) continue
    await exec.delete(table).where(undefined)
  }
  console.log('Truncated all target tables.\n')
}

let totalInserted = 0
let totalUpdated = 0

// id set per table from the dump, used for post-import verification.
const dumpIds: Record<string, Set<unknown>> = {}

for (const key of IMPORT_ORDER) {
  const table = (schema as Record<string, unknown>)[key]
  if (!table) continue

  const file = join(dumpDir, `${key}.json`)
  if (!existsSync(file)) {
    console.log(`  ${key}: (no dump file, skipped)`)
    continue
  }

  const rows = (JSON.parse(readFileSync(file, 'utf8')) as Array<Row>).map(normalizeRow)
  if (rows.length === 0) {
    console.log(`  ${key}: 0 rows`)
    continue
  }

  dumpIds[key] = new Set(rows.map((r) => r.id))

  const idColumn = (table as Record<string, unknown>).id
  const existing = await exec.select({ id: idColumn }).from(table)
  const existingIds = new Set(existing.map((r) => r.id))

  const toInsert = rows.filter((r) => !existingIds.has(r.id))
  const toUpdate = rows.filter((r) => existingIds.has(r.id))

  for (const batch of chunk(toInsert, CHUNK)) {
    await exec.insert(table).values(batch)
  }

  for (const row of toUpdate) {
    const { id, ...rest } = row
    await exec
      .update(table)
      .set(rest)
      .where(eq(idColumn as never, id))
  }

  totalInserted += toInsert.length
  totalUpdated += toUpdate.length
  console.log(`  ${key}: +${toInsert.length} inserted, ${toUpdate.length} updated`)
}

console.log(`\nDone. ${totalInserted} inserted, ${totalUpdated} updated.`)

// ── Verify: every dumped row id is present in the target ──
// Row count + id-set parity are dialect-safe; the manifest hash is not compared
// here because re-serialized values differ across dialects (e.g. timestamps).
const manifestPath = join(dumpDir, '_manifest.json')
const manifest: Record<string, { count: number; hash: string }> | null = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : null

console.log('\nVerifying target…')
let problems = 0

for (const key of IMPORT_ORDER) {
  const ids = dumpIds[key]
  if (!ids) continue

  const table = (schema as Record<string, unknown>)[key]
  const idColumn = (table as Record<string, unknown>).id
  const target = await exec.select({ id: idColumn }).from(table)
  const targetIds = new Set(target.map((r) => r.id))

  const missing = [...ids].filter((id) => !targetIds.has(id)).length
  const manifestCount = manifest?.[key]?.count
  const countDrift = manifestCount !== undefined && manifestCount !== ids.size
  const ok = missing === 0 && !countDrift
  if (!ok) problems += 1

  const notes = [
    missing ? `MISSING ${missing}` : '',
    countDrift ? `manifest ${manifestCount} ≠ dump ${ids.size}` : '',
  ]
    .filter(Boolean)
    .join(', ')

  console.log(`  ${ok ? '✓' : '✗'} ${key}: dump ${ids.size} → target ${targetIds.size}${notes ? ` (${notes})` : ''}`)
}

await (db as unknown as { $client?: { end?: () => Promise<void> } }).$client?.end?.()

if (problems > 0) {
  console.error(`\n${problems} table(s) failed verification.`)
  process.exit(1)
}

console.log('\nAll tables verified ✓')
process.exit(0)
