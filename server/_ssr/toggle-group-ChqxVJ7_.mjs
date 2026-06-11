import { i as __toESM } from "../_runtime.mjs";
import { G as Toggle, W as ToggleGroup, mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/toggle-group-ChqxVJ7_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var toggleVariants = cva("group/toggle inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-muted"
		},
		size: {
			default: "h-7 min-w-7 px-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
			sm: "h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			lg: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default",
	spacing: 0,
	orientation: "horizontal"
});
function ToggleGroup$1({ className, variant, size, spacing = 0, orientation = "horizontal", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		"data-orientation": orientation,
		style: { "--gap": spacing },
		className: cn("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[size=sm]:rounded-[min(var(--radius-md),8px)] data-vertical:flex-col data-vertical:items-stretch", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing,
				orientation
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }) {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
}
//#endregion
export { ToggleGroupItem as n, ToggleGroup$1 as t };
