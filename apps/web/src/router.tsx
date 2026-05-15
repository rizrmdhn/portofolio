import { ErrorComponent, createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import Loader from './components/loader'
import { routeTree } from './routeTree.gen'

import { QueryClientProvider } from '@tanstack/react-query'
import { NotFound } from './components/not-found'
import { createTrpc, getQueryClient } from './utils/trpc'

export const getRouter = () => {
  const queryClient = getQueryClient()
  const trpc = createTrpc(queryClient)

  const router = createTanStackRouter({
    routeTree,
    defaultPreloadStaleTime: 0,
    context: { trpc, queryClient },
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorComponent,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
