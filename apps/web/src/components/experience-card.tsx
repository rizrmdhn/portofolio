import type { ExperienceEntry } from '@/lib/experience-groups'
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
  return (
    <div
      className={cn('flex min-w-0 flex-col gap-6 rounded-lg py-10 wrap-anywhere', className)}
      {...props}
    >
      <ExperiencePosition experience={experience} />
      <Separator />
    </div>
  )
}

export function ExperienceEntryCard({ entry }: { entry: ExperienceEntry<Experience> }) {
  const first = entry.positions[0]
  if (!first) return null
  if (entry.positions.length === 1) return <ExperienceCard experience={first} />

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-lg py-10 wrap-anywhere">
      <h3 className="text-foreground text-[15px] font-semibold">{first.company}</h3>
      <ol role="list" className="flex min-w-0 flex-col gap-8">
        {entry.positions.map((experience, index) => (
          <li key={experience.id} className="relative min-w-0 pl-5 sm:pl-6">
            <span
              aria-hidden="true"
              className={cn(
                'bg-border absolute top-1 left-0 w-px',
                index < entry.positions.length - 1 ? '-bottom-9' : 'bottom-0',
              )}
            />
            <span
              aria-hidden="true"
              className="border-border bg-background absolute top-1 left-[-3px] size-2 rounded-full border"
            />
            <ExperiencePosition experience={experience} grouped />
          </li>
        ))}
      </ol>
      <Separator />
    </div>
  )
}

function ExperiencePosition({
  experience,
  grouped = false,
}: {
  experience: Experience
  grouped?: boolean
}) {
  const { t } = useTranslations()
  const Heading = grouped ? 'h4' : 'h3'
  const endDate = experience.endDate ?? new Date()
  const duration = formatDuration(
    experience.startDate,
    experience.currentlyWorking ? new Date() : endDate,
    t.experienceCard,
  )

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <Heading className="text-foreground text-[15px] font-semibold">
            {experience.title}
          </Heading>
          {!grouped && <p className="text-foreground text-[13px]">{experience.company}</p>}
        </div>

        <div className="flex min-w-0 flex-col items-start gap-2">
          <span className="text-subtle flex max-w-full flex-wrap items-center gap-1.5 font-mono text-[11px]">
            {format(experience.startDate, 'MMM yyyy')} –{' '}
            {experience.currentlyWorking ? (
              <Badge variant="outline">{t.experienceCard.present}</Badge>
            ) : (
              format(endDate, 'MMM yyyy')
            )}
          </span>
          <span className="text-muted-foreground/70 font-mono text-[11px]">{duration}</span>
          <div className="text-subtle flex max-w-full flex-wrap items-center gap-2 font-mono text-[11px]">
            <span>{t.experienceType[experience.type]}</span>
            <span aria-hidden>·</span>
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg min-w-0 flex-col items-start gap-2">
        <p className="text-muted-foreground text-[13px]">{experience.description}</p>
        {!!experience.achievements.length && (
          <ul className="text-muted-foreground flex list-disc flex-col gap-1 pl-5 text-[13px]">
            {experience.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        )}
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
  )
}
