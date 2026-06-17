import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { $ as IconExternalLink, C as IconPlus, E as IconPencil, Ot as IconAward, ft as IconCertificate, q as IconGripVertical, r as IconX, y as IconSearch } from "../_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn, t as Button$1 } from "./button-Byofh5wQ.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./separator-DENx5VjH.mjs";
import { t as EmptyState } from "./empty-state-BMP6Jt4s.mjs";
import { a as CardFooter, r as CardContent, t as Card } from "./card-DzVnM7at.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, r as rectSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { n as AvatarFallback, t as Avatar$1 } from "./avatar-DW6qcS4-.mjs";
import { a as useDebounced, i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./use-debounced-BNCRzbzO.mjs";
import { t as useOptimisticMutation } from "./optimistic-update-BoGazu9o.mjs";
import { t as Route } from "./certificate-seS6h36b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate-C7rP16ay.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CertificateCard({ certificate, dragHandleProps }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "py-3 px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex items-center gap-3 px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-2 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "flex items-center text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground",
							...dragHandleProps,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4 shrink-0" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
							className: "size-9 rounded-md shrink-0 after:rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "rounded-md text-xs font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAward, { className: "size-4" })
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold leading-tight truncate text-foreground",
							children: certificate.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: certificate.issuer
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "flex items-center justify-start p-0 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					size: "sm",
					onClick: () => navigate({
						to: "/dashboard/certificate/$certificateId/edit",
						params: { certificateId: certificate.id }
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPencil, { className: "size-3.5" }), "Edit"]
				}), certificate.certificateUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: certificate.certificateUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: cn(buttonVariants({
						variant: "outline",
						size: "sm"
					})),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconExternalLink, { className: "size-3.5" }), "View"]
				})]
			})
		]
	});
}
function SortableCertificateCard({ certificate }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: certificate.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1,
			zIndex: isDragging ? 1 : void 0,
			position: isDragging ? "relative" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateCard, {
			certificate,
			dragHandleProps: {
				...attributes,
				...listeners
			}
		})
	});
}
function RouteComponent() {
	const params = Route.useSearch();
	const navigate = Route.useNavigate();
	const [search, setSearch] = (0, import_react.useState)(params.search ?? "");
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
	const { data } = useSuspenseQuery(trpc.certification.getForDashboard.queryOptions(params));
	const reorder = useOptimisticMutation(trpc.certification.reorder.mutationOptions(), {
		queryOptions: trpc.certification.getForDashboard.queryOptions(params),
		operation: {
			type: "reorder",
			getOrder: (input) => input
		},
		onError: (err) => {
			globalErrorToast(`Failed to reorder certification: ${err.message}`);
		}
	});
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = data.findIndex((item) => item.id === active.id);
		const newIndex = data.findIndex((item) => item.id === over.id);
		if (oldIndex === -1 || newIndex === -1) return;
		const reordered = arrayMove(data, oldIndex, newIndex);
		reorder.mutate(reordered.map((item, i) => ({
			id: item.id,
			order: i
		})));
	}
	const renderList = () => {
		if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: IconCertificate,
			title: "Your certificates are empty",
			description: params.search ? `No results for "${params.search}"` : "Add your first certificate to get started.",
			actions: [{
				icon: IconPlus,
				label: "Add Certificate",
				onClick: () => {}
			}]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
				id: "certificate-dnd",
				sensors,
				collisionDetection: closestCenter,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
					items: data.map((item) => item.id),
					strategy: rectSortingStrategy,
					children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableCertificateCard, { certificate: item }, item.id))
				})
			})
		});
	};
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
						children: [data.length, " results"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				onClick: () => navigate({ to: "/dashboard/certificate/create" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), "Add Certificate"]
			})]
		}), renderList()]
	});
}
//#endregion
export { RouteComponent as component };
