import { useLocale, useTranslations } from '@/i18n/locale-context'
import { trpc } from '@/utils/trpc'
import type { ProjectWithViewCount } from '@portofolio/types/project.types'
import { toCompactNumber } from '@portofolio/utils/number'
import {
  IconBrandAppstore,
  IconBrandGithub,
  IconBrandGooglePlay,
  IconExternalLink,
  IconEye,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

interface ProjectCardProps {
  project: ProjectWithViewCount
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale()
  const { t, format } = useTranslations()
  const incrementViews = useMutation(trpc.project.updateView.mutationOptions())
  const detailParams = { locale, slug: project.slug }
  const externalLinks = [
    { href: project.githubUrl, label: t.projectDetail.linkGithub, icon: IconBrandGithub },
    { href: project.liveUrl, label: t.projectDetail.linkLive, icon: IconExternalLink },
    { href: project.playstoreUrl, label: t.projectDetail.linkPlayStore, icon: IconBrandGooglePlay },
    { href: project.appstoreUrl, label: t.projectDetail.linkAppStore, icon: IconBrandAppstore },
  ]
  const viewCount = Number(project.viewCount) || 0

  return (
    <Card className="h-full min-w-0 gap-4 wrap-anywhere">
      <CardHeader className="gap-2">
        <CardTitle>
          <h3 className="text-base leading-6 font-semibold">
            <Link
              to="/$locale/projects/$slug"
              params={detailParams}
              className="focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
        </CardTitle>
        <CardDescription>
          <p className="line-clamp-3 text-sm leading-6">{project.description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-wrap content-start items-start gap-1.5">
        {project.tech.slice(0, 4).map((tech, index) => (
          <Badge
            key={index}
            variant="outline"
            className="h-auto max-w-full min-w-0 whitespace-normal"
          >
            {tech}
          </Badge>
        ))}
        {project.tech.length > 4 && (
          <Badge
            variant="link"
            className="h-auto max-w-full min-w-0 whitespace-normal"
            render={<Link to="/$locale/projects/$slug" params={detailParams} />}
          >
            {format(t.projects.showMore, { count: project.tech.length - 4 })}
          </Badge>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex-wrap justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-2">
          {externalLinks.map(({ href, label, icon: Icon }) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => incrementViews.mutate({ projectId: project.id, slug: project.slug })}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm py-1 text-xs leading-5 underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                {label}
              </a>
            ) : null,
          )}
        </div>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs leading-5">
          <IconEye aria-hidden="true" className="size-3.5 shrink-0" />
          <span aria-hidden="true">{toCompactNumber(viewCount)}</span>
          <span className="sr-only">
            {format(t.projectDetail.viewsLabel, { count: viewCount })}
          </span>
        </span>
      </CardFooter>
    </Card>
  )
}
