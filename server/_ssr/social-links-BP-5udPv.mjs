import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { C as IconPlus, E as IconPencil, K as IconGripVertical, Ot as IconAt, r as IconX, y as IconSearch } from "../_libs/tabler__icons-react.mjs";
import { S as SOCIAL_ICON_MAP } from "./auth-BlELRVlC.mjs";
import { t as Button$1 } from "./button-DXBrv0gs.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, r as rectSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { t as EmptyState } from "./empty-state-CvqlupIY.mjs";
import { r as CardContent, t as Card } from "./card-DbtAMaAG.mjs";
import { a as useDebounced, i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./use-debounced-BaM6pW9J.mjs";
import { t as useOptimisticMutation } from "./optimistic-update-DxW24dW9.mjs";
import { t as Route } from "./social-links-rFOXKSZU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-links-BP-5udPv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SocialLinkCard({ socialLink, dragHandleProps }) {
	const navigate = useNavigate();
	const Icon = SOCIAL_ICON_MAP[socialLink.icon].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "py-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-muted-foreground/40 hover:text-muted-foreground flex cursor-grab items-center active:cursor-grabbing",
					...dragHandleProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4 shrink-0" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-muted flex size-9 shrink-0 items-center justify-center rounded-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-foreground size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm leading-tight font-semibold",
						children: socialLink.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: socialLink.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-muted-foreground cursor-pointer truncate text-xs hover:underline",
						children: socialLink.url
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7 shrink-0",
					onClick: () => navigate({
						to: "/dashboard/social-links/$socialLinkId/edit",
						params: { socialLinkId: socialLink.id }
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPencil, { className: "size-3.5" })
				})
			]
		})
	});
}
function SortableSocialLinkCard({ socialLink }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: socialLink.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1,
			zIndex: isDragging ? 1 : void 0,
			position: isDragging ? "relative" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLinkCard, {
			socialLink,
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
	const { data } = useSuspenseQuery(trpc.socialLink.getForDashboard.queryOptions(params));
	const reorder = useOptimisticMutation(trpc.socialLink.reorder.mutationOptions(), {
		queryOptions: trpc.socialLink.getForDashboard.queryOptions(params),
		operation: {
			type: "reorder",
			getOrder: (input) => input
		},
		onError: (err) => {
			globalErrorToast(`Failed to reorder social links: ${err.message}`);
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
			icon: IconAt,
			title: "Your social links are empty",
			description: params.search ? `No results for "${params.search}"` : "Add your first social link to get started.",
			actions: [{
				icon: IconPlus,
				label: "Add Social Link",
				onClick: () => navigate({ to: "/dashboard/social-links/create" })
			}]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
				id: "social-links-id",
				sensors,
				collisionDetection: closestCenter,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
					items: data.map((item) => item.id),
					strategy: rectSortingStrategy,
					children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableSocialLinkCard, { socialLink: item }, item.id))
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
				onClick: () => navigate({ to: "/dashboard/social-links/create" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), "Add Social Link"]
			})]
		}), renderList()]
	});
}
//#endregion
export { RouteComponent as component };
