import { eq, inArray } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import {
  techStackCategories,
  techStackItems,
} from "@portofolio/db/schema/index";
import type {
  CreateTechStackCategoryInput,
  CreateTechStackCategoryWithItemsInput,
  CreateTechStackItemInput,
  ReorderTechStackCategoriesInput,
  ReorderTechStackItemsInput,
  UpdateTechStackCategoryInput,
  UpdateTechStackCategoryWithItemsInput,
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

export async function createTechStackCategoryWithItems(
  data: CreateTechStackCategoryWithItemsInput,
) {
  return db.transaction(async (tx) => {
    const [category] = await tx
      .insert(techStackCategories)
      .values({ name: data.name })
      .returning();

    if (!category) throw new QueryError("Failed to create tech stack category");

    if (data.items.length > 0) {
      await tx.insert(techStackItems).values(
        data.items.map((item, i) => ({
          ...item,
          categoryId: category.id,
          order: i,
        })),
      );
    }

    return category;
  });
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

export async function updateTechStackCategoryWithItems(
  data: UpdateTechStackCategoryWithItemsInput,
) {
  return db.transaction(async (tx) => {
    const [category] = await tx
      .update(techStackCategories)
      .set({ name: data.name })
      .where(eq(techStackCategories.id, data.id))
      .returning();

    if (!category) throw new QueryError("Failed to update tech stack category");

    const incomingIds = data.items
      .map((i) => i.id)
      .filter((id): id is string => !!id);

    // delete items removed from the list
    const existingItems = await tx.query.techStackItems.findMany({
      where: { categoryId: data.id },
    });
    const toDelete = existingItems
      .filter((e) => !incomingIds.includes(e.id))
      .map((e) => e.id);

    if (toDelete.length > 0) {
      await tx
        .delete(techStackItems)
        .where(inArray(techStackItems.id, toDelete));
    }

    // upsert remaining + new items
    for (const item of data.items) {
      if (item.id) {
        await tx
          .update(techStackItems)
          .set({
            name: item.name,
            proficiency: item.proficiency,
            order: item.order,
          })
          .where(eq(techStackItems.id, item.id));
      } else {
        await tx.insert(techStackItems).values({
          categoryId: data.id,
          name: item.name,
          proficiency: item.proficiency,
          order: item.order,
        });
      }
    }

    return category;
  });
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
