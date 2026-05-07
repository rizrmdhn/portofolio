import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { user } from "@portofolio/db/schema/index";
import { NotFoundError } from "./errors";

export async function getAllUsers() {
  return db.query.user.findMany();
}

export async function getUserByEmail(email: string) {
  return db.query.user.findFirst({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return db.query.user.findFirst({
    where: { id },
  });
}

export async function deleteUser(id: string) {
  const existing = await getUserById(id);

  if (!existing) throw new NotFoundError("User", id);

  const [deleted] = await db
    .delete(user)
    .where(eq(user.id, id))
    .returning();

  return deleted;
}
