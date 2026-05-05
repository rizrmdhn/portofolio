import { COLOR_VALUES, EXPERIENCE_STATUS_TYPES } from "@portofolio/constants";
import { createInsertSchema } from "@portofolio/db";
import { projects } from "@portofolio/db/schema/index";
import z from "zod";

export const createProjectSchema = createInsertSchema(projects, {
  title: z.string().max(256),
  description: z.string().max(5000),
  longDescription: z.optional(z.string().max(10000)),
  tech: z.array(z.string()).min(1),
  githubUrl: z.optional(z.url()),
  liveUrl: z.optional(z.url()),
  playstoreUrl: z.optional(z.url()),
  appstoreUrl: z.optional(z.url()),
  coverColor: z.enum(COLOR_VALUES).default("#ffffff"),
  status: z.enum(EXPERIENCE_STATUS_TYPES).default("draft"),
  isVisible: z.boolean().default(false),
  order: z.number().default(0),
}).omit({ slug: true, createdAt: true, updatedAt: true });

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
