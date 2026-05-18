import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./seo-DuQjldIZ.mjs";
import { r as ResumeSkeleton } from "./loader-BcGXHniT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-eagrIw56.js
var $$splitComponentImporter = () => import("./resume-CEHx6Wnk.mjs");
var Route = createFileRoute("/resume")({
	pendingComponent: ResumeSkeleton,
	loader: async ({ context }) => {
		const [cv, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.resume.get.queryOptions()), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "resume" }))]);
		return {
			cv,
			seo
		};
	},
	head: ({ loaderData }) => ({ meta: buildSeoMeta(loaderData?.seo, {
		title: "Resume",
		description: "View and download my resume / CV."
	}) }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
