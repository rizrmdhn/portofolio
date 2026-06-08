import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({
  path: '../../apps/web/.env',
})

const provider = process.env.DATABASE_PROVIDER === 'mysql' ? 'mysql' : 'postgresql'

// Each dialect keeps its own migration history. Postgres stays in the original
// folder so existing applied migrations are untouched.
const out = provider === 'mysql' ? './src/migrations-mysql' : './src/migrations'

export default defineConfig({
  schema: './src/schema',
  out,
  dialect: provider,
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
})
