import { sql } from 'drizzle-orm'
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2'
import { migrate as migrateMysql } from 'drizzle-orm/mysql2/migrator'
import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js'
import { migrate as migratePg } from 'drizzle-orm/postgres-js/migrator'
import mysql from 'mysql2/promise'
import path from 'node:path'
import postgres from 'postgres'

import { env } from '@portofolio/env/server'
import { activeDialect } from './dialect/active'
import { relations } from './relations'

export { sql }

const isDev = env.NODE_ENV === 'development'

const globalForDb = globalThis as unknown as {
  pgClient?: postgres.Sql
  mysqlPool?: mysql.Pool
}

function createPgDb() {
  const client =
    globalForDb.pgClient ??
    postgres(env.DATABASE_URL, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 30,
      max_lifetime: 1800,
      prepare: false,
    })

  if (env.NODE_ENV !== 'production') globalForDb.pgClient = client

  return drizzlePg({ client, relations, logger: isDev })
}

function createMysqlDb(): PgDb {
  const pool = globalForDb.mysqlPool ?? mysql.createPool(env.DATABASE_URL)

  if (env.NODE_ENV !== 'production') globalForDb.mysqlPool = pool

  // Postgres is the canonical type for the whole codebase; the MySQL driver's
  // config generics (client/relations) don't line up structurally, so the call
  // is built loosely here and the result is cast to the shared `PgDb` type.
  return drizzleMysql({
    client: pool,
    relations,
    mode: 'default',
    logger: isDev,
  } as never) as unknown as PgDb
}

// Postgres is the canonical type. The MySQL instance is structurally compatible
// across the query-builder surface we use, so it is cast to the same type to
// keep a single `DB` type across the codebase. The driver itself is selected by
// DATABASE_PROVIDER at load time (see ./dialect/active).
type PgDb = ReturnType<typeof createPgDb>

export const db: PgDb = activeDialect === 'mysql' ? createMysqlDb() : createPgDb()

// Fire-and-forget: establish the connection pool before the first real request
if (env.NODE_ENV === 'production') {
  db.execute(sql`SELECT 1`).catch(() => {
    /* non-fatal */
  })
}

export async function runMigrations(): Promise<void> {
  if (activeDialect === 'mysql') {
    const migrationsFolder = path.join(process.cwd(), 'packages/db/src/migrations-mysql')
    await migrateMysql(db as unknown as Parameters<typeof migrateMysql>[0], { migrationsFolder })
    return
  }

  const migrationsFolder = path.join(process.cwd(), 'packages/db/src/migrations')
  await migratePg(db, { migrationsFolder })
}

export type DB = typeof db

export type DBType = Parameters<Parameters<typeof db.transaction>[0]>[0]

export type DBorTx = DB | DBType
