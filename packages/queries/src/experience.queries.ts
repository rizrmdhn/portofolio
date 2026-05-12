import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { experiences } from '@portofolio/db/schema/index'
import type {
  CreateExperienceInput,
  ReorderExperiencesInput,
  UpdateExperienceInput,
} from '@portofolio/schema/experience.schema'
import { NotFoundError, QueryError } from './errors'

export async function getAllExperiences() {
  const results = await db.query.experiences.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return results
}

export async function getExperiencesForDashboard(search?: string) {
  const results = await db.query.experiences.findMany({
    where: {
      title: {
        ilike: `%${search ?? ''}%`,
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return results
}

export async function getExperienceById(id: string) {
  const experience = await db.query.experiences.findFirst({
    where: {
      id,
    },
  })

  if (!experience) throw new NotFoundError(`Experience`, id)

  return experience
}

export async function createExperience(data: CreateExperienceInput) {
  const [experience] = await db.insert(experiences).values(data).returning()

  if (!experience) throw new QueryError('Failed to create experience')

  return experience
}

export async function updateExperience(data: UpdateExperienceInput) {
  await getExperienceById(data.id)

  const [experience] = await db
    .update(experiences)
    .set(data)
    .where(eq(experiences.id, data.id))
    .returning()

  if (!experience) throw new QueryError('Failed to update experience')

  return experience
}

export async function reorderExperiences(items: ReorderExperiencesInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of items) {
      await tx.update(experiences).set({ order }).where(eq(experiences.id, id))
    }
  })
}

export async function deleteExperience(id: string) {
  await getExperienceById(id)

  const [experience] = await db.delete(experiences).where(eq(experiences.id, id)).returning()

  if (!experience) throw new QueryError('Failed to delete experience')

  return experience
}
