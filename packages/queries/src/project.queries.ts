import { eq, getColumns } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { projectViews, projects } from "@portofolio/db/schema/index";
import type {
  CreateProjectInput,
  GetProjectsInput,
  ReorderProjectsInput,
  UpdateProjectInput,
} from "@portofolio/schema/project.schema";
import type { PaginatedProjects } from "@portofolio/types/project.types";
import utapi from "@portofolio/uploadthing";
import { toUniqueSlug } from "@portofolio/utils/slug";
import { NotFoundError, QueryError } from "./errors";
import { createProjectView } from "./project-views.queries";
import { getOffsetPaginated } from "./utils/get-offset-paginated";

export async function getPaginatedProjects(input: GetProjectsInput) {
  return getOffsetPaginated<typeof projects, PaginatedProjects>({
    table: projects,
    input,
    select: {
      ...getColumns(projects),
      views: projectViews.count,
    },
    joins: [
      {
        type: "left",
        table: projectViews,
        on: eq(projects.id, projectViews.projectId),
      },
    ],
  });
}

export async function getAllProjects() {
  const result = await db.query.projects.findMany({
    where: { isVisible: true, status: "published" },
    orderBy: {
      order: "asc",
    },
    with: { projectView: true },
  });

  return result;
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

export async function reorderProjects(items: ReorderProjectsInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of items) {
      await tx.update(projects).set({ order }).where(eq(projects.id, id));
    }
  });
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
