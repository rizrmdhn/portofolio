import { summarizeGroup, supersededAt } from '@/lib/experience-groups'
import type { ExperienceEntry } from '@/lib/experience-groups'
import { useLocale, useTranslations } from '@/i18n/locale-context'
import { cn } from '@/lib/utils'
import type { Messages } from '@portofolio/i18n'
import type { Experience } from '@portofolio/types/experience.types'
import { format, intervalToDuration } from 'date-fns'
import { enUS, id } from 'date-fns/locale'
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
  const { t } = useTranslations()
  const first = entry.positions[0]
  if (!first) return null
  if (entry.positions.length === 1) return <ExperienceCard experience={first} />
  const summary = summarizeGroup(entry.positions)
  const endedAt = supersededAt(entry.positions)
  return (
    <article className="border-border bg-card flex min-w-0 flex-col gap-4 rounded-lg border p-4 wrap-anywhere sm:p-5">
      <header className="flex min-w-0 flex-col gap-1">
        <h3 className="text-foreground text-base leading-6 font-semibold">{first.company}</h3>
        <MetaLine
          items={[
            summary.type && t.experienceType[summary.type],
            formatDuration(summary.start, summary.end ?? new Date(), t.experienceCard),
            summary.location,
          ]}
        />
      </header>
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
            <ExperiencePosition
              experience={experience}
              grouped
              endedAt={endedAt[index]}
              // Shared type/location already sits in the group header.
              showType={!summary.type}
              showLocation={!summary.location}
            />
          </li>
        ))}
      </ol>
    </article>
  )
}

function MetaLine({ items, className }: { items: Array<React.ReactNode>; className?: string }) {
  const visible = items.filter(Boolean)
  if (!visible.length) return null
  return (
    <p
      className={cn(
        'text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6',
        className,
      )}
    >
      {visible.map((item, index) => (
        <span key={index} className="contents">
          {index > 0 && <span aria-hidden="true">&middot;</span>}
          <span className="min-w-0">{item}</span>
        </span>
      ))}
    </p>
  )
}

function ExperiencePosition({
  experience,
  grouped = false,
  showType = true,
  showLocation = true,
  endedAt,
}: {
  // Older cached records may predate the achievements field.
  experience: Omit<Experience, 'achievements'> & { achievements?: Experience['achievements'] }
  grouped?: boolean
  showType?: boolean
  showLocation?: boolean
  /** Start of a later role in the same stint; ends a role still flagged current. */
  endedAt?: string | null
}) {
  const { t } = useTranslations()
  const dateLocale = useLocale() === 'id' ? id : enUS
  const Heading = grouped ? 'h4' : 'h3'
  const current = experience.currentlyWorking && !endedAt
  const endDate = endedAt ?? experience.endDate ?? new Date()
  const duration = formatDuration(
    experience.startDate,
    current ? new Date() : endDate,
    t.experienceCard,
  )
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {/* Title and company on the left; dates and role metadata align right from sm. */}
      <header className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <Heading className="text-foreground text-base leading-6 font-semibold">
            {experience.title}
          </Heading>
          {!grouped && <p className="text-foreground text-sm leading-6">{experience.company}</p>}
        </div>
        <div className="flex min-w-0 flex-col gap-1 sm:shrink-0 sm:items-end">
          <p className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-6 sm:justify-end">
            <time dateTime={format(experience.startDate, 'yyyy-MM')}>
              {format(experience.startDate, 'MMM yyyy', { locale: dateLocale })}
            </time>
            <span aria-hidden="true">&ndash;</span>
            {current ? (
              <Badge variant="outline">{t.experienceCard.present}</Badge>
            ) : (
              <time dateTime={format(endDate, 'yyyy-MM')}>
                {format(endDate, 'MMM yyyy', { locale: dateLocale })}
              </time>
            )}
            <span>({duration})</span>
          </p>
          <MetaLine
            className="sm:justify-end"
            items={[
              showType && t.experienceType[experience.type],
              showLocation && experience.location,
            ]}
          />
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
