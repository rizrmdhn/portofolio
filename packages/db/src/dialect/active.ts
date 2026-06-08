/**
 * Resolves the active database dialect from the environment.
 *
 * This is intentionally decoupled from `@portofolio/env` (which performs full
 * server-env validation) so the schema module can be loaded by drizzle-kit
 * without requiring every server variable to be present.
 *
 * @see ../client.ts for the runtime driver selection
 */
export type DatabaseProvider = 'postgresql' | 'mysql'

// Read from `process.env` via globalThis so this module does not depend on
// `@types/node` being in scope — it is imported by packages (e.g. @portofolio/types)
// whose tsconfig does not include the node global types.
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
const raw = env?.DATABASE_PROVIDER

export const activeDialect: DatabaseProvider = raw === 'mysql' ? 'mysql' : 'postgresql'

export const isMysql = activeDialect === 'mysql'
export const isPostgres = activeDialect === 'postgresql'
