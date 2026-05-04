import { env } from "@portofolio/env/server";
import { jwtVerify, SignJWT } from "jose";
import { v4 as uuidv4 } from "uuid";
import type {
  AccessTokenPayload,
  JWTPayload,
  RefreshTokenPayload,
  SessionUser,
} from "./types";

export type {
  AccessTokenPayload,
  JWTPayload,
  RefreshTokenPayload,
  SessionUser,
};

const secretKey = env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

const refreshSecretKey = env.JWT_REFRESH_SECRET;
const REFRESH_SECRET = new TextEncoder().encode(refreshSecretKey);

// New access token functions
export async function createAccessToken(
  payload: AccessTokenPayload,
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_ACCESS_TOKEN_EXPIRY)
    .sign(key);
}

export async function decryptAccessToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, key);
  return payload as JWTPayload;
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as AccessTokenPayload;
  } catch {
    return null;
  }
}

// Refresh token functions
export async function createRefreshToken(
  payload: RefreshTokenPayload,
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_REFRESH_TOKEN_EXPIRY)
    .sign(REFRESH_SECRET);
}

export async function verifyRefreshToken(
  token: string,
): Promise<RefreshTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);

    // Verify it's a refresh token
    if (payload.type !== "refresh") {
      return null;
    }

    return payload as RefreshTokenPayload;
  } catch {
    return null;
  }
}

export async function validateToken(token: string): Promise<{
  session: SessionUser | null;
  user: JWTPayload | null;
}> {
  try {
    const payload = await decryptAccessToken(token);

    // Validate expiration
    const now = Date.now() / 1000;
    if (payload.exp && payload.exp < now) {
      return { session: null, user: null };
    }

    const jti = payload.jti ?? uuidv4();
    const userId = payload.id;
    const iat = payload.iat ?? 0;

    const session = {
      id: jti,
      userId,
      expiresAt: new Date((payload.exp ?? 0) * 1000),
      createdAt: new Date(iat * 1000),
    };

    const user = {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return { session, user };
  } catch {
    return { session: null, user: null };
  }
}
