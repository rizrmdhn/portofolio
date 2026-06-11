import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { t as Input$1 } from "./input-BEBqmpJz.mjs";
import "./textarea-BZLxIr78.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-debounced-BaM6pW9J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group relative flex h-7 w-full min-w-0 items-center rounded-md border border-input bg-input/20 transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-md has-data-[align=block-start]:rounded-md has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/30 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[textarea]:rounded-md has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text items-center justify-center gap-1 py-2 text-xs/relaxed font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-[0.625rem] [&>svg:not([class*='size-'])]:size-3.5", {
	variants: { align: {
		"inline-start": "order-first pl-2 has-[>button]:ml-[-0.275rem] has-[>kbd]:ml-[-0.275rem]",
		"inline-end": "order-last pr-2 has-[>button]:mr-[-0.275rem] has-[>kbd]:mr-[-0.275rem]",
		"block-start": "order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 rounded-md text-xs/relaxed shadow-none", {
	variants: { size: {
		xs: "h-5 gap-1 rounded-[calc(var(--radius-sm)-2px)] px-1 [&>svg:not([class*='size-'])]:size-3",
		sm: "gap-1",
		"icon-xs": "size-6 p-0 has-[>svg]:p-0",
		"icon-sm": "size-7 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent", className),
		...props
	});
}
/**
* A custom React hook that debounces a value by delaying its update.
*
* This hook is useful for scenarios where you want to delay the processing of a rapidly
* changing value, such as search input, to avoid excessive re-renders or API calls.
*
* @template T - The type of the value to be debounced
* @param {T} value - The value to debounce
* @param {number} [delay=300] - The delay in milliseconds before updating the debounced value
* @returns {T} The debounced value that updates after the specified delay
*
* @example
* ```tsx
* const [searchTerm, setSearchTerm] = useState('');
* const debouncedSearchTerm = useDebounced(searchTerm, 500);
*
* useEffect(() => {
*   // This will only run 500ms after the user stops typing
*   if (debouncedSearchTerm) {
*     fetchSearchResults(debouncedSearchTerm);
*   }
* }, [debouncedSearchTerm]);
* ```
*/
function useDebounced(value, delay = 300) {
	const [debouncedValue, setDebouncedValue] = import_react.useState(value);
	import_react.useEffect(() => {
		const handler = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			window.clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
//#endregion
export { useDebounced as a, InputGroupInput as i, InputGroupAddon as n, InputGroupButton as r, InputGroup as t };
