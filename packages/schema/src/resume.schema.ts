import { RESUME_FONTS, RESUME_TEMPLATES } from "@portofolio/types/resume.types";
import z from "zod";

export const resumeSettingsSchema = z.object({
  template: z.enum(RESUME_TEMPLATES),
  accentColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g. #3b82f6)"),
  font: z.enum(RESUME_FONTS),
});

export type ResumeSettingsInput = z.infer<typeof resumeSettingsSchema>;
