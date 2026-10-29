import { gt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as IconExternalLink, Ct as IconBrandGithub, Et as IconBrandAppstore, St as IconBrandGooglePlay, Z as IconEye } from "../_libs/tabler__icons-react.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-4wm9p9_t.mjs";
import { t as Separator$1 } from "./separator-BjRfWQiz.mjs";
import { n as useLocale, r as useTranslations } from "./locale-context-DcXzRisY.mjs";
import { t as Badge } from "./badge-CNx_OxWt.mjs";
import { a as CardFooter, i as CardDescription, o as CardHeader, r as CardContent, s as CardTitle, t as Card } from "./card-DzVnM7at.mjs";
import { t as toCompactNumber } from "./number-CyuDXsVg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-card-BGRh0B6t.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectCard({ project }) {
	const locale = useLocale();
	const { t, format } = useTranslations();
	const incrementViews = useMutation(trpc.project.updateView.mutationOptions());
	const detailParams = {
		locale,
		slug: project.slug
	};
	const externalLinks = [
		{
			href: project.githubUrl,
			label: t.projectDetail.linkGithub,
			icon: IconBrandGithub
		},
		{
			href: project.liveUrl,
			label: t.projectDetail.linkLive,
			icon: IconExternalLink
		},
		{
			href: project.playstoreUrl,
			label: t.projectDetail.linkPlayStore,
			icon: IconBrandGooglePlay
		},
		{
			href: project.appstoreUrl,
			label: t.projectDetail.linkAppStore,
			icon: IconBrandAppstore
		}
	];
	const viewCount = Number(project.viewCount) || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full min-w-0 gap-4 wrap-anywhere",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base leading-6 font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/$locale/projects/$slug",
						params: detailParams,
						className: "focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none",
						children: project.title
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-3 text-sm leading-6",
					children: project.description
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-1 flex-wrap content-start items-start gap-1.5",
				children: [project.tech.slice(0, 4).map((tech, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "h-auto max-w-full min-w-0 whitespace-normal",
					children: tech
				}, index)), project.tech.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "link",
					className: "h-auto max-w-full min-w-0 whitespace-normal",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/$locale/projects/$slug",
						params: detailParams
					}),
					children: format(t.projects.showMore, { count: project.tech.length - 4 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "flex-wrap justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-0 flex-wrap gap-x-4 gap-y-2",
					children: externalLinks.map(({ href, label, icon: Icon }) => href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => incrementViews.mutate({
							projectId: project.id,
							slug: project.slug
						}),
						className: "text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm py-1 text-xs leading-5 underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							"aria-hidden": "true",
							className: "size-3.5 shrink-0"
						}), label]
					}, label) : null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground inline-flex items-center gap-1.5 text-xs leading-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, {
							"aria-hidden": "true",
							className: "size-3.5 shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: toCompactNumber(viewCount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: format(t.projectDetail.viewsLabel, { count: viewCount })
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ProjectCard as t };
