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

const trpcUrl = `${getBaseUrl()}/trpc`;

/**
 * In-flight refresh coordination.
 * Prevents concurrent refresh calls and reuses the same promise.
 */
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

/**
 * Lightweight tRPC client dedicated to refresh calls
 * to avoid circular dependencies with the main client.
 */
const refreshClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: trpcUrl,
      transformer: SuperJSON,
      headers: () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
      },
    }),
  ],
});

/**
 * Refresh access/refresh tokens with deduped in-flight requests.
 * Throws if refresh fails; clears tokens and redirects to login.
 */
async function refreshTokens() {
  // If already refreshing, return the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = auth.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Use tRPC client to call refresh endpoint
      const result = await refreshClient.auth.refresh.mutate({
        token: refreshToken,
      });

      if (result.accessToken && result.refreshToken) {
        auth.setTokens(result.accessToken, result.refreshToken);
      } else {
        throw new Error("Invalid refresh response");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * tRPC link that handles 401 responses by refreshing tokens and retrying once.
 */
export const tokenRefreshLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          // Check if it's a 401 UNAUTHORIZED error
          if (
            err instanceof TRPCClientError &&
            err.data?.code === "UNAUTHORIZED"
          ) {
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
              console.log("401 error detected, attempting token refresh...");

              // Attempt to refresh the token
              refreshTokens()
                .then(() => {
                  console.log("Token refreshed, retrying request...");
                  // Retry the original operation
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
                .catch((refreshErr) => {
                  console.error("Token refresh failed:", refreshErr);
                  // If refresh fails, pass through the original error
                  observer.error(err);
                });
            } else {
              // No refresh token, pass through the error
              observer.error(err);
            }
          } else {
            // Not a 401 error, pass it through
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
