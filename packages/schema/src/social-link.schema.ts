import { SOCIAL_ICON_NAMES } from "@portofolio/constants";
import { createInsertSchema } from "@portofolio/db";
import { socialLinks } from "@portofolio/db/schema/index";
import z from "zod";

export const createSocialLinkSchema = createInsertSchema(socialLinks, {
  title: z.string().min(2).max(256),
  url: z.url(),
  icon: z.enum(SOCIAL_ICON_NAMES),
  order: z.number(),
}).omit({ createdAt: true, updatedAt: true });

export const updateSocialLinkSchema = createSocialLinkSchema.extend({
  id: z.string(),
});

export const reorderSocialLinksSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1);

export type CreateSocialLinkInput = z.infer<typeof createSocialLinkSchema>;

export type UpdateSocialLinkInput = z.infer<typeof updateSocialLinkSchema>;

export type ReorderSocialLinksInput = z.infer<typeof reorderSocialLinksSchema>;
