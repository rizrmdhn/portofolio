import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./seo-DuQjldIZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-BQjTE_J_.js
var $$splitComponentImporter = () => import("./certificates-B5ZKJ5ue.mjs");
var Route = createFileRoute("/certificates")({
	loader: async ({ context }) => {
		const [certifications, seo] = await Promise.all([context.queryClient.ensureQueryData(context.trpc.certification.getAll.queryOptions()), context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "certificates" }))]);
		return {
			certifications,
			seo
		};
	},
	head: ({ loaderData }) => ({ meta: buildSeoMeta(loaderData?.seo, {
		title: "Certificates",
		description: "Certifications and credentials I've earned."
	}) }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
