import { eq, sql } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { socialLinks } from '@portofolio/db/schema/index'
import type {
  CreateSocialLinkInput,
  ReorderSocialLinksInput,
  UpdateSocialLinkInput,
} from '@portofolio/schema/social-link.schema'
import { NotFoundError, QueryError } from '@portofolio/errors'
import { insensitiveContains } from './utils/dialect'
import { deleteReturning, insertReturning, updateReturning } from './utils/returning'

export async function getAllSocialLinks() {
  const socialLinkItems = await db.query.socialLinks.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return socialLinkItems
}

export async function getSocialLinksForDashboard(search?: string) {
  const socialLinkItems = await db.query.socialLinks.findMany({
    where: {
      title: insensitiveContains(search),
    },
    orderBy: {
      order: 'asc',
    },
  })

  return socialLinkItems
}

export async function getSocialLinkClickThroughForDashboard() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const socialLinkItems = await db.query.socialLinks.findMany({
    where: {
      createdAt: {
        gt: thirtyDaysAgo.toISOString(),
      },
    },
    orderBy: {
      clickCount: 'desc',
    },
  })

  return socialLinkItems
}

export async function getSocialLinkById(id: string) {
  const socialLinkItem = await db.query.socialLinks.findFirst({
    where: {
      id,
    },
  })

  if (!socialLinkItem) throw new NotFoundError(`Social link item`, id)

  return socialLinkItem
}

export async function createSocialLink(data: CreateSocialLinkInput) {
  const socialLinkItem = await insertReturning(db, socialLinks, { ...data })

  if (!socialLinkItem) throw new QueryError('Failed to create social link item')

  return socialLinkItem
}

export async function incrementClickCount(id: string) {
  await getSocialLinkById(id)

  await db
    .update(socialLinks)
    .set({
      clickCount: sql`${socialLinks.clickCount} + 1`,
    })
    .where(eq(socialLinks.id, id))
}

export async function updateSocialLink(data: UpdateSocialLinkInput) {
  await getSocialLinkById(data.id)

  const socialLinkItem = await updateReturning(
    db,
    socialLinks,
    { ...data },
    eq(socialLinks.id, data.id),
  )

  if (!socialLinkItem) throw new QueryError('Failed to update social link item')

  return socialLinkItem
}

export async function reorderSocialLinks(data: ReorderSocialLinksInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of data) {
      await tx.update(socialLinks).set({ order }).where(eq(socialLinks.id, id))
    }
  })
}

export async function deleteSocialLink(id: string) {
  await getSocialLinkById(id)

  const result = await deleteReturning(db, socialLinks, eq(socialLinks.id, id))

  if (!result) throw new QueryError('Failed to delete social link item')

  return result
}
