import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_socialLinkId.edit-ySLp2MdB.js
var $$splitComponentImporter = () => import("./_socialLinkId.edit-ByvqNxHQ.mjs");
var Route = createFileRoute("/(core)/dashboard/social-links/$socialLinkId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.socialLink.getById.queryOptions({ id: params.socialLinkId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
