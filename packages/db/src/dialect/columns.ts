/**
 * Dialect-neutral column / table / index helpers.
 *
 * Each table is declared **once** in `../schema` using these helpers. A helper
 * builds the real Postgres column (the canonical type used for inference and
 * the Postgres runtime) and, when `DATABASE_PROVIDER=mysql`, swaps in the
 * equivalent MySQL column at runtime — cast back to the Postgres type so the
 * rest of the codebase (queries, relations, db client) sees a single,
 * consistent set of types regardless of the deployed dialect.
 *
 * Adding a new dialect (e.g. SQLite) means adding one branch per helper here;
 * `../schema` does not change.
 */
import {
  boolean as myBoolean,
  date as myDate,
  datetime as myDatetime,
  index as myIndex,
  int as myInt,
  json as myJson,
  text as myText,
  uniqueIndex as myUniqueIndex,
  varchar as myVarchar,
  mysqlEnum,
  mysqlTableCreator,
} from 'drizzle-orm/mysql-core'
import type { PgEnum } from 'drizzle-orm/pg-core'
import {
  boolean as pgBoolean,
  date as pgDate,
  index as pgIndex,
  integer as pgInteger,
  jsonb as pgJsonb,
  pgTableCreator,
  text as pgText,
  timestamp as pgTimestamp,
  uniqueIndex as pgUniqueIndex,
  uuid as pgUuid,
  varchar as pgVarchar,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { activeDialect } from './active'

/**
 * Returns `pgValue` when running on Postgres; otherwise constructs and returns
 * the MySQL equivalent, cast to the Postgres type. `pgValue` is always built so
 * its type drives inference, and so the Postgres runtime path is zero-cost.
 */
function pick<TValue>(pgValue: TValue, makeMysql: () => unknown): TValue {
  return (activeDialect === 'mysql' ? makeMysql() : pgValue) as TValue
}

// ========== Table creator ==========

const pgCreateTable = pgTableCreator((name) => name)
const myCreateTable = mysqlTableCreator((name) => name)

/** Multi-project-friendly table creator (identity naming), dialect-aware. */
export const createTable = pick(pgCreateTable, () => myCreateTable)

// ========== Index ==========

/** btree index on Postgres; plain index on MySQL (btree is the default there). */
export function idx(name: string, ...columns: Array<unknown>) {
  const cols = columns as Parameters<ReturnType<typeof pgIndex>['on']>
  return pick(pgIndex(name).using('btree', ...cols), () =>
    myIndex(name).on(...(cols as Parameters<ReturnType<typeof myIndex>['on']>)),
  )
}

/** Unique (optionally composite) index — enforces uniqueness across `columns`. */
export function uniqIdx(name: string, ...columns: Array<unknown>) {
  const cols = columns as Parameters<ReturnType<typeof pgUniqueIndex>['on']>
  return pick(pgUniqueIndex(name).on(...cols), () =>
    myUniqueIndex(name).on(...(cols as Parameters<ReturnType<typeof myUniqueIndex>['on']>)),
  )
}

// ========== Primary keys ==========

/** UUIDv7 primary key. Postgres `uuid`; MySQL `varchar(36)`. */
export function uuidPk(name = 'id') {
  return pick(
    pgUuid(name)
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    () =>
      myVarchar(name, { length: 36 })
        .primaryKey()
        .notNull()
        .$default(() => uuidv7()),
  )
}

/** UUID foreign-key / reference column (no default). Postgres `uuid`; MySQL `varchar(36)`. */
export function uuidRef(name: string) {
  return pick(pgUuid(name), () => myVarchar(name, { length: 36 }))
}

// ========== Strings ==========

/** Fixed-length string. `varchar(len)` on both dialects. */
export function str(name: string, length: number) {
  return pick(pgVarchar(name, { length }), () => myVarchar(name, { length }))
}

/** Long free-form text (not safe to index/unique on MySQL). `text` on both dialects. */
export function longText(name: string) {
  return pick(pgText(name), () => myText(name))
}

/**
 * Short text that may be indexed / unique / used as a key or FK.
 * Postgres `text`; MySQL `varchar(255)` (MySQL cannot index TEXT without a
 * prefix length). Use this for ids, tokens, emails and short indexed fields.
 */
export function indexableText(name: string) {
  return pick(pgText(name), () => myVarchar(name, { length: 255 }))
}

/** String array. Postgres native `text[]`; MySQL `json` typed as `string[]`. */
export function stringArray(name: string) {
  return pick(pgText(name).array(), () => myJson(name).$type<Array<string>>())
}

// ========== Scalars ==========

export function boolCol(name: string) {
  return pick(pgBoolean(name), () => myBoolean(name))
}

export function intCol(name: string) {
  return pick(pgInteger(name), () => myInt(name))
}

/** JSON document. Postgres `jsonb`; MySQL `json`. */
export function jsonCol(name: string) {
  return pick(pgJsonb(name), () => myJson(name))
}

// ========== Temporal ==========

/** Timezone-aware timestamp stored as ISO string. Postgres `timestamptz`; MySQL `datetime(3)`. */
export function tsTz(name: string) {
  return pick(pgTimestamp(name, { withTimezone: true, mode: 'string' }), () =>
    myDatetime(name, { mode: 'string', fsp: 3 }),
  )
}

/** Plain timestamp (Date mode) — used by Better Auth tables. Postgres `timestamp`; MySQL `datetime`. */
export function authTs(name: string) {
  return pick(pgTimestamp(name), () => myDatetime(name))
}

export function dateCol(name: string) {
  return pick(pgDate(name), () => myDate(name))
}

// ========== Enums ==========

/**
 * Enum column built from a Postgres `pgEnum` declaration (see ../schema).
 * Postgres references the standalone enum type; MySQL inlines `enum(...)` using
 * the same values. The `pgEnum` instance carries the value union, so the column
 * keeps a precise literal type for inference and `.default()` type-checking.
 */
export function enumCol<T extends [string, ...Array<string>]>(
  enumType: PgEnum<T>,
  colName: string,
) {
  return pick(enumType(colName), () => mysqlEnum(colName, enumType.enumValues))
}
