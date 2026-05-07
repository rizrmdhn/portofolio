import getProjectsColumns from "@/components/columns/project-column";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTableRouter } from "@/hooks/use-data-table-router";
import { trpc } from "@/utils/trpc";
import { getProjectsSchema } from "@portofolio/schema/project.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
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

  const columns = useMemo(
    () =>
      getProjectsColumns({
        currentPage: params.page,
        perPage: params.perPage,
      }),
    [params.page, params.perPage],
  );

  const { table } = useDataTableRouter({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount ?? 0,
    search: params,
    navigate: ({ search: updater }) => navigate({ search: updater }),
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
    },
    getRowId: (row) => row.id,
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        table={table}
        isLoading={isLoading}
        error={error}
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
