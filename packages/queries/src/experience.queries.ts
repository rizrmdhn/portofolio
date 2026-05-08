import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { experiences } from "@portofolio/db/schema/index";
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@portofolio/schema/experience.schema";
import { NotFoundError, QueryError } from "./errors";

export async function getAllExperiences() {
  const experiences = await db.query.experiences.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return experiences;
}

export async function getExperienceById(id: string) {
  const experience = await db.query.experiences.findFirst({
    where: {
      id,
    },
  });

  if (!experience) throw new NotFoundError(`Experience`, id);

  return experience;
}

export async function createExperience(data: CreateExperienceInput) {
  const [experience] = await db.insert(experiences).values(data).returning();

  if (!experience) throw new QueryError("Failed to create experience");

  return experience;
}

export async function updateExperience(data: UpdateExperienceInput) {
  const isExist = await getExperienceById(data.id);

  if (!isExist) throw new NotFoundError(`Experience`, data.id);

  const [experience] = await db
    .update(experiences)
    .set(data)
    .where(eq(experiences.id, data.id))
    .returning();

  if (!experience) throw new QueryError("Failed to update experience");

  return experience;
}

export async function deleteExperience(id: string) {
  const isExist = await getExperienceById(id);

  if (!isExist) throw new NotFoundError(`Experience`, id);

  const [experience] = await db
    .delete(experiences)
    .where(eq(experiences.id, id))
    .returning();

  if (!experience) throw new QueryError("Failed to delete experience");

  return experience;
}
