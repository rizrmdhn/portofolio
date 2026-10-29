import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getTableName, sql } from 'drizzle-orm'
import type { AnyColumn, SQL, Table } from 'drizzle-orm'
import type { DatabaseProvider } from './dialect/active'
import { assertSelectable, catalogQuery, planTable, readCatalog } from './dump-plan'

export type Manifest = Record<string, { count: number; hash: string }>

// Shared query-builder surface; the client uses canonical PG types for MySQL too.
export interface DumpSource {
  execute: (query: SQL) => PromiseLike<unknown>
  select: (columns?: Record<string, AnyColumn>) => {
    from: (table: Table) => PromiseLike<Array<Record<string, unknown>>>
  }
}

function errorCode(error: unknown): unknown {
  if (!error || typeof error !== 'object') return undefined
  if ('code' in error) return error.code
  return 'cause' in error ? errorCode(error.cause) : undefined
}

/** Catalog visibility can be privilege-filtered. Verify gaps without reading rows. */
async function verifyCatalogTable(
  source: DumpSource,
  provider: DatabaseProvider,
  schema: string,
  plan: ReturnType<typeof planTable>,
) {
  try {
    await source.execute(
      sql`SELECT * FROM ${sql.identifier(schema)}.${sql.identifier(plan.tableName)} LIMIT 0`,
    )
  } catch (error) {
    // Only a catalog-absent table AND the driver's precise undefined-table error
    // establish absence. Permission, connection and all other failures propagate.
    if (
      plan.missingTable &&
      errorCode(error) === (provider === 'mysql' ? 'ER_NO_SUCH_TABLE' : '42P01')
    )
      return
    throw error
  }
  if (plan.missingTable) throw new Error(`Catalog visibility mismatch for table ${plan.tableName}`)
}

/** outDir must be new: the manifest is the last write and sole completion marker. */
export async function exportDump(options: {
  source: DumpSource
  provider: DatabaseProvider
  tables: Array<[string, Table]>
  legacy: boolean
  outDir: string
  previous: Manifest | null
  log: (message: string) => void
}) {
  const { source, provider, tables, legacy, outDir, previous, log } = options
  // Deliberately no catch/fallback: catalog, permissions, and SELECT errors are fatal.
  const catalog = legacy
    ? readCatalog(await source.execute(catalogQuery(provider)), provider)
    : null
  const plans = tables.map(([key, table]) => ({
    key,
    table,
    plan: catalog ? planTable(table, catalog) : null,
  }))
  const metadata = {
    provider,
    mode: legacy ? 'legacy-schema' : 'strict',
    schema: catalog?.schema ?? null,
    consistency: 'sequential reads; not a point-in-time snapshot',
    tables: plans.map(({ key, table, plan }) => ({
      key,
      table: getTableName(table),
      missingTable: plan?.missingTable ?? false,
      missingColumns: plan?.missingColumns ?? [],
      unknownColumns: plan?.unknownColumns ?? [],
    })),
    unknownTables: catalog
      ? [...catalog.tables.keys()].filter(
          (name) => !tables.some(([, table]) => getTableName(table) === name),
        )
      : [],
  }
  writeFileSync(join(outDir, '_metadata.json'), JSON.stringify(metadata, null, 2))
  for (const { key, plan } of plans) {
    if (!plan) continue
    await verifyCatalogTable(source, provider, catalog!.schema, plan)
    if (plan.missingTable) log(`  ${key}: absent in catalog, skipped`)
    else if (plan.missingColumns.length) {
      log(
        `  ${key}: missing columns: ${plan.missingColumns.map(({ column }) => column).join(', ')}`,
      )
    }
    if (plan.unknownColumns.length) log(`  ${key}: unmapped columns recorded in _metadata.json`)
    assertSelectable(plan)
  }
  if (metadata.unknownTables.length) log('  Unmapped tables recorded in _metadata.json')

  const manifest: Manifest = {}
  for (const { key, table, plan } of plans) {
    if (plan?.missingTable) continue
    const rows = await source.select(plan?.selection).from(table)
    const json = JSON.stringify(rows, null, 2)
    writeFileSync(join(outDir, `${key}.json`), json)
    const hash = createHash('sha1').update(json).digest('hex').slice(0, 12)
    manifest[key] = { count: rows.length, hash }
    const before = previous?.[key]
    const delta = !before
      ? ' (new)'
      : before.hash === hash
        ? ' (unchanged)'
        : ` (changed: ${before.count} → ${rows.length})`
    log(`  ${key}: ${rows.length} rows${previous ? delta : ''}`)
  }
  writeFileSync(join(outDir, '_manifest.json'), JSON.stringify(manifest, null, 2))
  return manifest
}
