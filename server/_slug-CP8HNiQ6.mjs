import { o as __toESM } from "./_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "./_libs/@base-ui/react+[...].mjs";
import { L as IconEye, gt as IconArrowLeft, ot as IconBrandGooglePlay, st as IconBrandGithub, ut as IconBrandAppstore, z as IconExternalLink } from "./_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn, t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { p as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as Route } from "./_slug-BbK78Lom.mjs";
import { t as Badge } from "./_ssr/badge-zKr0p2xx.mjs";
import { t as MainHeader } from "./_ssr/main-header-DbejrcLK.mjs";
import { t as FadeIn } from "./_ssr/fade-in-C02eXbaH.mjs";
import { t as toCompactNumber } from "./_ssr/number-CVSq8L-d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CP8HNiQ6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetailPage() {
	const queryClient = useQueryClient();
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { data: project } = useSuspenseQuery(trpc.project.getBySlug.queryOptions({ slug }));
	const incrementViews = useMutation({
		...trpc.project.updateView.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries(trpc.project.getBySlug.queryOptions({ slug }));
			queryClient.invalidateQueries(trpc.project.getAll.queryOptions());
		}
	});
	(0, import_react.useEffect)(() => {
		incrementViews.mutate({ projectId: project.id });
	}, [project.id]);
	const links = [
		{
			url: project.githubUrl,
			icon: IconBrandGithub,
			label: "GitHub"
		},
		{
			url: project.liveUrl,
			icon: IconExternalLink,
			label: "Live"
		},
		{
			url: project.playstoreUrl,
			icon: IconBrandGooglePlay,
			label: "Play Store"
		},
		{
			url: project.appstoreUrl,
			icon: IconBrandAppstore,
			label: "App Store"
		}
	].filter((l) => !!l.url);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full px-4 py-12 md:max-w-175 md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
					className: "flex flex-col gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "ghost",
							size: "sm",
							className: "text-subtle -ml-2 w-fit",
							onClick: () => navigate({ to: "/projects" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "size-4" }), "All Projects"]
						}),
						project.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-border overflow-hidden rounded-lg border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: project.imageUrl,
								alt: project.title,
								className: "h-72 w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl leading-tight font-bold sm:text-3xl",
									children: project.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle inline-flex shrink-0 items-center gap-1.5 pt-1 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, { className: "size-3.5" }), toCompactNumber(Number(project.viewCount))]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-base leading-relaxed",
								children: project.description
							})]
						}),
						project.tech.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: project.tech.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "bg-tag text-tag-foreground border-tag-border font-mono text-xs",
								children: tech
							}, tech))
						}),
						links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3",
							children: links.map(({ url, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: url ?? "",
								target: "_blank",
								rel: "noopener noreferrer",
								className: cn(buttonVariants({
									variant: "outline",
									size: "sm"
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
							}, label))
						}),
						project.longDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-border border-t pt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-[15px] leading-[1.8] whitespace-pre-wrap",
								children: project.longDescription
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-border mx-auto mt-auto flex w-full justify-center border-t px-4 py-6 md:max-w-175 md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle font-mono text-xs",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Noor Rizki Ramadhan"
					]
				})
			})
		]
	});
}
//#endregion
export { ProjectDetailPage as component };
