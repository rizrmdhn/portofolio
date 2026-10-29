import { d as createFileRoute, u as lazyRouteComponent, y as redirect } from "./_libs/@tanstack/react-router+[...].mjs";
import { T as uuid, s as _enum, y as object } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_experienceId.edit-DBfarjPZ.js
var EDIT_TABS = [
	"role-details",
	"career-history",
	"settings",
	"translations"
];
var $$splitComponentImporter = () => import("./_experienceId.edit-DXy8Iejv.mjs");
var Route = createFileRoute("/(core)/dashboard/experience/$experienceId/edit")({
	validateSearch: object({
		position: uuid().optional().catch(void 0),
		tab: _enum(EDIT_TABS).optional().catch(void 0)
	}),
	beforeLoad: async ({ context, params, search }) => {
		const entry = await context.queryClient.ensureQueryData(context.trpc.experience.getById.queryOptions({ id: params.experienceId }));
		if (!search.position) return;
		const position = search.position === params.experienceId ? void 0 : await context.queryClient.ensureQueryData(context.trpc.experience.getById.queryOptions({ id: search.position })).catch(() => void 0);
		if (!position || !entry.groupId || position.groupId !== entry.groupId) throw redirect({
			to: "/dashboard/experience/$experienceId/edit",
			params,
			search: { tab: search.tab },
			replace: true
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, EDIT_TABS as t };
