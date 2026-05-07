import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type Updater,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import type {
  ExtendedColumnFilter,
  ExtendedColumnSort,
  JoinOperator,
} from "@portofolio/types/data-table.types";

const DEBOUNCE_MS = 500;

interface SearchParams {
  page: number;
  perPage: number;
  sort: { id: string; desc: boolean }[];
  filters?: {
    id: string;
    value: string | string[];
    variant: string;
    operator: string;
    filterId: string;
  }[];
  joinOperator?: string;
  [key: string]: unknown;
}

interface UseDataTableRouterProps<TData extends Record<string, unknown>, TSearch extends SearchParams>
  extends
    Omit<
      TableOptions<TData>,
      | "state"
      | "pageCount"
      | "getCoreRowModel"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  search: TSearch;
  navigate: (opts: { search: (prev: TSearch) => TSearch }) => void;
  initialState?: {
    sorting?: ExtendedColumnSort<TData>[];
    pagination?: { pageSize: number; pageIndex: number };
    rowSelection?: RowSelectionState;
    columnVisibility?: VisibilityState;
  };
  debounceMs?: number;
  enableAdvancedFilter?: boolean;
}

export function useDataTableRouter<TData extends Record<string, unknown>, TSearch extends SearchParams>(
  props: UseDataTableRouterProps<TData, TSearch>,
) {
  const {
    columns,
    pageCount = -1,
    search,
    navigate,
    initialState,
    debounceMs = DEBOUNCE_MS,
    enableAdvancedFilter = false,
    ...tableProps
  } = props;

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  // Pagination — derived from search params
  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: search.page - 1,
      pageSize: search.perPage,
    }),
    [search.page, search.perPage],
  );

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(pagination)
          : updaterOrValue;
      navigate({
        search: (prev) => ({
          ...prev,
          page: newPagination.pageIndex + 1,
          perPage: newPagination.pageSize,
        }),
      });
    },
    [pagination, navigate],
  );

  // Sorting — derived from search params
  const sorting = search.sort as ExtendedColumnSort<TData>[];

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;
      navigate({
        search: (prev) => ({
          ...prev,
          sort: newSorting as { id: string; desc: boolean }[],
          page: 1,
        }),
      });
    },
    [sorting, navigate],
  );

  // Column filters
  const filterableColumns = React.useMemo(() => {
    if (enableAdvancedFilter) return [];
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns, enableAdvancedFilter]);

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    if (enableAdvancedFilter) return [];
    return filterableColumns.reduce<ColumnFiltersState>((filters, column) => {
      const key = column.id ?? "";
      const value = search[key];
      if (value !== undefined && value !== null && value !== "") {
        filters.push({
          id: key,
          value: Array.isArray(value) ? value : [value],
        });
      }
      return filters;
    }, []);
  }, [filterableColumns, search, enableAdvancedFilter]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const debouncedNavigateFilters = useDebouncedCallback(
    (filterUpdates: Record<string, unknown>) => {
      navigate({
        search: (prev) => ({
          ...prev,
          ...filterUpdates,
          page: 1,
        }),
      });
    },
    debounceMs,
  );

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return;

      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates: Record<string, unknown> = {};
        for (const filter of next) {
          if (filterableColumns.find((column) => column.id === filter.id)) {
            filterUpdates[filter.id] = filter.value;
          }
        }
        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = "";
          }
        }

        debouncedNavigateFilters(filterUpdates);
        return next;
      });
    },
    [debouncedNavigateFilters, filterableColumns, enableAdvancedFilter],
  );

  // Advanced filters — derived from search params, updated via navigate
  const filters = React.useMemo(
    () => (search.filters ?? []) as ExtendedColumnFilter<TData>[],
    [search.filters],
  );

  const debouncedNavigateAdvancedFilters = useDebouncedCallback(
    (newFilters: ExtendedColumnFilter<TData>[] | null) => {
      navigate({
        search: (prev) => ({
          ...prev,
          filters: newFilters ?? [],
          page: 1,
        }),
      });
    },
    debounceMs,
  );

  const setFilters = React.useCallback(
    (
      value:
        | ExtendedColumnFilter<TData>[]
        | ((
            prev: ExtendedColumnFilter<TData>[],
          ) => ExtendedColumnFilter<TData>[])
        | null,
    ) => {
      if (typeof value === "function") {
        debouncedNavigateAdvancedFilters(value(filters));
      } else {
        debouncedNavigateAdvancedFilters(value);
      }
    },
    [filters, debouncedNavigateAdvancedFilters],
  );

  const joinOperator = (search.joinOperator ?? "and") as JoinOperator;

  const setJoinOperator = React.useCallback(
    (value: JoinOperator) => {
      navigate({
        search: (prev) => ({
          ...prev,
          joinOperator: value,
        }),
      });
    },
    [navigate],
  );

  const table = useReactTable({
    ...tableProps,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      ...tableProps.meta,
      filters,
      setFilters,
      joinOperator,
      setJoinOperator,
    },
  });

  return { table };
}
