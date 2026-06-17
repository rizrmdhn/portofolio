import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { Nt as IconArrowLeft } from "./_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn } from "./_ssr/button-Byofh5wQ.mjs";
import { f as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale, r as useTranslations } from "./_ssr/locale-context-zlvGKbH0.mjs";
import { t as MainHeader } from "./_ssr/main-header-DCqjmhRG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C2XiYTyn.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectNotFound() {
	const locale = useLocale();
	const { t } = useTranslations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-subtle font-mono text-xs tracking-wide uppercase",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: t.projectDetail.notFoundTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground max-w-md",
					children: t.projectDetail.notFoundBody
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/$locale/projects",
					params: { locale },
					className: cn(buttonVariants({
						variant: "outline",
						size: "sm"
					}), "mt-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "size-4" }), t.projectDetail.allProjects]
				})
			]
		})]
	});
}
//#endregion
export { ProjectNotFound as errorComponent };
