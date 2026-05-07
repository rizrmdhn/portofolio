import { createTRPCContext } from "@portofolio/api";
import { createCaller } from "@portofolio/api/root";
import {
  getRequestHeaders,
  getResponseHeaders,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { TRPCError } from "@trpc/server";

type Caller = ReturnType<typeof createCaller>;

function buildRequest(cookieHeader: string): Request {
  return new Request("http://ssr.local/api/trpc", {
    headers: new Headers({ cookie: cookieHeader }),
  });
}

async function buildCaller(
  cookieHeader: string,
  resHeaders: Headers,
): Promise<Caller> {
  const ctx = await createTRPCContext(buildRequest(cookieHeader), resHeaders);
  return createCaller(ctx);
}

function readResponseSetCookies(): string[] {
  const headers = getResponseHeaders() as unknown as Headers;
  return typeof headers.getSetCookie === "function"
    ? headers.getSetCookie()
    : [];
}

function mergeCookies(existing: string, setCookies: string[]): string {
  const map = new Map<string, string>();
  for (const part of existing
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)) {
    const eq = part.indexOf("=");
    if (eq > 0) map.set(part.slice(0, eq), part.slice(eq + 1));
  }
  for (const sc of setCookies) {
    const head = sc.split(";")[0] ?? "";
    const eq = head.indexOf("=");
    if (eq > 0) map.set(head.slice(0, eq).trim(), head.slice(eq + 1));
  }
  return [...map].map(([k, v]) => `${k}=${v}`).join("; ");
}

function currentCookieHeader(): string {
  const headers = getRequestHeaders() as unknown as Headers;
  const original = headers.get("cookie") ?? "";
  return mergeCookies(original, readResponseSetCookies());
}

function forwardSetCookies(resHeaders: Headers) {
  const fresh = resHeaders.getSetCookie();
  if (fresh.length === 0) return;
  setResponseHeader("set-cookie", [...readResponseSetCookies(), ...fresh]);
}

/**
 * Run a server-side tRPC caller with cookies from the current SSR request.
 * On UNAUTHORIZED, refreshes tokens via auth.refresh once and retries.
 * New Set-Cookie headers are forwarded onto the SSR response so the browser
 * picks up the rotated tokens.
 */
export async function ssrCall<T>(fn: (caller: Caller) => Promise<T>): Promise<T> {
  const cookie = currentCookieHeader();
  const firstRes = new Headers();

  try {
    const result = await fn(await buildCaller(cookie, firstRes));
    forwardSetCookies(firstRes);
    return result;
  } catch (err) {
    if (!(err instanceof TRPCError) || err.code !== "UNAUTHORIZED") throw err;
  }

  const refreshRes = new Headers();
  await (await buildCaller(cookie, refreshRes)).auth.refresh();
  forwardSetCookies(refreshRes);

  const rotated = mergeCookies(cookie, refreshRes.getSetCookie());
  const retryRes = new Headers();
  const result = await fn(await buildCaller(rotated, retryRes));
  forwardSetCookies(retryRes);
  return result;
}

/**
 * SSR auth gate for protected layouts. Returns the user, or null if the visitor
 * is not logged in or both access+refresh tokens are invalid.
 */
export async function ssrAuthGate() {
  try {
    return await ssrCall((c) => c.auth.me());
  } catch (err) {
    if (
      err instanceof TRPCError &&
      (err.code === "UNAUTHORIZED" || err.code === "BAD_REQUEST")
    ) {
      return null;
    }
    throw err;
  }
}
