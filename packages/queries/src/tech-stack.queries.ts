import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { techStack } from "@portofolio/db/schema/index";
import type {
  CreateTechStackInput,
  ReorderTechStacksInput,
  UpdateTechStackInput,
} from "@portofolio/schema/tech-stack.schema";
import { NotFoundError, QueryError } from "./errors";

export async function getAllTechStacks() {
  const techStacks = await db.query.techStack.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return techStacks;
}

export async function getTechStacksForDashboard(search?: string) {
  const techStacks = await db.query.techStack.findMany({
    where: {
      name: {
        ilike: `%${search ?? ""}%`,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return techStacks;
}

export async function getTechStackById(id: string) {
  const techStackItem = await db.query.techStack.findFirst({
    where: {
      id,
    },
  });

  if (!techStackItem) throw new NotFoundError(`Tech stack item`, id);

  return techStackItem;
}

export async function createTechStack(data: CreateTechStackInput) {
  const [techStackItem] = await db
    .insert(techStack)
    .values({ ...data })
    .returning();

  if (!techStackItem) throw new QueryError("Failed to create tech stack item");

  return techStackItem;
}

export async function updateTechStack(data: UpdateTechStackInput) {
  const isExist = await getTechStackById(data.id);

  if (!isExist) throw new NotFoundError(`Tech stack item`, data.id);

  const [result] = await db
    .update(techStack)
    .set({ name: data.name, list: data.list })
    .where(eq(techStack.id, data.id))
    .returning();

  if (!result) throw new QueryError("Failed to update tech stack item");

  return result;
}

export async function reorderTechStacks(orderedIds: ReorderTechStacksInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx.update(techStack).set({ order }).where(eq(techStack.id, id));
    }
  });
}

export async function deleteTechStack(id: string) {
  const isExist = await getTechStackById(id);

  if (!isExist) throw new NotFoundError(`Tech stack item`, id);

  const [result] = await db
    .delete(techStack)
    .where(eq(techStack.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete tech stack item");
  return result;
}

export async function deleteTechStackItem(id: string) {
  const isExist = await getTechStackById(id);

  if (!isExist) throw new NotFoundError(`Tech stack item`, id);

  const [result] = await db
    .delete(techStack)
    .where(eq(techStack.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete tech stack item");

  return result;
}
