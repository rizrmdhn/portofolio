import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { users } from "@portofolio/db/schema/index";
import { ConflictError, NotFoundError } from "./errors";

export async function getAllUsers() {
  const allUsers = await db.query.users.findMany();
  return allUsers;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: {
      id,
    },
  });

  return user;
}

export async function createUser({
  email,
  name,
  passwordHash,
}: {
  email: string;
  name: string;
  passwordHash: string;
}) {
  const isEmailTaken = await db.query.users.findFirst({
    where: {
      email,
    },
  });

  if (isEmailTaken) throw new ConflictError("User", "email", email);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      name,
      password: passwordHash,
    })
    .returning();

  if (!newUser) throw new Error("Failed to create user");

  return newUser;
}

export async function deleteUser(id: string) {
  const isExisting = await getUserById(id);

  if (!isExisting) throw new NotFoundError("User", id);

  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return deletedUser;
}
