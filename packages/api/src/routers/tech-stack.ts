import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  createTechStackCategory,
  createTechStackCategoryWithItems,
  createTechStackItem,
  deleteTechStackCategory,
  deleteTechStackItem,
  getAllTechStackCategories,
  getTechStackCategoriesForDashboard,
  getTechStackCategoryById,
  reorderTechStackCategories,
  reorderTechStackItems,
  updateTechStackCategory,
  updateTechStackCategoryWithItems,
  updateTechStackItem,
} from '@portofolio/queries/tech-stack.queries'
import {
  createTechStackCategorySchema,
  createTechStackCategoryWithItemsSchema,
  createTechStackItemSchema,
  reorderTechStackCategoriesSchema,
  reorderTechStackItemsSchema,
  updateTechStackCategorySchema,
  updateTechStackCategoryWithItemsSchema,
  updateTechStackItemSchema,
} from '@portofolio/schema/tech-stack.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { z } from 'zod'
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.TECH_STACK_PREFIX

export const techStackRouter = createTRPCRouter({
  // ─── Categories ─────────────────────────────────────────────────────────────
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [categories, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.TECH_STACK_ALL, CACHE_TTL.SHORT, () => getAllTechStackCategories(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return categories
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [categories, err] = await tryCatchAsync(() =>
        getTechStackCategoriesForDashboard(search),
      )
      if (err) throw toTRPCError(err)
      return categories
    }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
    const [category, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getTechStackCategoryById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return category
  }),

  createCategory: protectedProcedure
    .input(createTechStackCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const [category, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createTechStackCategory(input)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'created',
        entity: 'techStackCategory',
        entityId: category.id,
        entityTitle: category.name,
      })
      return category
    }),

  createCategoryWithItems: protectedProcedure
    .input(createTechStackCategoryWithItemsSchema)
    .mutation(async ({ ctx, input }) => {
      const [category, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createTechStackCategoryWithItems(input)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'created',
        entity: 'techStackCategory',
        entityId: category.id,
        entityTitle: category.name,
      })
      return category
    }),

  updateCategory: protectedProcedure
    .input(updateTechStackCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const [category, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateTechStackCategory(input)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'updated',
        entity: 'techStackCategory',
        entityId: category.id,
        entityTitle: category.name,
      })
      return category
    }),

  updateCategoryWithItems: protectedProcedure
    .input(updateTechStackCategoryWithItemsSchema)
    .mutation(async ({ ctx, input }) => {
      const [category, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateTechStackCategoryWithItems(input)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'updated',
        entity: 'techStackCategory',
        entityId: category.id,
        entityTitle: category.name,
      })
      return category
    }),

  reorderCategories: protectedProcedure
    .input(reorderTechStackCategoriesSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderTechStackCategories(input)),
      )
      if (err) throw toTRPCError(err)
    }),

  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteTechStackCategory(id)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'deleted',
        entity: 'techStackCategory',
        entityId: result.id,
        entityTitle: result.name,
      })
      return result
    }),

  // ─── Items ───────────────────────────────────────────────────────────────────
  createItem: protectedProcedure.input(createTechStackItemSchema).mutation(async ({ ctx, input }) => {
    const [item, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createTechStackItem(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'created',
      entity: 'techStackItem',
      entityId: item.id,
      entityTitle: item.name,
    })
    return item
  }),

  updateItem: protectedProcedure.input(updateTechStackItemSchema).mutation(async ({ ctx, input }) => {
    const [item, err] = await tryCatchAsync(() =>
      ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateTechStackItem(input)),
    )
    if (err) throw toTRPCError(err)
    void createActivityLog({
      action: 'updated',
      entity: 'techStackItem',
      entityId: item.id,
      entityTitle: item.name,
    })
    return item
  }),

  reorderItems: protectedProcedure
    .input(reorderTechStackItemsSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderTechStackItems(input)),
      )
      if (err) throw toTRPCError(err)
    }),

  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteTechStackItem(id)),
      )
      if (err) throw toTRPCError(err)
      void createActivityLog({
        action: 'deleted',
        entity: 'techStackItem',
        entityId: result.id,
        entityTitle: result.name,
      })
      return result
    }),
})
