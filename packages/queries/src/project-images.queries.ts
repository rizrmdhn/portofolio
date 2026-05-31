import { and, eq, ne } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { projectImages, projects } from '@portofolio/db/schema/index'
import type { ReorderProjectImagesInput } from '@portofolio/schema/project.schema'
import { NotFoundError, QueryError } from '@portofolio/errors'

export async function getProjectImages(projectId: string) {
  return db.query.projectImages.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
  })
}

export async function getProjectImageById(id: string) {
  const image = await db.query.projectImages.findFirst({ where: { id } })

  if (!image) throw new NotFoundError('Project image', id)

  return image
}

/**
 * Insert a new image for a project. When it is the first image, it is
 * automatically marked as the cover and synced to `projects.imageUrl`.
 */
export async function addProjectImage(projectId: string, imageUrl: string) {
  return db.transaction(async (tx) => {
    const existing = await tx.query.projectImages.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
    })

    const isFirst = existing.length === 0
    const nextOrder = existing.reduce((max, img) => Math.max(max, img.order + 1), 0)

    const [image] = await tx
      .insert(projectImages)
      .values({
        projectId,
        imageUrl,
        isCover: isFirst,
        order: nextOrder,
      })
      .returning()

    if (!image) throw new QueryError('Failed to add project image')

    if (isFirst) {
      await tx.update(projects).set({ imageUrl }).where(eq(projects.id, projectId))
    }

    return image
  })
}

/**
 * Delete an image. If it was the cover, promote the next remaining image (by
 * order) to cover and sync `projects.imageUrl`; if none remain, clear it.
 * Returns the deleted row so callers can remove the file from storage.
 */
export async function removeProjectImage(id: string) {
  return db.transaction(async (tx) => {
    const [deleted] = await tx.delete(projectImages).where(eq(projectImages.id, id)).returning()

    if (!deleted) throw new QueryError('Failed to remove project image')

    if (deleted.isCover) {
      const [next] = await tx.query.projectImages.findMany({
        where: { projectId: deleted.projectId },
        orderBy: { order: 'asc' },
        limit: 1,
      })

      if (next) {
        await tx.update(projectImages).set({ isCover: true }).where(eq(projectImages.id, next.id))
        await tx
          .update(projects)
          .set({ imageUrl: next.imageUrl })
          .where(eq(projects.id, deleted.projectId))
      } else {
        await tx
          .update(projects)
          .set({ imageUrl: null })
          .where(eq(projects.id, deleted.projectId))
      }
    }

    return deleted
  })
}

/**
 * Mark a single image as the cover, unset every other image of the project,
 * and sync `projects.imageUrl`.
 */
export async function setProjectCoverImage(id: string, projectId: string) {
  return db.transaction(async (tx) => {
    const image = await tx.query.projectImages.findFirst({ where: { id } })

    if (!image) throw new NotFoundError('Project image', id)

    await tx
      .update(projectImages)
      .set({ isCover: false })
      .where(and(eq(projectImages.projectId, projectId), ne(projectImages.id, id)))

    const [cover] = await tx
      .update(projectImages)
      .set({ isCover: true })
      .where(eq(projectImages.id, id))
      .returning()

    if (!cover) throw new QueryError('Failed to set project cover image')

    await tx.update(projects).set({ imageUrl: cover.imageUrl }).where(eq(projects.id, projectId))

    return cover
  })
}

export async function reorderProjectImages(items: ReorderProjectImagesInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of items) {
      await tx.update(projectImages).set({ order }).where(eq(projectImages.id, id))
    }
  })
}
