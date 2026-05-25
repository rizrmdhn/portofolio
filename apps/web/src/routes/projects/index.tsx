import { MainHeader } from '@/components/main-header'
import { ProjectCard } from '@/components/project-card'
import { Badge } from '@/components/ui/badge'
import { buildSeoMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  tech: z.string().optional(),
})

export const Route = createFileRoute('/projects/')({
  validateSearch: searchSchema,
  loader: async ({ context }) => {
    const [projects, seo] = await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.project.getAll.queryOptions()),
      context.queryClient.ensureQueryData(
        context.trpc.seo.getPage.queryOptions({ page: 'projects' }),
      ),
    ])

    return { projects, seo }
  },
  head: ({ loaderData }) => ({
    meta: buildSeoMeta(loaderData?.seo, {
      title: 'Projects',
      description: "A collection of projects I've built.",
    }),
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects } = Route.useLoaderData()
  const { tech } = Route.useSearch()
  const navigate = useNavigate({ from: '/projects/' })

  const allTech = Array.from(
    new Map(
      projects.flatMap((p) => p.tech).map((t) => [t.toLocaleLowerCase(), t]),
    ).values(),
  ).sort()

  const filtered = tech
    ? projects.filter((p) =>
        p.tech.map((t) => t.toLocaleLowerCase()).includes(tech.toLocaleLowerCase()),
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
        <h1 className="text-subtle font-mono text-sm tracking-[0.15em]">ALL PROJECTS</h1>
        {allTech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTech.map((t) => (
              <Badge
                key={t}
                render={<button onClick={() => toggleTech(t)} />}
                variant={tech === t ? 'default' : 'outline'}
                className={cn('cursor-pointer', tech === t && 'ring-ring/50 ring-2')}
              >
                {t}
              </Badge>
            ))}
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
