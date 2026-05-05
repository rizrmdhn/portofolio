import { createServerFn } from "@tanstack/react-start";
import { createServerCaller } from "./server-caller";
import { trpc } from "./trpc";

const AUTH_ME_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const AUTH_ME_GC_TIME = 30 * 60 * 1000; // 30 minutes

const getMeServer = createServerFn().handler(async () => {
  const caller = await createServerCaller();
  return caller.auth.me();
});

/**
 * Shared query options for auth.me with consistent caching.
 * Always use this instead of `trpc.platform.auth.me.queryOptions()` directly
 * to prevent excessive refetches.
 */
export function authMeQueryOptions() {
  return {
    ...trpc.auth.me.queryOptions(), // 👈 keeps queryKey, etc.
    queryFn: getMeServer, // 👈 override only the queryFn
    staleTime: AUTH_ME_STALE_TIME,
    gcTime: AUTH_ME_GC_TIME,
  };
}
