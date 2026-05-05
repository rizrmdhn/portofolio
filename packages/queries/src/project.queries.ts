import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { projects } from "@portofolio/db/schema/index";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@portofolio/schema/project.schema";
import utapi from "@portofolio/uploadthing";
import { toUniqueSlug } from "@portofolio/utils/slug";
import { NotFoundError, QueryError } from "./errors";
import { createProjectView } from "./project-views.queries";

export async function getAllProjects() {
  const projects = await db.query.projects.findMany({
    orderBy: {
      order: "desc",
    },
    with: { projectView: true },
  });

  return projects;
}

export async function getProjectById(id: string) {
  const project = await db.query.projects.findFirst({
    where: {
      id,
    },
    with: { projectView: true },
  });

  if (!project) throw new NotFoundError(`Project`, id);

  return project;
}

export async function createProject(data: CreateProjectInput) {
  const slug = toUniqueSlug(data.title);

  const [project] = await db
    .insert(projects)
    .values({ ...data, slug })
    .returning();

  if (!project) throw new QueryError("Failed to create project");

  await createProjectView(project.id);

  return project;
}

export async function updateProject(data: UpdateProjectInput) {
  const isExist = await getProjectById(data.id);

  if (!isExist) throw new NotFoundError(`Project`, data.id);

  const [result] = await db
    .update(projects)
    .set({ ...data })
    .where(eq(projects.id, data.id))
    .returning();

  if (!result) throw new QueryError("Failed to update project");

  return result;
}

export async function insertImageToProject(
  id: string,
  image_url: string | null,
) {
  const isExist = await getProjectById(id);

  if (!isExist) throw new NotFoundError(`Project`, id);

  const [result] = await db
    .update(projects)
    .set({ imageUrl: image_url })
    .where(eq(projects.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to update project image");

  return result;
}

export async function deleteProject(id: string) {
  const isExist = await getProjectById(id);

  if (!isExist) throw new NotFoundError(`Project`, id);

  const [result] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete project");

  if (result.imageUrl) {
    const imageFiles = result.imageUrl.split("/").pop();

    if (!imageFiles) throw new QueryError("Failed to delete project image");

    await utapi.deleteFiles(imageFiles);
  }

  return result;
}
