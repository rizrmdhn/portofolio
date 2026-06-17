import { LocaleProvider } from '@/i18n/locale-context'
import { isLocale } from '@portofolio/i18n'
import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale')({
  // Reject any `/<segment>/...` whose segment isn't a supported locale. Static
  // routes (/dashboard, /login, /api) outrank this dynamic segment, so only
  // genuinely unknown top-level paths fall through to here.
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound()
    return { locale: params.locale }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const { locale } = Route.useParams()

  return (
    <LocaleProvider locale={locale}>
      <Outlet />
    </LocaleProvider>
  )
}
