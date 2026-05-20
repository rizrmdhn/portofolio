import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { applicationSettings } from "@portofolio/db/schema/index";
import type { ViewAsType } from "@portofolio/types/view-as.types";
import { NotFoundError } from '@portofolio/errors';

export async function getViewAsSetting(): Promise<ViewAsType> {
  const setting = await db.query.applicationSettings.findFirst({
    where: {
      key: "viewAs",
    },
  });

  if (!setting) throw new NotFoundError("ApplicationSetting", "viewAs");

  return setting as ViewAsType;
}

export async function setViewAsSetting(
  value: ViewAsType["data"],
): Promise<ViewAsType> {
  const existingSetting = await db.query.applicationSettings.findFirst({
    where: {
      key: "viewAs",
    },
  });

  if (existingSetting) {
    const [updatedSetting] = await db
      .update(applicationSettings)
      .set({ data: value })
      .where(eq(applicationSettings.id, existingSetting.id))
      .returning();

    return updatedSetting as ViewAsType;
  }

  const [newSetting] = await db
    .insert(applicationSettings)
    .values({
      key: "viewAs",
      data: value,
    })
    .returning();

  return newSetting as ViewAsType;
}
