import type { AppRouter } from "@portofolio/api/root";
import {
  createTRPCClient,
  httpLink,
  TRPCClientError,
  type TRPCLink,
} from "@trpc/client";
import { observable } from "@trpc/server/observable";
import SuperJSON from "superjson";
import { auth } from "./auth";
import { getBaseUrl } from "./get-base-url";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const refreshClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: SuperJSON,
      headers: () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
      },
    }),
  ],
});

async function refreshTokens() {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      // Server sets new HttpOnly cookies via Set-Cookie response header
      await refreshClient.auth.refresh.mutate();
    } catch (error) {
      console.error("Token refresh failed:", error);
      auth.clearIndicator();
      window.location.href = "/login";
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export const tokenRefreshLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          if (
            err instanceof TRPCClientError &&
            err.data?.code === "UNAUTHORIZED" &&
            op.path !== "auth.refresh"
          ) {
            refreshTokens()
              .then(() => {
                next(op).subscribe({
                  next(value) {
                    observer.next(value);
                  },
                  error(retryErr) {
                    observer.error(retryErr);
                  },
                  complete() {
                    observer.complete();
                  },
                });
              })
              .catch(() => {
                observer.error(err);
              });
          } else {
            observer.error(err);
          }
        },
        complete() {
          observer.complete();
        },
      });

      return unsubscribe;
    });
  };
};
