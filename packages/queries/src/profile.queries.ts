import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { profile } from '@portofolio/db/schema/index'
import { NotFoundError, QueryError } from '@portofolio/errors'
import type { Locale } from '@portofolio/i18n'
import { DEFAULT_LOCALE } from '@portofolio/i18n'
import type { UpdateProfileInput } from '@portofolio/schema/profile.schema'
import { updateReturning } from './utils/returning'

export async function getProfile(locale: Locale = DEFAULT_LOCALE) {
  const result = await db.query.profile.findFirst({
    with: { translations: { where: { locale } } },
  })

  if (!result) throw new NotFoundError('Profile', 'singleton')

  // Overlay the locale's translation onto the base row; strip the join so the
  // returned shape matches the base profile entity.
  const { translations, ...rest } = result
  const translation = translations[0]
  return translation ? { ...rest, title: translation.title, bio: translation.bio } : rest
}

export async function updateProfile(data: UpdateProfileInput) {
  const result = await updateReturning(db, profile, data, eq(profile.id, data.id))

  if (!result) throw new QueryError('Failed to update profile')

  return result
}
