import { pgEnum, pgTable, uuid, varchar, text, timestamp, integer, jsonb, date, boolean, index, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const experienceType = pgEnum("experience_type", ["internship", "full-time", "freelance", "part-time", "contract", "temporary", "volunteer"])


export const portofolioWebpageV5ApplicationSettings = pgTable("portofolio-webpage-v5_application_settings", {
	id: uuid().primaryKey(),
	key: varchar({ length: 256 }).notNull(),
	data: jsonb().notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
}, (table) => [
	index("application_settings_id_idx").using("btree", table.id.asc().nullsLast()),
	index("application_settings_key_idx").using("btree", table.key.asc().nullsLast()),
	unique("portofolio-webpage-v5_application_settings_key_unique").on(table.key),]);

export const portofolioWebpageV5Certifications = pgTable("portofolio-webpage-v5_certifications", {
	id: uuid().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	issuer: varchar({ length: 256 }).notNull(),
	certificateUrl: text("certificate_url"),
	issueDate: date().notNull(),
	expiryDate: date(),
	certificateId: text("certificate_id"),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
}, (table) => [
	index("certifications_id_idx").using("btree", table.id.asc().nullsLast()),
]);

export const portofolioWebpageV5Experiences = pgTable("portofolio-webpage-v5_experiences", {
	id: uuid().primaryKey(),
	title: varchar({ length: 256 }).notNull(),
	description: text().notNull(),
	company: varchar({ length: 256 }).notNull(),
	type: experienceType().notNull(),
	startDate: date().notNull(),
	endDate: date(),
	currentlyWorking: boolean().default(false).notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
}, (table) => [
	index("experiences_id_idx").using("btree", table.id.asc().nullsLast()),
]);

export const portofolioWebpageV5ProjectViews = pgTable("portofolio-webpage-v5_project_views", {
	id: uuid().primaryKey(),
	projectId: uuid().notNull().references(() => portofolioWebpageV5Projects.id, { onDelete: "cascade" } ),
	count: integer().default(0).notNull(),
}, (table) => [
	index("project_views_id_idx").using("btree", table.id.asc().nullsLast()),
]);

export const portofolioWebpageV5Projects = pgTable("portofolio-webpage-v5_projects", {
	id: uuid().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	description: text().notNull(),
	tech: text().array().notNull(),
	githubUrl: text("github_url"),
	liveUrl: text("live_url"),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
	imageUrl: text("image_url"),
	playstoreUrl: text("playstore_url"),
	appstoreUrl: text("appstore_url"),
}, (table) => [
	index("projects_id_idx").using("btree", table.id.asc().nullsLast()),
]);

export const portofolioWebpageV5Sessions = pgTable("portofolio-webpage-v5_sessions", {
	id: uuid().primaryKey(),
	userId: uuid().notNull().references(() => portofolioWebpageV5Users.id, { onDelete: "cascade" } ),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("session_id_idx").using("btree", table.id.asc().nullsLast()),
	index("user_id_idx").using("btree", table.userId.asc().nullsLast()),
]);

export const portofolioWebpageV5TechStack = pgTable("portofolio-webpage-v5_tech_stack", {
	id: uuid().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	list: text().array().notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
}, (table) => [
	index("tech_stack_id_idx").using("btree", table.id.asc().nullsLast()),
]);

export const portofolioWebpageV5Users = pgTable("portofolio-webpage-v5_users", {
	id: uuid().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	email: varchar({ length: 256 }).notNull(),
	password: varchar({ length: 256 }).notNull(),
	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true }),
}, (table) => [
	index("users_email_idx").using("btree", table.email.asc().nullsLast()),
	index("users_id_idx").using("btree", table.id.asc().nullsLast()),
]);
