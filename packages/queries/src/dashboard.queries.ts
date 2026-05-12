import { count, gte, sql, sum } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import {
  certifications,
  experiences,
  projectViews,
  projects,
  techStackCategories,
  techStackItems,
  viewEvents,
} from "@portofolio/db/schema/index";
import { getRecentActivity } from "./activity-log.queries";

export type ViewRange = "7d" | "30d" | "90d";

export async function getViewEventsByRange(range: ViewRange) {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const since = new Date();
  since.setDate(since.getDate() - days);

  const rows = await db
    .select({
      date: sql<string>`DATE(${viewEvents.viewedAt})`.as("date"),
      views: count(),
    })
    .from(viewEvents)
    .where(gte(viewEvents.viewedAt, since.toISOString()))
    .groupBy(sql`DATE(${viewEvents.viewedAt})`)
    .orderBy(sql`DATE(${viewEvents.viewedAt})`);

  const filled: { date: string; views: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = rows.find((r) => r.date === dateStr);
    filled.push({ date: dateStr, views: found ? Number(found.views) : 0 });
  }

  return filled;
}

export { getRecentActivity };

export async function getDashboardStats() {
  const [[totalViewsRow], [projectCount], [experienceCount], [certCount], [stackCategoryCount], [stackItemCount]] =
    await Promise.all([
      db.select({ total: sum(projectViews.count) }).from(projectViews),
      db.select({ total: count() }).from(projects),
      db.select({ total: count() }).from(experiences),
      db.select({ total: count() }).from(certifications),
      db.select({ total: count() }).from(techStackCategories),
      db.select({ total: count() }).from(techStackItems),
    ]);

  return {
    totalProjectViews: Number(totalViewsRow?.total ?? 0),
    counts: {
      projects: projectCount?.total ?? 0,
      experiences: experienceCount?.total ?? 0,
      certifications: certCount?.total ?? 0,
      techStackCategories: stackCategoryCount?.total ?? 0,
      techStackItems: stackItemCount?.total ?? 0,
    },
  };
}
