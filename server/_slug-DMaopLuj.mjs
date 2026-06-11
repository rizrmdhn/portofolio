import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { Mt as IconArrowLeft } from "./_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn } from "./_ssr/button-DXBrv0gs.mjs";
import { f as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as MainHeader } from "./_ssr/main-header-CwoxlNeR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DMaopLuj.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Click-to-zoom image. The thumbnail keeps its cropped framing; the dialog shows
* the full, uncropped image so screenshots stay legible. A `bg-muted` placeholder
* reserves space while the image loads to avoid layout shift / white flashes.
*/
var SplitErrorComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				children: "Project not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground max-w-md",
				children: "The project you're looking for doesn't exist or may have been removed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects",
				className: cn(buttonVariants({
					variant: "outline",
					size: "sm"
				}), "mt-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "size-4" }), "All Projects"]
			})
		]
	})]
});
//#endregion
export { SplitErrorComponent as errorComponent };
