import { o as __toESM } from "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { mt as IconArrowUpRight } from "../_libs/tabler__icons-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-CvqlupIY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Empty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty",
		className: cn("flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance", className),
		...props
	});
}
function EmptyHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-header",
		className: cn("flex max-w-sm flex-col items-center gap-1", className),
		...props
	});
}
var emptyMediaVariants = cva("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4"
	} },
	defaultVariants: { variant: "default" }
});
function EmptyMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-icon",
		"data-variant": variant,
		className: cn(emptyMediaVariants({
			variant,
			className
		})),
		...props
	});
}
function EmptyTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-title",
		className: cn("font-heading text-sm font-medium tracking-tight", className),
		...props
	});
}
function EmptyDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-description",
		className: cn("text-xs/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function EmptyContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "empty-content",
		className: cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-2 text-xs/relaxed text-balance", className),
		...props
	});
}
function EmptyState({ icon: Icon, iconVariant = "icon", title, description, actions = [], learnMoreHref, learnMoreLabel = "Learn More", className, titleClassName, descriptionClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
				Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
					variant: iconVariant,
					children: (0, import_react.isValidElement)(Icon) ? Icon : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, {
					className: cn("text-center", titleClassName),
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, {
					className: cn("text-center", descriptionClassName),
					children: description
				})
			] }),
			actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: actions.map((action, index) => {
					if (!("label" in action)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: action.render }, index);
					const actionIcon = action.icon ? (0, import_react.isValidElement)(action.icon) ? action.icon : (() => {
						const I = action.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, {});
					})() : null;
					if (action.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: action.variant || "default",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: action.href }),
						className: action.className,
						children: [actionIcon, action.label]
					}, index);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: action.variant || "default",
						onClick: action.onClick,
						className: action.className,
						children: [actionIcon, action.label]
					}, index);
				})
			}) }),
			learnMoreHref && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "link",
				size: "sm",
				className: "text-muted-foreground",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: learnMoreHref }),
				children: [
					learnMoreLabel,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowUpRight, {})
				]
			})
		]
	});
}
//#endregion
export { EmptyState as t };
