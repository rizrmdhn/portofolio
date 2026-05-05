import { EXPERIENCE_TYPES } from "@portofolio/constants";
import z from "zod";

export const createExperienceSchema = z.object({
  title: z.string().max(256),
  company: z.string().max(256),
  type: z.enum(EXPERIENCE_TYPES),
  description: z.string().max(5000),
  startDate: z.iso.date(),
  endDate: z.iso.date().optional(),
  currentlyWorking: z.boolean().default(false),
});

export const updateExperienceSchema = createExperienceSchema.extend({
  id: z.string(),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
