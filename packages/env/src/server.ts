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
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
