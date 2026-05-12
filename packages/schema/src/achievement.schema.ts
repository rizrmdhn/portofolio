import { EXPERIENCE_STATUS_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { achievements } from '@portofolio/db/schema/index'
import z from 'zod'

export const createAchievementSchema = createInsertSchema(achievements, {
  title: z.string().min(2).max(256),
  issuer: z.string().min(2).max(256),
  description: z.string().or(z.undefined()),
  date: z.iso.datetime(),
  status: z.enum(EXPERIENCE_STATUS_TYPES),
  order: z.number().int().min(0),
}).omit({ id: true, createdAt: true, updatedAt: true })

export const updateAchievementSchema = createAchievementSchema.extend({
  id: z.string(),
})

export const reorderAchievementsSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1)

export type CreateAchievementInput = z.infer<typeof createAchievementSchema>
export type UpdateAchievementInput = z.infer<typeof updateAchievementSchema>
export type ReorderAchievementsInput = z.infer<typeof reorderAchievementsSchema>
