/** Logical data export; --legacy-schema tolerates catalog-verified schema gaps. */
import dotenv from 'dotenv'
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { exportDump } from './dump-export'
import type { DumpSource, Manifest } from './dump-export'

const args = process.argv.slice(2).filter((arg) => arg !== '--')
if (args.some((arg) => arg !== '--legacy-schema'))
  throw new Error('Usage: db:dump [--legacy-schema]')

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../../../apps/web/.env') })

// Load the configured client only in this CLI, never in planning/tests.
const { is, Table } = await import('drizzle-orm')
const { db } = await import('./client')
const { activeDialect } = await import('./dialect/active')
const schema = await import('./schema')

function findPreviousManifest(): Manifest | null {
  const prior = readdirSync(process.cwd())
    .filter((name) => name.startsWith('dump_'))
    .sort()
    .reverse()
  for (const dir of prior) {
    const file = join(process.cwd(), dir, '_manifest.json')
    if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8')) as Manifest
  }
  return null
}

const previous = findPreviousManifest()
const outDir = `dump_${new Date().toISOString().replace(/[:.]/g, '-')}`
// Refuse an existing directory, so a stale manifest cannot mark a partial run complete.
mkdirSync(outDir)
console.log(`Dumping ${activeDialect} → ./${outDir}/\n`)
await exportDump({
  source: db as unknown as DumpSource,
  provider: activeDialect,
  tables: Object.entries(schema).flatMap(([key, value]) =>
    is(value, Table) ? [[key, value] as [string, typeof value]] : [],
  ),
  legacy: args.includes('--legacy-schema'),
  outDir,
  previous,
  log: console.log,
})
console.log(`\nDump saved to ./${outDir}/`)
process.exit(0)
