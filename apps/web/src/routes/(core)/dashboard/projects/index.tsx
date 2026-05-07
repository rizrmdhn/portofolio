import getProjectsColumns from "@/components/columns/project-column";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTableRouter } from "@/hooks/use-data-table-router";
import { globalErrorToast } from "@/lib/toasts";
import { getQueryClient, trpc } from "@/utils/trpc";
import { getProjectsSchema } from "@portofolio/schema/project.schema";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/(core)/dashboard/projects/")({
  validateSearch: getProjectsSchema,
  beforeLoad: async ({ search, context }) => {
    const queryOptions = trpc.project.getPaginatedProjects.queryOptions(search);

    await context.queryClient.ensureQueryData(queryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data, isLoading, error } = useSuspenseQuery(
    trpc.project.getPaginatedProjects.queryOptions(params),
  );

  const columns = useMemo(() => getProjectsColumns({}), []);

  const { table } = useDataTableRouter({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount ?? 0,
    search: params,
    navigate: ({ search: updater }) => navigate({ search: updater }),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
      columnVisibility: { order: false },
    },
    getRowId: (row) => row.id,
  });

  const reorder = useMutation(
    trpc.project.reorder.mutationOptions({
      onSuccess: () => {
        getQueryClient().invalidateQueries(
          trpc.project.getPaginatedProjects.queryOptions(params),
        );
      },
      onError: (err) =>
        globalErrorToast(`Failed to reorder projects: ${err.message}`),
    }),
  );

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        table={table}
        isLoading={isLoading}
        error={error}
        onReorder={(reorderedItems) => {
          reorder.mutate(
            reorderedItems.map((item, i) => ({ id: item.id, order: i })),
          );
        }}
        emptyMessage="No projects found."
        emptyDescription="Try adjusting your filters."
      >
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
