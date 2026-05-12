import z from "zod";

// Category schemas
export const createTechStackCategorySchema = z.object({
  name: z.string().min(1).max(256),
});

export const updateTechStackCategorySchema =
  createTechStackCategorySchema.extend({
    id: z.string(),
  });

export const updateTechStackCategoryWithItemsSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(256),
  items: z
    .array(
      z.object({
        id: z.string().optional(), // omit for new items
        name: z.string().min(1).max(256),
        proficiency: z.number().int().min(1).max(5).default(1),
        order: z.number().int().min(0),
      }),
    )
    .default([]),
});

export type UpdateTechStackCategoryWithItemsInput = z.infer<
  typeof updateTechStackCategoryWithItemsSchema
>;

export const reorderTechStackCategoriesSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1);

export const createTechStackCategoryWithItemsSchema =
  createTechStackCategorySchema.extend({
    items: z.array(
      z.object({
        name: z.string().min(1).max(256),
        proficiency: z.number().int().min(1).max(5),
      }),
    ),
  });

export type CreateTechStackCategoryWithItemsInput = z.infer<
  typeof createTechStackCategoryWithItemsSchema
>;

// Item schemas
export const createTechStackItemSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(1).max(256),
  proficiency: z.number().int().min(1).max(5).default(1),
});

export const updateTechStackItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(256),
  proficiency: z.number().int().min(1).max(5),
});

export const reorderTechStackItemsSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1);

export type CreateTechStackCategoryInput = z.infer<
  typeof createTechStackCategorySchema
>;
export type UpdateTechStackCategoryInput = z.infer<
  typeof updateTechStackCategorySchema
>;
export type ReorderTechStackCategoriesInput = z.infer<
  typeof reorderTechStackCategoriesSchema
>;
export type CreateTechStackItemInput = z.infer<
  typeof createTechStackItemSchema
>;
export type UpdateTechStackItemInput = z.infer<
  typeof updateTechStackItemSchema
>;
export type ReorderTechStackItemsInput = z.infer<
  typeof reorderTechStackItemsSchema
>;
