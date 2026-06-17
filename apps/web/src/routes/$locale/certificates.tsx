import { CertificateCard } from '@/components/certificate-card'
import { MainHeader } from '@/components/main-header'
import { useTranslations } from '@/i18n/locale-context'
import { buildSeoMeta } from '@/lib/seo'
import { DEFAULT_LOCALE, getMessages, isLocale, ogLocale } from '@portofolio/i18n'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/certificates')({
  loader: async ({ context }) => {
    const [certifications, seo] = await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.certification.getAll.queryOptions()),
      context.queryClient.ensureQueryData(
        context.trpc.seo.getPage.queryOptions({ page: 'certificates' }),
      ),
    ])

    return { certifications, seo }
  },
  head: ({ loaderData, params }) => {
    const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
    const t = getMessages(locale)
    return {
      meta: [
        ...buildSeoMeta(loaderData?.seo, {
          title: t.certificates.seoTitle,
          description: t.certificates.seoDescription,
        }),
        { property: 'og:locale', content: ogLocale(locale) },
      ],
    }
  },
  component: CertificatesPage,
})

function CertificatesPage() {
  const { certifications } = Route.useLoaderData()
  const { t } = useTranslations()

  return (
    <div className="bg-background text-foreground flex flex-col">
      <MainHeader />
      <main className="mx-auto flex w-full flex-col gap-8 px-4 py-12 md:max-w-175 md:px-0">
        <h1 className="text-subtle font-mono text-sm tracking-[0.15em]">
          {t.certificates.allHeading}
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
          {certifications.map((certification) => (
            <CertificateCard key={certification.id} certificate={certification} />
          ))}
        </div>
      </main>
    </div>
  )
}
