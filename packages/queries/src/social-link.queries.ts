import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { socialLinks } from "@portofolio/db/schema/index";
import type {
  CreateSocialLinkInput,
  ReorderSocialLinksInput,
  UpdateSocialLinkInput,
} from "@portofolio/schema/social-link.schema";
import { NotFoundError, QueryError } from "./errors";

export async function getAllSocialLinks() {
  const socialLinkItems = await db.query.socialLinks.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return socialLinkItems;
}

export async function getSocialLinksForDashboard(search?: string) {
  const socialLinkItems = await db.query.socialLinks.findMany({
    where: {
      title: {
        ilike: `%${search ?? ""}%`,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return socialLinkItems;
}

export async function getSocialLinkById(id: string) {
  const socialLinkItem = await db.query.socialLinks.findFirst({
    where: {
      id,
    },
  });

  if (!socialLinkItem) throw new NotFoundError(`Social link item`, id);

  return socialLinkItem;
}

export async function createSocialLink(data: CreateSocialLinkInput) {
  const [socialLinkItem] = await db
    .insert(socialLinks)
    .values({ ...data })
    .returning();

  if (!socialLinkItem)
    throw new QueryError("Failed to create social link item");

  return socialLinkItem;
}

export async function updateSocialLink(data: UpdateSocialLinkInput) {
  const isExist = await getSocialLinkById(data.id);

  const [socialLinkItem] = await db
    .update(socialLinks)
    .set({ ...data })
    .where(eq(socialLinks.id, data.id))
    .returning();

  if (!socialLinkItem)
    throw new QueryError("Failed to update social link item");

  return socialLinkItem;
}

export async function reorderSocialLinks(data: ReorderSocialLinksInput) {
  await db.transaction(async (tx) => {
    for (const { id, order } of data) {
      await tx.update(socialLinks).set({ order }).where(eq(socialLinks.id, id));
    }
  });
}

export async function deleteSocialLink(id: string) {
  const isExist = await getSocialLinkById(id);

  if (!isExist) throw new NotFoundError(`Social link item`, id);

  const [result] = await db
    .delete(socialLinks)
    .where(eq(socialLinks.id, id))
    .returning();

  if (!result) throw new QueryError("Failed to delete social link item");

  return result;
}
