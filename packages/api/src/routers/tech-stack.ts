import {
  createTechStackCategory,
  createTechStackCategoryWithItems,
  createTechStackItem,
  updateTechStackCategoryWithItems,
  deleteTechStackCategory,
  deleteTechStackItem,
  getAllTechStackCategories,
  getTechStackCategoriesForDashboard,
  getTechStackCategoryById,
  reorderTechStackCategories,
  reorderTechStackItems,
  updateTechStackCategory,
  updateTechStackItem,
} from "@portofolio/queries/tech-stack.queries";
import {
  createTechStackCategorySchema,
  createTechStackCategoryWithItemsSchema,
  createTechStackItemSchema,
  updateTechStackCategoryWithItemsSchema,
  reorderTechStackCategoriesSchema,
  reorderTechStackItemsSchema,
  updateTechStackCategorySchema,
  updateTechStackItemSchema,
} from "@portofolio/schema/tech-stack.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const techStackRouter = createTRPCRouter({
  // ─── Categories ─────────────────────────────────────────────────────────────
  getAll: publicProcedure.query(async () => {
    const [categories, err] = await tryCatchAsync(() =>
      getAllTechStackCategories(),
    );

    if (err) throw toTRPCError(err);

    return categories;
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [categories, err] = await tryCatchAsync(() =>
        getTechStackCategoriesForDashboard(search),
      );

      if (err) throw toTRPCError(err);

      return categories;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const [category, err] = await tryCatchAsync(() =>
        getTechStackCategoryById(id),
      );

      if (err) throw toTRPCError(err);

      return category;
    }),

  createCategory: protectedProcedure
    .input(createTechStackCategorySchema)
    .mutation(async ({ input }) => {
      const [category, err] = await tryCatchAsync(() =>
        createTechStackCategory(input),
      );

      if (err) throw toTRPCError(err);

      return category;
    }),

  createCategoryWithItems: protectedProcedure
    .input(createTechStackCategoryWithItemsSchema)
    .mutation(async ({ input }) => {
      const [category, err] = await tryCatchAsync(() =>
        createTechStackCategoryWithItems(input),
      );

      if (err) throw toTRPCError(err);

      return category;
    }),

  updateCategory: protectedProcedure
    .input(updateTechStackCategorySchema)
    .mutation(async ({ input }) => {
      const [category, err] = await tryCatchAsync(() =>
        updateTechStackCategory(input),
      );

      if (err) throw toTRPCError(err);

      return category;
    }),

  updateCategoryWithItems: protectedProcedure
    .input(updateTechStackCategoryWithItemsSchema)
    .mutation(async ({ input }) => {
      const [category, err] = await tryCatchAsync(() =>
        updateTechStackCategoryWithItems(input),
      );

      if (err) throw toTRPCError(err);

      return category;
    }),

  reorderCategories: protectedProcedure
    .input(reorderTechStackCategoriesSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() =>
        reorderTechStackCategories(input),
      );

      if (err) throw toTRPCError(err);
    }),

  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        deleteTechStackCategory(id),
      );

      if (err) throw toTRPCError(err);

      return result;
    }),

  // ─── Items ───────────────────────────────────────────────────────────────────
  createItem: protectedProcedure
    .input(createTechStackItemSchema)
    .mutation(async ({ input }) => {
      const [item, err] = await tryCatchAsync(() =>
        createTechStackItem(input),
      );

      if (err) throw toTRPCError(err);

      return item;
    }),

  updateItem: protectedProcedure
    .input(updateTechStackItemSchema)
    .mutation(async ({ input }) => {
      const [item, err] = await tryCatchAsync(() =>
        updateTechStackItem(input),
      );

      if (err) throw toTRPCError(err);

      return item;
    }),

  reorderItems: protectedProcedure
    .input(reorderTechStackItemsSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() => reorderTechStackItems(input));

      if (err) throw toTRPCError(err);
    }),

  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        deleteTechStackItem(id),
      );

      if (err) throw toTRPCError(err);

      return result;
    }),
});
