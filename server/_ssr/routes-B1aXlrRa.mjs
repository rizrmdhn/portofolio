import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as buildSeoMeta } from "./seo-DuQjldIZ.mjs";
import { t as HomeSkeleton } from "./loader-BcGXHniT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1aXlrRa.js
var $$splitComponentImporter = () => import("./routes-BdOenxhR.mjs");
var Route = createFileRoute("/")({
	pendingComponent: HomeSkeleton,
	loader: async ({ context }) => {
		const [profile, projects, experiences, stack, certifications, socialLinks, seo] = await Promise.all([
			context.queryClient.ensureQueryData(context.trpc.profile.get.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.project.getForLandingPage.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.experience.getAll.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.techStack.getAll.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.certification.getForLandingPage.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.socialLink.getAll.queryOptions()),
			context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "home" }))
		]);
		return {
			profile,
			projects,
			experiences,
			stack,
			certifications,
			socialLinks,
			seo
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
