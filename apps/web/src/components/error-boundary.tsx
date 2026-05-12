import { EmptyState } from '@/components/ui/empty-state'
import { IconAlertTriangle, IconHome, IconRefresh } from '@tabler/icons-react'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router'

export function ErrorBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isHasHistory = router.history.length > 1
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.'

  return (
    <div className="flex h-svh items-center justify-center p-6">
      <EmptyState
        icon={<IconAlertTriangle className="size-24" />}
        iconVariant="default"
        title="Something went wrong"
        titleClassName="text-2xl"
        description={message}
        descriptionClassName="text-center text-muted-foreground"
        actions={[
          {
            label: 'Try again',
            icon: IconRefresh,
            onClick: () => router.invalidate(),
          },
          {
            label: 'Go home',
            icon: IconHome,
            href: '/',
            variant: 'outline',
            onClick: isHasHistory
              ? undefined
              : () => router.navigate({ to: '/' }),
          },
        ]}
      />
    </div>
  )
}
