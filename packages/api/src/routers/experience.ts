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
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [experiences, err] = await tryCatchAsync(() => getAllExperiences());

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
    .query(async ({ input: { id } }) => {
      const [experience, err] = await tryCatchAsync(() =>
        getExperienceById(id),
      );

      if (err) throw toTRPCError(err);

      return experience;
    }),

  create: protectedProcedure
    .input(createExperienceSchema)
    .mutation(async ({ input }) => {
      const [experience, err] = await tryCatchAsync(() =>
        createExperience(input),
      );

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "created", entity: "experience", entityId: experience.id, entityTitle: experience.title });

      return experience;
    }),

  update: protectedProcedure
    .input(updateExperienceSchema)
    .mutation(async ({ input }) => {
      const [experience, err] = await tryCatchAsync(() =>
        updateExperience(input),
      );

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "updated", entity: "experience", entityId: experience.id, entityTitle: experience.title });

      return experience;
    }),

  reorder: protectedProcedure
    .input(reorderExperiencesSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() => reorderExperiences(input));

      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [success, err] = await tryCatchAsync(() => deleteExperience(id));

      if (err) throw toTRPCError(err);

      void createActivityLog({ action: "deleted", entity: "experience", entityId: success.id, entityTitle: success.title });

      return success;
    }),
});
