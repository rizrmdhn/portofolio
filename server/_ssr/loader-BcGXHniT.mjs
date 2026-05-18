import { ft as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as IconPointFilled } from "../_libs/tabler__icons-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loader-BcGXHniT.js
var import_jsx_runtime = require_jsx_runtime();
function Loader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-svh items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPointFilled, {
				className: "text-subtle animate-bounce",
				style: { animationDelay: `${i * .15}s` }
			}, i))
		})
	});
}
function SkeletonBlock({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `bg-muted animate-pulse rounded ${className ?? ""}` });
}
function SkeletonHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-nav border-border sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-3.5 w-28" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden gap-6 md:flex",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-3 w-12" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-8 w-20" })
		]
	});
}
function SectionSkeleton({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full flex-col gap-8 px-4 md:max-w-175 md:px-0",
		children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-2.5 w-24" }), children]
	});
}
function ResumeSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background flex min-h-screen flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full flex-col gap-6 px-4 py-12 md:max-w-175 md:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-2.5 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-3 w-32" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-9 w-32 rounded-md" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-[80vh] w-full rounded-lg" })]
		})]
	});
}
function HomeSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "dot-grid flex w-full flex-col items-center justify-center pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-border mx-auto flex w-full flex-col gap-6 border-b px-4 pb-24 md:max-w-175 md:px-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-6 w-36 rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-14 w-4/5 sm:h-16 md:h-20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-5 w-1/2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-4 w-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-4 w-11/12" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-4 w-3/4" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3",
							children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-10 w-28" }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-10 w-36" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-10 w-28" })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex w-full flex-col items-center justify-center py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionSkeleton, {
					label: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-4",
						children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-28 w-full rounded-lg" }, i))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-border flex w-full flex-col items-center justify-center border-y py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionSkeleton, {
					label: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-40 w-full rounded-lg" }, i))
					})
				})
			})
		]
	});
}
//#endregion
export { Loader as n, ResumeSkeleton as r, HomeSkeleton as t };
