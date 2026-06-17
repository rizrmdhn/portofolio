import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createActivityLog } from '@portofolio/queries/activity-log.queries'
import {
  addProjectImage,
  getProjectImages,
  removeProjectImage,
  reorderProjectImages,
  setProjectCoverImage,
} from '@portofolio/queries/project-images.queries'
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
  deleteProjectTranslation,
  getProjectTranslations,
  upsertProjectTranslation,
} from '@portofolio/queries/translation.queries'
import { localeInputSchema, translationLocaleSchema } from '@portofolio/schema/locale.schema'
import {
  addProjectImageSchema,
  createProjectSchema,
  getProjectsSchema,
  reorderProjectImagesSchema,
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
import { processAndUploadImage } from '../utils/image-upload'
import { toTRPCError } from '../utils/to-trpc-error'

const CACHE_PREFIX = CACHE_KEYS.PROJECT_PREFIX

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.input(localeInputSchema.optional()).query(async ({ ctx, input }) => {
    const locale = input?.locale ?? ctx.locale
    const [projects, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(
        `${CACHE_KEYS.PROJECT_ALL}:${locale}`,
        CACHE_TTL.SHORT,
        () => getAllProjects(locale),
        () => ctx.headers.set('X-Data-Source', 'cache'),
      ),
    )
    if (err) throw toTRPCError(err)
    return projects
  }),

  getAllTimeViewsProjects: protectedProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() => getAllTimeViewsProjects())
    if (err) throw toTRPCError(err)
    return projects
  }),

  getForLandingPage: publicProcedure
    .input(localeInputSchema.optional())
    .query(async ({ ctx, input }) => {
      const locale = input?.locale ?? ctx.locale
      const [projects, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(
          `${CACHE_KEYS.PROJECT_LANDING}:${locale}`,
          CACHE_TTL.SHORT,
          () => getProjectsForLandingPage(locale),
          () => ctx.headers.set('X-Data-Source', 'cache'),
        ),
      )
      if (err) throw toTRPCError(err)
      return projects
    }),

  getPaginatedProjects: protectedProcedure.input(getProjectsSchema).query(async ({ input }) => {
    const [projects, err] = await tryCatchAsync(() => getPaginatedProjects(input))
    if (err) throw toTRPCError(err)
    return projects
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [project, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(
          `${CACHE_PREFIX}${id}`,
          CACHE_TTL.SHORT,
          () => getProjectById(id),
          () => ctx.headers.set('X-Data-Source', 'cache'),
        ),
      )
      if (err) throw toTRPCError(err)
      return project
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string(), locale: translationLocaleSchema.optional() }))
    .query(async ({ ctx, input: { slug, locale: inputLocale } }) => {
      const locale = inputLocale ?? ctx.locale
      const [project, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(
          `${CACHE_KEYS.PROJECT_SLUG_PREFIX}${slug}:${locale}`,
          CACHE_TTL.SHORT,
          () => getProjectBySlug(slug, locale),
          () => ctx.headers.set('X-Data-Source', 'cache'),
        ),
      )
      if (err) throw toTRPCError(err)
      return project
    }),

  create: protectedProcedure
    .input(formDataInput)
    .use(formDataProcedure(createProjectSchema))
    .mutation(async ({ ctx }) => {
      const { pictures, ...projectData } = ctx.input

      const [project, createErr] = await tryCatchAsync(() => createProject(projectData))
      if (createErr) throw toTRPCError(createErr)

      // Upload buffered images in order; the first becomes the cover (handled
      // by addProjectImage) and syncs projects.imageUrl.
      for (const picture of pictures ?? []) {
        const [upload, uploadErr] = await tryCatchAsync(() => processAndUploadImage(picture))
        if (uploadErr) throw toTRPCError(uploadErr)

        const [, imageErr] = await tryCatchAsync(() => addProjectImage(project.id, upload.url))
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
    .input(z.object({ projectId: z.string(), slug: z.string() }))
    .mutation(async ({ ctx, input: { projectId, slug } }) => {
      // De-duplicate views server-side: count at most one view per project per
      // client IP per day, so refreshes, remounts and repeat visits don't
      // inflate the counter. The cache key acts as a TTL marker.
      const dedupKey = `${CACHE_KEYS.PROJECT_VIEW_DEDUP_PREFIX}${projectId}:${ctx.clientIp}`
      const alreadyViewed = await ctx.cache.get<true>(dedupKey)
      if (alreadyViewed) return

      const [, err] = await tryCatchAsync(() =>
        incrementViews(projectId, ctx.userAgent),
      )
      if (err) throw toTRPCError(err)

      void ctx.cache.set(dedupKey, true, CACHE_TTL.DAY)
      // Clear every per-locale cache entry for this slug.
      void ctx.cache.deleteByPrefix(`${CACHE_KEYS.PROJECT_SLUG_PREFIX}${slug}`)
    }),

  update: protectedProcedure
    .input(formDataInput)
    .use(formDataProcedure(updateProjectSchema))
    .mutation(async ({ ctx }) => {
      // Images are managed separately via the project-image endpoints; the
      // update form only edits scalar project fields.
      const { pictures: _pictures, ...projectData } = ctx.input

      const [project, err] = await tryCatchAsync(() => updateProject(projectData))
      if (err) throw toTRPCError(err)

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
      // Collect every stored image (cover + gallery) so their files can be
      // removed from UploadThing before the rows are cascade-deleted.
      const [images] = await tryCatchAsync(() => getProjectImages(id))

      const [result, err] = await tryCatchAsync(() => deleteProject(id))
      if (err) throw toTRPCError(err)

      const fileKeys = new Set<string>()
      for (const image of images ?? []) {
        const key = image.imageUrl.split('/').pop()
        if (key) fileKeys.add(key)
      }
      if (result.imageUrl) {
        const key = result.imageUrl.split('/').pop()
        if (key) fileKeys.add(key)
      }
      if (fileKeys.size > 0) {
        await utapi.deleteFiles([...fileKeys])
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

  // ========== Project images (gallery + cover) ==========

  getImages: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input: { projectId } }) => {
      const [images, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(
          `${CACHE_KEYS.PROJECT_IMAGES_PREFIX}${projectId}`,
          CACHE_TTL.SHORT,
          () => getProjectImages(projectId),
          () => ctx.headers.set('X-Data-Source', 'cache'),
        ),
      )
      if (err) throw toTRPCError(err)
      return images
    }),

  addImage: protectedProcedure
    .input(formDataInput)
    .use(formDataProcedure(addProjectImageSchema))
    .mutation(async ({ ctx }) => {
      const { projectId, picture } = ctx.input

      const [upload, uploadErr] = await tryCatchAsync(() => processAndUploadImage(picture))
      if (uploadErr) throw toTRPCError(uploadErr)

      const [image, err] = await tryCatchAsync(() => addProjectImage(projectId, upload.url))
      if (err) throw toTRPCError(err)

      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return image
    }),

  removeImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [image, err] = await tryCatchAsync(() => removeProjectImage(id))
      if (err) throw toTRPCError(err)

      const fileKey = image.imageUrl.split('/').pop()
      if (fileKey) await utapi.deleteFiles(fileKey)

      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return image
    }),

  setCover: protectedProcedure
    .input(z.object({ id: z.string(), projectId: z.string() }))
    .mutation(async ({ ctx, input: { id, projectId } }) => {
      const [cover, err] = await tryCatchAsync(() => setProjectCoverImage(id, projectId))
      if (err) throw toTRPCError(err)

      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return cover
    }),

  reorderImages: protectedProcedure
    .input(reorderProjectImagesSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() => reorderProjectImages(input))
      if (err) throw toTRPCError(err)

      void ctx.cache.deleteByPrefix(CACHE_PREFIX)

      return true
    }),

  // ========== Content translations (dashboard authoring) ==========

  getTranslations: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input: { projectId } }) => {
      const [rows, err] = await tryCatchAsync(() => getProjectTranslations(projectId))
      if (err) throw toTRPCError(err)
      return rows
    }),

  upsertTranslation: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        locale: translationLocaleSchema,
        title: z.string().min(1),
        description: z.string().min(1),
        longDescription: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [row, err] = await tryCatchAsync(() => upsertProjectTranslation(input))
      if (err) throw toTRPCError(err)
      void ctx.cache.deleteByPrefix(CACHE_PREFIX)
      return row
    }),

  deleteTranslation: protectedProcedure
    .input(z.object({ projectId: z.string(), locale: translationLocaleSchema }))
    .mutation(async ({ ctx, input: { projectId, locale } }) => {
      const [, err] = await tryCatchAsync(() => deleteProjectTranslation(projectId, locale))
      if (err) throw toTRPCError(err)
      void ctx.cache.deleteByPrefix(CACHE_PREFIX)
      return true
    }),
})
