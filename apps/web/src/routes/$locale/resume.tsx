import { MainHeader } from '@/components/main-header'
import { ResumeSkeleton } from '@/components/loader'
import { useLocale, useTranslations } from '@/i18n/locale-context'
import { buildSeoMeta } from '@/lib/seo'
import { DEFAULT_LOCALE, getMessages, intlLocale, isLocale, ogLocale } from '@portofolio/i18n'
import { IconDownload } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '@/utils/trpc'

export const Route = createFileRoute('/$locale/resume')({
  pendingComponent: ResumeSkeleton,
  loader: async ({ context }) => {
    const [cv, seo] = await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.resume.get.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: 'resume' })),
    ])

    return { cv, seo }
  },
  head: ({ loaderData, params }) => {
    const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
    const t = getMessages(locale)
    return {
      meta: [
        ...buildSeoMeta(loaderData?.seo, {
          title: t.resume.seoTitle,
          description: t.resume.seoDescription,
        }),
        { property: 'og:locale', content: ogLocale(locale) },
      ],
    }
  },
  component: ResumePage,
})

function ResumePage() {
  const { cv } = Route.useLoaderData()
  const locale = useLocale()
  const { t } = useTranslations()
  const trackDownload = useMutation(trpc.resume.trackDownload.mutationOptions())

  const handleDownload = () => {
    if (!cv?.data.url) return
    trackDownload.mutate()
    window.open(cv.data.url, '_blank')
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <MainHeader />
      <main className="mx-auto flex w-full flex-col gap-6 px-4 py-12 md:max-w-175 md:px-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-subtle font-mono text-sm tracking-[0.15em]">{t.resume.heading}</h1>
            {cv?.data.uploadedAt && (
              <p className="text-muted-foreground mt-1 text-xs">
                {t.resume.lastUpdated}{' '}
                {new Date(cv.data.uploadedAt).toLocaleDateString(intlLocale(locale), {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          {cv?.data.url && (
            <button
              onClick={handleDownload}
              className="bg-foreground text-background flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            >
              <IconDownload className="size-4" />
              {t.resume.downloadPdf}
            </button>
          )}
        </div>

        {cv?.data.url ? (
          <>
            {/* Mobile: iframe doesn't render PDFs on Chrome/Safari mobile */}
            <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8 md:hidden">
              <p className="text-muted-foreground text-sm">{t.resume.pdfNotOnMobile}</p>
              <button
                onClick={handleDownload}
                className="bg-foreground text-background flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              >
                <IconDownload className="size-4" />
                {t.resume.openPdf}
              </button>
            </div>

            {/* Desktop: inline iframe */}
            <div
              className="border-border hidden overflow-hidden rounded-lg border md:block"
              style={{ height: '80vh' }}
            >
              <iframe
                src={`${cv.data.url}#toolbar=0`}
                className="h-full w-full"
                title={t.resume.pdfTitle}
              />
            </div>
          </>
        ) : (
          <div className="border-border flex h-64 items-center justify-center rounded-lg border">
            <p className="text-muted-foreground text-sm">{t.resume.noResume}</p>
          </div>
        )}
      </main>
    </div>
  )
}
