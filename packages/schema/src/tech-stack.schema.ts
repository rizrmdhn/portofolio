import z from "zod";

export const createTechStackSchema = z.object({
  name: z.string().max(256),
  list: z.array(z.string()).min(1),
});

export const updateTechStackSchema = createTechStackSchema.extend({
  name: z.optional(z.string().max(256)),
  list: z.optional(z.array(z.string()).min(1)),
});

export type CreateTechStackInput = z.infer<typeof createTechStackSchema>;

export type UpdateTechStackInput = z.infer<typeof updateTechStackSchema>;
