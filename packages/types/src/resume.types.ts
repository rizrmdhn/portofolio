import type { ApplicationSettings } from "./application-settings.types";

export const RESUME_TEMPLATES = ["ats", "creative"] as const;
export type ResumeTemplate = (typeof RESUME_TEMPLATES)[number];

export const RESUME_FONTS = ["Liberation Sans", "Inter", "Arimo"] as const;
export type ResumeFont = (typeof RESUME_FONTS)[number];

export const RESUME_FONT_LABELS: Record<ResumeFont, string> = {
  "Liberation Sans": "Liberation Sans (Arial-compatible)",
  Inter: "Inter (Modern)",
  Arimo: "Arimo (Google Fonts)",
};

export type ResumeSettingsJSONB = {
  template: ResumeTemplate;
  accentColor: string; // hex e.g. "#3b82f6"
  font: ResumeFont;
  summary?: string;
};

export type ResumeSettingType = Omit<ApplicationSettings, "data"> & {
  data: ResumeSettingsJSONB;
};
