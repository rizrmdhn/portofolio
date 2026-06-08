/**
 * Dialect-aware write helpers that emulate Postgres `RETURNING` on MySQL.
 *
 * Dialects with native `RETURNING` (Postgres, SQLite, CockroachDB) use it
 * directly. MySQL has no `RETURNING`, so only there do these helpers re-select
 * the affected row(s) — i.e. the `!isMysql` branch covers every native dialect,
 * including a future SQLite one:
 *  - insert: `.$returningId()` to capture the (possibly `$default`-generated)
 *    primary key, then select the row back;
 *  - update: capture matching ids, run the update, then select them back;
 *  - delete: select the row before deleting it.
 *
 * The extra round-trip means the read-back is not atomic with the write the way
 * Postgres `RETURNING` is. That is acceptable for the admin mutations here; do
 * not rely on it for high-contention counters.
 *
 * Every helper accepts the executor (`db` or a transaction `tx`) so it composes
 * inside `db.transaction(...)`. All tables in this project use a single `id`
 * primary key, which these helpers depend on.
 */
import type { Column, InferInsertModel, InferSelectModel, SQL, Table } from '@portofolio/db'
import { inArray, isMysql } from '@portofolio/db'
import type { DBorTx } from '@portofolio/db/client'

// Structural view of the drizzle query builders these helpers drive. The
// concrete dialect (and thus the real builder types) is chosen at runtime in
// @portofolio/db/client, so the canonically-Postgres-typed executor is narrowed
// to this minimal shape here.
interface RawInsert {
  values: (values: unknown) => {
    returning: () => Promise<Array<Record<string, unknown>>>
    $returningId: () => Promise<Array<{ id: unknown }>>
  }
}
interface RawUpdate {
  set: (values: unknown) => {
    where: (where: SQL | undefined) => Promise<unknown> & {
      returning: () => Promise<Array<Record<string, unknown>>>
    }
  }
}
interface RawDelete {
  where: (where: SQL | undefined) => Promise<unknown> & {
    returning: () => Promise<Array<Record<string, unknown>>>
  }
}
interface RawExec {
  insert: (table: Table) => RawInsert
  update: (table: Table) => RawUpdate
  delete: (table: Table) => RawDelete
  select: () => {
    from: (table: Table) => {
      where: (where: SQL | undefined) => Promise<Array<Record<string, unknown>>>
    }
  }
}

function raw(exec: DBorTx): RawExec {
  return exec as unknown as RawExec
}

function pk(table: Table): Column {
  return (table as unknown as { id: Column }).id
}

/** Insert one row and return it (Postgres `RETURNING`, or insert + re-select on MySQL). */
export async function insertReturning<TTable extends Table>(
  exec: DBorTx,
  table: TTable,
  values: InferInsertModel<TTable>,
): Promise<InferSelectModel<TTable> | undefined> {
  if (!isMysql) {
    const [row] = await raw(exec).insert(table).values(values).returning()
    return row as InferSelectModel<TTable> | undefined
  }

  const inserted = await raw(exec).insert(table).values(values).$returningId()
  const id = inserted[0]?.id
  if (id === undefined) return undefined

  const [row] = await raw(exec)
    .select()
    .from(table)
    .where(inArray(pk(table), [id]))
  return row as InferSelectModel<TTable> | undefined
}

/** Update rows matching `where` and return the (first) updated row. */
export async function updateReturning<TTable extends Table>(
  exec: DBorTx,
  table: TTable,
  values: Partial<InferInsertModel<TTable>>,
  where: SQL | undefined,
): Promise<InferSelectModel<TTable> | undefined> {
  if (!isMysql) {
    const [row] = await raw(exec).update(table).set(values).where(where).returning()
    return row as InferSelectModel<TTable> | undefined
  }

  const targets = await raw(exec).select().from(table).where(where)
  const ids = targets.map((r) => r.id)
  await raw(exec).update(table).set(values).where(where)
  if (ids.length === 0) return undefined

  const [row] = await raw(exec)
    .select()
    .from(table)
    .where(inArray(pk(table), ids))
  return row as InferSelectModel<TTable> | undefined
}

/** Delete rows matching `where` and return the (first) deleted row. */
export async function deleteReturning<TTable extends Table>(
  exec: DBorTx,
  table: TTable,
  where: SQL | undefined,
): Promise<InferSelectModel<TTable> | undefined> {
  if (!isMysql) {
    const [row] = await raw(exec).delete(table).where(where).returning()
    return row as InferSelectModel<TTable> | undefined
  }

  const [row] = await raw(exec).select().from(table).where(where)
  await raw(exec).delete(table).where(where)
  return row as InferSelectModel<TTable> | undefined
}
