interface GroupableExperience {
  id: string
  groupId?: string | null
  startDate: Date | string
}

export interface ExperienceEntry<T> {
  key: string
  positions: Array<T>
}

interface SummarizableExperience {
  startDate: Date | string
  endDate?: Date | string | null
  currentlyWorking: boolean
  type: string
  location?: string | null
}

export interface ExperienceGroupSummary<T extends SummarizableExperience> {
  start: Date
  /** null while any position is current. */
  end: Date | null
  /** Set only when every position shares it, so the card can lift it into the group header. */
  type?: T['type']
  location?: T['location']
}

function startTime(value: Date | string): number {
  const time = new Date(value).getTime()
  return Number.isFinite(time) ? time : -Infinity
}

/**
 * Anchor each explicit group at its first API occurrence, preserving curated
 * order outside groups. Null/missing membership (including old cached rows)
 * never merges records. Positions sort newest-start first; ties keep API order.
 * Records are retained by reference and the caller's array is never mutated.
 */
export function groupExperiences<T extends GroupableExperience>(
  experiences: ReadonlyArray<T>,
): Array<ExperienceEntry<T>> {
  const entries: Array<ExperienceEntry<T>> = []
  const groups = new Map<string, ExperienceEntry<T>>()

  for (const experience of experiences) {
    if (experience.groupId == null) {
      entries.push({ key: `experience:${experience.id}`, positions: [experience] })
      continue
    }

    let entry = groups.get(experience.groupId)
    if (!entry) {
      entry = { key: `group:${experience.groupId}`, positions: [] }
      groups.set(experience.groupId, entry)
      entries.push(entry)
    }
    entry.positions.push(experience)
  }

  for (const entry of groups.values()) {
    entry.positions.sort((a, b) => {
      const aTime = startTime(a.startDate)
      const bTime = startTime(b.startDate)
      return aTime === bTime ? 0 : aTime > bTime ? -1 : 1
    })
  }
  return entries
}

/**
 * Within one stint a later role supersedes an earlier one still flagged current
 * (a promotion), so only the newest current role reads as ongoing. Returns, per
 * input index, the start of the superseding role, or null when none applies.
 * Equal starts never supersede each other.
 */
export function supersededAt<
  T extends Pick<SummarizableExperience, 'startDate' | 'currentlyWorking'>,
>(positions: ReadonlyArray<T>): Array<T['startDate'] | null> {
  return positions.map((position) => {
    if (!position.currentlyWorking) return null
    const start = startTime(position.startDate)
    let next: T | undefined
    for (const other of positions) {
      const otherStart = startTime(other.startDate)
      if (otherStart > start && (!next || otherStart < startTime(next.startDate))) next = other
    }
    return next ? next.startDate : null
  })
}

/** Total tenure of one employment stint: earliest start to latest end, or ongoing. */
export function summarizeGroup<T extends SummarizableExperience>(
  positions: ReadonlyArray<T>,
): ExperienceGroupSummary<T> {
  const starts = positions.map((position) => startTime(position.startDate)).filter(Number.isFinite)
  const current = positions.some((position) => position.currentlyWorking)
  const ends = positions
    .map((position) => (position.endDate == null ? -Infinity : startTime(position.endDate)))
    .filter(Number.isFinite)
  const shared = <TKey extends 'type' | 'location'>(key: TKey) => {
    const first = positions[0]?.[key]
    return first && positions.every((position) => position[key] === first) ? first : undefined
  }
  return {
    start: new Date(starts.length ? Math.min(...starts) : Date.now()),
    end: current || !ends.length ? null : new Date(Math.max(...ends)),
    type: shared('type'),
    location: shared('location'),
  }
}
