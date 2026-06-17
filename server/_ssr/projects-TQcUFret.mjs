import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getProjectsSchema } from "./project.schema-CNVBu7uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-TQcUFret.js
var $$splitComponentImporter = () => import("./projects-DGXZouu4.mjs");
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
