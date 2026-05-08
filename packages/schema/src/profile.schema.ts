import { createInsertSchema } from "@portofolio/db";
import { profile } from "@portofolio/db/schema/index";
import z from "zod";

const profileBaseSchema = createInsertSchema(profile, {
  name: z.string().min(2).max(256),
  title: z.string().min(2).max(256),
  bio: z.string().min(2),
  email: z.email(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateProfileSchema = profileBaseSchema.extend({
  id: z.string(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
