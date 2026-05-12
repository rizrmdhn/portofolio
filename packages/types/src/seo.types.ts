import type { ApplicationSettings } from "./application-settings.types";

export const SEO_PAGES = ["home", "projects", "certificates", "resume"] as const;
export type SeoPage = (typeof SEO_PAGES)[number];

export const SEO_PAGE_LABELS: Record<SeoPage, string> = {
  home: "Home",
  projects: "Projects",
  certificates: "Certificates",
  resume: "Resume",
};

export type SeoPageSettings = {
  title?: string | undefined;
  description?: string | undefined;
  ogImage?: string | undefined;
};

export type SeoSettingsJSONB = {
  pages: Record<SeoPage, SeoPageSettings>;
};

export type SeoSettingType = Omit<ApplicationSettings, "data"> & {
  data: SeoSettingsJSONB;
};
