import { S as string, y as object } from "../_libs/zod.mjs";
import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./src-wHgUA5Hr.mjs";
import { t as buildSeoMeta } from "./seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-FEdSmPSl.js
var $$splitComponentImporter = () => import("./projects-B6Z6St-5.mjs");
var searchSchema = object({ tech: string().optional() });
var Route = createFileRoute("/$locale/projects/")({
	validateSearch: searchSchema,
	loader: async ({ context, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const [projects, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.project.getAll.queryOptions({ locale })), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "projects" }))]);
		return {
			projects,
			seo
		};
	},
	head: ({ loaderData, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const t = getMessages(locale);
		return { meta: [...buildSeoMeta(loaderData?.seo, {
			title: t.projects.seoTitle,
			description: t.projects.seoDescription
		}), {
			property: "og:locale",
			content: ogLocale(locale)
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
