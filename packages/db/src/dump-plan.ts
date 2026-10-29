import { getTableColumns, getTableName, sql } from 'drizzle-orm'
import type { AnyColumn, Table } from 'drizzle-orm'
import type { DatabaseProvider } from './dialect/active'

/** No client/env imports: planning and driver result validation are database-free. */
export function catalogQuery(provider: DatabaseProvider) {
  const namespace = provider === 'mysql' ? sql`DATABASE()` : sql`current_schema()`
  return sql`
    SELECT namespace.schema_name, t.table_name, c.column_name
    FROM (SELECT ${namespace} AS schema_name) namespace
    LEFT JOIN information_schema.tables t ON t.table_schema = namespace.schema_name
      AND t.table_type = 'BASE TABLE'
    LEFT JOIN information_schema.columns c ON c.table_schema = t.table_schema
      AND c.table_name = t.table_name
    ORDER BY t.table_name, c.ordinal_position
  `
}

export interface Catalog {
  schema: string
  tables: Map<string, Set<string>>
}

export function readCatalog(result: unknown, provider: DatabaseProvider): Catalog {
  // postgres-js returns a RowList; mysql2 execute returns [rows, fields].
  const rows: unknown =
    provider === 'mysql' && Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Invalid schema catalog result')
  }
  const tables = new Map<string, Set<string>>()
  let schema: string | undefined
  for (const row of rows as Array<unknown>) {
    if (!row || typeof row !== 'object') throw new Error('Invalid schema catalog row')
    const entry = row as Record<string, unknown>
    if (
      typeof entry.schema_name !== 'string' ||
      !entry.schema_name ||
      (schema !== undefined && schema !== entry.schema_name) ||
      !(entry.table_name === null || typeof entry.table_name === 'string') ||
      !(entry.column_name === null || typeof entry.column_name === 'string') ||
      (entry.table_name === null && entry.column_name !== null)
    ) {
      throw new Error('Invalid schema catalog row')
    }
    schema = entry.schema_name
    if (typeof entry.table_name === 'string') {
      const columns = tables.get(entry.table_name) ?? new Set<string>()
      if (typeof entry.column_name === 'string') columns.add(entry.column_name)
      tables.set(entry.table_name, columns)
    }
  }
  return { schema: schema!, tables }
}

export function planTable(table: Table, catalog: Catalog) {
  const tableName = getTableName(table)
  const available = catalog.tables.get(tableName)
  const mapped = getTableColumns(table)
  const selection: Record<string, AnyColumn> = {}
  const missingColumns: Array<{ key: string; column: string }> = []
  const unknownColumns = [...(available ?? [])].filter(
    (name) => !Object.values(mapped).some((column) => column.name === name),
  )
  for (const [key, column] of Object.entries(mapped)) {
    if (available?.has(column.name)) selection[key] = column
    else missingColumns.push({ key, column: column.name })
  }
  return {
    tableName,
    missingTable: available === undefined,
    selection,
    missingColumns,
    unknownColumns,
  }
}

/** Never silently export an existing table as [] when no mapped columns survive. */
export function assertSelectable(plan: ReturnType<typeof planTable>) {
  if (!plan.missingTable && Object.keys(plan.selection).length === 0) {
    throw new Error(`No mapped columns available for table ${plan.tableName}`)
  }
}
