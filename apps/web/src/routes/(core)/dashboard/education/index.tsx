import { EducationCard } from '@/components/dashboard/education-card'
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
import { useOptimisticMutation } from '@/lib/optimistic-update'
import { globalErrorToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Education } from '@portofolio/types/education.types'
import { IconPlus, IconSchool, IconSearch, IconX } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/(core)/dashboard/education/')({
  validateSearch: z.object({ search: z.string().optional() }),
  beforeLoad: async ({ search, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.education.getForDashboard.queryOptions(search),
    )
  },
  pendingComponent: EducationListSkeleton,
  component: RouteComponent,
})

function SortableEducationCard({ education }: { education: Education }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: education.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : undefined,
        position: isDragging ? 'relative' : undefined,
      }}
    >
      <EducationCard education={education} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}

function EducationListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:w-72" />
        <Skeleton className="h-9 w-full sm:w-32" />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
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

  const { data } = useSuspenseQuery(trpc.education.getForDashboard.queryOptions(params))

  const reorder = useOptimisticMutation(trpc.education.reorder.mutationOptions(), {
    queryOptions: trpc.education.getForDashboard.queryOptions(params),
    operation: {
      type: 'reorder',
      getOrder: (input) => input,
    },
    onError: (err) => {
      globalErrorToast(`Failed to reorder education: ${err.message}`)
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = data.findIndex((item) => item.id === active.id)
    const newIndex = data.findIndex((item) => item.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(data, oldIndex, newIndex)
    reorder.mutate(reordered.map((item, i) => ({ id: item.id, order: i })))
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
        <Button onClick={() => navigate({ to: '/dashboard/education/create' })}>
          <IconPlus />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={IconSchool}
          title="No education entries yet"
          description={
            params.search
              ? `No results for "${params.search}"`
              : 'Add your first education entry to get started.'
          }
          actions={[{ icon: IconPlus, label: 'Add Education', onClick: () => navigate({ to: '/dashboard/education/create' }) }]}
        />
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DndContext
            id="education-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={data.map((item) => item.id)} strategy={rectSortingStrategy}>
              {data.map((item) => (
                <SortableEducationCard key={item.id} education={item} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}
