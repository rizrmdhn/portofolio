import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { AppRouter } from '@portofolio/api/root'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

import appCss from '../index.css?url'

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Portfolio' },
      { name: 'robots', content: 'index, follow' },
      // Open Graph defaults (overridden per-route)
      { property: 'og:type', content: 'website' },
      // Twitter card defaults
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  }),

  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div className="grid h-svh grid-rows-[auto_1fr]">
            <Outlet />
          </div>
          <Toaster richColors />
        </ThemeProvider>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
