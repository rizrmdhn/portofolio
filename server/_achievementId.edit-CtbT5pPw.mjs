import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_achievementId.edit-CtbT5pPw.js
var $$splitComponentImporter = () => import("./_achievementId.edit-CilLC16L.mjs");
var Route = createFileRoute("/(core)/dashboard/achievement/$achievementId/edit")({
	beforeLoad: async ({ params, context }) => {
		await context.queryClient.ensureQueryData(context.trpc.achievement.getById.queryOptions({ id: params.achievementId }));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
