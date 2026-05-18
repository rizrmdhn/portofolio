import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./seo-DuQjldIZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-D4iPc_T2.js
var $$splitComponentImporter = () => import("./projects-CHQfjl1O.mjs");
var Route = createFileRoute("/projects/")({
	loader: async ({ context }) => {
		const [projects, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.project.getAll.queryOptions()), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "projects" }))]);
		return {
			projects,
			seo
		};
	},
	head: ({ loaderData }) => ({ meta: buildSeoMeta(loaderData?.seo, {
		title: "Projects",
		description: "A collection of projects I've built."
	}) }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
