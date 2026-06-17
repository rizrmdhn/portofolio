import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  onValidationError: (issues) => {
    console.error('❌ Invalid environment variables:', JSON.stringify(issues, null, 2))
    throw new Error('Invalid environment variables')
  },
  server: {
    APP_URL: z.url().default('http://localhost:3001'),
    DATABASE_URL: z.string().min(1),
    DATABASE_PROVIDER: z.enum(['postgresql', 'mysql']).default('postgresql'),
    CORS_ORIGIN: z
      .string()
      .min(1)
      .default('http://localhost:3001')
      .transform((val) => val.split(',')),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    ALLOWED_EMAIL_LOGIN: z.email(),
    ALLOWED_EMAIL_PASSWORD: z.string().min(8).optional(),
    UPLOADTHING_TOKEN: z.string().min(8).optional(),
    // Optional: when set, the dashboard auto-translates content fields via Groq;
    // otherwise the UI falls back to copy-a-prompt mode.
    GROQ_API_KEY: z.string().min(1).optional(),
    VERCEL_URL: z.string().optional(),
    MEMURAI_HOST: z.string().optional().default('localhost'),
    MEMURAI_PORT: z.string().optional().default('6379'),
    MEMURAI_PASSWORD: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
