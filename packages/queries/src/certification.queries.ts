import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { certifications } from '@portofolio/db/schema/index'
import type {
  CreateCertificationInput,
  ReorderCertificationsInput,
  UpdateCertificationInput,
} from '@portofolio/schema/certifcation.schema'
import { NotFoundError, QueryError } from './errors'

export async function getAllCertifications() {
  const certificationsList = await db.query.certifications.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return certificationsList
}

export async function getCertificationsForDashboard(search?: string) {
  const certificationsList = await db.query.certifications.findMany({
    where: {
      title: {
        ilike: `%${search ?? ''}%`,
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return certificationsList
}

export async function getCertificatesForLandingPage() {
  const result = await db.query.certifications.findMany({
    orderBy: {
      order: 'asc',
    },
    limit: 7,
  })

  const isMore = result.length > 6

  return { data: result.slice(0, 6), isMore }
}

export async function getCertificationById(id: string) {
  const certification = await db.query.certifications.findFirst({
    where: {
      id,
    },
  })

  if (!certification) throw new NotFoundError('Certification', id)

  return certification
}

export async function createCertification(data: CreateCertificationInput) {
  const [certification] = await db
    .insert(certifications)
    .values({
      ...data,
      issueYear: new Date(data.issueYear).getFullYear(),
      expiryYear: data.expiryYear ? new Date(data.expiryYear).getFullYear() : null,
    })
    .returning()

  if (!certification) throw new QueryError('Failed to create certification')

  return certification
}

export async function updateCertification(data: UpdateCertificationInput) {
  await getCertificationById(data.id)

  const [certification] = await db
    .update(certifications)
    .set({
      ...data,
      issueYear: new Date(data.issueYear).getFullYear(),
      expiryYear: data.expiryYear ? new Date(data.expiryYear).getFullYear() : null,
    })
    .where(eq(certifications.id, data.id))
    .returning()

  if (!certification) throw new QueryError('Failed to update certification')

  return certification
}

export async function reorderCertifications(orderedIds: ReorderCertificationsInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx.update(certifications).set({ order }).where(eq(certifications.id, id))
    }
  })
}

export async function deleteCertification(id: string) {
  await getCertificationById(id)

  const [certification] = await db
    .delete(certifications)
    .where(eq(certifications.id, id))
    .returning()

  if (!certification) throw new QueryError('Failed to delete certification')

  return certification
}
