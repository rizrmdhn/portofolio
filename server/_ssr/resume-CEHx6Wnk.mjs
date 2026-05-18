import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { B as IconDownload } from "../_libs/tabler__icons-react.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { t as MainHeader } from "./main-header-DbejrcLK.mjs";
import { t as Route } from "./resume-eagrIw56.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-CEHx6Wnk.js
var import_jsx_runtime = require_jsx_runtime();
function ResumePage() {
	const { cv } = Route.useLoaderData();
	const trackDownload = useMutation(trpc.resume.trackDownload.mutationOptions());
	const handleDownload = () => {
		if (!cv?.data.url) return;
		trackDownload.mutate();
		window.open(cv.data.url, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col bg-background text-foreground min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-col gap-6 px-4 py-12 md:max-w-175 md:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-sm text-subtle tracking-[0.15em] font-mono",
					children: "RESUME"
				}), cv?.data.uploadedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-xs mt-1",
					children: [
						"Last updated",
						" ",
						new Date(cv.data.uploadedAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric"
						})
					]
				})] }), cv?.data.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleDownload,
					className: "flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDownload, { className: "size-4" }), "Download PDF"]
				})]
			}), cv?.data.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-border rounded-lg overflow-hidden",
				style: { height: "80vh" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: `${cv.data.url}#toolbar=0`,
					className: "w-full h-full",
					title: "Resume PDF"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center h-64 border border-border rounded-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: "No resume available yet."
				})
			})]
		})]
	});
}
//#endregion
export { ResumePage as component };
