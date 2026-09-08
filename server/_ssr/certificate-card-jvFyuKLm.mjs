import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { $ as IconExternalLink } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { r as CardContent, t as Card } from "./card-DzVnM7at.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate-card-jvFyuKLm.js
var import_jsx_runtime = require_jsx_runtime();
function CertificateCard({ certificate }) {
	const { t } = useTranslations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "flex max-w-md flex-col rounded-lg p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-2 p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-foreground text-sm leading-[1.3] font-semibold",
					children: certificate.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: certificate.issuer
				}),
				certificate.certificateUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					size: "sm",
					onClick: () => window.open(certificate.certificateUrl, "_blank"),
					className: "justify-start py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-subtle flex items-center gap-2 font-mono text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconExternalLink, { className: "size-3 shrink-0" }), t.certificateCard.viewCertificate]
					})
				})
			]
		})
	});
}
//#endregion
export { CertificateCard as t };
