import { i as __toESM } from "../_runtime.mjs";
import { A as SwitchRoot, k as SwitchThumb, mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as IconX } from "../_libs/tabler__icons-react.mjs";
import { r as cn } from "./button-DXBrv0gs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switch-B0wHEd6C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InputTag = (0, import_react.forwardRef)(({ value = [], onChange, onBlur, name: _name, disabled = false, placeholder = "Add a tag...", className, maxTags, error }, ref) => {
	const [inputValue, setInputValue] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const addTag = (0, import_react.useCallback)((raw) => {
		const trimmed = raw.trim();
		if (!trimmed || value.includes(trimmed)) return;
		if (maxTags !== void 0 && value.length >= maxTags) return;
		onChange?.([...value, trimmed]);
		setInputValue("");
	}, [
		value,
		onChange,
		maxTags
	]);
	const removeTag = (0, import_react.useCallback)((index) => {
		onChange?.(value.filter((_, i) => i !== index));
	}, [value, onChange]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag(inputValue);
		} else if (e.key === "Backspace" && !inputValue && value.length > 0) removeTag(value.length - 1);
	}, [
		addTag,
		inputValue,
		removeTag,
		value.length
	]);
	const handleBlur = (0, import_react.useCallback)(() => {
		if (inputValue.trim()) addTag(inputValue);
		onBlur?.();
	}, [
		addTag,
		inputValue,
		onBlur
	]);
	const handlePaste = (0, import_react.useCallback)((e) => {
		const pasted = e.clipboardData.getData("text");
		if (!pasted.includes(",")) return;
		e.preventDefault();
		const parts = pasted.split(",").map((p) => p.trim()).filter(Boolean);
		const next = [...value];
		for (const part of parts) {
			if (next.includes(part)) continue;
			if (maxTags !== void 0 && next.length >= maxTags) break;
			next.push(part);
		}
		onChange?.(next);
		setInputValue("");
	}, [
		value,
		onChange,
		maxTags
	]);
	const isAtMax = maxTags !== void 0 && value.length >= maxTags;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("flex min-h-7 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-input/20 px-2 py-1 transition-colors", "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30", disabled && "pointer-events-none cursor-not-allowed opacity-50", error && "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/40", className),
		onClick: () => !disabled && inputRef.current?.focus(),
		children: [value.map((tag, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 rounded-full border border-border bg-input/30 px-2 py-0.5 text-[0.625rem] font-medium text-foreground",
			children: [tag, !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					removeTag(index);
				},
				className: "flex items-center text-muted-foreground transition-colors hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, { className: "size-2.5" })
			})]
		}, `${tag}-${index}`)), !isAtMax && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "text",
			value: inputValue,
			onChange: (e) => setInputValue(e.target.value),
			onKeyDown: handleKeyDown,
			onBlur: handleBlur,
			onPaste: handlePaste,
			disabled,
			placeholder: value.length === 0 ? placeholder : "",
			className: "min-w-20 flex-1 bg-transparent text-xs/relaxed outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
		})]
	});
});
InputTag.displayName = "InputTag";
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-2 aria-invalid:ring-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-[16.6px] data-[size=default]:w-7 data-[size=sm]:h-3.5 data-[size=sm]:w-6", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
		})
	});
}
//#endregion
export { Switch$1 as n, InputTag as t };
