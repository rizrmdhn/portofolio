import { and, desc, eq, getColumns, gt, ilike, sql } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { projectViews, projects } from "@portofolio/db/schema/index";
import type {
  CreateProjectInput,
  GetProjectsInput,
  ReorderProjectsInput,
  UpdateProjectInput,
} from "@portofolio/schema/project.schema";
import type { PaginatedProjects } from "@portofolio/types/project.types";
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
    searchConditions: [
      input.search ? ilike(projects.title, `%${input.search}%`) : undefined,
    ],
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

export async function getProjectsForLandingPage() {
  const result = await db.query.projects.findMany({
    where: { isVisible: true, status: "published" },
    orderBy: {
      order: "asc",
    },
    limit: 7,
    with: { projectView: true },
  });

  const isMore = result.length > 6;

  return { data: result.slice(0, 6), isMore };
}

export async function getAllTimeViewsProjects() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const result = await db
    .select({
      ...getColumns(projects),
      views: sql<number>`coalesce(${projectViews.count}, 0)`,
    })
    .from(projects)
    .leftJoin(projectViews, eq(projects.id, projectViews.projectId))
    .where(
      and(
        eq(projects.isVisible, true),
        eq(projects.status, "published"),
        gt(projects.createdAt, thirtyDaysAgo.toISOString()),
      ),
    )
    .orderBy(desc(sql`coalesce(${projectViews.count}, 0)`))
    .limit(5);

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

export async function addImageUrlToProject(
  projectId: string,
  imageUrl: string,
) {
  const isExist = await getProjectById(projectId);

  if (!isExist) throw new NotFoundError(`Project`, projectId);

  const [result] = await db
    .update(projects)
    .set({ imageUrl })
    .where(eq(projects.id, projectId))
    .returning();

  if (!result) throw new QueryError("Failed to update project image");

  return result;
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

  return result;
}
