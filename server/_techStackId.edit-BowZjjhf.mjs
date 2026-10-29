import { d as createFileRoute, u as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_techStackId.edit-BowZjjhf.js
var $$splitComponentImporter = () => import("./_techStackId.edit-DW0174MU.mjs");
var Route = createFileRoute("/(core)/dashboard/tech-stack/$techStackId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.techStack.getById.queryOptions({ id: params.techStackId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
