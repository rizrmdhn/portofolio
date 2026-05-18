import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./_ssr/seo-DuQjldIZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BbK78Lom.js
var $$splitComponentImporter = () => import("./_slug-CP8HNiQ6.mjs");
var Route = createFileRoute("/projects/$slug")({
	loader: async ({ context, params }) => {
		return { project: await context.queryClient.ensureQueryData(context.trpc.project.getBySlug.queryOptions({ slug: params.slug })) };
	},
	head: ({ loaderData }) => {
		const project = loaderData?.project;
		return { meta: buildSeoMeta(void 0, {
			title: project?.title ?? "Project",
			description: project?.description ?? "",
			ogImage: project?.imageUrl ?? void 0
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
