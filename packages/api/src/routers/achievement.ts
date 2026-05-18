import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import {
  createAchievement,
  deleteAchievement,
  getAchievementById,
  getAchievementsForDashboard,
  getAllAchievements,
  reorderAchievements,
  updateAchievement,
} from '@portofolio/queries/achievement.queries'
import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  createAchievementSchema,
  reorderAchievementsSchema,
  updateAchievementSchema,
} from '@portofolio/schema/achievement.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.ACHIEVEMENT_PREFIX

export const achievementRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [records, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(
        CACHE_KEYS.ACHIEVEMENT_ALL,
        CACHE_TTL.SHORT,
        () => getAllAchievements(),
        () => ctx.headers.set('X-Data-Source', 'cache'),
      ),
    )
    if (err) throw toTRPCError(err)
    return records
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [records, err] = await tryCatchAsync(() => getAchievementsForDashboard(search))
      if (err) throw toTRPCError(err)
      return records
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [record, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getAchievementById(id)),
      )
      if (err) throw toTRPCError(err)
      return record
    }),

  create: protectedProcedure.input(createAchievementSchema).mutation(async ({ ctx, input }) => {
    const [record, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createAchievement(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'achievement',
      entityId: record.id,
      entityTitle: record.title,
    })
    return record
  }),

  update: protectedProcedure.input(updateAchievementSchema).mutation(async ({ ctx, input }) => {
    const [record, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateAchievement(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'achievement',
      entityId: record.id,
      entityTitle: record.title,
    })
    return record
  }),

  reorder: protectedProcedure.input(reorderAchievementsSchema).mutation(async ({ ctx, input }) => {
    const [, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderAchievements(input)),
    )
    if (err) throw toTRPCError(err)
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [record, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteAchievement(id)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'deleted',
        entity: 'achievement',
        entityId: record.id,
        entityTitle: record.title,
      })
      return record
    }),
})
