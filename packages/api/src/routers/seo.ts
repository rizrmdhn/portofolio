import { getSeoSettings, setSeoSettings } from '@portofolio/queries/seo.queries'
import { seoPageSchema, seoSettingsSchema } from '@portofolio/schema/seo.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const seoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [settings, err] = await tryCatchAsync(() => getSeoSettings())
    if (err) throw toTRPCError(err)
    return settings
  }),

  getPage: publicProcedure.input(z.object({ page: seoPageSchema })).query(async ({ input }) => {
    const [settings, err] = await tryCatchAsync(() => getSeoSettings())
    if (err) throw toTRPCError(err)
    return settings.pages[input.page]
  }),

  save: protectedProcedure.input(seoSettingsSchema).mutation(async ({ input }) => {
    const [result, err] = await tryCatchAsync(() => setSeoSettings(input))
    if (err) throw toTRPCError(err)
    return result
  }),
})
