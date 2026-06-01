import { FadeIn } from '@/components/fade-in'
import { MainHeader } from '@/components/main-header'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Markdown } from '@/components/ui/markdown'
import { buildSeoMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { trpc } from '@/utils/trpc'
import { toCompactNumber } from '@portofolio/utils/number'
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBrandAppstore,
  IconBrandGithub,
  IconBrandGooglePlay,
  IconExternalLink,
  IconEye,
} from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
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
  errorComponent: () => (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <MainHeader />
      <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
        <p className="text-subtle font-mono text-xs tracking-wide uppercase">404</p>
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground max-w-md">
          The project you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link
          to="/projects"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-2')}
        >
          <IconArrowLeft className="size-4" />
          All Projects
        </Link>
      </main>
    </div>
  ),
  component: ProjectDetailPage,
})

/**
 * Click-to-zoom image. The thumbnail keeps its cropped framing; the dialog shows
 * the full, uncropped image so screenshots stay legible. A `bg-muted` placeholder
 * reserves space while the image loads to avoid layout shift / white flashes.
 */
function ImageLightbox({
  src,
  alt,
  triggerClassName,
  imgClassName,
  eager = false,
}: {
  src: string
  alt: string
  triggerClassName?: string
  imgClassName?: string
  eager?: boolean
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'border-border bg-muted group block w-full cursor-zoom-in overflow-hidden rounded-lg border',
          triggerClassName,
        )}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className={cn(
            'w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]',
            imgClassName,
          )}
        />
      </DialogTrigger>
      <DialogContent className="w-fit max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 ring-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <img src={src} alt={alt} className="max-h-[85vh] w-auto rounded-lg object-contain" />
      </DialogContent>
    </Dialog>
  )
}

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
    // The server de-duplicates views per IP (see project.updateView); this
    // session guard is just a client-side optimization to avoid firing a
    // redundant request on every refresh within the same tab.
    const key = `project-viewed:${project.slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
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

  const viewCount = Number(project.viewCount)

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
            <ImageLightbox
              src={project.imageUrl}
              alt={project.title}
              imgClassName="h-72"
              eager
            />
          )}

          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl leading-tight font-bold sm:text-3xl">{project.title}</h1>
              <span
                className="text-subtle inline-flex shrink-0 items-center gap-1.5 pt-1 font-mono text-xs"
                title={`${viewCount.toLocaleString()} views`}
                aria-label={`${viewCount.toLocaleString()} views`}
              >
                <IconEye className="size-3.5" aria-hidden />
                {toCompactNumber(viewCount)}
              </span>
            </div>
            {/* Short description — reads as a summary lede, distinct from the body */}
            <p className="text-foreground/80 text-lg leading-relaxed">{project.description}</p>
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
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'group')}
                >
                  <Icon className="size-4" />
                  {label}
                  <IconArrowUpRight className="size-3.5 opacity-40 transition-opacity group-hover:opacity-70" />
                </a>
              ))}
            </div>
          )}

          {/* Long description */}
          {project.longDescription && (
            <div className="border-border flex flex-col gap-4 border-t pt-8">
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                About
              </h2>
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
                  <ImageLightbox
                    key={image.id}
                    src={image.imageUrl}
                    alt={`${project.title} screenshot`}
                    imgClassName="aspect-video"
                  />
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
