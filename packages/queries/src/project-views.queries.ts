import { eq } from "@portofolio/db";
import { db, sql } from "@portofolio/db/client";
import { projectViews } from "@portofolio/db/schema/index";
import { QueryError } from "./errors";

export async function incrementViews(projectId: string): Promise<void> {
  await db
    .update(projectViews)
    .set({
      count: sql`${projectViews.count} + 1`,
    })
    .where(eq(projectViews.projectId, projectId));
}

export async function getViews(projectId: string): Promise<number> {
  const views = await db.query.projectViews.findFirst({
    where: {
      projectId,
    },
  });

  return views?.count || 0;
}

export async function createProjectView(projectId: string): Promise<void> {
  const [projectView] = await db
    .insert(projectViews)
    .values({
      projectId,
      count: 0,
    })
    .returning()
    .execute();

  if (!projectView) throw new QueryError("Failed to create project view");
}
