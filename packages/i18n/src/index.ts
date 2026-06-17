import type { Locale } from './locales'
import type { Messages } from './messages/en'
import { en } from './messages/en'
import { id } from './messages/id'

export * from './locales'
export type { Messages } from './messages/en'

const MESSAGES: Record<Locale, Messages> = { en, id }

/** Returns the message catalog for a locale. */
export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale]
}

/**
 * Minimal `{name}` placeholder interpolation. Keeps the catalog dependency-free
 * — unknown placeholders are left intact so missing vars are visible, not silent.
 */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  )
}
