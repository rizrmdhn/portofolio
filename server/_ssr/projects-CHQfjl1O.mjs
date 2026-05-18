import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as MainHeader } from "./main-header-DbejrcLK.mjs";
import { t as Route } from "./projects-D4iPc_T2.mjs";
import { t as ProjectCard } from "./project-card-DX0b9ztk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CHQfjl1O.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "w-full md:max-w-175 mx-auto px-4 md:px-0 py-12 flex flex-col gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-sm text-subtle tracking-[0.15em] font-mono",
				children: "ALL PROJECTS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3",
				children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project }, project.id))
			})]
		})]
	});
}
//#endregion
export { ProjectsPage as component };
