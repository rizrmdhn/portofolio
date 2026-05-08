import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  getExperiencesForDashboard,
  updateExperience,
} from "@portofolio/queries/experience.queries";
import {
  createExperienceSchema,
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

      return experience;
    }),

  update: protectedProcedure
    .input(updateExperienceSchema)
    .mutation(async ({ input }) => {
      const [experience, err] = await tryCatchAsync(() =>
        updateExperience(input),
      );

      if (err) throw toTRPCError(err);

      return experience;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [success, err] = await tryCatchAsync(() => deleteExperience(id));

      if (err) throw toTRPCError(err);

      return success;
    }),
});
