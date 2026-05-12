import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { hash } from "@node-rs/argon2";
import { VIEW_AS_TYPES } from "@portofolio/constants";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { v7 as uuidv7 } from "uuid";
import { relations } from "./relations/index.js";
import {
  account,
  applicationSettings,
  profile,
  socialLinks,
  techStackCategories,
  techStackItems,
  user,
} from "./schema/index.js";

// Must load env before any module that calls createEnv (client.ts → env/server)
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../apps/web/.env") });

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
  const userId = uuidv7();
  const now = new Date();
  const passwordHash = await hash(password!);

  const [insertedUser] = await db
    .insert(user)
    .values({
      id: userId,
      name: "Admin",
      email: email!,
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: user.email })
    .returning();

  const resolvedUserId =
    insertedUser?.id ??
    (await db.query.user.findFirst({ where: { email: email! } }))?.id;

  if (!resolvedUserId) throw new Error("Failed to resolve user id");

  await db
    .insert(account)
    .values({
      id: uuidv7(),
      userId: resolvedUserId,
      accountId: resolvedUserId,
      providerId: "credential",
      password: passwordHash,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: account.id });

  console.log(`Seeded admin user: ${email}`);
}

async function seedApplicationSettings() {
  await db
    .insert(applicationSettings)
    .values([{ key: "viewAs", data: { value: VIEW_AS_TYPES[0] } }])
    .onConflictDoNothing({ target: applicationSettings.key });

  console.log("Seeded application settings.");
}

async function seedSeoSettings() {
  const data = {
    pages: {
      home: {
        title: "Noor Rizki Ramadhan — Fullstack Developer",
        description:
          "Full-stack Developer with 2+ years building production web and mobile apps using Next.js, tRPC, and Drizzle ORM.",
        ogImage: undefined,
      },
      projects: {
        title: "Projects — Noor Rizki Ramadhan",
        description: "A collection of web and mobile projects I've built.",
        ogImage: undefined,
      },
      certificates: {
        title: "Certificates — Noor Rizki Ramadhan",
        description: "Certifications and credentials I've earned.",
        ogImage: undefined,
      },
      resume: {
        title: "Resume — Noor Rizki Ramadhan",
        description: "View and download my resume / CV.",
        ogImage: undefined,
      },
    },
  };

  await db
    .insert(applicationSettings)
    .values({ key: "seo-settings", data })
    .onConflictDoNothing({ target: applicationSettings.key });

  console.log("Seeded SEO settings.");
}

async function seedProfile() {
  const values = {
    name: "Noor Rizki Ramadhan",
    title: "Fullstack Developer",
    bio: "Full-stack Developer with 2+ years building production web and mobile apps using Next.js, tRPC, and Drizzle ORM. Delivered 10+ projects across freelance and institutional settings. Passionate about type-safe, scalable code.",
    email: "rizrmdhn.work@gmail.com",
    githubUrl: "https://github.com/rizrmdhn",
    linkedinUrl: "https://linkedin.com/in/rizrmdhn",
    twitterUrl: "https://twitter.com/rizrmdhn",
  };

  const existing = await db.query.profile.findFirst();

  if (existing) {
    await db.update(profile).set(values).where(eq(profile.id, existing.id));
  } else {
    await db.insert(profile).values(values);
  }

  console.log("Seeded profile.");
}

async function seedSocialLinks() {
  const defaults = [
    { title: "GitHub", url: "https://github.com/rizrmdhn", icon: "github" as const, order: 0 },
    { title: "LinkedIn", url: "https://linkedin.com/in/rizrmdhn", icon: "linkedin" as const, order: 1 },
    { title: "X (Twitter)", url: "https://twitter.com/rizrmdhn", icon: "x" as const, order: 2 },
  ];

  for (const entry of defaults) {
    const existing = await db.query.socialLinks.findFirst({
      where: { icon: entry.icon },
    });

    if (existing) {
      await db
        .update(socialLinks)
        .set({ title: entry.title, url: entry.url, order: entry.order })
        .where(eq(socialLinks.id, existing.id));
    } else {
      await db.insert(socialLinks).values(entry);
    }
  }

  console.log("Seeded social links.");
}

async function seedTechStack() {
  const categories = [
    {
      name: "Frontend",
      order: 0,
      items: [
        { name: "React", proficiency: 5, order: 0 },
        { name: "Next.js", proficiency: 5, order: 1 },
        { name: "TypeScript", proficiency: 4, order: 2 },
        { name: "Tailwind CSS", proficiency: 4, order: 3 },
      ],
    },
    {
      name: "Backend",
      order: 1,
      items: [
        { name: "Node.js", proficiency: 4, order: 0 },
        { name: "tRPC", proficiency: 4, order: 1 },
        { name: "Drizzle ORM", proficiency: 4, order: 2 },
        { name: "PostgreSQL", proficiency: 3, order: 3 },
      ],
    },
    {
      name: "Mobile",
      order: 2,
      items: [
        { name: "React Native", proficiency: 3, order: 0 },
        { name: "Expo", proficiency: 3, order: 1 },
      ],
    },
  ];

  for (const { name, order, items } of categories) {
    const existing = await db.query.techStackCategories.findFirst({
      where: { name },
    });

    const categoryId =
      existing?.id ??
      (
        await db
          .insert(techStackCategories)
          .values({ name, order })
          .returning()
      )[0]?.id;

    if (!categoryId) throw new Error(`Failed to resolve category: ${name}`);

    for (const item of items) {
      const existingItem = await db.query.techStackItems.findFirst({
        where: { categoryId, name: item.name },
      });

      if (existingItem) {
        await db
          .update(techStackItems)
          .set({ proficiency: item.proficiency, order: item.order })
          .where(eq(techStackItems.id, existingItem.id));
      } else {
        await db.insert(techStackItems).values({ ...item, categoryId });
      }
    }
  }

  console.log("Seeded tech stack.");
}

await seedUser();
await seedApplicationSettings();
await seedSeoSettings();
await seedProfile();
await seedSocialLinks();
await seedTechStack();

await client.end();
