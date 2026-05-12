import { EmptyState } from '@/components/ui/empty-state'
import { IconArrowLeft, IconHome, IconMoodPuzzled } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'

export function NotFound() {
  const router = useRouter()

  const isHasHistory = router.history.length > 1
  return (
    <div className="flex h-svh items-center justify-center p-6">
      <EmptyState
        icon={<IconMoodPuzzled className="size-24" />}
        iconVariant="default"
        title="Page not found"
        titleClassName="text-2xl"
        description="The page you're looking for doesn't exist or has been moved."
        descriptionClassName="text-center text-muted-foreground"
        actions={[
          {
            label: 'Go back',
            icon: IconArrowLeft,
            variant: 'outline',
            onClick: () =>
              isHasHistory
                ? router.history.back()
                : router.navigate({
                    to: '/',
                  }),
          },
          {
            label: 'Go home',
            icon: IconHome,
            href: '/',
          },
        ]}
      />
    </div>
  )
}
