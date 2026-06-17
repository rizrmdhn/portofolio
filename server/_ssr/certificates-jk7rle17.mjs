import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { t as CertificateCard } from "./certificate-card-jvFyuKLm.mjs";
import { t as MainHeader } from "./main-header-DCqjmhRG.mjs";
import { t as Route } from "./certificates-Cmg6xCut.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-jk7rle17.js
var import_jsx_runtime = require_jsx_runtime();
function CertificatesPage() {
	const { certifications } = Route.useLoaderData();
	const { t } = useTranslations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-col gap-8 px-4 py-12 md:max-w-175 md:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-subtle font-mono text-sm tracking-[0.15em]",
				children: t.certificates.allHeading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]",
				children: certifications.map((certification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateCard, { certificate: certification }, certification.id))
			})]
		})]
	});
}
//#endregion
export { CertificatesPage as component };
