import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { a as getMessages, c as isLocale, n as LOCALE_COOKIE, o as interpolate } from "./src-wHgUA5Hr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locale-context-zlvGKbH0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LocaleContext = (0, import_react.createContext)(null);
/**
* Provides the active locale + its message catalog to the localized (public)
* route subtree. Mounted by the `$locale` layout route. The raw `locale` comes
* from the URL param (a `string`); it is re-validated here and falls back to the
* default so the provider never holds an unsupported locale.
*/
function LocaleProvider({ locale, children }) {
	const value = (0, import_react.useMemo)(() => {
		const resolved = isLocale(locale) ? locale : "en";
		return {
			locale: resolved,
			t: getMessages(resolved),
			format: interpolate
		};
	}, [locale]);
	(0, import_react.useEffect)(() => {
		document.cookie = `${LOCALE_COOKIE}=${value.locale}; path=/; max-age=31536000; samesite=lax`;
	}, [value.locale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleContext.Provider, {
		value,
		children
	});
}
/**
* Access locale + catalog. Outside the localized subtree (e.g. dashboard links
* back to the public site) it falls back to the default locale rather than
* throwing, so shared components work everywhere.
*/
function useTranslations() {
	const ctx = (0, import_react.useContext)(LocaleContext);
	if (ctx) return ctx;
	return {
		locale: "en",
		t: getMessages("en"),
		format: interpolate
	};
}
/** Shorthand for just the active locale. */
function useLocale() {
	return useTranslations().locale;
}
//#endregion
export { useLocale as n, useTranslations as r, LocaleProvider as t };
