import { eq } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { applicationSettings } from '@portofolio/db/schema/index'
import type { SeoPageSettings, SeoSettingsJSONB } from '@portofolio/types/seo.types'
import { SEO_PAGES } from '@portofolio/types/seo.types'
import { insertReturning, updateReturning } from './utils/returning'

const SEO_SETTINGS_KEY = 'seo-settings'

const DEFAULT_SETTINGS: SeoSettingsJSONB = {
  pages: Object.fromEntries(SEO_PAGES.map((page) => [page, {}])) as SeoSettingsJSONB['pages'],
}

export async function getSeoSettings(): Promise<SeoSettingsJSONB> {
  const row = await db.query.applicationSettings.findFirst({
    where: { key: SEO_SETTINGS_KEY },
  })

  if (!row) return DEFAULT_SETTINGS

  return row.data as SeoSettingsJSONB
}

export async function getSeoPageSettings(
  page: (typeof SEO_PAGES)[number],
): Promise<SeoPageSettings> {
  const settings = await getSeoSettings()
  return settings.pages[page]
}

export async function setSeoSettings(value: SeoSettingsJSONB): Promise<SeoSettingsJSONB> {
  const existing = await db.query.applicationSettings.findFirst({
    where: { key: SEO_SETTINGS_KEY },
  })

  if (existing) {
    const updated = await updateReturning(
      db,
      applicationSettings,
      { data: value },
      eq(applicationSettings.id, existing.id),
    )

    return updated!.data as SeoSettingsJSONB
  }

  const created = await insertReturning(db, applicationSettings, {
    key: SEO_SETTINGS_KEY,
    data: value,
  })

  return created!.data as SeoSettingsJSONB
}
