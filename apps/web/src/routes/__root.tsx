import { ErrorBoundary } from '@/components/error-boundary'
import { NotFound } from '@/components/not-found'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { DEFAULT_LOCALE, isLocale } from '@portofolio/i18n'
import type { AppRouter } from '@portofolio/api/root'
import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useParams,
} from '@tanstack/react-router'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { Suspense, lazy } from 'react'

import appCss from '../index.css?url'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-router-devtools').then((m) => ({
          default: m.TanStackRouterDevtools,
        })),
      )

const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-query-devtools').then((m) => ({
          default: m.ReactQueryDevtools,
        })),
      )

const TanStackDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-devtools').then(async (m) => {
          const { formDevtoolsPlugin } = await import('@tanstack/react-form-devtools')
          const Component = () => (
            <m.TanStackDevtools
              plugins={[formDevtoolsPlugin()]}
              config={{ position: 'middle-right' }}
            />
          )
          return { default: Component }
        }),
      )

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
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
  component: RootDocument,
})

function RootDocument() {
  // Read the locale from the `$locale` route param when present (public site);
  // dashboard/auth/error routes have no locale param and fall back to default.
  const params = useParams({ strict: false })
  const lang = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE

  return (
    <html lang={lang} className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div className="grid h-svh grid-rows-[auto_1fr]">
            <Outlet />
          </div>
          <Toaster richColors />
        </ThemeProvider>
        <Suspense>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
          <TanStackDevtools />
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
