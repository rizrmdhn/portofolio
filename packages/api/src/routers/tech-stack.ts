import {
  createTechStack,
  deleteTechStack,
  getAllTechStacks,
  getTechStackById,
  getTechStacksForDashboard,
  reorderTechStacks,
  updateTechStack,
} from "@portofolio/queries/tech-stack.queries";
import {
  createTechStackSchema,
  reorderTechStacksSchema,
  updateTechStackSchema,
} from "@portofolio/schema/tech-stack.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const techStackRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [techStacks, err] = await tryCatchAsync(() => getAllTechStacks());

    if (err) throw toTRPCError(err);

    return techStacks;
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [techStacks, err] = await tryCatchAsync(() =>
        getTechStacksForDashboard(search),
      );

      if (err) throw toTRPCError(err);

      return techStacks;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const [techStack, err] = await tryCatchAsync(() => getTechStackById(id));

      if (err) throw toTRPCError(err);

      return techStack;
    }),

  create: protectedProcedure
    .input(createTechStackSchema)
    .mutation(async ({ input }) => {
      const [techStack, err] = await tryCatchAsync(() =>
        createTechStack(input),
      );

      if (err) throw toTRPCError(err);

      return techStack;
    }),

  update: protectedProcedure
    .input(updateTechStackSchema)
    .mutation(async ({ input }) => {
      const [techStack, err] = await tryCatchAsync(() =>
        updateTechStack(input),
      );

      if (err) throw toTRPCError(err);

      return techStack;
    }),

  reorder: protectedProcedure
    .input(reorderTechStacksSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() => reorderTechStacks(input));

      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() => deleteTechStack(id));

      if (err) throw toTRPCError(err);

      return result;
    }),
});
