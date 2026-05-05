import z from "zod";

export const createCertificationSchema = z.object({
  name: z.string().min(2).max(256),
  issuer: z.string().min(2).max(256),
  certificate_url: z.url().optional(),
  certificate_id: z.string().min(2).max(256).optional(),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
});

export const updateCertificationSchema = createCertificationSchema.extend({
  id: z.string(),
});

export type CreateCertificationInput = z.infer<
  typeof createCertificationSchema
>;

export type UpdateCertificationInput = z.infer<
  typeof updateCertificationSchema
>;
