import getProjectsColumns from '@/components/columns/project-column'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableSortList } from '@/components/data-table/data-table-sort-list'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useDataTableRouter } from '@/hooks/use-data-table-router'
import useDebounced from '@/hooks/use-debounced'
import { useOptimisticMutation } from '@/lib/optimistic-update'
import { globalErrorToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import { getProjectsSchema } from '@portofolio/schema/project.schema'
import { IconFolder, IconPlus, IconSearch, IconX } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/(core)/dashboard/projects/')({
  validateSearch: getProjectsSchema,
  beforeLoad: async ({ search, context }) => {
    const queryOptions = context.trpc.project.getPaginatedProjects.queryOptions(search)

    await context.queryClient.ensureQueryData(queryOptions)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useSearch()
  const navigate = Route.useNavigate()
  const [search, setSearch] = useState(params.search)
  const debouncedSearch = useDebounced(search, 300)

  // Sync debounced value into the URL
  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearch || undefined }),
      replace: true,
    })
  }, [debouncedSearch, navigate])

  const { data, error } = useSuspenseQuery(trpc.project.getPaginatedProjects.queryOptions(params))

  const columns = useMemo(() => getProjectsColumns({ navigate }), [navigate])

  const { table } = useDataTableRouter({
    data: data.data,
    columns,
    pageCount: data.pageCount,
    search: params,
    navigate: ({ search: updater }) => navigate({ search: updater }),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
      columnVisibility: { order: false },
    },
    getRowId: (row) => row.id,
  })

  const reorder = useOptimisticMutation(trpc.project.reorder.mutationOptions(), {
    queryOptions: trpc.project.getPaginatedProjects.queryOptions(params),
    operation: {
      type: 'reorder',
      getOrder: (input) => input,
    },
    onError: (err) => {
      globalErrorToast(`Failed to reorder projects: ${err.message}`)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <InputGroup className="max-w-xs">
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
          <InputGroupAddon align="inline-end">{data.data.length} results</InputGroupAddon>
        </InputGroup>
        {/* Add button or other controls can go here */}
        <Button onClick={() => navigate({ to: '/dashboard/projects/create' })}>
          <IconPlus />
          New Project
        </Button>
      </div>
      <DataTable
        table={table}
        isLoading={false}
        error={error}
        onReorder={(reorderedItems) => {
          reorder.mutate(reorderedItems.map((item, i) => ({ id: item.id, order: i })))
        }}
        emptyIcon={IconFolder}
        emptyMessage="No projects found."
        emptyDescription="Try adjusting your search or filter to find what you're looking for."
      >
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  )
}
