import { eq } from '@portofolio/db'
import { experienceGroupIssue } from '@portofolio/db/experience-group'
import { db } from '@portofolio/db/client'
import { experienceGroups, experiences } from '@portofolio/db/schema/index'
import { DEFAULT_LOCALE } from '@portofolio/i18n'
import type { Locale } from '@portofolio/i18n'
import type {
  CreateExperienceGroupInput,
  CreateExperienceInput,
  UpdateExperienceInput,
} from '@portofolio/schema/experience.schema'
import { NotFoundError, QueryError, ValidationError } from '@portofolio/errors'
import { insensitiveContains } from './utils/dialect'
import { deleteReturning, insertReturning, updateReturning } from './utils/returning'

export async function getAllExperiences(locale: Locale = DEFAULT_LOCALE) {
  const results = await db.query.experiences.findMany({
    with: { translations: { where: { locale } } },
    orderBy: {
      currentlyWorking: 'desc',
      startDate: 'desc',
    },
  })

  // Overlay the locale's translation onto the base (English) row, then drop the
  // joined `translations` so the returned shape matches the base entity.
  return results.map(({ translations, ...experience }) => {
    const translation = translations[0]
    return translation
      ? { ...experience, title: translation.title, description: translation.description }
      : experience
  })
}

export async function getExperiencesForDashboard(search?: string) {
  const results = await db.query.experiences.findMany({
    where: {
      title: insensitiveContains(search),
    },
    orderBy: {
      currentlyWorking: 'desc',
      startDate: 'desc',
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
  await validateExperienceGroup(data.groupId, data.company)
  const experience = await insertReturning(db, experiences, data)

  if (!experience) throw new QueryError('Failed to create experience')

  return experience
}

export async function updateExperience(data: UpdateExperienceInput) {
  const current = await getExperienceById(data.id)
  // Omitted membership preserves it for older clients; null explicitly detaches.
  await validateExperienceGroup(
    data.groupId === undefined ? current.groupId : data.groupId,
    data.company,
  )

  const experience = await updateReturning(db, experiences, data, eq(experiences.id, data.id))

  if (!experience) throw new QueryError('Failed to update experience')

  return experience
}

export async function deleteExperience(id: string) {
  await getExperienceById(id)

  const experience = await deleteReturning(db, experiences, eq(experiences.id, id))

  if (!experience) throw new QueryError('Failed to delete experience')

  return experience
}

export async function getExperienceGroups() {
  return db.select().from(experienceGroups).orderBy(experienceGroups.createdAt, experienceGroups.id)
}

export async function createExperienceGroup(data: CreateExperienceGroupInput) {
  const group = await insertReturning(db, experienceGroups, data)
  if (!group) throw new QueryError('Failed to create experience group')
  return group
}

async function validateExperienceGroup(groupId: string | null | undefined, company: string) {
  if (!groupId) return
  const [group] = await db.select().from(experienceGroups).where(eq(experienceGroups.id, groupId))
  const issue = experienceGroupIssue(groupId, company, group)
  if (issue === 'missing') throw new NotFoundError('Experience group', groupId)
  if (issue === 'company') {
    throw new ValidationError(
      'The employment group must belong to the same company. Change or remove the group before changing company.',
      'groupId',
    )
  }
}
