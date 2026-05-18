import { D as ProgressTrack$1, E as ProgressIndicator$1, O as ProgressRoot, ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as cn } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DANJmD_5.js
var import_jsx_runtime = require_jsx_runtime();
function Progress$1({ className, children, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgressRoot, {
		value,
		"data-slot": "progress",
		className: cn("flex flex-wrap gap-3", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, {}) })]
	});
}
function ProgressTrack({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack$1, {
		className: cn("relative flex h-1 w-full items-center overflow-x-hidden rounded-md bg-muted", className),
		"data-slot": "progress-track",
		...props
	});
}
function ProgressIndicator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator$1, {
		"data-slot": "progress-indicator",
		className: cn("h-full bg-primary transition-all", className),
		...props
	});
}
//#endregion
export { Progress$1 as t };
