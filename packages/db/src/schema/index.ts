// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { EXPERIENCE_TYPES } from "@portofolio/constants";
import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";
import { createTable } from "../utils";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const experienceEnum = pgEnum("experience_type", EXPERIENCE_TYPES);

export const users = createTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    index("users_id_idx").using("btree", table.id),
    index("users_email_idx").using("btree", table.email),
  ],
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
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description").notNull(),
    tech: text("tech").array().notNull(),
    githubUrl: text("github_url"),
    liveUrl: text("live_url"),
    playstoreUrl: text("playstore_url"),
    appstoreUrl: text("appstore_url"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index("projects_id_idx").using("btree", table.id)],
);

export const projectViews = createTable(
  "project_views",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    count: integer("count").default(0).notNull(),
  },
  (table) => [index("project_views_id_idx").using("btree", table.id)],
);

export const experiences = createTable(
  "experiences",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    company: varchar("company", { length: 256 }).notNull(),
    type: experienceEnum("type").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    currentlyWorking: boolean("currently_working").default(false).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index("experiences_id_idx").using("btree", table.id)],
);

export const certifications = createTable(
  "certifications",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar("name", { length: 256 }).notNull(),
    issuer: varchar("issuer", { length: 256 }).notNull(),
    certificateUrl: text("certificate_url"),
    certificateId: varchar("certificate_id", { length: 256 }),
    issueDate: date("issue_date").notNull(),
    expiryDate: date("expiry_date"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index("certifications_id_idx").using("btree", table.id)],
);

export const applicationSettings = createTable(
  "application_settings",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    key: varchar("key", { length: 256 }).notNull().unique(),
    data: jsonb("data").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    index("application_settings_id_idx").using("btree", table.id),
    index("application_settings_key_idx").using("btree", table.key),
  ],
);

export const techStack = createTable(
  "tech_stack",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar("name", { length: 256 }).notNull(),
    list: text("list").array().notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index("tech_stack_id_idx").using("btree", table.id)],
);
