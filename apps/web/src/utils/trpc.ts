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

const trpcUrl = `${getBaseUrl()}/api/trpc`;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
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

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
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
        fetch(url, options) {
          return fetch(url, { ...options, credentials: "include" });
        },
      }),
      false: httpBatchLink({
        url: trpcUrl,
        transformer: SuperJSON,
        fetch(url, options) {
          return fetch(url, { ...options, credentials: "include" });
        },
      }),
    }),
  ],
});

export const trpc = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient: getQueryClient(),
});
