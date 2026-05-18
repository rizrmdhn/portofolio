import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fade-in-C02eXbaH.js
var import_jsx_runtime = require_jsx_runtime();
function FadeIn({ children, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .5,
			delay,
			ease: "easeOut"
		},
		children
	});
}
//#endregion
export { FadeIn as t };
