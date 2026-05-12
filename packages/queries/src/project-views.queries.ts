import { db } from "@portofolio/db/client";
import { viewEvents } from "@portofolio/db/schema/index";
import { NotFoundError } from "./errors";
import { getProjectById } from "./project.queries";

export async function incrementViews(projectId: string): Promise<void> {
  const isExist = await getProjectById(projectId);

  if (!isExist) throw new NotFoundError(`Project`, projectId);

  await db.insert(viewEvents).values({ projectId });
}
