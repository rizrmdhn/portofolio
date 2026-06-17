import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./src-wHgUA5Hr.mjs";
import { r as ResumeSkeleton } from "./loader-Ci30ldyh.mjs";
import { t as buildSeoMeta } from "./seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-DY_43Mdh.js
var $$splitComponentImporter = () => import("./resume-DZ0AjuYW.mjs");
var Route = createFileRoute("/$locale/resume")({
	pendingComponent: ResumeSkeleton,
	loader: async ({ context }) => {
		const [cv, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.resume.get.queryOptions()), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "resume" }))]);
		return {
			cv,
			seo
		};
	},
	head: ({ loaderData, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const t = getMessages(locale);
		return { meta: [...buildSeoMeta(loaderData?.seo, {
			title: t.resume.seoTitle,
			description: t.resume.seoDescription
		}), {
			property: "og:locale",
			content: ogLocale(locale)
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
