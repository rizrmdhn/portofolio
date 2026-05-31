import { COLOR_VALUES, EXPERIENCE_STATUS_TYPES } from '@portofolio/constants'
import { createInsertSchema } from '@portofolio/db'
import { projects } from '@portofolio/db/schema/index'
import z from 'zod'
import { createPaginationSchema } from './pagination.schema'

export const createProjectSchema = createInsertSchema(projects, {
  title: z.string().max(256),
  description: z.string().max(5000),
  longDescription: z.string().max(10000).or(z.undefined()),
  tech: z.array(z.string()).min(1),
  githubUrl: z.url().or(z.undefined()),
  liveUrl: z.url().or(z.undefined()),
  playstoreUrl: z.url().or(z.undefined()),
  appstoreUrl: z.url().or(z.undefined()),
  coverColor: z.enum(COLOR_VALUES),
  status: z.enum(EXPERIENCE_STATUS_TYPES),
  isVisible: z.boolean(),
  order: z.number(),
})
  .omit({ id: true, slug: true, createdAt: true, updatedAt: true, featureAt: true })
  .extend({
    pictures: z
      .array(z.file().max(5 * 1024 * 1024)) // Max 5MB each
      .or(z.undefined()),
    featured: z.boolean(),
  })

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>

export const PROJECT_SORTABLE_FIELDS = [
  'title',
  'status',
  'order',
  'createdAt',
  'updatedAt',
] as const

export const getProjectsSchema = createPaginationSchema(PROJECT_SORTABLE_FIELDS, {
  id: 'order',
  desc: false,
}).extend({
  perPage: z.number().int().min(1).max(100).default(100),
  search: z.string().default(''),
})

export type GetProjectsInput = z.infer<typeof getProjectsSchema>

export const reorderProjectsSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1)

export type ReorderProjectsInput = z.infer<typeof reorderProjectsSchema>

export const addProjectImageSchema = z.object({
  projectId: z.string(),
  picture: z
    .file()
    .max(5 * 1024 * 1024), // Max 5MB
})

export type AddProjectImageInput = z.infer<typeof addProjectImageSchema>

export const reorderProjectImagesSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1)

export type ReorderProjectImagesInput = z.infer<typeof reorderProjectImagesSchema>
