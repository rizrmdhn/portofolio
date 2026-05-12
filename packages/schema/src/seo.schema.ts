import { SEO_PAGES } from "@portofolio/types/seo.types";
import z from "zod";

export const seoPageSchema = z.enum(SEO_PAGES);

export const seoPageSettingsSchema = z.object({
  title: z.string().max(120).or(z.undefined()),
  description: z.string().max(320).or(z.undefined()),
  ogImage: z.url().or(z.undefined()),
});

export const seoSettingsSchema = z.object({
  pages: z.object(
    Object.fromEntries(SEO_PAGES.map((page) => [page, seoPageSettingsSchema])) as Record<
      (typeof SEO_PAGES)[number],
      typeof seoPageSettingsSchema
    >,
  ),
});

export type SeoSettingsInput = z.infer<typeof seoSettingsSchema>;
export type SeoPageSettingsInput = z.infer<typeof seoPageSettingsSchema>;
