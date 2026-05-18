import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_experienceId.edit-DwhOisu8.js
var $$splitComponentImporter = () => import("./_experienceId.edit-BHdwTS1h.mjs");
var Route = createFileRoute("/(core)/dashboard/experience/$experienceId/edit")({
	beforeLoad: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(context.trpc.experience.getById.queryOptions({ id: params.experienceId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
