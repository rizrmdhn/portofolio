import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { $ as IconExternalLink, Ct as IconBrandGithub, Et as IconBrandAppstore, St as IconBrandGooglePlay, Z as IconEye } from "../_libs/tabler__icons-react.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./separator-DENx5VjH.mjs";
import { n as useLocale, r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { a as CardFooter, r as CardContent, t as Card } from "./card-DzVnM7at.mjs";
import { t as toCompactNumber } from "./number-DKxT4LDg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-card-CYa4fg_o.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectCard({ project }) {
	const navigate = useNavigate();
	const locale = useLocale();
	const { t } = useTranslations();
	const incrementViews = useMutation(trpc.project.updateView.mutationOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "hover:bg-project-hover hover:border-card-hover-border flex h-full max-w-md cursor-pointer flex-col rounded-lg border border-transparent p-5 transition-all hover:shadow-sm",
		onClick: () => navigate({
			to: "/$locale/projects/$slug",
			params: {
				locale,
				slug: project.slug
			}
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-1 flex-col gap-4 p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs",
						children: project.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: project.tech.map((tech, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-tag text-tag-foreground border-tag-border rounded border px-2 py-1 font-mono text-[10px] font-semibold",
							children: tech
						}, index))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "flex items-center justify-between p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [
						project.githubUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.githubUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({
									projectId: project.id,
									slug: project.slug
								});
							},
							className: "group text-subtle inline-flex items-center gap-1.25 font-mono text-[11px] transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandGithub, { className: "size-3.25" }), t.projectDetail.linkGithub]
						}),
						project.liveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.liveUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({
									projectId: project.id,
									slug: project.slug
								});
							},
							className: "group text-subtle inline-flex items-center gap-1.25 font-mono text-[11px] transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconExternalLink, { className: "size-3.25" }), t.projectDetail.linkLive]
						}),
						project.playstoreUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.playstoreUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({
									projectId: project.id,
									slug: project.slug
								});
							},
							className: "group text-subtle inline-flex items-center gap-1.25 font-mono text-[11px] transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandGooglePlay, { className: "size-3.25" }), t.projectDetail.linkPlayStore]
						}),
						project.appstoreUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.appstoreUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({
									projectId: project.id,
									slug: project.slug
								});
							},
							className: "group text-subtle inline-flex items-center gap-1.25 font-mono text-[11px] transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandAppstore, { className: "size-3.25" }), t.projectDetail.linkAppStore]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle inline-flex items-center gap-1.25 font-mono text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, { className: "size-3.25" }), toCompactNumber(Number(project.viewCount) || 0)]
				})]
			})
		]
	});
}
//#endregion
export { ProjectCard as t };
