import {
  addExperiencePositionSchema,
  createExperienceGroupSchema,
} from '@portofolio/schema/experience.schema'
import type { AddExperiencePositionInput } from '@portofolio/schema/experience.schema'
import z from 'zod'

// Keep UI strings intact until submission, including blank lines and trailing newlines.
const lines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
export const newPositionDefaults = (source: {
  location: string
  type: AddExperiencePositionInput['position']['type']
}) => ({
  stint: 'same' as 'same' | 'new',
  title: '',
  description: '',
  location: source.location,
  type: source.type,
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  skills: '',
  achievements: '',
  status: 'draft' as AddExperiencePositionInput['position']['status'],
})
export type NewPositionValues = ReturnType<typeof newPositionDefaults>
export function positionPayload(sourceId: string, { stint, ...value }: NewPositionValues) {
  return {
    sourceId,
    stint,
    position: {
      ...value,
      startDate: value.startDate ? `${value.startDate}T00:00:00.000Z` : '',
      endDate:
        value.endDate && !value.currentlyWorking ? `${value.endDate}T00:00:00.000Z` : undefined,
      skills: lines(value.skills),
      achievements: lines(value.achievements),
    },
  }
}
export const newPositionSchema = z
  .object({
    stint: z.enum(['same', 'new']),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    type: addExperiencePositionSchema.shape.position.shape.type,
    startDate: z.string(),
    endDate: z.string(),
    currentlyWorking: z.boolean(),
    skills: z.string(),
    achievements: z.string(),
    status: addExperiencePositionSchema.shape.position.shape.status.removeDefault(),
  })
  .superRefine((value, ctx) => {
    const parsed = addExperiencePositionSchema.shape.position.safeParse(
      positionPayload('', value).position,
    )
    if (!parsed.success)
      for (const issue of parsed.error.issues) {
        // API nesting and array indices have no equivalent in the flat text UI.
        const key = issue.path[0]
        ctx.addIssue({ code: 'custom', path: [String(key)], message: issue.message })
      }
  })

export const newGroupSchema = (company: () => string) =>
  z
    .object({
      label: createExperienceGroupSchema.shape.label,
    })
    .superRefine((_, ctx) => {
      const result = createExperienceGroupSchema.shape.company.safeParse(company())
      if (!result.success)
        for (const issue of result.error.issues) {
          ctx.addIssue({ code: 'custom', path: ['label'], message: issue.message })
        }
    })

// A committed write must never become a retryable save because refresh failed/hung.
export async function refreshAfterCommit(
  refresh: () => Promise<unknown>,
  onError: () => void,
  timeoutMs = 10000,
) {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      refresh(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('Refresh timed out')), timeoutMs)
      }),
    ])
  } catch {
    onError()
  } finally {
    clearTimeout(timer)
  }
}
