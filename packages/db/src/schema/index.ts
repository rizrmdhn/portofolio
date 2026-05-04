// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { EXPERIENCE_TYPES } from "@portofolio/constants";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `portofolio-webpage-v5_${name}`,
);

export const experienceEnum = pgEnum("experience_type", EXPERIENCE_TYPES);

export const users = createTable(
  "users",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    name: d.varchar({ length: 256 }).notNull(),
    email: d.varchar({ length: 256 }).notNull(),
    password: d.varchar({ length: 256 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("users_id_idx").on(t.id), index("users_email_idx").on(t.email)],
);

export const refreshTokens = createTable(
  "refresh_tokens",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    deviceInfo: text("device_info"),
    os: text("os"),
    version: varchar("version", { length: 100 }),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    lastUsedAt: timestamp("last_used_at", {
      withTimezone: true,
      mode: "string",
    }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    revoked: boolean("revoked").notNull().default(false),
    revokedAt: timestamp("revoked_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("refresh_token_user_id_idx").using("btree", table.userId),
    index("refresh_token_token_idx").using("btree", table.token),
    index("refresh_token_expires_at_idx").using("btree", table.expiresAt),
  ],
);

export const projects = createTable(
  "projects",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    name: d.varchar({ length: 256 }).notNull(),
    description: d.text().notNull(),
    tech: d.text().array().notNull(),
    github_url: d.text(),
    live_url: d.text(),
    playstore_url: d.text(),
    appstore_url: d.text(),
    image_url: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => {
    return [index("projects_id_idx").on(t.id)];
  },
);

export const projectViews = createTable(
  "project_views",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    projectId: d
      .uuid()
      .references(() => projects.id, {
        onDelete: "cascade",
      })
      .notNull(),
    count: d.integer().default(0).notNull(),
  }),
  (t) => {
    return [index("project_views_id_idx").on(t.id)];
  },
);

export const experiences = createTable(
  "experiences",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    title: d.varchar({ length: 256 }).notNull(),
    description: d.text().notNull(),
    company: d.varchar({ length: 256 }).notNull(),
    type: experienceEnum().notNull(),
    startDate: d.date().notNull(),
    endDate: d.date(),
    currentlyWorking: d.boolean().default(false).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => {
    return [index("experiences_id_idx").on(t.id)];
  },
);

export const certifications = createTable(
  "certifications",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    name: d.varchar({ length: 256 }).notNull(),
    issuer: d.varchar({ length: 256 }).notNull(),
    certificate_url: d.text(),
    certificate_id: d.varchar({ length: 256 }),
    issueDate: d.date().notNull(),
    expiryDate: d.date(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => {
    return [index("certifications_id_idx").on(t.id)];
  },
);

export const applicationSettings = createTable(
  "application_settings",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    key: d.varchar({ length: 256 }).notNull().unique(),
    data: d.jsonb().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => {
    return [
      index("application_settings_id_idx").on(t.id),
      index("application_settings_key_idx").on(t.key),
    ];
  },
);

export const techStack = createTable(
  "tech_stack",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    name: d.varchar({ length: 256 }).notNull(),
    list: d.text().array().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => {
    return [index("tech_stack_id_idx").on(t.id)];
  },
);
