import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getProjectsSchema } from "./project.schema-CaO0cEu4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-wN5YC0_5.js
var $$splitComponentImporter = () => import("./projects-BfS9o2IS.mjs");
var Route = createFileRoute("/(core)/dashboard/projects/")({
	validateSearch: getProjectsSchema,
	beforeLoad: async ({ search, context }) => {
		const queryOptions = context.trpc.project.getPaginatedProjects.queryOptions(search);
		await context.queryClient.ensureQueryData(queryOptions);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
