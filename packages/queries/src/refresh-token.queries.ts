import { and, desc, eq, gt, sql } from "@portofolio/db";
import { db, type DBorTx } from "@portofolio/db/client";
import { refreshTokens } from "@portofolio/db/schema/index";
import { QueryError } from "./errors";

interface CreateRefreshTokenInput {
  userId: string;
  token: string;
  expiresAt: string;
  os?: string;
  version?: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function storeRefreshToken(
  input: CreateRefreshTokenInput,
  tx: DBorTx = db,
) {
  const [results] = await tx
    .insert(refreshTokens)
    .values({
      userId: input.userId,
      token: input.token,
      expiresAt: input.expiresAt,
      deviceInfo: input.deviceInfo,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      os: input.os,
      version: input.version,
      revoked: false,
    })
    .returning();

  if (!results) throw new QueryError("Failed to create refresh token");

  return results;
}

export async function validateRefreshToken(token: string, tx: DBorTx = db) {
  const [results] = await tx
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.token, token),
        eq(refreshTokens.revoked, false),
        gt(refreshTokens.expiresAt, new Date().toISOString()),
      ),
    )
    .limit(1);

  return results || null;
}

export async function updateLastUsedAt(token: string, tx: DBorTx = db) {
  const [results] = await tx
    .update(refreshTokens)
    .set({ lastUsedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(refreshTokens.token, token))
    .returning();

  if (!results)
    throw new QueryError("Failed to update refresh token last used at");

  return results;
}

export async function revokeRefreshToken(token: string, tx: DBorTx = db) {
  const [results] = await tx
    .update(refreshTokens)
    .set({ revoked: true, revokedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(refreshTokens.token, token))
    .returning();

  if (!results) throw new QueryError("Failed to revoke refresh token");

  return results;
}

export async function revokeRefreshTokenById(id: string, tx: DBorTx = db) {
  const [results] = await tx
    .update(refreshTokens)
    .set({ revoked: true, revokedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(refreshTokens.id, id))
    .returning();

  if (!results) throw new QueryError("Failed to revoke refresh token by id");

  return results;
}

export async function revokeAllUserTokens(userId: string, tx: DBorTx = db) {
  const [results] = await tx
    .update(refreshTokens)
    .set({ revoked: true, revokedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(refreshTokens.userId, userId))
    .returning();

  if (!results)
    throw new QueryError("Failed to revoke all user refresh tokens");

  return results;
}

export async function getUserActiveSessions(userId: string, tx: DBorTx = db) {
  const results = await tx
    .select({
      id: refreshTokens.id,
      deviceInfo: refreshTokens.deviceInfo,
      ipAddress: refreshTokens.ipAddress,
      userAgent: refreshTokens.userAgent,
      lastUsedAt: refreshTokens.lastUsedAt,
      createdAt: refreshTokens.createdAt,
      expiresAt: refreshTokens.expiresAt,
    })
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.userId, userId),
        eq(refreshTokens.revoked, false),
        gt(refreshTokens.expiresAt, new Date().toISOString()),
      ),
    )
    .orderBy(desc(refreshTokens.lastUsedAt));

  return results;
}

export async function deleteExpiredTokens(tx: DBorTx = db) {
  const [results] = await tx
    .delete(refreshTokens)
    .where(gt(refreshTokens.expiresAt, new Date().toISOString()))
    .returning();

  if (!results) throw new QueryError("Failed to delete expired refresh tokens");

  return results;
}
