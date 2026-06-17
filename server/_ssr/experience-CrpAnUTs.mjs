import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { C as IconPlus, E as IconPencil, mt as IconBriefcase, r as IconX, y as IconSearch } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { u as format } from "../_libs/date-fns.mjs";
import { t as EmptyState } from "./empty-state-BMP6Jt4s.mjs";
import { r as CardContent, t as Card } from "./card-DzVnM7at.mjs";
import { t as Badge } from "./badge-CNx_OxWt.mjs";
import { n as AvatarFallback, t as Avatar$1 } from "./avatar-DW6qcS4-.mjs";
import { a as useDebounced, i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./use-debounced-BNCRzbzO.mjs";
import { t as Route } from "./experience-DhYUaQrm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-CrpAnUTs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getInitials(company) {
	return company.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function getStatusVariant(status) {
	if (status === "published") return "success";
	return "draft";
}
function ExperienceCard({ experience }) {
	const navigate = useNavigate();
	const endLabel = experience.currentlyWorking ? "Present" : experience.endDate ? format(experience.endDate, "yyyy") : "Present";
	const startLabel = format(experience.startDate, "yyyy");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "py-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex items-center gap-3 py-3 px-4",
			children: [
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
		return data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, { experience: item }, item.id));
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
