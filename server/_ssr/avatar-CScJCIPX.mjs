import { d as AvatarRoot, pt as require_jsx_runtime, u as AvatarFallback$1 } from "../_libs/@base-ui/react+[...].mjs";
import { r as cn } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avatar-CScJCIPX.js
var import_jsx_runtime = require_jsx_runtime();
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
//#endregion
export { AvatarFallback as n, Avatar$1 as t };
