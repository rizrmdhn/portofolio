import z from "zod";

export const createTechStackSchema = z.object({
  name: z.string().max(256),
  list: z.array(z.string()).min(1),
});

export const updateTechStackSchema = createTechStackSchema.extend({
  id: z.string(),
});

export const reorderTechStacksSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1);

export type CreateTechStackInput = z.infer<typeof createTechStackSchema>;

export type UpdateTechStackInput = z.infer<typeof updateTechStackSchema>;

export type ReorderTechStacksInput = z.infer<typeof reorderTechStacksSchema>;
