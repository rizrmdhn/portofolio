import { ExperienceCard } from '@/components/dashboard/experience-card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Skeleton } from '@/components/ui/skeleton'
import useDebounced from '@/hooks/use-debounced'
import { trpc } from '@/utils/trpc'
import { IconBriefcase, IconPlus, IconSearch, IconX } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/(core)/dashboard/experience/')({
  validateSearch: z.object({
    search: z.string().optional(),
  }),
  beforeLoad: async ({ search, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.experience.getForDashboard.queryOptions(search),
    )
  },
  pendingComponent: ExperienceListSkeleton,
  component: RouteComponent,
})

function ExperienceListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:w-72" /> {/* search bar */}
        <Skeleton className="h-9 w-full sm:w-32" /> {/* add button */}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-18 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}

function RouteComponent() {
  const params = Route.useSearch()
  const navigate = Route.useNavigate()
  const [search, setSearch] = useState(params.search ?? '')
  const debouncedSearch = useDebounced(search, 300)

  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearch || undefined }),
      replace: true,
    })
  }, [debouncedSearch, navigate])

  const { data } = useSuspenseQuery(trpc.experience.getForDashboard.queryOptions(params))

  const renderList = () => {
    if (data.length === 0) {
      return (
        <EmptyState
          icon={IconBriefcase}
          title="No experience found"
          description={
            params.search
              ? `No results for "${params.search}"`
              : 'Add your first experience to get started.'
          }
          actions={[
            {
              icon: IconPlus,
              label: 'Add Experience',
              onClick: () => navigate({ to: '/dashboard/experience/create' }),
            },
          ]}
        />
      )
    }

    return data.map((item) => <ExperienceCard key={item.id} experience={item} />)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="w-full sm:max-w-xs">
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setSearch('')}
          />
          {search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" onClick={() => setSearch('')}>
                <IconX />
              </InputGroupButton>
            </InputGroupAddon>
          )}
          <InputGroupAddon align="inline-end">{data.length} results</InputGroupAddon>
        </InputGroup>
        <Button
          onClick={() =>
            navigate({
              to: '/dashboard/experience/create',
            })
          }
        >
          <IconPlus />
          Add Experience
        </Button>
      </div>
      <div className="flex flex-col gap-2">{renderList()}</div>
    </div>
  )
}
