import { ilike, isMysql, like, notIlike, notLike } from '@portofolio/db'
import type { Column, SQL, SQLWrapper } from '@portofolio/db'

type Operand = Column | SQLWrapper

/**
 * Case-insensitive LIKE. Postgres uses `ILIKE`; MySQL uses `LIKE` (case
 * insensitivity comes from the column's default collation there).
 */
export function ciLike(column: Operand, pattern: string): SQL {
  return isMysql ? like(column, pattern) : ilike(column, pattern)
}

/** Negated case-insensitive LIKE — see {@link ciLike}. */
export function ciNotLike(column: Operand, pattern: string): SQL {
  return isMysql ? notLike(column, pattern) : notIlike(column, pattern)
}

/**
 * Relational-query (`db.query`) filter for a case-insensitive "contains" search.
 * Returns the dialect-appropriate operator object: `{ ilike }` on Postgres,
 * `{ like }` on MySQL.
 */
export function insensitiveContains(value: string | null | undefined) {
  const pattern = `%${value ?? ''}%`
  return (isMysql ? { like: pattern } : { ilike: pattern }) as { ilike: string }
}
