import type { ApplicationSettings } from "./application-settings.types";

export type CVJSONB = {
  url: string;
  fileKey: string;
  uploadedAt: string;
};

export type CVSettingType = Omit<ApplicationSettings, "data"> & {
  data: CVJSONB;
};
