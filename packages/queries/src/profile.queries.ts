import { eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { profile } from "@portofolio/db/schema/index";
import type { UpdateProfileInput } from "@portofolio/schema/profile.schema";
import { NotFoundError, QueryError } from '@portofolio/errors';
import { updateReturning } from './utils/returning';

export async function getProfile() {
  const result = await db.query.profile.findFirst();

  if (!result) throw new NotFoundError("Profile", "singleton");

  return result;
}

export async function updateProfile(data: UpdateProfileInput) {
  const result = await updateReturning(db, profile, data, eq(profile.id, data.id));

  if (!result) throw new QueryError("Failed to update profile");

  return result;
}
