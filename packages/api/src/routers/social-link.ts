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
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const socialLinkRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [socialLinks, err] = await tryCatchAsync(() => getAllSocialLinks());

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
    .query(async ({ input: { id } }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        getSocialLinkById(id),
      );

      if (err) throw toTRPCError(err);

      return socialLink;
    }),

  create: protectedProcedure
    .input(createSocialLinkSchema)
    .mutation(async ({ input }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        createSocialLink(input),
      );

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "created", entity: "socialLink", entityId: socialLink.id, entityTitle: socialLink.title });

      return socialLink;
    }),

  incrementClickCount: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [, err] = await tryCatchAsync(() => incrementClickCount(id));

      if (err) throw toTRPCError(err);
    }),

  update: protectedProcedure
    .input(updateSocialLinkSchema)
    .mutation(async ({ input }) => {
      const [socialLink, err] = await tryCatchAsync(() =>
        updateSocialLink(input),
      );

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "updated", entity: "socialLink", entityId: socialLink.id, entityTitle: socialLink.title });

      return socialLink;
    }),

  reorder: protectedProcedure
    .input(reorderSocialLinksSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() => reorderSocialLinks(input));

      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() => deleteSocialLink(id));

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "deleted", entity: "socialLink", entityId: result.id, entityTitle: result.title });

      return result;
    }),
});
