import { EXPERIENCE_STATUS_TYPES, EXPERIENCE_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { experiences } from '@portofolio/db/schema/index'
import z from 'zod'

export const createExperienceSchema = createInsertSchema(experiences, {
  title: z.string().max(256),
  description: z.string().max(5000),
  company: z.string().max(256),
  location: z.string().max(256),
  type: z.enum(EXPERIENCE_TYPES),
  startDate: z.iso.date(),
  endDate: z.iso.date().or(z.undefined()),
  currentlyWorking: z.boolean(),
  skills: z.string().array(),
  status: z.enum(EXPERIENCE_STATUS_TYPES),
  order: z.number(),
}).omit({ createdAt: true, updatedAt: true })

export const updateExperienceSchema = createExperienceSchema.extend({
  id: z.string(),
})

export const reorderExperiencesSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1)

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>
export type ReorderExperiencesInput = z.infer<typeof reorderExperiencesSchema>
