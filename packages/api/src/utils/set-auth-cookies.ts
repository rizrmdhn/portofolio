const ACCESS_MAX_AGE = 60 * 60 * 24; // 1 day
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function cookieFlags(maxAge: number): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `HttpOnly; max-age=${maxAge}; path=/; SameSite=Strict${secure}`;
}

export function setAuthCookies(
  headers: Headers,
  accessToken: string,
  refreshToken: string,
): void {
  headers.append(
    "Set-Cookie",
    `accessToken=${encodeURIComponent(accessToken)}; ${cookieFlags(ACCESS_MAX_AGE)}`,
  );
  headers.append(
    "Set-Cookie",
    `refreshToken=${encodeURIComponent(refreshToken)}; ${cookieFlags(REFRESH_MAX_AGE)}`,
  );
  // Non-HttpOnly indicator so client JS can check login state
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  headers.append(
    "Set-Cookie",
    `isLoggedIn=1; max-age=${REFRESH_MAX_AGE}; path=/; SameSite=Strict${secure}`,
  );
}

export function clearAuthCookies(headers: Headers): void {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  headers.append("Set-Cookie", `accessToken=; HttpOnly; max-age=0; path=/; SameSite=Strict${secure}`);
  headers.append("Set-Cookie", `refreshToken=; HttpOnly; max-age=0; path=/; SameSite=Strict${secure}`);
  headers.append("Set-Cookie", `isLoggedIn=; max-age=0; path=/; SameSite=Strict${secure}`);
}
