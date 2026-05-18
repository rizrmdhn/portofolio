import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { z as IconExternalLink } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-DXBrv0gs.mjs";
import { r as CardContent, t as Card } from "./card-DbtAMaAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate-card-DfU_zIZ_.js
var import_jsx_runtime = require_jsx_runtime();
function CertificateCard({ certificate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "flex flex-col rounded-lg p-5 max-w-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-2 p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold leading-[1.3] text-foreground",
					children: certificate.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: certificate.issuer
				}),
				certificate.certificateUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					size: "sm",
					onClick: () => window.open(certificate.certificateUrl, "_blank"),
					className: "py-3 justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-[11px] font-mono text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconExternalLink, { className: "size-3 shrink-0" }), "View Certificate"]
					})
				})
			]
		})
	});
}
//#endregion
export { CertificateCard as t };
