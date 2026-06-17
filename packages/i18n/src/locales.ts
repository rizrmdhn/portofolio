/**
 * Supported content/UI locales. `en` is the canonical default and the fallback
 * used whenever a translation is missing. The list drives both the URL `$locale`
 * route segment validation and the content-translation query layer.
 */
export const LOCALES = ['en', 'id'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Human-readable names for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
}

/** Short codes shown in compact switchers. */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: 'EN',
  id: 'ID',
}

/** Type guard — narrows an unknown URL segment to a supported `Locale`. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as ReadonlyArray<string>).includes(value)
}

/** Name of the cookie that remembers the visitor's chosen locale. */
export const LOCALE_COOKIE = 'locale'

/**
 * Extract a supported locale from a raw `Cookie` header value. Returns
 * `undefined` when the cookie is absent or holds an unsupported value, so the
 * caller can distinguish "no preference" from a real choice.
 */
export function parseLocaleCookie(cookieHeader: string | null | undefined): Locale | undefined {
  if (!cookieHeader) return undefined
  const raw = cookieHeader.match(/(?:^|;\s*)locale=([^;]+)/)?.[1]
  const value = raw ? decodeURIComponent(raw) : undefined
  return isLocale(value) ? value : undefined
}

/** First supported locale referenced by an `Accept-Language` header, if any. */
export function matchAcceptLanguage(header: string | null | undefined): Locale | undefined {
  if (!header) return undefined
  for (const part of header.toLowerCase().split(',')) {
    const code = part.trim().split(';')[0]?.split('-')[0]
    if (isLocale(code)) return code
  }
  return undefined
}

/** Open Graph `og:locale` value (e.g. `en_US`, `id_ID`) for a locale. */
const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  id: 'id_ID',
}

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale]
}

/** BCP 47 tag for `Intl` APIs (e.g. `Date#toLocaleDateString`, `Intl.NumberFormat`). */
const INTL_LOCALES: Record<Locale, string> = {
  en: 'en-US',
  id: 'id-ID',
}

export function intlLocale(locale: Locale): string {
  return INTL_LOCALES[locale]
}
