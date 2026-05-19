import { createActivityLog } from "@portofolio/queries/activity-log.queries";
import {
  getProfile,
  updateProfile,
} from "@portofolio/queries/profile.queries";
import { updateProfileSchema } from "@portofolio/schema/profile.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

const CACHE_PREFIX = CACHE_KEYS.PROFILE_PREFIX

export const profileRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const [result, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.PROFILE_DATA, CACHE_TTL.SHORT, () => getProfile(), () => ctx.headers.set('X-Data-Source', 'cache')),
    );
    if (err) throw toTRPCError(err);
    return result;
  }),

  update: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateProfile(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "updated", entity: "profile", entityId: result.id, entityTitle: result.name });
      return result;
    }),
});
