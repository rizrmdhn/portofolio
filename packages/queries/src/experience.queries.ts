import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { experiences } from '@portofolio/db/schema/index'
import { DEFAULT_LOCALE  } from '@portofolio/i18n'
import type {Locale} from '@portofolio/i18n';
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from '@portofolio/schema/experience.schema'
import { NotFoundError, QueryError } from '@portofolio/errors'
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
  const experience = await insertReturning(db, experiences, data)

  if (!experience) throw new QueryError('Failed to create experience')

  return experience
}

export async function updateExperience(data: UpdateExperienceInput) {
  await getExperienceById(data.id)

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
