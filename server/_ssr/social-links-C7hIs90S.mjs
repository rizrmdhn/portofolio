import { t as zod_default } from "../_libs/zod.mjs";
import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Skeleton } from "./skeleton-DtwXejz9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-links-C7hIs90S.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./social-links-BQj4gJnT.mjs");
var Route = createFileRoute("/(core)/dashboard/social-links/")({
	validateSearch: zod_default.object({ search: zod_default.string().optional() }),
	beforeLoad: async ({ search, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.socialLink.getForDashboard.queryOptions(search));
	},
	pendingComponent: SocialLinkListSkeleton,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function SocialLinkListSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full sm:w-72" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full sm:w-32" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-18 w-full rounded-lg" }, i))
		})]
	});
}
//#endregion
export { Route as t };
