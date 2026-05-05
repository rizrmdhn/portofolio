import type { ApplicationSettings } from "./application-settings.types";

export enum ViewAsViewType {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export type ViewAsJSONB = {
  value: ViewAsViewType;
};

export type ViewAsType = Omit<ApplicationSettings, "data"> & {
  data: ViewAsJSONB;
};
