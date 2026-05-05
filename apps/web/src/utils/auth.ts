function readCookie(name: string): string | null {
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? null
  );
}

export const auth = {
  isAuthenticated: (): boolean => readCookie("isLoggedIn") === "1",

  // Clears the non-HttpOnly indicator so the client treats the session as ended.
  // HttpOnly tokens (accessToken, refreshToken) are cleared by the server via Set-Cookie.
  clearIndicator: (): void => {
    const secure = import.meta.env.PROD ? "; Secure" : "";
    document.cookie = `isLoggedIn=; max-age=0; path=/; SameSite=Strict${secure}`;
  },
};
