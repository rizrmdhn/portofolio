import { DEFAULT_LOCALE, LOCALES } from '@portofolio/i18n'
import { z } from 'zod'

/** A supported content locale. Defaults to the canonical locale when omitted. */
export const localeSchema = z.enum(LOCALES).default(DEFAULT_LOCALE)

/** Shared `{ locale }` input for public, locale-aware read procedures. */
export const localeInputSchema = z.object({
  locale: localeSchema,
})

export type LocaleInput = z.infer<typeof localeInputSchema>

/** Input for authoring a content translation in the dashboard. */
export const translationLocaleSchema = z.enum(LOCALES)
