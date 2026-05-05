import z from "zod";

export const createTechStackSchema = z.object({
  name: z.string().max(256),
  list: z.array(z.string()).min(1),
});

export const updateTechStackSchema = createTechStackSchema.extend({
  id: z.string(),
});

export type CreateTechStackInput = z.infer<typeof createTechStackSchema>;

export type UpdateTechStackInput = z.infer<typeof updateTechStackSchema>;
