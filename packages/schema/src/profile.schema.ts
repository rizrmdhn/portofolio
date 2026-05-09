import z from "zod";

export const updateProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(256),
  title: z.string().min(2).max(256),
  bio: z.string().min(2).max(256),
  email: z.email(),
  githubUrl: z.url().optional(),
  linkedinUrl: z.url().optional(),
  twitterUrl: z.url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
