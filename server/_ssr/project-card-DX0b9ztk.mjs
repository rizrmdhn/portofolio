import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { L as IconEye, ot as IconBrandGooglePlay, st as IconBrandGithub, ut as IconBrandAppstore, z as IconExternalLink } from "../_libs/tabler__icons-react.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./separator-BJ-xJ2or.mjs";
import { a as CardFooter, r as CardContent, t as Card } from "./card-DbtAMaAG.mjs";
import { t as toCompactNumber } from "./number-CVSq8L-d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-card-DX0b9ztk.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectCard({ project }) {
	const navigate = useNavigate();
	const incrementViews = useMutation(trpc.project.updateView.mutationOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col h-full rounded-lg p-5 max-w-md cursor-pointer border border-transparent transition-all hover:bg-project-hover hover:border-card-hover-border hover:shadow-sm",
		onClick: () => navigate({
			to: "/projects/$slug",
			params: { slug: project.slug }
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 p-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: project.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: project.tech.map((tech, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-tag text-tag-foreground border-tag-border border px-2 py-1 rounded font-mono font-semibold",
							children: tech
						}, index))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "p-0 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [
						project.githubUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.githubUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({ projectId: project.id });
							},
							className: "group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandGithub, { className: "size-3.25" }), "Github"]
						}),
						project.liveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.liveUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({ projectId: project.id });
							},
							className: "group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconExternalLink, { className: "size-3.25" }), "Live"]
						}),
						project.playstoreUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.playstoreUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({ projectId: project.id });
							},
							className: "group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandGooglePlay, { className: "size-3.25" }), "Play Store"]
						}),
						project.appstoreUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: project.appstoreUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: (e) => {
								e.stopPropagation();
								incrementViews.mutate({ projectId: project.id });
							},
							className: "group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBrandAppstore, { className: "size-3.25" }), "App Store"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle text-[11px] font-mono inline-flex items-center gap-1.25",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, { className: "size-3.25" }), toCompactNumber(Number(project.viewCount) || 0)]
				})]
			})
		]
	});
}
//#endregion
export { ProjectCard as t };
