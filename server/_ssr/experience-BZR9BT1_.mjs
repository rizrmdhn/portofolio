import { o as __toESM } from "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { N as IconGripVertical, Q as IconBriefcase, _ as IconPlus, b as IconPencil, m as IconSearch, n as IconX } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-DXBrv0gs.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { l as format } from "../_libs/date-fns.mjs";
import { r as CardContent, t as Card } from "./card-DbtAMaAG.mjs";
import { t as Badge } from "./badge-zKr0p2xx.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, o as verticalListSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { t as EmptyState } from "./empty-state-CvqlupIY.mjs";
import { n as AvatarFallback, t as Avatar$1 } from "./avatar-CScJCIPX.mjs";
import { a as useDebounced, i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./use-debounced-BaM6pW9J.mjs";
import { t as useOptimisticMutation } from "./optimistic-update-DxW24dW9.mjs";
import { t as Route } from "./experience-BV-SFMn5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-BZR9BT1_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getInitials(company) {
	return company.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function getStatusVariant(status) {
	if (status === "published") return "success";
	return "draft";
}
function ExperienceCard({ experience, dragHandleProps }) {
	const navigate = useNavigate();
	const endLabel = experience.currentlyWorking ? "Present" : experience.endDate ? format(experience.endDate, "yyyy") : "Present";
	const startLabel = format(experience.startDate, "yyyy");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "py-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex items-center gap-3 py-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "flex items-center text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground",
					...dragHandleProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4 shrink-0" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
					className: "size-9 rounded-md shrink-0 after:rounded-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "rounded-md text-xs font-semibold",
						children: getInitials(experience.company)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold leading-tight truncate",
								children: experience.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground shrink-0",
								children: ["· ", experience.company]
							})]
						}),
						experience.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground line-clamp-1",
							children: experience.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "rounded-sm font-mono",
								children: [
									startLabel,
									" – ",
									endLabel
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "rounded-sm font-mono",
								variant: getStatusVariant(experience.status),
								children: experience.status
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7 shrink-0",
					onClick: () => navigate({
						to: `/dashboard/experience/${experience.id}/edit`,
						params: { experienceId: experience.id }
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPencil, { className: "size-3.5" })
				})
			]
		})
	});
}
function SortableExperienceCard({ experience }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1,
			zIndex: isDragging ? 1 : void 0,
			position: isDragging ? "relative" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, {
			experience,
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
	const { data } = useSuspenseQuery(trpc.experience.getForDashboard.queryOptions(params));
	const reorder = useOptimisticMutation(trpc.experience.reorder.mutationOptions(), {
		queryOptions: trpc.experience.getForDashboard.queryOptions(params),
		operation: {
			type: "reorder",
			getOrder: (input) => input
		},
		onError: (err) => {
			globalErrorToast(`Failed to reorder experience: ${err.message}`);
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
			icon: IconBriefcase,
			title: "No experience found",
			description: params.search ? `No results for "${params.search}"` : "Add your first experience to get started.",
			actions: [{
				icon: IconPlus,
				label: "Add Experience",
				onClick: () => navigate({ to: "/dashboard/experience/create" })
			}]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			id: "experience-dnd",
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
				items: data.map((item) => item.id),
				strategy: verticalListSortingStrategy,
				children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableExperienceCard, { experience: item }, item.id))
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
				onClick: () => navigate({ to: "/dashboard/experience/create" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), "Add Experience"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: renderList()
		})]
	});
}
//#endregion
export { RouteComponent as component };
