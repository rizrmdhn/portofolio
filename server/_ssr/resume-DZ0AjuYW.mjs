import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { et as IconDownload } from "../_libs/tabler__icons-react.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { s as intlLocale } from "./src-wHgUA5Hr.mjs";
import { n as useLocale, r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { t as MainHeader } from "./main-header-DCqjmhRG.mjs";
import { t as Route } from "./resume-DY_43Mdh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-DZ0AjuYW.js
var import_jsx_runtime = require_jsx_runtime();
function ResumePage() {
	const { cv } = Route.useLoaderData();
	const locale = useLocale();
	const { t } = useTranslations();
	const trackDownload = useMutation(trpc.resume.trackDownload.mutationOptions());
	const handleDownload = () => {
		if (!cv?.data.url) return;
		trackDownload.mutate();
		window.open(cv.data.url, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-col gap-6 px-4 py-12 md:max-w-175 md:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-subtle font-mono text-sm tracking-[0.15em]",
					children: t.resume.heading
				}), cv?.data.uploadedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground mt-1 text-xs",
					children: [
						t.resume.lastUpdated,
						" ",
						new Date(cv.data.uploadedAt).toLocaleDateString(intlLocale(locale), {
							year: "numeric",
							month: "long",
							day: "numeric"
						})
					]
				})] }), cv?.data.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleDownload,
					className: "bg-foreground text-background flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDownload, { className: "size-4" }), t.resume.downloadPdf]
				})]
			}), cv?.data.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border flex flex-col items-center gap-4 rounded-lg border p-8 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: t.resume.pdfNotOnMobile
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleDownload,
					className: "bg-foreground text-background flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDownload, { className: "size-4" }), t.resume.openPdf]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border hidden overflow-hidden rounded-lg border md:block",
				style: { height: "80vh" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: `${cv.data.url}#toolbar=0`,
					className: "h-full w-full",
					title: t.resume.pdfTitle
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex h-64 items-center justify-center rounded-lg border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: t.resume.noResume
				})
			})]
		})]
	});
}
//#endregion
export { ResumePage as component };
