import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_projectId.edit-kAGbgbDO.js
var $$splitComponentImporter = () => import("./_projectId.edit-D_AU-Piy.mjs");
var Route = createFileRoute("/(core)/dashboard/projects/$projectId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.project.getById.queryOptions({ id: params.projectId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
