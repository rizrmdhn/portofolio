import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { certifications } from "@portofolio/db/schema/index";
import type {
  CreateCertificationInput,
  UpdateCertificationInput,
} from "@portofolio/schema/certifcation.schema";
import { NotFoundError, QueryError } from "./errors";

export async function getAllCertifications() {
  const certificationsList = await db.query.certifications.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return certificationsList;
}

export async function getCertificationById(id: string) {
  const certification = await db.query.certifications.findFirst({
    where: {
      id,
    },
  });

  if (!certification) throw new NotFoundError("Certification", id);

  return certification;
}

export async function createCertification(data: CreateCertificationInput) {
  const [certification] = await db
    .insert(certifications)
    .values({
      ...data,
      issueDate: data.issueDate.toISOString(),
      expiryDate: data.expiryDate ? data.expiryDate.toISOString() : null,
    })
    .returning();

  if (!certification) throw new QueryError("Failed to create certification");

  return certification;
}

export async function updateCertification(data: UpdateCertificationInput) {
  const isExist = await getCertificationById(data.id);

  if (!isExist) throw new NotFoundError("Certification", data.id);

  const [certification] = await db
    .update(certifications)
    .set({
      ...data,
      issueDate: data.issueDate.toISOString(),
      expiryDate: data.expiryDate ? data.expiryDate.toISOString() : null,
    })
    .where(eq(certifications.id, data.id))
    .returning();

  if (!certification) throw new QueryError("Failed to update certification");

  return certification;
}

export async function deleteCertification(id: string) {
  const isExist = await getCertificationById(id);

  if (!isExist) throw new NotFoundError("Certification", id);

  const [certification] = await db
    .delete(certifications)
    .where(eq(certifications.id, id))
    .returning();

  if (!certification) throw new QueryError("Failed to delete certification");

  return certification;
}
