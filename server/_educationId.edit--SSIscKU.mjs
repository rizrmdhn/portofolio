import { d as createFileRoute, u as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_educationId.edit--SSIscKU.js
var $$splitComponentImporter = () => import("./_educationId.edit-2_p7OVAI.mjs");
var Route = createFileRoute("/(core)/dashboard/education/$educationId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.education.getById.queryOptions({ id: params.educationId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
