import { authClient } from '@/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'
import { CustomSkeleton } from './ui/custom-skeleton'

export function LoginButton() {
  const { data, isPending } = authClient.useSession()

  const navigate = useNavigate()

  return (
    <CustomSkeleton isLoading={isPending}>
      <div>
        <div>
          {isPending ? (
            <div className="h-8 w-full rounded md:w-16" />
          ) : data ? (
            <Button
              onClick={() => navigate({ to: '/dashboard' })}
              variant="outline"
              size="lg"
              className="text-subtle w-full"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => navigate({ to: '/login' })}
              variant="outline"
              size="lg"
              className="text-subtle w-full"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </CustomSkeleton>
  )
}
