/**
 * Dialect-agnostic data export. Dumps every table to `<exportKey>.json` under a
 * timestamped `dump_*` directory, plus a `_manifest.json` (per-table row count
 * and content hash). If a previous dump exists, prints what changed since then.
 *
 * Works against whichever database `DATABASE_PROVIDER` / `DATABASE_URL` point
 * at; pair with `db:import` to move data between dialects.
 */
import dotenv from "dotenv";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../apps/web/.env") });

// Dynamic imports so dotenv.config() above runs before createEnv() is called
const { is, Table } = await import("drizzle-orm");
const { db } = await import("./client");
const { activeDialect } = await import("./dialect/active");
const schema = await import("./schema");

type Manifest = Record<string, { count: number; hash: string }>;

function findPreviousManifest(): Manifest | null {
  const prior = readdirSync(process.cwd())
    .filter((name) => name.startsWith("dump_"))
    .sort()
    .reverse();

  for (const dir of prior) {
    const file = join(process.cwd(), dir, "_manifest.json");
    if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8")) as Manifest;
  }
  return null;
}

const previous = findPreviousManifest();

const outDir = `dump_${new Date().toISOString().replace(/[:.]/g, "-")}`;
mkdirSync(outDir, { recursive: true });

console.log(`Dumping ${activeDialect} → ./${outDir}/\n`);

const manifest: Manifest = {};

for (const [name, value] of Object.entries(schema)) {
  if (!is(value, Table)) continue;

  const rows = await db.select().from(value as never);
  const json = JSON.stringify(rows, null, 2);
  writeFileSync(`${outDir}/${name}.json`, json);

  const hash = createHash("sha1").update(json).digest("hex").slice(0, 12);
  manifest[name] = { count: rows.length, hash };

  const before = previous?.[name];
  const delta =
    !before
      ? " (new)"
      : before.hash === hash
        ? " (unchanged)"
        : ` (changed: ${before.count} → ${rows.length})`;

  console.log(`  ${name}: ${rows.length} rows${previous ? delta : ""}`);
}

writeFileSync(`${outDir}/_manifest.json`, JSON.stringify(manifest, null, 2));

console.log(`\nDump saved to ./${outDir}/`);
process.exit(0);
