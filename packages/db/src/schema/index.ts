// Dialect-neutral schema. Each table is declared once using the logical column
// helpers in ../dialect/columns; the active dialect (Postgres by default, or
// MySQL when DATABASE_PROVIDER=mysql) is resolved at module load.
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  ACTIVITY_LOG_ACTIONS,
  ACTIVITY_LOG_ENTITIES,
  AVAILABILITY_STATUS_TYPES,
  COLOR_VALUES,
  DEGREE_TYPES,
  EXPERIENCE_STATUS_TYPES,
  EXPERIENCE_TYPES,
  SOCIAL_ICON_NAMES,
  STATUS_TYPES,
} from '@portofolio/constants'
import { sql } from 'drizzle-orm'
import { pgEnum } from 'drizzle-orm/pg-core'

import {
  authTs,
  boolCol,
  createTable,
  dateCol,
  enumCol,
  idx,
  indexableText,
  intCol,
  jsonCol,
  longText,
  str,
  stringArray,
  tsTz,
  uuidPk,
  uuidRef,
} from '../dialect/columns'

// Enum types are declared as Postgres `pgEnum`s (the canonical source for
// drizzle-kit and value-union inference). On MySQL these objects are unused and
// `enumCol` inlines an equivalent `enum(...)` from the same values.
export const availabilityStatusEnum = pgEnum('availability_status_enum', AVAILABILITY_STATUS_TYPES)
export const experienceEnum = pgEnum('experience_type', EXPERIENCE_TYPES)
export const colorEnum = pgEnum('color_enum', COLOR_VALUES)
export const projectStatusEnum = pgEnum('project_status_enum', STATUS_TYPES)
export const experienceStatusEnum = pgEnum('experience_status_enum', EXPERIENCE_STATUS_TYPES)
export const socialIconEnum = pgEnum('social_icon_enum', SOCIAL_ICON_NAMES)
export const degreeEnum = pgEnum('degree_enum', DEGREE_TYPES)
export const activityLogActionEnum = pgEnum('activity_log_action_enum', ACTIVITY_LOG_ACTIONS)
export const activityLogEntityEnum = pgEnum('activity_log_entity_enum', ACTIVITY_LOG_ENTITIES)

// ========== Better Auth tables ==========

export const user = createTable('user', {
  id: indexableText('id').primaryKey(),
  name: longText('name').notNull(),
  email: indexableText('email').notNull().unique(),
  emailVerified: boolCol('email_verified').notNull(),
  image: longText('image'),
  createdAt: authTs('created_at').notNull(),
  updatedAt: authTs('updated_at').notNull(),
})

