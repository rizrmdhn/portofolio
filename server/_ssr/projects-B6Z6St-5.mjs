import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as cn } from "./button-Byofh5wQ.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { t as MainHeader } from "./main-header-DCqjmhRG.mjs";
import { t as Badge } from "./badge-CNx_OxWt.mjs";
import { t as ProjectCard } from "./project-card-CYa4fg_o.mjs";
import { t as Route } from "./projects-FEdSmPSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B6Z6St-5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TECH_COLLAPSED_LIMIT = 12;
function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	const { tech } = Route.useSearch();
	const navigate = useNavigate({ from: "/$locale/projects/" });
	const { t, format } = useTranslations();
	const [showAllTech, setShowAllTech] = (0, import_react.useState)(false);
	const allTech = Array.from(new Map(projects.flatMap((p) => p.tech).map((name) => [name.toLocaleLowerCase(), name])).values()).sort();
	const isCollapsible = allTech.length > TECH_COLLAPSED_LIMIT;
	const visibleTech = !isCollapsible || showAllTech ? allTech : Array.from(new Set([...allTech.slice(0, TECH_COLLAPSED_LIMIT), ...tech && allTech.includes(tech) ? [tech] : []]));
	const hiddenCount = allTech.length - visibleTech.length;
	const filtered = tech ? projects.filter((p) => p.tech.map((name) => name.toLocaleLowerCase()).includes(tech.toLocaleLowerCase())) : projects;
	function toggleTech(value) {
		navigate({ search: (prev) => ({
			...prev,
			tech: prev.tech === value ? void 0 : value
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-col gap-8 px-4 py-12 md:max-w-175 md:px-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-subtle font-mono text-sm tracking-[0.15em]",
					children: t.projects.allHeading
				}),
				allTech.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [visibleTech.map((techItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => toggleTech(techItem) }),
						variant: tech === techItem ? "default" : "outline",
						className: cn("cursor-pointer", tech === techItem && "ring-ring/50 ring-2"),
						children: techItem
					}, techItem)), isCollapsible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowAllTech((prev) => !prev) }),
						variant: "ghost",
						className: "text-subtle cursor-pointer",
						children: showAllTech ? t.projects.showLess : format(t.projects.showMore, { count: hiddenCount })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]",
					children: filtered.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project }, project.id))
				})
			]
		})]
	});
}
//#endregion
export { ProjectsPage as component };
