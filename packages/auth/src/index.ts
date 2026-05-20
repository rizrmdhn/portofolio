import { hash, verify } from '@node-rs/argon2'
import { db } from '@portofolio/db/client'
import * as schema from '@portofolio/db/schema/index'
import { env } from '@portofolio/env/server'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { v7 as uuidv7 } from 'uuid'

export function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema,
    }),
    trustedOrigins: env.CORS_ORIGIN,
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      password: {
        hash: (password) => hash(password),
        verify: ({ hash: hashed, password }) => verify(hashed, password),
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    plugins: [tanstackStartCookies()],
    advanced: {
      database: {
        generateId: () => uuidv7(),
      },
    },
  })
}

export const auth = createAuth()
