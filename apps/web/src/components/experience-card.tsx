import type { ExperienceEntry } from '@/lib/experience-groups'
import { useTranslations } from '@/i18n/locale-context'
import { cn } from '@/lib/utils'
import type { Messages } from '@portofolio/i18n'
import type { Experience } from '@portofolio/types/experience.types'
import { format, intervalToDuration } from 'date-fns'
import { Badge } from './ui/badge'

interface ExperienceCardProps extends React.HTMLAttributes<HTMLElement> {
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
    <article
      className={cn(
        'border-border bg-card flex min-w-0 flex-col rounded-lg border p-4 wrap-anywhere sm:p-5',
        className,
      )}
      {...props}
    >
      <ExperiencePosition experience={experience} />
    </article>
  )
}

export function ExperienceEntryCard({ entry }: { entry: ExperienceEntry<Experience> }) {
  const first = entry.positions[0]
  if (!first) return null
  if (entry.positions.length === 1) return <ExperienceCard experience={first} />
  return (
    <article className="border-border bg-card flex min-w-0 flex-col gap-4 rounded-lg border p-4 wrap-anywhere sm:p-5">
      <h3 className="text-foreground text-base leading-6 font-semibold">{first.company}</h3>
      <ol role="list" className="flex min-w-0 flex-col gap-6">
        {entry.positions.map((experience, index) => (
          <li key={experience.id} className="relative min-w-0 pl-5 sm:pl-6">
            {/* Connect heading centers, including the gap-6 between roles. */}
            {index < entry.positions.length - 1 && (
              <span
                aria-hidden="true"
                className="bg-border absolute top-3 -bottom-9 left-[3.5px] w-px"
              />
            )}
            <span
              aria-hidden="true"
              className="border-border bg-card absolute top-2 left-0 size-2 rounded-full border"
            />
            <ExperiencePosition experience={experience} grouped />
          </li>
        ))}
      </ol>
    </article>
  )
}

function ExperiencePosition({
  experience,
  grouped = false,
}: {
  // Older cached records may predate the achievements field.
  experience: Omit<Experience, 'achievements'> & { achievements?: Experience['achievements'] }
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
    <div className="flex min-w-0 flex-col gap-3">
      <header className="flex min-w-0 flex-col items-start gap-2">
        <div className="flex min-w-0 flex-col gap-1">
          <Heading className="text-foreground text-base leading-6 font-semibold">
            {experience.title}
          </Heading>
          {!grouped && <p className="text-foreground text-sm leading-6">{experience.company}</p>}
        </div>
        <div className="text-muted-foreground flex min-w-0 flex-col gap-1 text-sm leading-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
              <time dateTime={format(experience.startDate, 'yyyy-MM')}>
                {format(experience.startDate, 'MMM yyyy')}
              </time>
              <span>&ndash;</span>
              {experience.currentlyWorking ? (
                <Badge variant="outline" className="h-auto max-w-full min-w-0 whitespace-normal">
                  {t.experienceCard.present}
                </Badge>
              ) : (
                <time dateTime={format(endDate, 'yyyy-MM')}>{format(endDate, 'MMM yyyy')}</time>
              )}
            </span>
            <span>({duration})</span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t.experienceType[experience.type]}</span>
            {experience.location && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{experience.location}</span>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="flex w-full min-w-0 flex-col items-start gap-3">
        <p className="text-muted-foreground text-sm leading-6">{experience.description}</p>
        {!!experience.achievements?.length && (
          <ul className="text-muted-foreground flex max-w-full min-w-0 list-disc flex-col gap-1 pl-5 text-sm leading-6">
            {experience.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        )}
        {!!experience.skills.length && (
          <div className="flex max-w-full min-w-0 flex-wrap gap-1.5 font-mono">
            {experience.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="h-auto max-w-full min-w-0 whitespace-normal"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
