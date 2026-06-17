import { createActivityLog } from "@portofolio/queries/activity-log.queries";
import {
  getProfile,
  updateProfile,
} from "@portofolio/queries/profile.queries";
import {
  deleteProfileTranslation,
  getProfileTranslations,
  upsertProfileTranslation,
} from "@portofolio/queries/translation.queries";
import { updateProfileSchema } from "@portofolio/schema/profile.schema";
import { localeInputSchema, translationLocaleSchema } from "@portofolio/schema/locale.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

const CACHE_PREFIX = CACHE_KEYS.PROFILE_PREFIX

export const profileRouter = createTRPCRouter({
  get: publicProcedure.input(localeInputSchema.optional()).query(async ({ ctx, input }) => {
    const locale = input?.locale ?? ctx.locale
    const [result, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(`${CACHE_KEYS.PROFILE_DATA}:${locale}`, CACHE_TTL.SHORT, () => getProfile(locale), () => ctx.headers.set('X-Data-Source', 'cache')),
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

  // ========== Content translations (dashboard authoring) ==========

  getTranslations: protectedProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input: { profileId } }) => {
      const [rows, err] = await tryCatchAsync(() => getProfileTranslations(profileId));
      if (err) throw toTRPCError(err);
      return rows;
    }),

  upsertTranslation: protectedProcedure
    .input(
      z.object({
        profileId: z.string(),
        locale: translationLocaleSchema,
        title: z.string().min(1),
        bio: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [row, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => upsertProfileTranslation(input)),
      );
      if (err) throw toTRPCError(err);
      return row;
    }),

  deleteTranslation: protectedProcedure
    .input(z.object({ profileId: z.string(), locale: translationLocaleSchema }))
    .mutation(async ({ ctx, input: { profileId, locale } }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () =>
          deleteProfileTranslation(profileId, locale),
        ),
      );
      if (err) throw toTRPCError(err);
      return true;
    }),
});
