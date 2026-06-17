import { MainHeader } from '@/components/main-header'
import { ProjectCard } from '@/components/project-card'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from '@/i18n/locale-context'
import { buildSeoMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { DEFAULT_LOCALE, getMessages, isLocale, ogLocale } from '@portofolio/i18n'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'

const TECH_COLLAPSED_LIMIT = 12

const searchSchema = z.object({
  tech: z.string().optional(),
})

export const Route = createFileRoute('/$locale/projects/')({
  validateSearch: searchSchema,
  loader: async ({ context, params }) => {
    const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
    const [projects, seo] = await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.project.getAll.queryOptions({ locale })),
      context.queryClient.ensureQueryData(
        context.trpc.seo.getPage.queryOptions({ page: 'projects' }),
      ),
    ])

    return { projects, seo }
  },
  head: ({ loaderData, params }) => {
    const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
    const t = getMessages(locale)
    return {
      meta: [
        ...buildSeoMeta(loaderData?.seo, {
          title: t.projects.seoTitle,
          description: t.projects.seoDescription,
        }),
        { property: 'og:locale', content: ogLocale(locale) },
      ],
    }
  },
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects } = Route.useLoaderData()
  const { tech } = Route.useSearch()
  const navigate = useNavigate({ from: '/$locale/projects/' })
  const { t, format } = useTranslations()
  const [showAllTech, setShowAllTech] = useState(false)

  const allTech = Array.from(
    new Map(
      projects.flatMap((p) => p.tech).map((name) => [name.toLocaleLowerCase(), name]),
    ).values(),
  ).sort()

  const isCollapsible = allTech.length > TECH_COLLAPSED_LIMIT
  const visibleTech =
    !isCollapsible || showAllTech
      ? allTech
      : // Keep the active filter visible even when it sits past the limit.
        Array.from(
          new Set([
            ...allTech.slice(0, TECH_COLLAPSED_LIMIT),
            ...(tech && allTech.includes(tech) ? [tech] : []),
          ]),
        )
  const hiddenCount = allTech.length - visibleTech.length

  const filtered = tech
    ? projects.filter((p) =>
        p.tech.map((name) => name.toLocaleLowerCase()).includes(tech.toLocaleLowerCase()),
      )
    : projects

  function toggleTech(value: string) {
    navigate({
      search: (prev) => ({ ...prev, tech: prev.tech === value ? undefined : value }),
    })
  }

  return (
    <div className="bg-background text-foreground flex flex-col">
      <MainHeader />
      <main className="mx-auto flex w-full flex-col gap-8 px-4 py-12 md:max-w-175 md:px-0">
        <h1 className="text-subtle font-mono text-sm tracking-[0.15em]">{t.projects.allHeading}</h1>
        {allTech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleTech.map((techItem) => (
              <Badge
                key={techItem}
                render={<button onClick={() => toggleTech(techItem)} />}
                variant={tech === techItem ? 'default' : 'outline'}
                className={cn('cursor-pointer', tech === techItem && 'ring-ring/50 ring-2')}
              >
                {techItem}
              </Badge>
            ))}
            {isCollapsible && (
              <Badge
                render={<button onClick={() => setShowAllTech((prev) => !prev)} />}
                variant="ghost"
                className="text-subtle cursor-pointer"
              >
                {showAllTech ? t.projects.showLess : format(t.projects.showMore, { count: hiddenCount })}
              </Badge>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  )
}
