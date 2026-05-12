import { db } from '@portofolio/db/client'
import { viewEvents } from '@portofolio/db/schema/index'
import { getProjectById } from './project.queries'

export async function incrementViews(projectId: string): Promise<void> {
  await getProjectById(projectId)

  await db.insert(viewEvents).values({ projectId })
}
