import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./_ssr/src-wHgUA5Hr.mjs";
import { t as buildSeoMeta } from "./_ssr/seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DBqtBGUW.js
var $$splitComponentImporter = () => import("./_slug-BwpIRp2Y.mjs");
var $$splitErrorComponentImporter = () => import("./_slug-C2XiYTyn.mjs");
var Route = createFileRoute("/$locale/projects/$slug")({
	loader: async ({ context, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const project = await context.queryClient.ensureQueryData(context.trpc.project.getBySlug.queryOptions({
			slug: params.slug,
			locale
		}));
		context.queryClient.prefetchQuery(context.trpc.project.getImages.queryOptions({ projectId: project.id }));
		return { project };
	},
	head: ({ loaderData, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const t = getMessages(locale);
		const project = loaderData?.project;
		return { meta: [...buildSeoMeta(void 0, {
			title: project?.title ?? t.projectDetail.seoTitleFallback,
			description: project?.description ?? "",
			ogImage: project?.imageUrl ?? void 0
		}), {
			property: "og:locale",
			content: ogLocale(locale)
		}] };
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
