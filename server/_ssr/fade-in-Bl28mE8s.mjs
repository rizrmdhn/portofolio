import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fade-in-Bl28mE8s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FadeIn({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				el.classList.add("fade-in-up--visible");
				observer.disconnect();
			}
		}, { rootMargin: "-80px" });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `fade-in-up ${className ?? ""}`,
		style: delay ? { "--fade-delay": `${delay}s` } : void 0,
		children
	});
}
//#endregion
export { FadeIn as t };
