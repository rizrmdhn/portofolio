import { and, count, desc, eq, getColumns, gte, isNotNull, sql } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import { projectTranslations, projects, viewEvents } from '@portofolio/db/schema/index'
import { NotFoundError, QueryError } from '@portofolio/errors'
import type { Locale } from '@portofolio/i18n'
import { DEFAULT_LOCALE } from '@portofolio/i18n'
import type {
  CreateProjectInput,
  GetProjectsInput,
  ReorderProjectsInput,
  UpdateProjectInput,
} from '@portofolio/schema/project.schema'
import type { PaginatedProjects } from '@portofolio/types/project.types'
import { toUniqueSlug } from '@portofolio/utils/slug'
import { ciLike } from './utils/dialect'
import { getOffsetPaginated } from './utils/get-offset-paginated'
import { deleteReturning, insertReturning, updateReturning } from './utils/returning'

export async function getPaginatedProjects(input: GetProjectsInput) {
  return getOffsetPaginated<typeof projects, PaginatedProjects>({
    table: projects,
    input,
    select: {
      ...getColumns(projects),
      views: sql<number>`(select count(*) from ${viewEvents} where ${viewEvents.projectId} = ${projects.id})`,
    },
    searchConditions: [input.search ? ciLike(projects.title, `%${input.search}%`) : undefined],
  })
}

// Coalesced text columns: a matching `<locale>` translation overrides the base
// (English) copy; missing translations fall back to base. `projects` columns are
// spread first, then these keys overwrite title/description/longDescription so
// the row shape stays identical regardless of locale. The translation join is
// added for every locale (it simply matches nothing for the default), keeping a
// single code path. Grouped queries must also group by the joined columns.
const localizedProjectText = {
  title: sql<string>`coalesce(${projectTranslations.title}, ${projects.title})`,
  description: sql<string>`coalesce(${projectTranslations.description}, ${projects.description})`,
  longDescription: sql<
    string | null
  >`coalesce(${projectTranslations.longDescription}, ${projects.longDescription})`,
}

const projectTranslationGroupBy = [
  projectTranslations.title,
  projectTranslations.description,
  projectTranslations.longDescription,
] as const

function projectTranslationJoin(locale: Locale) {
  return and(eq(projectTranslations.projectId, projects.id), eq(projectTranslations.locale, locale))
}

export async function getAllProjects(locale: Locale = DEFAULT_LOCALE) {
  const result = await db
    .select({
      ...getColumns(projects),
      ...localizedProjectText,
      viewCount: count(viewEvents.id),
    })
    .from(projects)
    .leftJoin(viewEvents, eq(viewEvents.projectId, projects.id))
    .leftJoin(projectTranslations, projectTranslationJoin(locale))
    .where(and(eq(projects.isVisible, true), eq(projects.status, 'published')))
    .groupBy(projects.id, ...projectTranslationGroupBy)
    .orderBy(projects.order)

  return result
}

export async function getProjectsForLandingPage(locale: Locale = DEFAULT_LOCALE) {
  const result = await db
    .select({
      ...getColumns(projects),
      ...localizedProjectText,
      viewCount: count(viewEvents.id),
    })
    .from(projects)
    .leftJoin(viewEvents, eq(viewEvents.projectId, projects.id))
    .leftJoin(projectTranslations, projectTranslationJoin(locale))
    .where(and(eq(projects.isVisible, true), eq(projects.status, 'published')))
    .groupBy(projects.id, ...projectTranslationGroupBy)
    .orderBy(projects.featureAt, projects.order)
    .limit(7)

  const isMore = result.length > 6

  return { data: result.slice(0, 6), isMore }
}

