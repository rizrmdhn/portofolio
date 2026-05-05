function readCookie(name: string): string | null {
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? null
  );
}

function writeCookie(name: string, value: string, maxAge: number): void {
  const secure = import.meta.env.PROD ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Strict${secure}`;
}

function expireCookie(name: string): void {
  const secure = import.meta.env.PROD ? "; Secure" : "";
  document.cookie = `${name}=; max-age=0; path=/; SameSite=Strict${secure}`;
}

export const auth = {
  getAccessToken: (): string | null => readCookie("accessToken"),

  getRefreshToken: (): string | null => readCookie("refreshToken"),

  setTokens: (accessToken: string, refreshToken: string): void => {
    writeCookie("accessToken", accessToken, 60 * 60 * 24);
    writeCookie("refreshToken", refreshToken, 60 * 60 * 24 * 30);
  },

  clearTokens: (): void => {
    expireCookie("accessToken");
    expireCookie("refreshToken");
  },

  isAuthenticated: (): boolean =>
    !!(readCookie("accessToken") && readCookie("refreshToken")),
};
