import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { c as ScriptOnce } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-Cy3RjFe_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getThemeScript(storageKey, defaultTheme) {
	return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=='light'&&t!=='dark'&&t!=='system'&&t!=='warm'){t=${JSON.stringify(defaultTheme)}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.remove('light','dark','warm');e.classList.add(r);e.style.colorScheme=t==='warm'?'light':r}catch(e){}})();`;
}
var ThemeProviderContext = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => {}
});
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark", "warm");
	const resolved = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
	root.classList.add(resolved);
	root.style.colorScheme = theme === "warm" ? "light" : resolved;
}
function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
	const [theme, setThemeState] = (0, import_react.useState)(defaultTheme);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(storageKey);
		setThemeState(stored === "light" || stored === "dark" || stored === "system" || stored === "warm" ? stored : defaultTheme);
		setMounted(true);
	}, [defaultTheme, storageKey]);
	(0, import_react.useEffect)(() => {
		if (!mounted) return;
		applyTheme(theme);
	}, [theme, mounted]);
	(0, import_react.useEffect)(() => {
		if (!mounted || theme !== "system") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme, mounted]);
	const setTheme = (next) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProviderContext, {
		value: {
			theme,
			setTheme
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: getThemeScript(storageKey, defaultTheme) }), children]
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeProviderContext);
}
//#endregion
export { useTheme as n, ThemeProvider as t };