export async function getAllTimeViewsProjects() {
  const now = new Date()

  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(now.getDate() - 30)

  const sixtyDaysAgo = new Date(now)
  sixtyDaysAgo.setDate(now.getDate() - 60)

  const currentViews =
    sql<number>`count(CASE WHEN ${viewEvents.viewedAt} >= ${thirtyDaysAgo.toISOString()} THEN ${viewEvents.id} END)`.mapWith(
      Number,
    )
  const previousViews =
    sql<number>`count(CASE WHEN ${viewEvents.viewedAt} >= ${sixtyDaysAgo.toISOString()} AND ${viewEvents.viewedAt} < ${thirtyDaysAgo.toISOString()} THEN ${viewEvents.id} END)`.mapWith(
      Number,
    )

  const result = await db
    .select({
      id: projects.id,
      title: projects.title,
      views: currentViews,
      previousViews,
    })
    .from(projects)
    .leftJoin(
      viewEvents,
      and(
        eq(projects.id, viewEvents.projectId),
        gte(viewEvents.viewedAt, sixtyDaysAgo.toISOString()),
      ),
    )
    .where(and(eq(projects.isVisible, true), eq(projects.status, 'published')))
    .groupBy(projects.id, projects.title)
    .orderBy(desc(currentViews))
    .limit(5)

  return result
}

export async function getProjectById(id: string) {
  const project = await db.query.projects.findFirst({
    where: { id },
  })

  if (!project) throw new NotFoundError(`Project`, id)

  return project
}

export async function getProjectBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const [result] = await db
    .select({
      ...getColumns(projects),
      ...localizedProjectText,
      viewCount: count(viewEvents.id),
    })
    .from(projects)
    .leftJoin(viewEvents, eq(viewEvents.projectId, projects.id))
    .leftJoin(projectTranslations, projectTranslationJoin(locale))
    .where(
      and(eq(projects.slug, slug), eq(projects.status, 'published'), eq(projects.isVisible, true)),
    )
    .groupBy(projects.id, ...projectTranslationGroupBy)
    .limit(1)

  if (!result) throw new NotFoundError(`Project`, slug)

  return result
}

async function countFeaturedProjects() {
  const [result] = await db
    .select({ count: count() })
    .from(projects)
    .where(isNotNull(projects.featureAt))

  return result?.count ?? 0
}

export async function createProject(data: Omit<CreateProjectInput, 'pictures'>) {
  const { featured, ...rest } = data
  const slug = toUniqueSlug(rest.title)

  if (featured) {
    const featuredCount = await countFeaturedProjects()

    if (featuredCount >= 5) {
      throw new QueryError('Cannot create project. There are already 5 featured projects.')
    }
  }

  const project = await insertReturning(db, projects, {
    ...rest,
    slug,
    featureAt: featured ? new Date().toISOString() : null,
  })

  if (!project) throw new QueryError('Failed to create project')

  return project
}

export async function updateProjectImageUrl(id: string, imageUrl: string | null) {
  const result = await updateReturning(db, projects, { imageUrl }, eq(projects.id, id))

  if (!result) throw new QueryError('Failed to update project image')

  return result
}

export async function updateProject(data: Omit<UpdateProjectInput, 'pictures'>) {
  const { featured, id, ...rest } = data
  const existing = await getProjectById(id)

  if (featured && !existing.featureAt) {
    const featuredCount = await countFeaturedProjects()

    if (featuredCount >= 5) {
      throw new QueryError('Cannot feature project. There are already 5 featured projects.')
    }
  }

  const featureAt = featured ? (existing.featureAt ?? new Date().toISOString()) : null

  const result = await updateReturning(db, projects, { ...rest, featureAt }, eq(projects.id, id))

  if (!result) throw new QueryError('Failed to update project')

  return result
}

export async function reorderProjects(items: ReorderProjectsInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of items) {
      await tx.update(projects).set({ order }).where(eq(projects.id, id))
    }
  })
}

export async function deleteProject(id: string) {
  await getProjectById(id)

  const result = await deleteReturning(db, projects, eq(projects.id, id))

  if (!result) throw new QueryError('Failed to delete project')

  return result
}

export async function toggleProjectFeaturedAtResume(id: string, value: boolean) {
  const result = await updateReturning(
    db,
    projects,
    { featuredAtResume: value },
    eq(projects.id, id),
  )

  if (!result) throw new QueryError('Failed to update project featuredAtResume')

  return result
}
