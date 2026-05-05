import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().max(256),
  description: z.string().max(5000),
  github_url: z.optional(z.url()),
  live_url: z.optional(z.url()),
  playstore_url: z.optional(z.url()),
  appstore_url: z.optional(z.url()),
  tech: z.array(z.string()).min(1),
});

export const updateProjectSchema = z.object({
  id: z.string(),
  name: z.optional(z.string().max(256)),
  description: z.optional(z.string().max(5000)),
  github_url: z.optional(z.url()),
  live_url: z.optional(z.url()),
  playstore_url: z.optional(z.url()),
  appstore_url: z.optional(z.url()),
  tech: z.optional(z.array(z.string()).min(1)),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
