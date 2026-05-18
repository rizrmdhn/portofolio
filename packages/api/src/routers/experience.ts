import { createActivityLog } from "@portofolio/queries/activity-log.queries";
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  getExperiencesForDashboard,
  reorderExperiences,
  updateExperience,
} from "@portofolio/queries/experience.queries";
import {
  createExperienceSchema,
  reorderExperiencesSchema,
  updateExperienceSchema,
} from "@portofolio/schema/experience.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { z } from "zod";
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

const CACHE_PREFIX = CACHE_KEYS.EXPERIENCE_PREFIX

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [experiences, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.EXPERIENCE_ALL, CACHE_TTL.SHORT, () => getAllExperiences(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err);
    return experiences;
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [experiences, err] = await tryCatchAsync(() =>
        getExperiencesForDashboard(search),
      );
      if (err) throw toTRPCError(err);
      return experiences;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [experience, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getExperienceById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
      );
      if (err) throw toTRPCError(err);
      return experience;
    }),

  create: protectedProcedure
    .input(createExperienceSchema)
    .mutation(async ({ ctx, input }) => {
      const [experience, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createExperience(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "created", entity: "experience", entityId: experience.id, entityTitle: experience.title });
      return experience;
    }),

  update: protectedProcedure
    .input(updateExperienceSchema)
    .mutation(async ({ ctx, input }) => {
      const [experience, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateExperience(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "updated", entity: "experience", entityId: experience.id, entityTitle: experience.title });
      return experience;
    }),

  reorder: protectedProcedure
    .input(reorderExperiencesSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderExperiences(input)),
      );
      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [success, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteExperience(id)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "deleted", entity: "experience", entityId: success.id, entityTitle: success.title });
      return success;
    }),
});
