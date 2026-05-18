import { o as __toESM } from "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { L as IconEye, N as IconGripVertical, P as IconFolder, _ as IconPlus, _t as IconArrowDown, m as IconSearch, n as IconX, pt as IconArrowUp, v as IconPin, vt as IconAlignLeft } from "../_libs/tabler__icons-react.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { l as format } from "../_libs/date-fns.mjs";
import { t as Badge } from "./badge-zKr0p2xx.mjs";
import { t as Skeleton } from "./skeleton-BVhepoHH.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, o as verticalListSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { t as EmptyState } from "./empty-state-CvqlupIY.mjs";
import { n as AvatarFallback, t as Avatar$1 } from "./avatar-CScJCIPX.mjs";
import { a as useDebounced, i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./use-debounced-BaM6pW9J.mjs";
import { t as useOptimisticMutation } from "./optimistic-update-DxW24dW9.mjs";
import { t as Route } from "./projects-wN5YC0_5.mjs";
import { a as getFacetedRowModel, c as getPaginationRowModel, i as getFacetedMinMaxValues, l as getSortedRowModel, n as useReactTable, o as getFacetedUniqueValues, r as getCoreRowModel, s as getFilteredRowModel, t as flexRender } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BfS9o2IS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createTextColumn(id, label, options = {}) {
	const { width = "w-48", enableFilter = false, placeholder = `Cari ${label.toLowerCase()}...`, variant = "text", icon = IconAlignLeft, nullable = false } = options;
	return {
		id,
		accessorKey: id,
		header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: label
		}),
		cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${width} truncate`,
			title: row.getValue(id),
			children: row.getValue(id) ?? (nullable ? "-" : "")
		}),
		meta: enableFilter ? {
			label,
			placeholder,
			variant,
			icon
		} : { label },
		enableColumnFilter: enableFilter
	};
}
function createStatusColumn(id, label, options) {
	const { width = "w-48", enableFilter = false, placeholder = `Cari ${label.toLowerCase()}...`, variant = "text", icon = IconAlignLeft, valueIsBoolean = false, statusMap } = options;
	return {
		id,
		accessorKey: id,
		header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: label
		}),
		cell: ({ row }) => {
			const value = valueIsBoolean ? Boolean(row.getValue(id)) : row.getValue(id);
			const status = statusMap[String(value)] ?? {
				text: String(value),
				color: "gray"
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: width,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: cn(status.color === "green" && "bg-green-100 text-green-800", status.color === "red" && "bg-red-100 text-red-800", status.color === "blue" && "bg-blue-100 text-blue-800", status.color === "yellow" && "bg-yellow-100 text-yellow-800", status.color === "gray" && "bg-gray-100 text-gray-800", status.customColors),
					children: status.text
				})
			});
		},
		meta: enableFilter ? {
			label,
			placeholder,
			variant,
			icon
		} : { label },
		enableColumnFilter: enableFilter
	};
}
function createDateColumn(id, label, options = {}) {
	const { nullable = false, format: dateFormat = "dd/MM/yyyy" } = options;
	return {
		id,
		accessorKey: id,
		header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: label
		}),
		cell: ({ row }) => {
			const value = row.getValue(id);
			if (!value && nullable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "-" });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(new Date(value), dateFormat) });
		},
		meta: { label }
	};
}
function createActionColumn(cellRenderer) {
	return {
		id: "action",
		header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: "Aksi"
		}),
		cell: ({ row }) => cellRenderer({ row })
	};
}
function getProjectsColumns({ navigate }) {
	return [
		{
			id: "order",
			accessorKey: "order",
			enableSorting: true,
			enableHiding: false,
			header: () => null,
			cell: () => null
		},
		{
			id: "title",
			accessorKey: "title",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Project"
			}),
			cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
					className: "rounded-sm after:rounded-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "rounded-sm",
						children: row.getValue("title").slice(0, 2).toUpperCase()
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.getValue("title") })]
			}),
			meta: { label: "Project" }
		},
		createTextColumn("description", "Description", {
			width: "w-52",
			nullable: true
		}),
		createStatusColumn("status", "Status", {
			statusMap: {
				published: {
					text: "Published",
					color: "green"
				},
				draft: {
					text: "Draft",
					color: "yellow"
				},
				archived: {
					text: "Archived",
					color: "gray"
				}
			},
			width: "w-24"
		}),
		{
			id: "featureAt",
			accessorKey: "featureAt",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Featured"
			}),
			cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20",
				children: row.original.featureAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPin, { className: "size-3.5 text-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/40",
					children: "—"
				})
			}),
			meta: { label: "Featured" }
		},
		{
			id: "views",
			accessorKey: "views",
			header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Views"
			}),
			cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: row.getValue("views").toLocaleString()
			}),
			meta: { label: "Views" }
		},
		createDateColumn("createdAt", "Created", { format: "dd MMM yyyy" }),
		createDateColumn("updatedAt", "Updated", {
			nullable: true,
			format: "dd MMM yyyy"
		}),
		createActionColumn(({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "ghost",
			size: "icon-sm",
			title: "View",
			onClick: () => navigate({
				to: "/dashboard/projects/$projectId/edit",
				params: { projectId: row.original.id }
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, {})
		}))
	];
}
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-xs", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function DraggableRow({ row }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1,
			position: isDragging ? "relative" : void 0,
			zIndex: isDragging ? 1 : void 0
		},
		"data-state": row.getIsSelected() ? "selected" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "w-8 px-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				...attributes,
				...listeners,
				className: "text-muted-foreground hover:text-foreground flex cursor-grab items-center active:cursor-grabbing",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4" })
			})
		}), row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))]
	});
}
function DataTable({ table, isLoading, error, emptyMessage = "No data found.", emptyDescription, emptyIcon, emptyActions, className, children, onReorder }) {
	const rows = table.getRowModel().rows;
	const colSpan = table.getAllColumns().length + (onReorder ? 1 : 0);
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const allRows = rows.map((r) => r.original);
		const oldIndex = allRows.findIndex((_, i) => rows[i]?.id === String(active.id));
		const newIndex = allRows.findIndex((_, i) => rows[i]?.id === String(over.id));
		if (oldIndex === -1 || newIndex === -1) return;
		const reordered = [...allRows];
		reordered.splice(newIndex, 0, reordered.splice(oldIndex, 1)[0]);
		onReorder?.(reordered);
	}
	const tableBody = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: isLoading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: Array.from({ length: colSpan }).map((__, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }) }, j)) }, i)) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
		colSpan,
		className: "text-destructive h-24 text-center",
		children: error.message
	}) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
		className: "hover:bg-transparent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: emptyIcon,
				title: emptyMessage,
				description: emptyDescription ?? "",
				actions: emptyActions
			})
		})
	}) : onReorder ? rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DraggableRow, { row }, row.id)) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
		"data-state": row.getIsSelected() ? "selected" : void 0,
		children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
	}, row.id)) });
	const table_ = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
		className: "hover:bg-transparent",
		children: [onReorder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-8 px-2" }), headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id))]
	}, headerGroup.id)) }), onReorder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
		items: rows.map((r) => r.id),
		strategy: verticalListSortingStrategy,
		children: tableBody
	}) : tableBody] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-2", className),
		children: [children, onReorder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			id: "data-table-dnd",
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: table_
		}) : table_]
	});
}
function DataTableSortList({ table }) {
	const sorting = table.getState().sorting;
	if (sorting.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-1.5",
		children: [sorting.map((sort) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "h-5 gap-1 py-0.5 pr-1 pl-1.5 text-[0.625rem]",
				children: [sort.desc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowDown, { className: "size-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowUp, { className: "size-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => table.setSorting((prev) => prev.filter((s) => s.id !== sort.id)),
					className: "hover:text-foreground ml-0.5 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, { className: "size-2.5" })
				})]
			}, sort.id);
		}), sorting.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "ghost",
			size: "xs",
			onClick: () => table.setSorting([]),
			children: "Clear all"
		})]
	});
}
function DataTableToolbar({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-between gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center gap-2 flex-wrap",
			children
		})
	});
}
/**
* @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
*/
/**
* A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
* prop or avoid re-executing effects when passed as a dependency
*/
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
function useDebouncedCallback(callback, delay) {
	const handleCallback = useCallbackRef(callback);
	const debounceTimerRef = import_react.useRef(0);
	import_react.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
	return import_react.useCallback((...args) => {
		window.clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = window.setTimeout(() => handleCallback(...args), delay);
	}, [handleCallback, delay]);
}
var DEBOUNCE_MS = 500;
function useDataTableRouter(props) {
	const { columns, pageCount = -1, search, navigate, initialState, debounceMs = DEBOUNCE_MS, enableAdvancedFilter = false, ...tableProps } = props;
	const [rowSelection, setRowSelection] = import_react.useState(initialState?.rowSelection ?? {});
	const [columnVisibility, setColumnVisibility] = import_react.useState(initialState?.columnVisibility ?? {});
	const pagination = import_react.useMemo(() => ({
		pageIndex: search.page - 1,
		pageSize: search.perPage
	}), [search.page, search.perPage]);
	const onPaginationChange = import_react.useCallback((updaterOrValue) => {
		const newPagination = typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;
		navigate({ search: (prev) => ({
			...prev,
			page: newPagination.pageIndex + 1,
			perPage: newPagination.pageSize
		}) });
	}, [pagination, navigate]);
	const sorting = search.sort;
	const onSortingChange = import_react.useCallback((updaterOrValue) => {
		const newSorting = typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
		navigate({ search: (prev) => ({
			...prev,
			sort: newSorting,
			page: 1
		}) });
	}, [sorting, navigate]);
	const filterableColumns = import_react.useMemo(() => {
		if (enableAdvancedFilter) return [];
		return columns.filter((column) => column.enableColumnFilter);
	}, [columns, enableAdvancedFilter]);
	const initialColumnFilters = import_react.useMemo(() => {
		if (enableAdvancedFilter) return [];
		return filterableColumns.reduce((filters, column) => {
			const key = column.id ?? "";
			const value = search[key];
			if (value !== void 0 && value !== null && value !== "") filters.push({
				id: key,
				value: Array.isArray(value) ? value : [value]
			});
			return filters;
		}, []);
	}, [
		filterableColumns,
		search,
		enableAdvancedFilter
	]);
	const [columnFilters, setColumnFilters] = import_react.useState(initialColumnFilters);
	const debouncedNavigateFilters = useDebouncedCallback((filterUpdates) => {
		navigate({ search: (prev) => ({
			...prev,
			...filterUpdates,
			page: 1
		}) });
	}, debounceMs);
	const onColumnFiltersChange = import_react.useCallback((updaterOrValue) => {
		if (enableAdvancedFilter) return;
		setColumnFilters((prev) => {
			const next = typeof updaterOrValue === "function" ? updaterOrValue(prev) : updaterOrValue;
			const filterUpdates = {};
			for (const filter of next) if (filterableColumns.find((column) => column.id === filter.id)) filterUpdates[filter.id] = filter.value;
			for (const prevFilter of prev) if (!next.some((filter) => filter.id === prevFilter.id)) filterUpdates[prevFilter.id] = "";
			debouncedNavigateFilters(filterUpdates);
			return next;
		});
	}, [
		debouncedNavigateFilters,
		filterableColumns,
		enableAdvancedFilter
	]);
	const filters = import_react.useMemo(() => search.filters ?? [], [search.filters]);
	const debouncedNavigateAdvancedFilters = useDebouncedCallback((newFilters) => {
		navigate({ search: (prev) => ({
			...prev,
			filters: newFilters ?? [],
			page: 1
		}) });
	}, debounceMs);
	const setFilters = import_react.useCallback((value) => {
		if (typeof value === "function") debouncedNavigateAdvancedFilters(value(filters));
		else debouncedNavigateAdvancedFilters(value);
	}, [filters, debouncedNavigateAdvancedFilters]);
	const joinOperator = search.joinOperator ?? "and";
	const setJoinOperator = import_react.useCallback((value) => {
		navigate({ search: (prev) => ({
			...prev,
			joinOperator: value
		}) });
	}, [navigate]);
	return { table: useReactTable({
		...tableProps,
		columns,
		pageCount,
		state: {
			pagination,
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		defaultColumn: {
			...tableProps.defaultColumn,
			enableColumnFilter: false
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
			setJoinOperator
		}
	}) };
}
function RouteComponent() {
	const params = Route.useSearch();
	const navigate = Route.useNavigate();
	const [search, setSearch] = (0, import_react.useState)(params.search);
	const debouncedSearch = useDebounced(search, 300);
	(0, import_react.useEffect)(() => {
		navigate({
			search: (prev) => ({
				...prev,
				search: debouncedSearch || void 0
			}),
			replace: true
		});
	}, [debouncedSearch, navigate]);
	const { data, error } = useSuspenseQuery(trpc.project.getPaginatedProjects.queryOptions(params));
	const columns = (0, import_react.useMemo)(() => getProjectsColumns({ navigate }), [navigate]);
	const { table } = useDataTableRouter({
		data: data.data,
		columns,
		pageCount: data.pageCount,
		search: params,
		navigate: ({ search: updater }) => navigate({ search: updater }),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 50
			},
			columnVisibility: { order: false }
		},
		getRowId: (row) => row.id
	});
	const reorder = useOptimisticMutation(trpc.project.reorder.mutationOptions(), {
		queryOptions: trpc.project.getPaginatedProjects.queryOptions(params),
		operation: {
			type: "reorder",
			getOrder: (input) => input
		},
		onError: (err) => {
			globalErrorToast(`Failed to reorder projects: ${err.message}`);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
				className: "w-full sm:max-w-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSearch, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						placeholder: "Search...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						onKeyDown: (e) => e.key === "Escape" && setSearch("")
					}),
					search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
							size: "icon-xs",
							onClick: () => setSearch(""),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupAddon, {
						align: "inline-end",
						children: [data.data.length, " results"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				onClick: () => navigate({ to: "/dashboard/projects/create" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), "New Project"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			table,
			isLoading: false,
			error,
			onReorder: (reorderedItems) => {
				reorder.mutate(reorderedItems.map((item, i) => ({
					id: item.id,
					order: i
				})));
			},
			emptyIcon: IconFolder,
			emptyMessage: "No projects found.",
			emptyDescription: "Try adjusting your search or filter to find what you're looking for.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableToolbar, {
				table,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableSortList, { table })
			})
		})]
	});
}
//#endregion
export { RouteComponent as component };
