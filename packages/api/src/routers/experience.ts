import {
  addExperiencePosition,
  createExperience,
  createExperienceGroup,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  getExperienceGroups,
  getExperiencesForDashboard,
  updateExperience,
} from '@portofolio/queries/experience.queries'
import {
  addExperiencePositionSchema,
  createExperienceGroupSchema,
  createExperienceSchema,
  experienceAchievementsSchema,
  updateExperienceSchema,
} from '@portofolio/schema/experience.schema'
import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  deleteExperienceTranslation,
  getExperienceTranslations,
  upsertExperienceTranslation,
} from '@portofolio/queries/translation.queries'
import { localeInputSchema, translationLocaleSchema } from '@portofolio/schema/locale.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { z } from 'zod'
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.EXPERIENCE_PREFIX

export const experienceRouter = createTRPCRouter({
  addPosition: protectedProcedure
    .input(addExperiencePositionSchema)
    .mutation(async ({ ctx, input }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => addExperiencePosition(input)),
      )
      if (err) throw toTRPCError(err)
      return result
    }),

  getGroups: protectedProcedure.query(async () => {
    const [groups, err] = await tryCatchAsync(() => getExperienceGroups())
    if (err) throw toTRPCError(err)
    return groups
  }),

  createGroup: protectedProcedure.input(createExperienceGroupSchema).mutation(async ({ input }) => {
    const [group, err] = await tryCatchAsync(() => createExperienceGroup(input))
    if (err) throw toTRPCError(err)
    return group
  }),

  getAll: publicProcedure.input(localeInputSchema.optional()).query(async ({ ctx, input }) => {
    const locale = input?.locale ?? ctx.locale
    const [experiences, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(
        `${CACHE_KEYS.EXPERIENCE_ALL}:${locale}`,
        CACHE_TTL.SHORT,
        () => getAllExperiences(locale),
        () => ctx.headers.set('X-Data-Source', 'cache'),
      ),
    )
    if (err) throw toTRPCError(err)
    return experiences
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [experiences, err] = await tryCatchAsync(() => getExperiencesForDashboard(search))
      if (err) throw toTRPCError(err)
      return experiences
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [experience, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(
          `${CACHE_PREFIX}${id}`,
          CACHE_TTL.SHORT,
          () => getExperienceById(id),
          () => ctx.headers.set('X-Data-Source', 'cache'),
        ),
      )
      if (err) throw toTRPCError(err)
      return experience
    }),

  create: protectedProcedure.input(createExperienceSchema).mutation(async ({ ctx, input }) => {
    const [experience, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createExperience(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'experience',
      entityId: experience.id,
      entityTitle: experience.title,
    })
    return experience
  }),

  update: protectedProcedure.input(updateExperienceSchema).mutation(async ({ ctx, input }) => {
    const [experience, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateExperience(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'experience',
      entityId: experience.id,
      entityTitle: experience.title,
    })
    return experience
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [success, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteExperience(id)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'deleted',
        entity: 'experience',
        entityId: success.id,
        entityTitle: success.title,
      })
      return success
    }),

  // ========== Content translations (dashboard authoring) ==========

  getTranslations: protectedProcedure
    .input(z.object({ experienceId: z.string() }))
    .query(async ({ input: { experienceId } }) => {
      const [rows, err] = await tryCatchAsync(() => getExperienceTranslations(experienceId))
      if (err) throw toTRPCError(err)
      return rows
    }),

  upsertTranslation: protectedProcedure
    .input(
      z.object({
        experienceId: z.string(),
        locale: translationLocaleSchema,
        title: z.string().min(1),
        description: z.string().min(1),
        achievements: experienceAchievementsSchema.nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [row, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => upsertExperienceTranslation(input)),
      )
      if (err) throw toTRPCError(err)
      return row
    }),

  deleteTranslation: protectedProcedure
    .input(z.object({ experienceId: z.string(), locale: translationLocaleSchema }))
    .mutation(async ({ ctx, input: { experienceId, locale } }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () =>
          deleteExperienceTranslation(experienceId, locale),
        ),
      )
      if (err) throw toTRPCError(err)
      return true
    }),
})
