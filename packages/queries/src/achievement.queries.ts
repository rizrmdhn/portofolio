import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { achievements } from '@portofolio/db/schema/index'
import type {
  CreateAchievementInput,
  ReorderAchievementsInput,
  UpdateAchievementInput,
} from '@portofolio/schema/achievement.schema'
import { NotFoundError, QueryError } from './errors'

export async function getAllAchievements() {
  return db.query.achievements.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getAchievementsForDashboard(search?: string) {
  return db.query.achievements.findMany({
    where: {
      title: { ilike: `%${search ?? ''}%` },
    },
    orderBy: { order: 'asc' },
  })
}

export async function getAchievementById(id: string) {
  const record = await db.query.achievements.findFirst({ where: { id } })
  if (!record) throw new NotFoundError('Achievement', id)
  return record
}

export async function createAchievement(data: CreateAchievementInput) {
  const [record] = await db
    .insert(achievements)
    .values({
      ...data,
      description: data.description ?? null,
    })
    .returning()
  if (!record) throw new QueryError('Failed to create achievement')
  return record
}

export async function updateAchievement(data: UpdateAchievementInput) {
  await getAchievementById(data.id)
  const [record] = await db
    .update(achievements)
    .set({
      ...data,
      description: data.description ?? null,
    })
    .where(eq(achievements.id, data.id))
    .returning()
  if (!record) throw new QueryError('Failed to update achievement')
  return record
}

export async function reorderAchievements(orderedIds: ReorderAchievementsInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx.update(achievements).set({ order }).where(eq(achievements.id, id))
    }
  })
}

export async function deleteAchievement(id: string) {
  await getAchievementById(id)
  const [record] = await db.delete(achievements).where(eq(achievements.id, id)).returning()
  if (!record) throw new QueryError('Failed to delete achievement')
  return record
}
