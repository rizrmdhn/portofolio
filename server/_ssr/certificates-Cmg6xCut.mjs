import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./src-wHgUA5Hr.mjs";
import { t as buildSeoMeta } from "./seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-Cmg6xCut.js
var $$splitComponentImporter = () => import("./certificates-jk7rle17.mjs");
var Route = createFileRoute("/$locale/certificates")({
	loader: async ({ context }) => {
		const [certifications, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.certification.getAll.queryOptions()), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "certificates" }))]);
		return {
			certifications,
			seo
		};
	},
	head: ({ loaderData, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const t = getMessages(locale);
		return { meta: [...buildSeoMeta(loaderData?.seo, {
			title: t.certificates.seoTitle,
			description: t.certificates.seoDescription
		}), {
			property: "og:locale",
			content: ogLocale(locale)
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
