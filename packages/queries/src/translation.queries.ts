/**
 * CRUD helpers for the per-entity content-translation sidecar tables.
 *
 * Upserts are portable across Postgres/MySQL by doing a select-then
 * insert/update (keyed by the unique `(<entity>Id, locale)` index) rather than a
 * dialect-specific `ON CONFLICT` / `ON DUPLICATE KEY` clause — admin authoring is
 * low-frequency, so the extra round-trip is fine. Reuses the dialect-aware
 * returning helpers.
 */
import { and, eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import {
  achievementTranslations,
  experienceTranslations,
  profileTranslations,
  projectTranslations,
} from '@portofolio/db/schema/index'
import type { Locale } from '@portofolio/i18n'
import { QueryError } from '@portofolio/errors'
import { insertReturning, updateReturning } from './utils/returning'

// ========== Projects ==========

export interface ProjectTranslationInput {
  projectId: string
  locale: Locale
  title: string
  description: string
  longDescription?: string | null | undefined
}

export async function getProjectTranslations(projectId: string) {
  return db
    .select()
    .from(projectTranslations)
    .where(eq(projectTranslations.projectId, projectId))
}

export async function upsertProjectTranslation(input: ProjectTranslationInput) {
  const { projectId, locale, ...fields } = input
  const [existing] = await db
    .select({ id: projectTranslations.id })
    .from(projectTranslations)
    .where(
      and(eq(projectTranslations.projectId, projectId), eq(projectTranslations.locale, locale)),
    )

  const row = existing
    ? await updateReturning(db, projectTranslations, fields, eq(projectTranslations.id, existing.id))
    : await insertReturning(db, projectTranslations, { projectId, locale, ...fields })

  if (!row) throw new QueryError('Failed to save project translation')
  return row
}

export async function deleteProjectTranslation(projectId: string, locale: Locale) {
  await db
    .delete(projectTranslations)
    .where(
      and(eq(projectTranslations.projectId, projectId), eq(projectTranslations.locale, locale)),
    )
}

// ========== Experiences ==========

export interface ExperienceTranslationInput {
  experienceId: string
  locale: Locale
  title: string
  description: string
}

export async function getExperienceTranslations(experienceId: string) {
  return db
    .select()
    .from(experienceTranslations)
    .where(eq(experienceTranslations.experienceId, experienceId))
}

export async function upsertExperienceTranslation(input: ExperienceTranslationInput) {
  const { experienceId, locale, ...fields } = input
  const [existing] = await db
    .select({ id: experienceTranslations.id })
    .from(experienceTranslations)
    .where(
      and(
        eq(experienceTranslations.experienceId, experienceId),
        eq(experienceTranslations.locale, locale),
      ),
    )

  const row = existing
    ? await updateReturning(
        db,
        experienceTranslations,
        fields,
        eq(experienceTranslations.id, existing.id),
      )
    : await insertReturning(db, experienceTranslations, { experienceId, locale, ...fields })

  if (!row) throw new QueryError('Failed to save experience translation')
  return row
}

export async function deleteExperienceTranslation(experienceId: string, locale: Locale) {
  await db
    .delete(experienceTranslations)
    .where(
      and(
        eq(experienceTranslations.experienceId, experienceId),
        eq(experienceTranslations.locale, locale),
      ),
    )
}

// ========== Profile ==========

export interface ProfileTranslationInput {
  profileId: string
  locale: Locale
  title: string
  bio: string
}

export async function getProfileTranslations(profileId: string) {
  return db
    .select()
    .from(profileTranslations)
    .where(eq(profileTranslations.profileId, profileId))
}

export async function upsertProfileTranslation(input: ProfileTranslationInput) {
  const { profileId, locale, ...fields } = input
  const [existing] = await db
    .select({ id: profileTranslations.id })
    .from(profileTranslations)
    .where(
      and(eq(profileTranslations.profileId, profileId), eq(profileTranslations.locale, locale)),
    )

  const row = existing
    ? await updateReturning(db, profileTranslations, fields, eq(profileTranslations.id, existing.id))
    : await insertReturning(db, profileTranslations, { profileId, locale, ...fields })

  if (!row) throw new QueryError('Failed to save profile translation')
  return row
}

export async function deleteProfileTranslation(profileId: string, locale: Locale) {
  await db
    .delete(profileTranslations)
    .where(
      and(eq(profileTranslations.profileId, profileId), eq(profileTranslations.locale, locale)),
    )
}

// ========== Achievements ==========

export interface AchievementTranslationInput {
  achievementId: string
  locale: Locale
  title: string
  description?: string | null | undefined
}

export async function getAchievementTranslations(achievementId: string) {
  return db
    .select()
    .from(achievementTranslations)
    .where(eq(achievementTranslations.achievementId, achievementId))
}

export async function upsertAchievementTranslation(input: AchievementTranslationInput) {
  const { achievementId, locale, ...fields } = input
  const [existing] = await db
    .select({ id: achievementTranslations.id })
    .from(achievementTranslations)
    .where(
      and(
        eq(achievementTranslations.achievementId, achievementId),
        eq(achievementTranslations.locale, locale),
      ),
    )

  const row = existing
    ? await updateReturning(
        db,
        achievementTranslations,
        fields,
        eq(achievementTranslations.id, existing.id),
      )
    : await insertReturning(db, achievementTranslations, { achievementId, locale, ...fields })

  if (!row) throw new QueryError('Failed to save achievement translation')
  return row
}

export async function deleteAchievementTranslation(achievementId: string, locale: Locale) {
  await db
    .delete(achievementTranslations)
    .where(
      and(
        eq(achievementTranslations.achievementId, achievementId),
        eq(achievementTranslations.locale, locale),
      ),
    )
}
