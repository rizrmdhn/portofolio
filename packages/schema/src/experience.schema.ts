import { EXPERIENCE_STATUS_TYPES, EXPERIENCE_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { experiences } from '@portofolio/db/schema/index'
import z from 'zod'

export const createExperienceSchema = createInsertSchema(experiences, {
  groupId: z.uuid().nullable().optional(),
  title: z.string().max(256),
  description: z.string().max(5000),
  company: z.string().max(256),
  location: z.string().max(256),
  type: z.enum(EXPERIENCE_TYPES),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime().or(z.undefined()),
  currentlyWorking: z.boolean(),
  skills: z.string().array(),
  status: z.enum(EXPERIENCE_STATUS_TYPES),
  order: z.number(),
}).omit({ createdAt: true, updatedAt: true })

export const updateExperienceSchema = createExperienceSchema.extend({
  id: z.string(),
})

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>

// The company identity of a group is immutable. Create another group for a return stint.
export const createExperienceGroupSchema = z.object({
  company: z.string().trim().min(1).max(256),
  label: z.string().trim().min(1).max(256),
})
export type CreateExperienceGroupInput = z.infer<typeof createExperienceGroupSchema>
