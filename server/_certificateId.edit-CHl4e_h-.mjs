import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_certificateId.edit-CHl4e_h-.js
var $$splitComponentImporter = () => import("./_certificateId.edit-Cb0b42B3.mjs");
var Route = createFileRoute("/(core)/dashboard/certificate/$certificateId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.certification.getById.queryOptions({ id: params.certificateId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
