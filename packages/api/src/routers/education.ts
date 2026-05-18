import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  createEducation,
  deleteEducation,
  getAllEducation,
  getEducationById,
  getEducationForDashboard,
  reorderEducation,
  updateEducation,
} from '@portofolio/queries/education.queries'
import {
  createEducationSchema,
  reorderEducationSchema,
  updateEducationSchema,
} from '@portofolio/schema/education.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import z from 'zod'
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.EDUCATION_PREFIX

export const educationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [records, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.EDUCATION_ALL, CACHE_TTL.SHORT, () => getAllEducation(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return records
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [records, err] = await tryCatchAsync(() => getEducationForDashboard(search))
      if (err) throw toTRPCError(err)
      return records
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [record, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getEducationById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
      )
      if (err) throw toTRPCError(err)
      return record
    }),

  create: protectedProcedure.input(createEducationSchema).mutation(async ({ ctx, input }) => {
    const [record, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createEducation(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'education',
      entityId: record.id,
      entityTitle: record.institution,
    })
    return record
  }),

  update: protectedProcedure.input(updateEducationSchema).mutation(async ({ ctx, input }) => {
    const [record, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateEducation(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'education',
      entityId: record.id,
      entityTitle: record.institution,
    })
    return record
  }),

  reorder: protectedProcedure.input(reorderEducationSchema).mutation(async ({ ctx, input }) => {
    const [, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderEducation(input)),
    )
    if (err) throw toTRPCError(err)
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [record, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteEducation(id)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'deleted',
        entity: 'education',
        entityId: record.id,
        entityTitle: record.institution,
      })
      return record
    }),
})
