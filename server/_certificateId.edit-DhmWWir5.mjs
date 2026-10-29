import { d as createFileRoute, u as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_certificateId.edit-DhmWWir5.js
var $$splitComponentImporter = () => import("./_certificateId.edit-BT0ZoBOw.mjs");
var Route = createFileRoute("/(core)/dashboard/certificate/$certificateId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.certification.getById.queryOptions({ id: params.certificateId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
