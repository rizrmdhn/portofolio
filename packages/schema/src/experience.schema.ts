import { EXPERIENCE_STATUS_TYPES, EXPERIENCE_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { experiences } from '@portofolio/db/schema/index'
import z from 'zod'

export const experienceAchievementsSchema = z.array(z.string().trim().min(1).max(1000)).max(50)

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
  achievements: experienceAchievementsSchema.optional(),
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

// Independent schema: drizzle's nullable column wrapper must not make an omitted endDate required.
export const addExperiencePositionSchema = z.object({
  sourceId: z.uuid(),
  stint: z.enum(['same', 'new']).default('same'),
  position: z
    .object({
      title: z.string().trim().min(1).max(256),
      description: z.string().trim().min(1).max(5000),
      location: z.string().trim().max(256),
      type: z.enum(EXPERIENCE_TYPES),
      startDate: z.iso.datetime(),
      endDate: z.iso.datetime().optional(),
      currentlyWorking: z.boolean(),
      skills: z.array(z.string().trim().min(1).max(256)).max(100),
      achievements: experienceAchievementsSchema,
      status: z.enum(EXPERIENCE_STATUS_TYPES).default('draft'),
    })
    .superRefine((value, ctx) => {
      if (value.currentlyWorking && value.endDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'A current position cannot have an end date.',
        })
      }
      if (!value.currentlyWorking && !value.endDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'Enter an end date or mark this position as current.',
        })
      }
      if (value.endDate && value.endDate < value.startDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'End date must be on or after start date.',
        })
      }
    }),
})
export type AddExperiencePositionInput = z.infer<typeof addExperiencePositionSchema>
