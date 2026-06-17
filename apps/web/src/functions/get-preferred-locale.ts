import { DEFAULT_LOCALE,  matchAcceptLanguage, parseLocaleCookie } from '@portofolio/i18n'
import type {Locale} from '@portofolio/i18n';
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

/**
 * Resolves the locale to send a prefix-less `/` visitor to: their saved cookie
 * choice, else the best `Accept-Language` match, else the default.
 */
export const getPreferredLocale = createServerFn({ method: 'GET' }).handler((): Locale => {
  const cookie = getRequestHeader('cookie')
  const acceptLanguage = getRequestHeader('accept-language')
  return parseLocaleCookie(cookie) ?? matchAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE
})
