import { S as string, y as object } from "../_libs/zod.mjs";
import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Skeleton } from "./skeleton-BVhepoHH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-BV-SFMn5.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./experience-BZR9BT1_.mjs");
var Route = createFileRoute("/(core)/dashboard/experience/")({
	validateSearch: object({ search: string().optional() }),
	beforeLoad: async ({ search, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.experience.getForDashboard.queryOptions(search));
	},
	pendingComponent: ExperienceListSkeleton,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function ExperienceListSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full sm:w-72" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full sm:w-32" }),
				" "
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-18 w-full rounded-lg" }, i))
		})]
	});
}
//#endregion
export { Route as t };
