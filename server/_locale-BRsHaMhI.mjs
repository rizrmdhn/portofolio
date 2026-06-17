import { l as lazyRouteComponent, u as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as getMessages, c as isLocale, u as ogLocale } from "./_ssr/src-wHgUA5Hr.mjs";
import { t as HomeSkeleton } from "./_ssr/loader-Ci30ldyh.mjs";
import { t as buildSeoMeta } from "./_ssr/seo-Dgsq3Aae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_locale-BRsHaMhI.js
var $$splitComponentImporter = () => import("./_locale-B_81ew6X.mjs");
var Route = createFileRoute("/$locale/")({
	pendingComponent: HomeSkeleton,
	loader: async ({ context, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const [profile, projects, experiences, stack, certifications, socialLinks, seo] = await Promise.all([
			context.queryClient.ensureQueryData(context.trpc.profile.get.queryOptions({ locale })),
			context.queryClient.ensureQueryData(context.trpc.project.getForLandingPage.queryOptions({ locale })),
			context.queryClient.ensureQueryData(context.trpc.experience.getAll.queryOptions({ locale })),
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
	head: ({ loaderData, params }) => {
		const locale = isLocale(params.locale) ? params.locale : "en";
		const t = getMessages(locale);
		const profile = loaderData?.profile;
		const defaultTitle = profile ? `${profile.name} — ${profile.title}` : t.home.seoTitleFallback;
		const defaultDescription = profile?.bio ?? "";
		return { meta: [...buildSeoMeta(loaderData?.seo, {
			title: defaultTitle,
			description: defaultDescription
		}), {
			property: "og:locale",
			content: ogLocale(locale)
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
