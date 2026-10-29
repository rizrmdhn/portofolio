import { gt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { c as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LocaleProvider } from "./locale-context-DcXzRisY.mjs";
import { t as Route } from "./route-Dz1jm7V_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-2I1b6ou3.js
var import_jsx_runtime = require_jsx_runtime();
function LocaleLayout() {
	const { locale } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleProvider, {
		locale,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { LocaleLayout as component };
