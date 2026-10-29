interface GroupableExperience {
  id: string
  groupId?: string | null
  startDate: Date | string
}

export interface ExperienceEntry<T> {
  key: string
  positions: Array<T>
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
