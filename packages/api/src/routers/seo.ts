import { getSeoSettings, setSeoSettings } from '@portofolio/queries/seo.queries'
import { seoPageSchema, seoSettingsSchema } from '@portofolio/schema/seo.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import z from 'zod'
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.SEO_PREFIX

export const seoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [settings, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.SEO_ALL, CACHE_TTL.SHORT, () => getSeoSettings(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return settings
  }),

  getPage: publicProcedure.input(z.object({ page: seoPageSchema })).query(async ({ ctx, input }) => {
    const [settings, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(`${CACHE_KEYS.SEO_PAGE_PREFIX}${input.page}`, CACHE_TTL.SHORT, () => getSeoSettings(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return settings.pages[input.page]
  }),

  save: protectedProcedure.input(seoSettingsSchema).mutation(async ({ ctx, input }) => {
    const [result, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => setSeoSettings(input)),
    )
    if (err) throw toTRPCError(err)
    return result
  }),
})
