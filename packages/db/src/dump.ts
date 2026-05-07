import dotenv from "dotenv";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../apps/web/.env") });

// Dynamic imports so dotenv.config() above runs before createEnv() is called
const { is } = await import("drizzle-orm");
const { PgTable } = await import("drizzle-orm/pg-core");
const { db } = await import("./client");
const schema = await import("./schema");

const outDir = `dump_${new Date().toISOString().replace(/[:.]/g, "-")}`;
mkdirSync(outDir, { recursive: true });

for (const [name, value] of Object.entries(schema)) {
  if (!is(value, PgTable)) continue;

  const rows = await db.select().from(value);
  writeFileSync(`${outDir}/${name}.json`, JSON.stringify(rows, null, 2));
  console.log(`  ${name}: ${rows.length} rows`);
}

console.log(`\nDump saved to ./${outDir}/`);
