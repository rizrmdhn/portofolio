import type { AddExperiencePositionInput } from '@portofolio/schema/experience.schema'
import { createExperienceGroupSchema } from '@portofolio/schema/experience.schema'
import { NotFoundError, QueryError, ValidationError } from '@portofolio/errors'
import { experienceGroupIssue } from '@portofolio/db/experience-group'
import type { experienceGroups, experiences } from '@portofolio/db/schema/index'
import type { InferSelectModel } from '@portofolio/db'

type Experience = InferSelectModel<typeof experiences>
type Group = InferSelectModel<typeof experienceGroups>

/** Every operation runs on one transaction. lockSource must SELECT ... FOR UPDATE.
 * Serializing on the source prevents concurrent first additions from splitting its group.
 */
export interface PositionTransaction {
  lockSource: (id: string) => Promise<Experience | undefined>
  getGroup: (id: string) => Promise<Group | undefined>
  createGroup: (data: { company: string; label: string }) => Promise<Group | undefined>
  attachSource: (id: string, groupId: string) => Promise<unknown>
  insertPosition: (
    data: AddExperiencePositionInput['position'] & {
      company: string
      groupId: string
      order: number
    },
  ) => Promise<Experience | undefined>
}

export async function addPositionInTransaction(
  tx: PositionTransaction,
  input: AddExperiencePositionInput,
) {
  const source = await tx.lockSource(input.sourceId)
  if (!source) throw new NotFoundError('Experience', input.sourceId)
  let group = source.groupId ? await tx.getGroup(source.groupId) : undefined
  const issue = experienceGroupIssue(source.groupId, source.company, group)
  if (issue === 'missing') throw new NotFoundError('Experience group', source.groupId!)
  if (issue === 'company')
    throw new ValidationError('The employment group must belong to the saved company.', 'groupId')
  if (input.stint === 'new' || !group) {
    const year = (input.stint === 'same' ? source.startDate : input.position.startDate).slice(0, 4)
    const data = createExperienceGroupSchema.parse({
      company: source.company,
      label: `Employment from ${year}`,
    })
    group = await tx.createGroup(data)
    if (!group) throw new QueryError('Failed to create employment group')
    if (input.stint === 'same') await tx.attachSource(source.id, group.id)
  }
  const experience = await tx.insertPosition({
    ...input.position,
    company: source.company,
    groupId: group.id,
    order: 0,
  })
  if (!experience) throw new QueryError('Failed to add position')
  return {
    experience,
    group,
    sourceId: source.id,
    sourceGroupId: input.stint === 'same' ? group.id : source.groupId,
  }
}
