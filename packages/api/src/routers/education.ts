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
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const educationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [records, err] = await tryCatchAsync(() => getAllEducation())
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
    .query(async ({ input: { id } }) => {
      const [record, err] = await tryCatchAsync(() => getEducationById(id))
      if (err) throw toTRPCError(err)
      return record
    }),

  create: protectedProcedure.input(createEducationSchema).mutation(async ({ input }) => {
    const [record, err] = await tryCatchAsync(() => createEducation(input))
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'education',
      entityId: record.id,
      entityTitle: record.institution,
    })
    return record
  }),

  update: protectedProcedure.input(updateEducationSchema).mutation(async ({ input }) => {
    const [record, err] = await tryCatchAsync(() => updateEducation(input))
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'education',
      entityId: record.id,
      entityTitle: record.institution,
    })
    return record
  }),

  reorder: protectedProcedure.input(reorderEducationSchema).mutation(async ({ input }) => {
    const [, err] = await tryCatchAsync(() => reorderEducation(input))
    if (err) throw toTRPCError(err)
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [record, err] = await tryCatchAsync(() => deleteEducation(id))
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
