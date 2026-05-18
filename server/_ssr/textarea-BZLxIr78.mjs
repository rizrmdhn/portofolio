import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as cn } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-BZLxIr78.js
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex field-sizing-content min-h-16 w-full resize-none rounded-md border border-input bg-input/20 px-2 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
export { Textarea as t };
