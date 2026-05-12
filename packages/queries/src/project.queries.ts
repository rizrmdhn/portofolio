import {
  and,
  count,
  desc,
  eq,
  getColumns,
  gt,
  ilike,
  isNotNull,
  sql,
} from "@portofolio/db";
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
      featureAt: "asc",
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
    where: { id },
    with: { projectView: true },
  });

  if (!project) throw new NotFoundError(`Project`, id);

  return project;
}

async function countFeaturedProjects() {
  const [result] = await db
    .select({ count: count() })
    .from(projects)
    .where(isNotNull(projects.featureAt));

  return result?.count ?? 0;
}

export async function createProject(data: CreateProjectInput) {
  const { featured, ...rest } = data;
  const slug = toUniqueSlug(rest.title);

  if (featured) {
    const featuredCount = await countFeaturedProjects();

    if (featuredCount >= 5) {
      throw new QueryError(
        "Cannot create project. There are already 5 featured projects.",
      );
    }
  }

  const [project] = await db
    .insert(projects)
    .values({
      ...rest,
      slug,
      featureAt: featured ? new Date().toISOString() : null,
    })
    .returning();

  if (!project) throw new QueryError("Failed to create project");

  await createProjectView(project.id);

  return project;
}

export async function updateProjectImageUrl(
  id: string,
  imageUrl: string | null,
) {
  const [result] = await db
    .update(projects)
    .set({ imageUrl })
    .where(eq(projects.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to update project image");

  return result;
}

export async function updateProject(data: UpdateProjectInput) {
  const { featured, id, ...rest } = data;
  const existing = await getProjectById(id);

  if (featured && !existing.featureAt) {
    const featuredCount = await countFeaturedProjects();

    if (featuredCount >= 5) {
      throw new QueryError(
        "Cannot feature project. There are already 5 featured projects.",
      );
    }
  }

  const featureAt = featured
    ? (existing.featureAt ?? new Date().toISOString())
    : null;

  const [result] = await db
    .update(projects)
    .set({ ...rest, featureAt })
    .where(eq(projects.id, id))
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

export async function deleteProject(id: string) {
  await getProjectById(id);

  const [result] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete project");

  return result;
}
