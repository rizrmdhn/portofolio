import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "node:path";
import postgres from "postgres";

import { env } from "@portofolio/env/server";
import { relations } from "./relations";

export { sql };

const client = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  max_lifetime: 1800,
});

export const db = drizzle({ client, relations });

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
