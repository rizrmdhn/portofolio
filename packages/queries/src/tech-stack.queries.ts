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
import { NotFoundError, QueryError } from '@portofolio/errors';
import { insensitiveContains } from "./utils/dialect";
import { deleteReturning, insertReturning, updateReturning } from "./utils/returning";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAllTechStackCategories() {
  return db.query.techStackCategories.findMany({
    orderBy: { order: "asc" },
    with: { items: { orderBy: { order: "asc" } } },
  });
}

export async function getTechStackCategoriesForDashboard(search?: string) {
  return db.query.techStackCategories.findMany({
    where: { name: insensitiveContains(search) },
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
  const category = await insertReturning(db, techStackCategories, data);

  if (!category) throw new QueryError("Failed to create tech stack category");

  return category;
}

export async function createTechStackCategoryWithItems(
  data: CreateTechStackCategoryWithItemsInput,
) {
  return db.transaction(async (tx) => {
    const category = await insertReturning(tx, techStackCategories, { name: data.name });

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

  const result = await updateReturning(
    db,
    techStackCategories,
    { name: data.name },
    eq(techStackCategories.id, data.id),
  );

  if (!result) throw new QueryError("Failed to update tech stack category");

  return result;
}

export async function updateTechStackCategoryWithItems(
  data: UpdateTechStackCategoryWithItemsInput,
) {
  return db.transaction(async (tx) => {
    const category = await updateReturning(
      tx,
      techStackCategories,
      { name: data.name },
      eq(techStackCategories.id, data.id),
    );

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

  const result = await deleteReturning(db, techStackCategories, eq(techStackCategories.id, id));

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
  const item = await insertReturning(db, techStackItems, data);

  if (!item) throw new QueryError("Failed to create tech stack item");

  return item;
}

export async function updateTechStackItem(data: UpdateTechStackItemInput) {
  await getTechStackItemById(data.id);

  const result = await updateReturning(
    db,
    techStackItems,
    { name: data.name, proficiency: data.proficiency },
    eq(techStackItems.id, data.id),
  );

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

  const result = await deleteReturning(db, techStackItems, eq(techStackItems.id, id));

  if (!result) throw new QueryError("Failed to delete tech stack item");

  return result;
}
