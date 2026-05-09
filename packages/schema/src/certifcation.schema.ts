import { EXPERIENCE_STATUS_TYPES } from "@portofolio/constants";
import { createInsertSchema } from "@portofolio/db";
import { certifications } from "@portofolio/db/schema/index";
import z from "zod";

export const createCertificationSchema = createInsertSchema(certifications, {
  title: z.string().min(2).max(256),
  issuer: z.string().min(2).max(256),
  certificateUrl: z.url().optional(),
  certificateId: z.string().min(2).max(256).optional(),
  issueYear: z.date(),
  expiryYear: z.date().optional(),
  status: z.enum(EXPERIENCE_STATUS_TYPES).default("draft"),
}).omit({ createdAt: true, updatedAt: true });

export const updateCertificationSchema = createCertificationSchema.extend({
  id: z.string(),
});

export const reorderCertificationsSchema = z
  .array(z.object({ id: z.string(), order: z.number().int().min(0) }))
  .min(1);

export type CreateCertificationInput = z.infer<
  typeof createCertificationSchema
>;

export type UpdateCertificationInput = z.infer<
  typeof updateCertificationSchema
>;

export type ReorderCertificationsInput = z.infer<
  typeof reorderCertificationsSchema
>;
