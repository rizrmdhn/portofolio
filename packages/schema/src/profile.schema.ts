import { AVAILABILITY_STATUS_TYPES } from "@portofolio/constants";
import z from "zod";

export const updateProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(256),
  title: z.string().min(2).max(256),
  bio: z.string().min(2).max(256),
  email: z.email(),
  availabilityStatus: z.enum(AVAILABILITY_STATUS_TYPES),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
