import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";
import postgres from "postgres";

import { env } from "@portofolio/env/server";
import * as relations from "./relations";
import * as schema from "./schema";

export { sql };

const client = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20, // release idle connections after 20s (prevents stale TCP from Docker NAT)
  connect_timeout: 10, // fail fast if a new connection can't be established in 10s
  max_lifetime: 1800, // recycle connections after 30min
});

export const db = drizzle(client, {
  schema: {
    ...schema,
    ...relations,
  },
});

/**
 * Run all pending Drizzle migrations.
 * Migrations folder is resolved relative to the monorepo root so it works
 * both locally and inside the Docker container (/app).
 */
export async function runMigrations(): Promise<void> {
  const migrationsFolder = path.join(
    process.cwd(),
    "packages/db/src/migrations",
  );
  await migrate(db, { migrationsFolder });
}

export type DB = typeof db;

export type DBType = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type DBorTx = DB | DBType;
