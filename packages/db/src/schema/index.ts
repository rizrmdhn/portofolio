// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  ACTIVITY_LOG_ACTIONS,
  ACTIVITY_LOG_ENTITIES,
  AVAILABILITY_STATUS_TYPES,
  COLOR_VALUES,
  EXPERIENCE_STATUS_TYPES,
  EXPERIENCE_TYPES,
  SOCIAL_ICON_NAMES,
  STATUS_TYPES,
} from '@portofolio/constants'
import { sql } from 'drizzle-orm'
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
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'
import { createTable } from '../utils'

// ========== Better Auth tables ==========

export const user = createTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const session = createTable(
  'session',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
  },
  (table) => [index('session_user_id_idx').using('btree', table.userId)],
)

export const account = createTable(
  'account',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
  },
  (table) => [index('account_user_id_idx').using('btree', table.userId)],
)

export const verification = createTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const availabilityStatusEnum = pgEnum('availability_status_enum', AVAILABILITY_STATUS_TYPES)

export const experienceEnum = pgEnum('experience_type', EXPERIENCE_TYPES)

export const colorEnum = pgEnum('color_enum', COLOR_VALUES)

export const projectStatusEnum = pgEnum('project_status_enum', STATUS_TYPES)

export const experienceStatusEnum = pgEnum('experience_status_enum', EXPERIENCE_STATUS_TYPES)

export const socialIconEnum = pgEnum('social_icon_enum', SOCIAL_ICON_NAMES)

export const projects = createTable(
  'projects',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),

    // ========== Content fields ==========
    title: varchar('title', { length: 256 }).notNull(),
    slug: varchar('slug', { length: 256 }).notNull().unique(),
    description: text('description').notNull(),
    longDescription: text('long_description'),
    tech: text('tech').array().notNull(),

    // ========== Links ==========
    githubUrl: text('github_url'),
    liveUrl: text('live_url'),
    playstoreUrl: text('playstore_url'),
    appstoreUrl: text('appstore_url'),

    // ========== Media ==========
    imageUrl: text('image_url'),
    coverColor: colorEnum('cover_color').notNull().default('#ef4444'),

    // ========== Settings ==========
    status: projectStatusEnum('status').notNull().default('draft'),
    isVisible: boolean('is_visible').notNull().default(false),
    order: integer('order').default(0).notNull(),

    // ========== Metadata ==========
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
    featureAt: timestamp('feature_at', {
      withTimezone: true,
      mode: 'string',
    }),
  },
  (table) => [index('projects_id_idx').using('btree', table.id)],
)

export const experiences = createTable(
  'experiences',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),

    // ========== Details ==========
    title: varchar('title', { length: 256 }).notNull(),
    description: text('description').notNull(),
    company: varchar('company', { length: 256 }).notNull(),
    location: varchar('location', { length: 256 }).notNull(),
    type: experienceEnum('type').notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    currentlyWorking: boolean('currently_working').default(false).notNull(),
    skills: text('skills').array().notNull(),

    // ========== Settings ==========
    status: experienceStatusEnum('status').notNull().default('draft'),
    order: integer('order').default(0).notNull(),

    // ========== Metadata ==========
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index('experiences_id_idx').using('btree', table.id)],
)

export const certifications = createTable(
  'certifications',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    title: varchar('title', { length: 256 }).notNull(),
    issuer: varchar('issuer', { length: 256 }).notNull(),
    certificateUrl: text('certificate_url'),
    certificateId: varchar('certificate_id', { length: 256 }),
    issueYear: timestamp('issue_year', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    expiryYear: timestamp('expiry_year', {
      withTimezone: true,
      mode: 'string',
    }),
    status: experienceStatusEnum('status').notNull().default('draft'),
    order: integer('order').default(0).notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index('certifications_id_idx').using('btree', table.id)],
)

export const profile = createTable(
  'profile',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar('name', { length: 256 }).notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    bio: text('bio').notNull(),
    email: text('email').notNull(),
    availabilityStatus: availabilityStatusEnum('availability_status')
      .notNull()
      .default('unavailable'),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index('profile_id_idx').using('btree', table.id)],
)

export const applicationSettings = createTable(
  'application_settings',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    key: varchar('key', { length: 256 }).notNull().unique(),
    data: jsonb('data').notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    index('application_settings_id_idx').using('btree', table.id),
    index('application_settings_key_idx').using('btree', table.key),
  ],
)

export const techStackCategories = createTable(
  'tech_stack_categories',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: varchar('name', { length: 256 }).notNull(),
    order: integer('order').default(0).notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index('tech_stack_categories_id_idx').using('btree', table.id)],
)

export const techStackItems = createTable(
  'tech_stack_items',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => techStackCategories.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 256 }).notNull(),
    proficiency: integer('proficiency').default(1).notNull(),
    order: integer('order').default(0).notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    index('tech_stack_items_id_idx').using('btree', table.id),
    index('tech_stack_items_category_id_idx').using('btree', table.categoryId),
  ],
)

export const activityLogActionEnum = pgEnum('activity_log_action_enum', ACTIVITY_LOG_ACTIONS)

export const activityLogEntityEnum = pgEnum('activity_log_entity_enum', ACTIVITY_LOG_ENTITIES)

export const viewEvents = createTable(
  'view_events',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    viewedAt: timestamp('viewed_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    index('view_events_project_id_idx').using('btree', table.projectId),
    index('view_events_viewed_at_idx').using('btree', table.viewedAt),
  ],
)

export const activityLog = createTable(
  'activity_log',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    action: activityLogActionEnum('action').notNull(),
    entity: activityLogEntityEnum('entity').notNull(),
    entityId: uuid('entity_id').notNull(),
    entityTitle: varchar('entity_title', { length: 256 }).notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    index('activity_log_id_idx').using('btree', table.id),
    index('activity_log_created_at_idx').using('btree', table.createdAt),
  ],
)

export const socialLinks = createTable(
  'social_links',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    title: varchar('title', { length: 256 }).notNull(),
    url: text('url').notNull(),
    icon: socialIconEnum('icon').notNull(),
    order: integer('order').default(0).notNull(),
    clickCount: integer('click_count').default(0).notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).$onUpdate(() => new Date().toISOString()),
  },
  (table) => [index('social_links_id_idx').using('btree', table.id)],
)
