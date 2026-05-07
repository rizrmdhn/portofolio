import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Must load env before any module that calls createEnv (client.ts → env/server)
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../apps/web/.env") });

import { hash } from "@node-rs/argon2";
import { VIEW_AS_TYPES } from "@portofolio/constants";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { v7 as uuidv7 } from "uuid";
import { relations } from "./relations/index.js";
import { account, applicationSettings, user } from "./schema/index.js";

const databaseUrl = process.env.DATABASE_URL;
const email = process.env.ALLOWED_EMAIL_LOGIN;
const password = process.env.ALLOWED_EMAIL_PASSWORD;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

if (!email) {
  console.error("ALLOWED_EMAIL_LOGIN is not set");
  process.exit(1);
}

if (!password) {
  console.error("ALLOWED_EMAIL_PASSWORD is not set");
  process.exit(1);
}

const client = postgres(databaseUrl, { max: 1 });
const db = drizzle({ client, relations });

async function seedUser() {
  const existing = await db.query.user.findFirst({
    where: { email: email! },
  });

  if (existing) {
    console.log(`User ${email} already exists, skipping.`);
    return;
  }

  const userId = uuidv7();
  const now = new Date();
  const passwordHash = await hash(password!);

  await db.insert(user).values({
    id: userId,
    name: "Admin",
    email: email!,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: uuidv7(),
    userId,
    accountId: email!,
    providerId: "credential",
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`Seeded admin user: ${email}`);
}

async function seedApplicationSettings() {
  await db
    .insert(applicationSettings)
    .values([{ key: "viewAs", data: { value: VIEW_AS_TYPES[0] } }])
    .onConflictDoNothing({ target: applicationSettings.key });

  console.log("Seeded application settings.");
}

await seedUser();
await seedApplicationSettings();

await client.end();
