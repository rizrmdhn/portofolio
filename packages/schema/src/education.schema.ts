import { DEGREE_TYPES, EXPERIENCE_STATUS_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { education } from '@portofolio/db/schema/index'
import z from 'zod'

export const createEducationSchema = createInsertSchema(education, {
  institution: z.string().min(2).max(256),
  degreeLevel: z.enum(DEGREE_TYPES),
  major: z.string().min(2).max(256),
  gpa: z.string().max(64).or(z.undefined()),
  startYear: z.iso.datetime(),
  endYear: z.iso.datetime().or(z.undefined()),
  status: z.enum(EXPERIENCE_STATUS_TYPES),
  order: z.number().int().min(0),
}).omit({ id: true, createdAt: true, updatedAt: true })

export const updateEducationSchema = createEducationSchema.extend({
  id: z.string(),
})

export const reorderEducationSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1)

export type CreateEducationInput = z.infer<typeof createEducationSchema>
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>
export type ReorderEducationInput = z.infer<typeof reorderEducationSchema>
