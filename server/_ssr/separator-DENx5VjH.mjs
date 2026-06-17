import { pt as require_jsx_runtime, st as Separator } from "../_libs/@base-ui/react+[...].mjs";
import { r as cn } from "./button-Byofh5wQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/separator-DENx5VjH.js
var import_jsx_runtime = require_jsx_runtime();
function Separator$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
		...props
	});
}
//#endregion
export { Separator$1 as t };
