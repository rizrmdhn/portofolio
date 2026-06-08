import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { applicationSettings } from "@portofolio/db/schema/index";
import type { CVSettingType } from "@portofolio/types/cv.types";
import { insertReturning, updateReturning } from "./utils/returning";

const CV_SETTING_KEY = "cv";

export async function getCVSetting(): Promise<CVSettingType | null> {
  const setting = await db.query.applicationSettings.findFirst({
    where: {
      key: CV_SETTING_KEY,
    },
  });

  if (!setting) {
    return null;
  }

  return setting as CVSettingType;
}

export async function setCVSetting(
  value: CVSettingType["data"],
): Promise<CVSettingType> {
  const existingSetting = await db.query.applicationSettings.findFirst({
    where: {
      key: CV_SETTING_KEY,
    },
  });

  if (existingSetting) {
    const updatedSetting = await updateReturning(
      db,
      applicationSettings,
      { data: value },
      eq(applicationSettings.id, existingSetting.id),
    );

    return updatedSetting as CVSettingType;
  }

  const newSetting = await insertReturning(db, applicationSettings, {
    key: CV_SETTING_KEY,
    data: value,
  });

  return newSetting as CVSettingType;
}
