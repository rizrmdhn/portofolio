import type { InferSelectModel } from '@portofolio/db'
import type { experienceGroups, experiences } from '@portofolio/db/schema/index'

export type Experience = InferSelectModel<typeof experiences>

export type ExperienceGroup = InferSelectModel<typeof experienceGroups>
