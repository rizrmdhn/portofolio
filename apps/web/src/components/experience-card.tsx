import { useTranslations } from '@/i18n/locale-context'
import { cn } from '@/lib/utils'
import type { Messages } from '@portofolio/i18n'
import type { Experience } from '@portofolio/types/experience.types'
import { format, intervalToDuration } from 'date-fns'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

interface ExperienceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  experience: Experience
}

function formatDuration(
  start: Date | string,
  end: Date | string,
  labels: Messages['experienceCard'],
) {
  const { years = 0, months = 0 } = intervalToDuration({
    start: new Date(start),
    end: new Date(end),
  })
  const parts: Array<string> = []
  if (years) parts.push(`${years} ${years > 1 ? labels.yearShortPlural : labels.yearShort}`)
  if (months) parts.push(`${months} ${months > 1 ? labels.monthShortPlural : labels.monthShort}`)
  return parts.length ? parts.join(' ') : labels.lessThanMonth
}

export function ExperienceCard({ experience, className, ...props }: ExperienceCardProps) {
  const { t } = useTranslations()
  const endDate = experience.endDate ?? new Date()
  const duration = formatDuration(
    experience.startDate,
    experience.currentlyWorking ? new Date() : endDate,
    t.experienceCard,
  )

  return (
    <div
      className={cn('flex min-w-0 flex-col gap-6 rounded-lg py-10 wrap-anywhere', className)}
      {...props}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Years And Company */}
        <div className="flex w-full min-w-0 shrink-0 flex-col items-start gap-2 self-start sm:w-36">
          <span className="text-subtle flex max-w-full flex-wrap items-center gap-1.5 font-mono text-xs font-semibold">
            {format(experience.startDate, 'MMM yyyy')} –{' '}
            {experience.currentlyWorking ? (
              <Badge variant="outline">{t.experienceCard.present}</Badge>
            ) : (
              format(endDate, 'MMM yyyy')
            )}
          </span>
          <span className="text-muted-foreground/70 font-mono text-[11px]">{duration}</span>
          <span className="text-muted-foreground max-w-full text-[13px]">{experience.company}</span>
        </div>

        {/* Role, Description And Skills */}
        <div className="flex w-full max-w-lg min-w-0 flex-col items-start gap-2 sm:w-auto">
          <span className="text-foreground text-[15px] font-semibold">{experience.title}</span>
          <div className="text-subtle flex max-w-full flex-wrap items-center gap-2 font-mono text-[11px]">
            <span>{t.experienceType[experience.type]}</span>
            <span aria-hidden>·</span>
            <span>{experience.location}</span>
          </div>
          <p className="text-muted-foreground text-[13px]">{experience.description}</p>
          <div className="flex max-w-full flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-tag text-tag-foreground border-tag-border max-w-full min-w-0 rounded border px-2 py-1 font-mono text-[10px] font-semibold"
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
