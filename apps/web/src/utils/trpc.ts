import { globalErrorToast } from "@/lib/toasts";
import type { AppRouter } from "@portofolio/api/root";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  loggerLink,
  splitLink,
} from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";
import { getBaseUrl } from "./get-base-url";

const trpcUrl = `${getBaseUrl()}/trpc`;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      globalErrorToast(error.message || "An unexpected error occurred");
    },
  }),
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    // tokenRefreshLink,
    splitLink({
      // Route mutations, auth calls, and non-JSON input through httpLink
      // so each mutation gets its own X-Idempotency-Key header
      condition: (op) => {
        return (
          op.type === "mutation" ||
          op.path.startsWith("auth.") ||
          isNonJsonSerializable(op.input)
        );
      },
      true: httpLink({
        url: trpcUrl,
        transformer: SuperJSON,
        headers: ({ op }) => {
          const headers = new Headers();

          const token = localStorage.getItem("accessToken");

          if (token) {
            headers.append("Authorization", `Bearer ${token}`);
          }

          // Add idempotency key for mutation requests
          const key = op.context?.idempotencyKey as string | undefined;
          if (op.type === "mutation" && key) {
            headers.append("X-Idempotency-Key", key);
          }

          return headers;
        },
      }),
      false: httpBatchLink({
        url: trpcUrl,
        transformer: SuperJSON,
        headers: () => {
          const headers = new Headers();
          const token = localStorage.getItem("accessToken");

          if (token) {
            headers.append("Authorization", `Bearer ${token}`);
          }

          return headers;
        },
      }),
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
