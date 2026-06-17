import { n as createServerFn, r as getRequestHeader } from "./ssr.mjs";
import { d as parseLocaleCookie, l as matchAcceptLanguage } from "./src-wHgUA5Hr.mjs";
import { t as createServerRpc } from "./createServerRpc-CbLNH5a9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-preferred-locale-BdviiDVT.js
/**
* Resolves the locale to send a prefix-less `/` visitor to: their saved cookie
* choice, else the best `Accept-Language` match, else the default.
*/
var getPreferredLocale_createServerFn_handler = createServerRpc({
	id: "d25b52fbc56bd347ec4630223f351ee365887e4cf82c9990155bf2cfa54af26b",
	name: "getPreferredLocale",
	filename: "src/functions/get-preferred-locale.ts"
}, (opts) => getPreferredLocale.__executeServer(opts));
var getPreferredLocale = createServerFn({ method: "GET" }).handler(getPreferredLocale_createServerFn_handler, () => {
	const cookie = getRequestHeader("cookie");
	const acceptLanguage = getRequestHeader("accept-language");
	return parseLocaleCookie(cookie) ?? matchAcceptLanguage(acceptLanguage) ?? "en";
});
//#endregion
export { getPreferredLocale_createServerFn_handler };
