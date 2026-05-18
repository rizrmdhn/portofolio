import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./seo-DuQjldIZ.mjs";
import { t as HomeSkeleton } from "./loader-BcGXHniT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DEsj7y4L.js
var $$splitComponentImporter = () => import("./routes-DSEdQgUY.mjs");
var Route = createFileRoute("/")({
	pendingComponent: HomeSkeleton,
	loader: async ({ context }) => {
		return {
			profile: await context.queryClient.ensureQueryData(context.trpc.profile.get.queryOptions()),
			projects: await context.queryClient.ensureQueryData(context.trpc.project.getForLandingPage.queryOptions()),
			experiences: await context.queryClient.ensureQueryData(context.trpc.experience.getAll.queryOptions()),
			stack: await context.queryClient.ensureQueryData(context.trpc.techStack.getAll.queryOptions()),
			certifications: await context.queryClient.ensureQueryData(context.trpc.certification.getForLandingPage.queryOptions()),
			socialLinks: await context.queryClient.ensureQueryData(context.trpc.socialLink.getAll.queryOptions()),
			seo: await context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "home" }))
		};
	},
	head: ({ loaderData }) => {
		const profile = loaderData?.profile;
		const defaultTitle = profile ? `${profile.name} — ${profile.title}` : "Portfolio";
		const defaultDescription = profile?.bio ?? "";
		return { meta: buildSeoMeta(loaderData?.seo, {
			title: defaultTitle,
			description: defaultDescription
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
