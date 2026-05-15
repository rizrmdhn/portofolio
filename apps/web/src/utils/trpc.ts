import { globalErrorToast } from '@/lib/toasts'
import type { AppRouter } from '@portofolio/api/root'
import { QueryCache, QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  loggerLink,
  splitLink,
} from '@trpc/client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import SuperJSON from 'superjson'
import { getBaseUrl } from './get-base-url'

const trpcUrl = `${getBaseUrl()}/api/trpc`

const getSsrCookie = createIsomorphicFn()
  .client(() => undefined)
  .server(() => {
    return getRequestHeader('cookie')
  })

async function withSsrCookieHeaders(headers: RequestInit['headers']) {
  const nextHeaders = new Headers(headers)
  const cookie = await getSsrCookie()

  if (cookie) nextHeaders.set('cookie', cookie)

  return nextHeaders
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (typeof window !== 'undefined') {
          globalErrorToast(error.message || 'An unexpected error occurred')
        }
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return createQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = createQueryClient()
  return browserQueryClient
}

function createAppTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === 'development' ||
          (op.direction === 'down' && op.result instanceof Error),
      }),
      splitLink({
        condition: (op) =>
          op.type === 'mutation' || op.path.startsWith('auth.') || isNonJsonSerializable(op.input),
        true: httpLink({
          url: trpcUrl,
          transformer: SuperJSON,
          async fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
              headers: await withSsrCookieHeaders(options?.headers),
            })
          },
        }),
        false: httpBatchLink({
          url: trpcUrl,
          transformer: SuperJSON,
          async fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
              headers: await withSsrCookieHeaders(options?.headers),
            })
          },
        }),
      }),
    ],
  })
}

export function createTrpc(queryClient: QueryClient) {
  return createTRPCOptionsProxy<AppRouter>({
    client: createAppTrpcClient(),
    queryClient,
  })
}

export const trpc = createTrpc(getQueryClient())
