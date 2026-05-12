import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import {
  techStackCategories,
  techStackItems,
} from "@portofolio/db/schema/index";
import type {
  CreateTechStackCategoryInput,
  CreateTechStackItemInput,
  ReorderTechStackCategoriesInput,
  ReorderTechStackItemsInput,
  UpdateTechStackCategoryInput,
  UpdateTechStackItemInput,
} from "@portofolio/schema/tech-stack.schema";
import { NotFoundError, QueryError } from "./errors";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAllTechStackCategories() {
  return db.query.techStackCategories.findMany({
    orderBy: { order: "asc" },
    with: { items: { orderBy: { order: "asc" } } },
  });
}

export async function getTechStackCategoriesForDashboard(search?: string) {
  return db.query.techStackCategories.findMany({
    where: { name: { ilike: `%${search ?? ""}%` } },
    orderBy: { order: "asc" },
    with: { items: { orderBy: { order: "asc" } } },
  });
}

export async function getTechStackCategoryById(id: string) {
  const category = await db.query.techStackCategories.findFirst({
    where: { id },
    with: { items: { orderBy: { order: "asc" } } },
  });

  if (!category) throw new NotFoundError("Tech stack category", id);

  return category;
}

export async function createTechStackCategory(
  data: CreateTechStackCategoryInput,
) {
  const [category] = await db
    .insert(techStackCategories)
    .values(data)
    .returning();

  if (!category) throw new QueryError("Failed to create tech stack category");

  return category;
}

export async function updateTechStackCategory(
  data: UpdateTechStackCategoryInput,
) {
  await getTechStackCategoryById(data.id);

  const [result] = await db
    .update(techStackCategories)
    .set({ name: data.name })
    .where(eq(techStackCategories.id, data.id))
    .returning();

  if (!result) throw new QueryError("Failed to update tech stack category");

  return result;
}

export async function reorderTechStackCategories(
  orderedIds: ReorderTechStackCategoriesInput,
) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx
        .update(techStackCategories)
        .set({ order })
        .where(eq(techStackCategories.id, id));
    }
  });
}

export async function deleteTechStackCategory(id: string) {
  await getTechStackCategoryById(id);

  const [result] = await db
    .delete(techStackCategories)
    .where(eq(techStackCategories.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete tech stack category");

  return result;
}

// ─── Items ────────────────────────────────────────────────────────────────────

export async function getTechStackItemById(id: string) {
  const item = await db.query.techStackItems.findFirst({ where: { id } });

  if (!item) throw new NotFoundError("Tech stack item", id);

  return item;
}

export async function createTechStackItem(data: CreateTechStackItemInput) {
  const [item] = await db.insert(techStackItems).values(data).returning();

  if (!item) throw new QueryError("Failed to create tech stack item");

  return item;
}

export async function updateTechStackItem(data: UpdateTechStackItemInput) {
  await getTechStackItemById(data.id);

  const [result] = await db
    .update(techStackItems)
    .set({ name: data.name, proficiency: data.proficiency })
    .where(eq(techStackItems.id, data.id))
    .returning();

  if (!result) throw new QueryError("Failed to update tech stack item");

  return result;
}

export async function reorderTechStackItems(
  orderedIds: ReorderTechStackItemsInput,
) {
  await db.transaction(async (tx) => {
    for (const { id, order } of orderedIds) {
      await tx
        .update(techStackItems)
        .set({ order })
        .where(eq(techStackItems.id, id));
    }
  });
}

export async function deleteTechStackItem(id: string) {
  await getTechStackItemById(id);

  const [result] = await db
    .delete(techStackItems)
    .where(eq(techStackItems.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete tech stack item");

  return result;
}
