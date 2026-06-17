import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_educationId.edit-CwUuvdYM.js
var $$splitComponentImporter = () => import("./_educationId.edit-pD9hS5Kw.mjs");
var Route = createFileRoute("/(core)/dashboard/education/$educationId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.education.getById.queryOptions({ id: params.educationId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
