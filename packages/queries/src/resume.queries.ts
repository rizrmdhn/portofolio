import { eq, sql } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { applicationSettings } from "@portofolio/db/schema/index";
import type {
  ResumeSettingsJSONB,
  ResumeSettingType,
} from "@portofolio/types/resume.types";

const RESUME_SETTINGS_KEY = "resume-settings";
const RESUME_DOWNLOAD_COUNT_KEY = "resume-download-count";

const DEFAULT_SETTINGS: ResumeSettingsJSONB = {
  template: "ats",
  accentColor: "#3b82f6",
  font: "Liberation Sans",
};

// ─── Resume Settings ──────────────────────────────────────────────────────────

export async function getResumeSettings(): Promise<ResumeSettingsJSONB> {
  const row = await db.query.applicationSettings.findFirst({
    where: { key: RESUME_SETTINGS_KEY },
  });

  if (!row) return DEFAULT_SETTINGS;

  return row.data as ResumeSettingsJSONB;
}

export async function setResumeSettings(
  value: ResumeSettingsJSONB,
): Promise<ResumeSettingType> {
  const existing = await db.query.applicationSettings.findFirst({
    where: { key: RESUME_SETTINGS_KEY },
  });

  if (existing) {
    const [updated] = await db
      .update(applicationSettings)
      .set({ data: value })
      .where(eq(applicationSettings.id, existing.id))
      .returning();

    return updated as ResumeSettingType;
  }

  const [created] = await db
    .insert(applicationSettings)
    .values({ key: RESUME_SETTINGS_KEY, data: value })
    .returning();

  return created as ResumeSettingType;
}

// ─── Download Count ───────────────────────────────────────────────────────────

export async function getResumeDownloadCount(): Promise<number> {
  const row = await db.query.applicationSettings.findFirst({
    where: { key: RESUME_DOWNLOAD_COUNT_KEY },
  });

  if (!row) return 0;

  return (row.data as { count: number }).count;
}

export async function incrementResumeDownloadCount(): Promise<number> {
  const existing = await db.query.applicationSettings.findFirst({
    where: { key: RESUME_DOWNLOAD_COUNT_KEY },
  });

  if (existing) {
    const [updated] = await db
      .update(applicationSettings)
      .set({
        data: sql`jsonb_set(${applicationSettings.data}, '{count}',
          (COALESCE((${applicationSettings.data}->>'count')::int, 0) + 1)::text::jsonb)`,
      })
      .where(eq(applicationSettings.id, existing.id))
      .returning();

    return ((updated?.data as { count: number }) ?? { count: 0 }).count;
  }

  const [created] = await db
    .insert(applicationSettings)
    .values({ key: RESUME_DOWNLOAD_COUNT_KEY, data: { count: 1 } })
    .returning();

  return ((created?.data as { count: number }) ?? { count: 1 }).count;
}
