import { cn } from '@/lib/utils'
import { EXPERIENCE_TYPE_LABELS } from '@portofolio/constants'
import type { Experience } from '@portofolio/types/experience.types'
import { format, intervalToDuration } from 'date-fns'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

interface ExperienceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  experience: Experience
}

function formatDuration(start: Date | string, end: Date | string) {
  const { years = 0, months = 0 } = intervalToDuration({
    start: new Date(start),
    end: new Date(end),
  })
  const parts: Array<string> = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`)
  return parts.length ? parts.join(' ') : '< 1 mo'
}

export function ExperienceCard({ experience, className, ...props }: ExperienceCardProps) {
  const endDate = experience.endDate ?? new Date()
  const duration = formatDuration(
    experience.startDate,
    experience.currentlyWorking ? new Date() : endDate,
  )

  return (
    <div className={cn('flex flex-col gap-6 rounded-lg py-10', className)} {...props}>
      <div className="flex items-center gap-4">
        {/* Years And Company */}
        <div className="flex w-36 shrink-0 flex-col items-start gap-2 self-start">
          <span className="text-subtle flex items-center gap-1.5 font-mono text-xs font-semibold whitespace-nowrap">
            {format(experience.startDate, 'MMM yyyy')} –{' '}
            {experience.currentlyWorking ? (
              <Badge variant="outline">Present</Badge>
            ) : (
              format(endDate, 'MMM yyyy')
            )}
          </span>
          <span className="text-muted-foreground/70 font-mono text-[11px]">{duration}</span>
          <span className="text-muted-foreground text-[13px] wrap-break-word">
            {experience.company}
          </span>
        </div>

        {/* Role, Description And Skills */}
        <div className="flex max-w-lg flex-col items-start gap-2">
          <span className="text-foreground text-[15px] font-semibold">{experience.title}</span>
          <div className="text-subtle flex items-center gap-2 font-mono text-[11px]">
            <span>{EXPERIENCE_TYPE_LABELS[experience.type]}</span>
            <span aria-hidden>·</span>
            <span>{experience.location}</span>
          </div>
          <p className="text-muted-foreground text-[13px]">{experience.description}</p>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-tag text-tag-foreground border-tag-border rounded border px-2 py-1 font-mono text-[10px] font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Separator />
    </div>
  )
}
