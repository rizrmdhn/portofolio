import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  createAchievement,
  deleteAchievement,
  getAllAchievements,
  getAchievementById,
  getAchievementsForDashboard,
  reorderAchievements,
  updateAchievement,
} from '@portofolio/queries/achievement.queries'
import {
  createAchievementSchema,
  reorderAchievementsSchema,
  updateAchievementSchema,
} from '@portofolio/schema/achievement.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const achievementRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [records, err] = await tryCatchAsync(() => getAllAchievements())
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
    .query(async ({ input: { id } }) => {
      const [record, err] = await tryCatchAsync(() => getAchievementById(id))
      if (err) throw toTRPCError(err)
      return record
    }),

  create: protectedProcedure.input(createAchievementSchema).mutation(async ({ input }) => {
    const [record, err] = await tryCatchAsync(() => createAchievement(input))
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'achievement',
      entityId: record.id,
      entityTitle: record.title,
    })
    return record
  }),

  update: protectedProcedure.input(updateAchievementSchema).mutation(async ({ input }) => {
    const [record, err] = await tryCatchAsync(() => updateAchievement(input))
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'achievement',
      entityId: record.id,
      entityTitle: record.title,
    })
    return record
  }),

  reorder: protectedProcedure.input(reorderAchievementsSchema).mutation(async ({ input }) => {
    const [, err] = await tryCatchAsync(() => reorderAchievements(input))
    if (err) throw toTRPCError(err)
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [record, err] = await tryCatchAsync(() => deleteAchievement(id))
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
