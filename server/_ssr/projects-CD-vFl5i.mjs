import { d as createFileRoute, u as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as string, y as object } from "../_libs/zod.mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./src-B5fQghAn.mjs";
import { t as buildSeoMeta } from "./seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CD-vFl5i.js
var $$splitComponentImporter = () => import("./projects-XHpCR6N5.mjs");
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
