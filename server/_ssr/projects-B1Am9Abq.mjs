import { d as createFileRoute, u as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getProjectsSchema } from "./project.schema-6-JSs1hz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B1Am9Abq.js
var $$splitComponentImporter = () => import("./projects-gLPSjtKa.mjs");
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
