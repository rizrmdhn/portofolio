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
      className={cn('flex min-w-0 flex-col gap-4 rounded-lg py-6 wrap-anywhere', className)}
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
    <div className="flex min-w-0 flex-col gap-4 rounded-lg py-6 wrap-anywhere">
      <h3 className="text-foreground text-[15px] leading-6 font-semibold">{first.company}</h3>
      <ol role="list" className="flex min-w-0 flex-col gap-5">
        {entry.positions.map((experience, index) => (
          <li key={experience.id} className="relative min-w-0 pl-5 sm:pl-6">
            {/* Join heading centers across the role body and the list's gap-5. */}
            {index < entry.positions.length - 1 && (
              <span
                aria-hidden="true"
                className="bg-border absolute top-3 -bottom-8 left-[3.5px] w-px"
              />
            )}
            <span
              aria-hidden="true"
              className="border-border bg-background absolute top-2 left-0 size-2 rounded-full border"
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
    <div className="flex min-w-0 flex-col gap-3">
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_12rem] sm:gap-4">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <Heading className="text-foreground text-[15px] leading-6 font-semibold">
            {experience.title}
          </Heading>
          {!grouped && <p className="text-foreground text-[13px]">{experience.company}</p>}
        </div>

        <div className="text-muted-foreground flex min-w-0 flex-col items-start gap-1 font-mono text-xs">
          <span className="flex max-w-full min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
            {format(experience.startDate, 'MMM yyyy')} –{' '}
            {experience.currentlyWorking ? (
              <Badge variant="outline" className="h-auto max-w-full min-w-0 whitespace-normal">
                {t.experienceCard.present}
              </Badge>
            ) : (
              format(endDate, 'MMM yyyy')
            )}
          </span>
          <span>{duration}</span>
          <div className="flex max-w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="min-w-0">{t.experienceType[experience.type]}</span>
            <span aria-hidden>·</span>
            <span className="min-w-0">{experience.location}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg min-w-0 flex-col items-start gap-2">
        <p className="text-muted-foreground text-[13px]">{experience.description}</p>
        {!!experience.achievements.length && (
          <ul className="text-muted-foreground flex max-w-full min-w-0 list-disc flex-col gap-1 pl-5 text-[13px]">
            {experience.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        )}
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
      </div>
    </div>
  )
}
