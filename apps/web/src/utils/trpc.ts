import { globalErrorToast } from "@/lib/toasts";
import type { AppRouter } from "@portofolio/api/root";
import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
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
import { tokenRefreshLink } from "./refresh";

const trpcUrl = `${getBaseUrl()}/api/trpc`;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (typeof window !== "undefined") {
          globalErrorToast(error.message || "An unexpected error occurred");
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    tokenRefreshLink,
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
      }),
      false: httpBatchLink({
        url: trpcUrl,
        transformer: SuperJSON,
      }),
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient: getQueryClient,
});
