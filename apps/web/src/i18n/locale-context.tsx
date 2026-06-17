import type { Locale, Messages } from '@portofolio/i18n'
import { DEFAULT_LOCALE, LOCALE_COOKIE, getMessages, interpolate, isLocale } from '@portofolio/i18n'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo } from 'react'

interface LocaleContextValue {
  locale: Locale
  /** The resolved message catalog for the active locale. */
  t: Messages
  /** `{name}`-style placeholder interpolation against a catalog string. */
  format: (template: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * Provides the active locale + its message catalog to the localized (public)
 * route subtree. Mounted by the `$locale` layout route. The raw `locale` comes
 * from the URL param (a `string`); it is re-validated here and falls back to the
 * default so the provider never holds an unsupported locale.
 */
export function LocaleProvider({ locale, children }: { locale: string; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(() => {
    const resolved = isLocale(locale) ? locale : DEFAULT_LOCALE
    return { locale: resolved, t: getMessages(resolved), format: interpolate }
  }, [locale])

  // Mirror the active (URL) locale into a cookie so the server — tRPC context and
  // the `/` redirect — knows the visitor's language without it being in the URL
  // for those requests. Kept in sync on every public navigation.
  useEffect(() => {
    document.cookie = `${LOCALE_COOKIE}=${value.locale}; path=/; max-age=31536000; samesite=lax`
  }, [value.locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

/**
 * Access locale + catalog. Outside the localized subtree (e.g. dashboard links
 * back to the public site) it falls back to the default locale rather than
 * throwing, so shared components work everywhere.
 */
export function useTranslations(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (ctx) return ctx
  return { locale: DEFAULT_LOCALE, t: getMessages(DEFAULT_LOCALE), format: interpolate }
}

/** Shorthand for just the active locale. */
export function useLocale(): Locale {
  return useTranslations().locale
}