export const session = createTable(
  'session',
  {
    id: indexableText('id').primaryKey(),
    userId: indexableText('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    token: indexableText('token').notNull().unique(),
    expiresAt: authTs('expires_at').notNull(),
    ipAddress: longText('ip_address'),
    userAgent: longText('user_agent'),
    createdAt: authTs('created_at').notNull(),
    updatedAt: authTs('updated_at').notNull(),
  },
  (table) => [idx('session_user_id_idx', table.userId)],
)

export const account = createTable(
  'account',
  {
    id: indexableText('id').primaryKey(),
    userId: indexableText('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accountId: longText('account_id').notNull(),
    providerId: longText('provider_id').notNull(),
    accessToken: longText('access_token'),
    refreshToken: longText('refresh_token'),
    idToken: longText('id_token'),
    accessTokenExpiresAt: authTs('access_token_expires_at'),
    refreshTokenExpiresAt: authTs('refresh_token_expires_at'),
    scope: longText('scope'),
    password: longText('password'),
    createdAt: authTs('created_at').notNull(),
    updatedAt: authTs('updated_at').notNull(),
  },
  (table) => [idx('account_user_id_idx', table.userId)],
)

export const verification = createTable('verification', {
  id: indexableText('id').primaryKey(),
  identifier: longText('identifier').notNull(),
  value: longText('value').notNull(),
  expiresAt: authTs('expires_at').notNull(),
  createdAt: authTs('created_at'),
  updatedAt: authTs('updated_at'),
})

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const projects = createTable(
  'projects',
  {
    id: uuidPk(),

    // ========== Content fields ==========
    title: str('title', 256).notNull(),
    slug: str('slug', 256).notNull().unique(),
    description: longText('description').notNull(),
    longDescription: longText('long_description'),
    tech: stringArray('tech').notNull(),

    // ========== Links ==========
    githubUrl: longText('github_url'),
    liveUrl: longText('live_url'),
    playstoreUrl: longText('playstore_url'),
    appstoreUrl: longText('appstore_url'),

    // ========== Media ==========
    imageUrl: longText('image_url'),
    coverColor: enumCol(colorEnum, 'cover_color').notNull().default('#ef4444'),

    // ========== Settings ==========
    status: enumCol(projectStatusEnum, 'status').notNull().default('draft'),
    isVisible: boolCol('is_visible').notNull().default(false),
    featuredAtResume: boolCol('featured_at_resume').notNull().default(false),
    order: intCol('order').default(0).notNull(),

    // ========== Metadata ==========
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
    featureAt: tsTz('feature_at'),
  },
  (table) => [idx('projects_id_idx', table.id)],
)

export const projectImages = createTable(
  'project_images',
  {
    id: uuidPk(),
    projectId: uuidRef('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    imageUrl: longText('image_url').notNull(),
    isCover: boolCol('is_cover').notNull().default(false),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    idx('project_images_id_idx', table.id),
    idx('project_images_project_id_idx', table.projectId),
  ],
)

export const experiences = createTable(
  'experiences',
  {
    id: uuidPk(),

    // ========== Details ==========
    title: str('title', 256).notNull(),
    description: longText('description').notNull(),
    company: str('company', 256).notNull(),
    location: str('location', 256).notNull(),
    type: enumCol(experienceEnum, 'type').notNull(),
    startDate: dateCol('start_date').notNull(),
    endDate: dateCol('end_date'),
    currentlyWorking: boolCol('currently_working').default(false).notNull(),
    skills: stringArray('skills').notNull(),

    // ========== Settings ==========
    status: enumCol(experienceStatusEnum, 'status').notNull().default('draft'),
    order: intCol('order').default(0).notNull(),

    // ========== Metadata ==========
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('experiences_id_idx', table.id)],
)

export const certifications = createTable(
  'certifications',
  {
    id: uuidPk(),
    title: str('title', 256).notNull(),
    issuer: str('issuer', 256).notNull(),
    featuredAtResume: boolCol('featured_at_resume').notNull().default(false),
    certificateUrl: longText('certificate_url'),
    certificateId: str('certificate_id', 256),
    issueYear: tsTz('issue_year').notNull(),
    expiryYear: tsTz('expiry_year'),
    status: enumCol(experienceStatusEnum, 'status').notNull().default('draft'),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('certifications_id_idx', table.id)],
)

export const education = createTable(
  'education',
  {
    id: uuidPk(),
    institution: str('institution', 256).notNull(),
    degreeLevel: enumCol(degreeEnum, 'degree_level').notNull(),
    major: str('major', 256).notNull(),
    gpa: str('gpa', 64),
    startYear: tsTz('start_year').notNull(),
    endYear: tsTz('end_year'),
    status: enumCol(experienceStatusEnum, 'status').notNull().default('draft'),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('education_id_idx', table.id)],
)

export const achievements = createTable(
  'achievements',
  {
    id: uuidPk(),
    title: str('title', 256).notNull(),
    issuer: str('issuer', 256).notNull(),
    description: longText('description'),
    date: tsTz('date').notNull(),
    status: enumCol(experienceStatusEnum, 'status').notNull().default('draft'),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('achievements_id_idx', table.id)],
)

export const profile = createTable(
  'profile',
  {
    id: uuidPk(),
    name: str('name', 256).notNull(),
    title: str('title', 256).notNull(),
    bio: longText('bio').notNull(),
    email: longText('email').notNull(),
    location: str('location', 256),
    availabilityStatus: enumCol(availabilityStatusEnum, 'availability_status')
      .notNull()
      .default('unavailable'),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('profile_id_idx', table.id)],
)

export const applicationSettings = createTable(
  'application_settings',
  {
    id: uuidPk(),
    key: str('key', 256).notNull().unique(),
    data: jsonCol('data').notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    idx('application_settings_id_idx', table.id),
    idx('application_settings_key_idx', table.key),
  ],
)

export const techStackCategories = createTable(
  'tech_stack_categories',
  {
    id: uuidPk(),
    name: str('name', 256).notNull(),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('tech_stack_categories_id_idx', table.id)],
)

export const techStackItems = createTable(
  'tech_stack_items',
  {
    id: uuidPk(),
    categoryId: uuidRef('category_id')
      .notNull()
      .references(() => techStackCategories.id, { onDelete: 'cascade' }),
    name: str('name', 256).notNull(),
    proficiency: intCol('proficiency').default(1).notNull(),
    order: intCol('order').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    idx('tech_stack_items_id_idx', table.id),
    idx('tech_stack_items_category_id_idx', table.categoryId),
  ],
)

export const viewEvents = createTable(
  'view_events',
  {
    id: uuidPk(),
    projectId: uuidRef('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    viewedAt: tsTz('viewed_at')
      .$default(() => new Date().toISOString())
      .notNull(),
    // Parsed from the request User-Agent at write time (see project-views.queries).
    // 'mobile' | 'tablet' | 'desktop', browser/os names, or null when UA is absent.
    deviceType: indexableText('device_type'),
    browser: longText('browser'),
    os: longText('os'),
  },
  (table) => [
    idx('view_events_project_id_idx', table.projectId),
    idx('view_events_viewed_at_idx', table.viewedAt),
    idx('view_events_device_type_idx', table.deviceType),
  ],
)

export const activityLog = createTable(
  'activity_log',
  {
    id: uuidPk(),
    action: enumCol(activityLogActionEnum, 'action').notNull(),
    entity: enumCol(activityLogEntityEnum, 'entity').notNull(),
    entityId: uuidRef('entity_id').notNull(),
    entityTitle: str('entity_title', 256).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    idx('activity_log_id_idx', table.id),
    idx('activity_log_created_at_idx', table.createdAt),
  ],
)

export const socialLinks = createTable(
  'social_links',
  {
    id: uuidPk(),
    title: str('title', 256).notNull(),
    url: longText('url').notNull(),
    icon: enumCol(socialIconEnum, 'icon').notNull(),
    order: intCol('order').default(0).notNull(),
    clickCount: intCol('click_count').default(0).notNull(),
    createdAt: tsTz('created_at')
      .$default(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: tsTz('updated_at').$onUpdate(() => new Date().toISOString()),
  },
  (table) => [idx('social_links_id_idx', table.id)],
)
