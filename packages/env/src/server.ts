import { createEnv } from "@t3-oss/env-core";
import "dotenv/config";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    JWT_ACCESS_TOKEN_EXPIRY: z.string().default("15m"),
    JWT_REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
    ALLOWED_EMAIL_LOGIN: z.email(),
    ALLOWED_EMAIL_PASSWORD: z.string().min(8).optional(),
    UPLOADTHING_TOKEN: z.string().min(8).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
