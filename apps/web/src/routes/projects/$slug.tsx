import { FadeIn } from '@/components/fade-in'
import { MainHeader } from '@/components/main-header'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Markdown } from '@/components/ui/markdown'
import { buildSeoMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { trpc } from '@/utils/trpc'
import { toCompactNumber } from '@portofolio/utils/number'
import {
  IconArrowLeft,
  IconBrandAppstore,
  IconBrandGithub,
  IconBrandGooglePlay,
  IconExternalLink,
  IconEye,
} from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/projects/$slug')({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(
      context.trpc.project.getBySlug.queryOptions({ slug: params.slug }),
    )
    void context.queryClient.prefetchQuery(
      context.trpc.project.getImages.queryOptions({ projectId: project.id }),
    )
    return { project }
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project
    return {
      meta: buildSeoMeta(undefined, {
        title: project?.title ?? 'Project',
        description: project?.description ?? '',
        ogImage: project?.imageUrl ?? undefined,
      }),
    }
  },
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const queryClient = useQueryClient()
  const { slug } = Route.useParams()
  const navigate = useNavigate()

  const { data: project } = useSuspenseQuery(trpc.project.getBySlug.queryOptions({ slug }))

  const { data: images } = useQuery(trpc.project.getImages.queryOptions({ projectId: project.id }))

  const galleryImages = (images ?? []).filter((img) => !img.isCover)

  const incrementViews = useMutation({
    ...trpc.project.updateView.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.project.getBySlug.queryOptions({ slug }))
      queryClient.invalidateQueries(trpc.project.getAll.queryOptions())
    },
  })

  useEffect(() => {
    incrementViews.mutate({ projectId: project.id, slug: project.slug })
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, project.slug])

  const links = [
    { url: project.githubUrl, icon: IconBrandGithub, label: 'GitHub' },
    { url: project.liveUrl, icon: IconExternalLink, label: 'Live' },
    { url: project.playstoreUrl, icon: IconBrandGooglePlay, label: 'Play Store' },
    { url: project.appstoreUrl, icon: IconBrandAppstore, label: 'App Store' },
  ].filter((l) => !!l.url)

  return (
    <div className="bg-background text-foreground flex flex-col">
      <MainHeader />
      <main className="mx-auto w-full px-4 py-12 md:max-w-175 md:px-0">
        <FadeIn className="flex flex-col gap-10">
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            className="text-subtle -ml-2 w-fit"
            onClick={() => navigate({ to: '/projects' })}
          >
            <IconArrowLeft className="size-4" />
            All Projects
          </Button>

          {/* Cover image */}
          {project.imageUrl && (
            <div className="border-border overflow-hidden rounded-lg border">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-72 w-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl leading-tight font-bold sm:text-3xl">{project.title}</h1>
              <span className="text-subtle inline-flex shrink-0 items-center gap-1.5 pt-1 font-mono text-xs">
                <IconEye className="size-3.5" />
                {toCompactNumber(Number(project.viewCount))}
              </span>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">{project.description}</p>
          </div>

          {/* Tech tags */}
          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-tag text-tag-foreground border-tag-border font-mono text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map(({ url, icon: Icon, label }) => (
                <a
                  key={label}
                  href={url ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </div>
          )}

          {/* Long description */}
          {project.longDescription && (
            <div className="border-border border-t pt-8">
              <Markdown>{project.longDescription}</Markdown>
            </div>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="border-border flex flex-col gap-4 border-t pt-8">
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Gallery
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="border-border overflow-hidden rounded-lg border"
                  >
                    <img
                      src={image.imageUrl}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="border-border flex flex-col gap-4 border-t pt-8">
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Gallery
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="border-border overflow-hidden rounded-lg border"
                  >
                    <img
                      src={image.imageUrl}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </FadeIn>
      </main>

      <footer className="border-border mx-auto mt-auto flex w-full justify-center border-t px-4 py-6 md:max-w-175 md:px-0">
        <span className="text-subtle font-mono text-xs">
          © {new Date().getFullYear()} Noor Rizki Ramadhan
        </span>
      </footer>
    </div>
  )
}
