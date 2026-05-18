import { createActivityLog } from "@portofolio/queries/activity-log.queries";
import {
  createSocialLink,
  deleteSocialLink,
  getAllSocialLinks,
  getSocialLinkById,
  getSocialLinkClickThroughForDashboard,
  getSocialLinksForDashboard,
  incrementClickCount,
  reorderSocialLinks,
  updateSocialLink,
} from "@portofolio/queries/social-link.queries";
import {
  createSocialLinkSchema,
  reorderSocialLinksSchema,
  updateSocialLinkSchema,
} from "@portofolio/schema/social-link.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { z } from "zod";
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

const CACHE_PREFIX = CACHE_KEYS.SOCIAL_LINK_PREFIX

export const socialLinkRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [socialLinks, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.SOCIAL_LINK_ALL, CACHE_TTL.SHORT, () => getAllSocialLinks(), () => ctx.headers.set('X-Data-Source', 'cache')),
    );
    if (err) throw toTRPCError(err);
    return socialLinks;
  }),

  getSocialLinkClickThroughForDashboard: protectedProcedure.query(async () => {
    const [socialLinks, err] = await tryCatchAsync(() =>
      getSocialLinkClickThroughForDashboard(),
    );
    if (err) throw toTRPCError(err);
    return socialLinks;
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [socialLinks, err] = await tryCatchAsync(() =>
        getSocialLinksForDashboard(search),
      );
      if (err) throw toTRPCError(err);
      return socialLinks;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getSocialLinkById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
      );
      if (err) throw toTRPCError(err);
      return socialLink;
    }),

  create: protectedProcedure
    .input(createSocialLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createSocialLink(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "created", entity: "socialLink", entityId: socialLink.id, entityTitle: socialLink.title });
      return socialLink;
    }),

  // High-frequency counter — skip cache invalidation to avoid thrashing
  incrementClickCount: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [, err] = await tryCatchAsync(() => incrementClickCount(id));
      if (err) throw toTRPCError(err);
    }),

  update: protectedProcedure
    .input(updateSocialLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateSocialLink(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "updated", entity: "socialLink", entityId: socialLink.id, entityTitle: socialLink.title });
      return socialLink;
    }),

  reorder: protectedProcedure
    .input(reorderSocialLinksSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderSocialLinks(input)),
      );
      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteSocialLink(id)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "deleted", entity: "socialLink", entityId: result.id, entityTitle: result.title });
      return result;
    }),
});
