import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import { incrementViews } from '@portofolio/queries/project-views.queries'
import {
  createProject,
  deleteProject,
  getAllProjects,
  getAllTimeViewsProjects,
  getPaginatedProjects,
  getProjectById,
  getProjectBySlug,
  getProjectsForLandingPage,
  reorderProjects,
  updateProject,
  updateProjectImageUrl,
} from '@portofolio/queries/project.queries'
import {
  createProjectSchema,
  getProjectsSchema,
  reorderProjectsSchema,
  updateProjectSchema,
} from '@portofolio/schema/project.schema'
import utapi from '@portofolio/uploadthing'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
  createTRPCRouter,
  formDataInput,
  formDataProcedure,
  protectedProcedure,
  publicProcedure,
} from '..'
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.PROJECT_PREFIX

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [projects, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.PROJECT_ALL, CACHE_TTL.SHORT, () => getAllProjects(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return projects
  }),

  getAllTimeViewsProjects: protectedProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() => getAllTimeViewsProjects())
    if (err) throw toTRPCError(err)
    return projects
  }),

  getForLandingPage: publicProcedure.query(async ({ ctx }) => {
    const [projects, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.PROJECT_LANDING, CACHE_TTL.SHORT, () => getProjectsForLandingPage(), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return projects
  }),

  getPaginatedProjects: protectedProcedure.input(getProjectsSchema).query(async ({ input }) => {
    const [projects, err] = await tryCatchAsync(() => getPaginatedProjects(input))
    if (err) throw toTRPCError(err)
    return projects
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
    const [project, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getProjectById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
    )
    if (err) throw toTRPCError(err)
    return project
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input: { slug } }) => {
      const [project, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_KEYS.PROJECT_SLUG_PREFIX}${slug}`, CACHE_TTL.SHORT, () => getProjectBySlug(slug), () => ctx.headers.set('X-Data-Source', 'cache')),
      )
      if (err) throw toTRPCError(err)
      return project
    }),

  create: protectedProcedure
    .input(formDataInput)
    .use(formDataProcedure(createProjectSchema))
    .mutation(async ({ ctx }) => {
      const { picture, ...projectData } = ctx.input

      const [project, createErr] = await tryCatchAsync(() => createProject(projectData))
      if (createErr) throw toTRPCError(createErr)

      if (picture) {
        const [upload, uploadErr] = await tryCatchAsync(() => utapi.uploadFiles(picture))
        if (uploadErr) throw toTRPCError(uploadErr)

        if (!upload.data)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: upload.error.message,
          })

        const [_, imageErr] = await tryCatchAsync(() =>
          updateProjectImageUrl(project.id, upload.data.ufsUrl),
        )
        if (imageErr) throw toTRPCError(imageErr)
      }

      void createActivityLog({
        action: 'created',
        entity: 'project',
        entityId: project.id,
        entityTitle: project.title,
      })
      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return project
    }),

  updateView: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input: { projectId } }) => {
      const [views, err] = await tryCatchAsync(() => incrementViews(projectId))
      if (err) throw toTRPCError(err)
      void ctx.cache.delete(`${CACHE_PREFIX}${projectId}`)
      return views
    }),

  update: protectedProcedure
    .input(formDataInput)
    .use(formDataProcedure(updateProjectSchema))
    .mutation(async ({ ctx }) => {
      const { picture, ...projectData } = ctx.input

      const [project, err] = await tryCatchAsync(() => updateProject(projectData))
      if (err) throw toTRPCError(err)

      if (picture) {
        if (project.imageUrl) {
          const fileKey = project.imageUrl.split('/').pop()
          if (fileKey) await utapi.deleteFiles(fileKey)
        }

        const [upload, uploadErr] = await tryCatchAsync(() => utapi.uploadFiles(picture))
        if (uploadErr) throw toTRPCError(uploadErr)

        if (!upload.data)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: upload.error.message,
          })

        const [_, imageErr] = await tryCatchAsync(() =>
          updateProjectImageUrl(project.id, upload.data.ufsUrl),
        )
        if (imageErr) throw toTRPCError(imageErr)
      }

      void createActivityLog({
        action: 'updated',
        entity: 'project',
        entityId: project.id,
        entityTitle: project.title,
      })
      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return project
    }),

  reorder: protectedProcedure.input(reorderProjectsSchema).mutation(async ({ ctx, input }) => {
    const [, err] = await tryCatchAsync(() => reorderProjects(input))
    if (err) throw toTRPCError(err)
    void ctx.cache.deleteByPrefix(CACHE_PREFIX)
    return true
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [result, err] = await tryCatchAsync(() => deleteProject(id))
      if (err) throw toTRPCError(err)

      if (result.imageUrl) {
        const imageFiles = result.imageUrl.split('/').pop()

        if (!imageFiles)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to parse image file name',
          })

        await utapi.deleteFiles(imageFiles)
      }

      void createActivityLog({
        action: 'deleted',
        entity: 'project',
        entityId: result.id,
        entityTitle: result.title,
      })
      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return result
    }),

  deleteImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [project, err] = await tryCatchAsync(() => getProjectById(id))

      if (!project) throw toTRPCError(err)

      if (!project.imageUrl)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project does not have an image',
        })

      const imageFiles = project.imageUrl.split('/').pop()

      if (!imageFiles)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to parse image file name',
        })

      await utapi.deleteFiles(imageFiles)

      const [_, updateErr] = await tryCatchAsync(() => updateProjectImageUrl(id, null))
      if (updateErr) throw toTRPCError(updateErr)

      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return true
    }),
})
