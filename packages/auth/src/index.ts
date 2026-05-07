import { hash, verify } from "@node-rs/argon2";
import { db } from "@portofolio/db/client";
import * as schema from "@portofolio/db/schema/index";
import { env } from "@portofolio/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    trustedOrigins: [env.CORS_ORIGIN],
    emailAndPassword: {
      enabled: true,
      password: {
        hash: (password) => hash(password),
        verify: ({ hash: hashed, password }) => verify(hashed, password),
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    plugins: [tanstackStartCookies()],
  });
}

export const auth = createAuth();
