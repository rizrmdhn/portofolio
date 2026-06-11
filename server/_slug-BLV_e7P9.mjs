import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./_ssr/seo-DuQjldIZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BLV_e7P9.js
var $$splitComponentImporter = () => import("./_slug-GrmNZfO5.mjs");
var $$splitErrorComponentImporter = () => import("./_slug-DMaopLuj.mjs");
var Route = createFileRoute("/projects/$slug")({
	loader: async ({ context, params }) => {
		const project = await context.queryClient.ensureQueryData(context.trpc.project.getBySlug.queryOptions({ slug: params.slug }));
		context.queryClient.prefetchQuery(context.trpc.project.getImages.queryOptions({ projectId: project.id }));
		return { project };
	},
	head: ({ loaderData }) => {
		const project = loaderData?.project;
		return { meta: buildSeoMeta(void 0, {
			title: project?.title ?? "Project",
			description: project?.description ?? "",
			ogImage: project?.imageUrl ?? void 0
		}) };
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
