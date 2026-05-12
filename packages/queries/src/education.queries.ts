import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { education } from '@portofolio/db/schema/index'
import type {
  CreateEducationInput,
  ReorderEducationInput,
  UpdateEducationInput,
} from '@portofolio/schema/education.schema'
import { NotFoundError, QueryError } from './errors'

export async function getAllEducation() {
  return db.query.education.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getEducationForDashboard(search?: string) {
  return db.query.education.findMany({
    where: {
      institution: { ilike: `%${search ?? ''}%` },
    },
    orderBy: { order: 'asc' },
  })
}

export async function getEducationById(id: string) {
  const record = await db.query.education.findFirst({ where: { id } })
  if (!record) throw new NotFoundError('Education', id)
  return record
}

export async function createEducation(data: CreateEducationInput) {
  const [record] = await db
    .insert(education)
    .values({
      ...data,
      endYear: data.endYear ?? null,
      gpa: data.gpa ?? null,
    })
    .returning()
  if (!record) throw new QueryError('Failed to create education')
  return record
}

export async function updateEducation(data: UpdateEducationInput) {
  await getEducationById(data.id)
  const [record] = await db
    .update(education)
    .set({
      ...data,
      endYear: data.endYear ?? null,
      gpa: data.gpa ?? null,
    })
    .where(eq(education.id, data.id))
    .returning()
  if (!record) throw new QueryError('Failed to update education')
  return record
}

export async function reorderEducation(orderedIds: ReorderEducationInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx.update(education).set({ order }).where(eq(education.id, id))
    }
  })
}

export async function deleteEducation(id: string) {
  await getEducationById(id)
  const [record] = await db.delete(education).where(eq(education.id, id)).returning()
  if (!record) throw new QueryError('Failed to delete education')
  return record
}
