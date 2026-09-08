import { CACHE_KEYS, CACHE_TTL, REFERRAL_SOURCES } from '@portofolio/constants'
import { recordReferralVisit } from '@portofolio/queries/referral-visits.queries'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const referralRouter = createTRPCRouter({
  // De-duplicated per source per client IP per day, same as project view tracking.
  trackVisit: publicProcedure
    .input(z.object({ referral: z.enum(REFERRAL_SOURCES) }))
    .mutation(async ({ ctx, input: { referral } }) => {
      const dedupKey = `${CACHE_KEYS.REFERRAL_VISIT_DEDUP_PREFIX}${referral}:${ctx.clientIp}`
      const alreadyVisited = await ctx.cache.get<true>(dedupKey)
      if (alreadyVisited) return

      const [, err] = await tryCatchAsync(() => recordReferralVisit(referral))
      if (err) throw toTRPCError(err)

      void ctx.cache.set(dedupKey, true, CACHE_TTL.DAY)
    }),
})
