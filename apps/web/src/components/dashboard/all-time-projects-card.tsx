import { cn } from '@/lib/utils'
import type { AllTimeProject } from '@portofolio/types/project.types'
import { IconArrowRight, IconFolder } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { EmptyState } from '../ui/empty-state'
import { Progress } from '../ui/progress'

interface AllTimeProjectsCardProps {
  className?: string
  projects: Array<AllTimeProject>
}

export function AllTimeProjectsCard({ projects, className }: AllTimeProjectsCardProps) {
  const navigate = useNavigate()
  const viewCounts = projects.map((project) =>
    Number.isFinite(project.views) && project.views > 0 ? project.views : 0,
  )
  const maxViews = Math.max(...viewCounts, 1)

  return (
    <Card className={cn(className)}>
      <CardHeader className="border-b">
        <CardTitle>Top Projects</CardTitle>
        <CardDescription>By views, last 30 days</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground group font-mono text-[11px]"
            onClick={() => navigate({ to: '/dashboard/projects' })}
          >
            View all
            <IconArrowRight
              data-icon="inline-end"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col">
        {projects.map((project, idx) => {
          const views = viewCounts[idx] ?? 0
          const percentage = Math.round((views / maxViews) * 100)
          const neighbor = projects[idx + 1] ?? projects[idx - 1]
          const neighborViews = neighbor
            ? (viewCounts[idx + 1] ?? viewCounts[idx - 1] ?? 0)
            : null
          const growth =
            neighborViews && neighborViews > 0
              ? Math.round(((views - neighborViews) / neighborViews) * 100)
              : 0
          return (
            <div
              key={project.id}
              className="border-border flex items-center gap-3 border-b py-2.5 last:border-0"
            >
              <span className="text-muted-foreground w-4 shrink-0 text-right font-mono text-[11px]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-foreground flex-1 text-sm font-semibold">{project.title}</span>
              <Progress value={percentage} className="h-1.5 max-w-64 flex-1 align-middle" />
              <span className="text-foreground w-14 shrink-0 text-right font-mono text-sm font-semibold">
                {views.toLocaleString()}
              </span>
              <span
                className={cn(
                  'w-10 shrink-0 whitespace-nowrap text-right font-mono text-[11px]',
                  growth > 0 && 'text-green-500',
                  growth < 0 && 'text-red-500',
                  growth === 0 && 'text-muted-foreground',
                )}
              >
                {`${growth > 0 ? '+' : ''}${growth}%`}
              </span>
            </div>
          )
        })}
        {projects.length === 0 && (
          <EmptyState
            icon={IconFolder}
            title="No projects yet"
            description="Your top projects will appear here once they start getting views."
          />
        )}
      </CardContent>
    </Card>
  )
}
