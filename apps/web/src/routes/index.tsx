import { getPreferredLocale } from '@/functions/get-preferred-locale'
import { createFileRoute, redirect } from '@tanstack/react-router'

/**
 * The bare root path carries no locale. Redirect to the visitor's preferred
 * locale (cookie → Accept-Language → default) so every public page lives under a
 * `/<locale>` prefix — one canonical URL per language, best for SEO.
 */
export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const locale = await getPreferredLocale()
    throw redirect({ to: '/$locale', params: { locale } })
  },
})
