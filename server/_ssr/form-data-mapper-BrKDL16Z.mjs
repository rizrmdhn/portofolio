import { o as __toESM } from "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { H as IconCloudUpload, U as IconCircleX, n as IconX, y as IconPhoto, yt as IconAlertTriangle } from "../_libs/tabler__icons-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { r as CardContent, t as Card } from "./card-DbtAMaAG.mjs";
import { t as Progress$1 } from "./progress-DANJmD_5.mjs";
import { t as require_mime_types } from "../_libs/mime-types.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-data-mapper-BrKDL16Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_mime_types = /* @__PURE__ */ __toESM(require_mime_types());
var alertVariants = cva("group/alert relative grid w-full gap-0.5 rounded-lg border px-2 py-1.5 text-left text-xs/relaxed has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-1.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-3.5", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-title",
		className: cn("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-description",
		className: cn("text-xs/relaxed text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
		...props
	});
}
var SingleImageUpload = (0, import_react.forwardRef)(({ maxSize = 2 * 1024 * 1024, accept = "image/jpeg, image/png", className, value, onChange, onBlur: _onBlur, name: _name, disabled = false, error }, ref) => {
	const [image, setImage] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (value === null || value === void 0) {
			if (image) URL.revokeObjectURL(image.preview);
			setImage(null);
			setPreview(null);
		} else if (typeof value === "string") {
			setPreview(value);
			setImage(null);
		} else if (value instanceof File) if (value.size > 0) {
			if (!image || image.file !== value) {
				const newPreview = URL.createObjectURL(value);
				setImage({
					file: value,
					preview: newPreview,
					progress: 100,
					status: "completed"
				});
				setPreview(newPreview);
			}
		} else {
			if (image) URL.revokeObjectURL(image.preview);
			setImage(null);
			setPreview(null);
		}
	}, [value]);
	const addImage = (0, import_react.useCallback)((file) => {
		const validateFile = (f) => {
			if (!f.type.startsWith("image/")) return "File must be an image";
			if (f.size > maxSize) return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
			return null;
		};
		const simulateUpload = (uploadedFile) => {
			let progress = 0;
			const interval = setInterval(() => {
				progress += Math.random() * 20;
				if (progress >= 100) {
					progress = 100;
					clearInterval(interval);
					setImage((prev) => prev ? {
						...prev,
						progress: 100,
						status: "completed"
					} : null);
					onChange?.(uploadedFile);
				} else setImage((prev) => prev ? {
					...prev,
					progress
				} : null);
			}, 100);
		};
		const validationError = validateFile(file);
		if (validationError) {
			setUploadError(validationError);
			return;
		}
		setUploadError(null);
		if (image) URL.revokeObjectURL(image.preview);
		const imageFile = {
			file,
			preview: URL.createObjectURL(file),
			progress: 0,
			status: "uploading"
		};
		setImage(imageFile);
		setPreview(imageFile.preview);
		simulateUpload(file);
	}, [
		image,
		maxSize,
		onChange
	]);
	const removeImage = (0, import_react.useCallback)(() => {
		if (image) URL.revokeObjectURL(image.preview);
		setImage(null);
		setPreview(null);
		setUploadError(null);
		onChange?.(null);
	}, [image, onChange]);
	const handleDragEnter = (0, import_react.useCallback)((e) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, [disabled]);
	const handleDragLeave = (0, import_react.useCallback)((e) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, [disabled]);
	const handleDragOver = (0, import_react.useCallback)((e) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
	}, [disabled]);
	const handleDrop = (0, import_react.useCallback)((e) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) addImage(file);
	}, [addImage, disabled]);
	const openFileDialog = (0, import_react.useCallback)(() => {
		if (disabled) return;
		const input = document.createElement("input");
		input.type = "file";
		input.accept = accept;
		input.onchange = (e) => {
			const file = e.target.files?.[0];
			if (file) addImage(file);
		};
		input.click();
	}, [
		accept,
		addImage,
		disabled
	]);
	const formatBytes = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = [
			"Bytes",
			"KB",
			"MB",
			"GB"
		];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
	};
	const renderMimeTypes = (types) => {
		return types.split(",").map((type) => type.trim()).map((type) => import_mime_types.extension(type)).filter((ext) => !!ext).join(", ");
	};
	const displayError = error || uploadError;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("w-full", className),
		children: [
			preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "group relative flex w-full items-center justify-center rounded-md bg-accent/50 shadow-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative size-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: preview,
							className: "size-64 rounded-md object-cover",
							alt: "Upload preview"
						}), !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							onClick: removeImage,
							variant: "outline",
							size: "icon",
							className: "absolute -top-2 -right-2 size-7 rounded-full bg-white opacity-100 shadow-sm hover:bg-gray-100",
							type: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, { className: "size-4" })
						})]
					})
				})
			}),
			!preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: cn("rounded-md border-dashed shadow-none transition-colors", isDragging && !disabled ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50", disabled && "cursor-not-allowed opacity-50", displayError && "border-destructive"),
				onDragEnter: handleDragEnter,
				onDragLeave: handleDragLeave,
				onDragOver: handleDragOver,
				onDrop: handleDrop,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-3 flex size-8 items-center justify-center rounded-full border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCloudUpload, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2sm mb-0.5 font-semibold text-foreground",
							children: "Choose a file or drag & drop here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mb-3 block text-xs font-normal text-secondary-foreground",
							children: [
								renderMimeTypes(accept),
								" up to ",
								formatBytes(maxSize),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							onClick: openFileDialog,
							disabled,
							type: "button",
							children: "Browse File"
						})
					]
				})
			}),
			image && image.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "rounded-md shadow-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-2 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPhoto, { className: "size-4 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "-mt-2 flex w-full items-center justify-between gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs leading-none font-medium text-foreground",
											children: image.file.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs leading-none font-normal text-muted-foreground",
											children: formatBytes(image.file.size)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Uploading... ",
												Math.round(image.progress),
												"%"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									onClick: removeImage,
									variant: "ghost",
									size: "icon",
									className: "size-6",
									disabled,
									type: "button",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCircleX, { className: "size-3.5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
								value: image.progress,
								className: cn("h-1 transition-all duration-300", "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50")
							})]
						})]
					})
				})
			}),
			displayError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: "destructive",
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "File upload error" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: displayError })
				]
			})
		]
	});
});
SingleImageUpload.displayName = "SingleImageUpload";
/**
* Converts a plain object to FormData
* Handles files, nested objects, arrays, and primitive types
*
* @param data - The object to convert to FormData
* @param options - Configuration options
* @param formData - Optional existing FormData instance to append to (internal use)
* @param parentKey - Used internally for nested objects
* @returns FormData instance
*/
function toFormData(data, options = {}, formData = new FormData(), parentKey) {
	const { preserveNumericStrings = true } = options;
	for (const key in data) {
		if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
		const value = data[key];
		const formKey = parentKey ? `${parentKey}.${key}` : key;
		if (value === void 0 || value === null) continue;
		if (value instanceof File || value instanceof Blob) {
			formData.append(formKey, value);
			continue;
		}
		if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (item instanceof File || item instanceof Blob) formData.append(`${formKey}[]`, item);
				else if (typeof item === "object" && item !== null) toFormData(item, options, formData, `${formKey}[${index}]`);
				else {
					const itemStr = String(item);
					if (preserveNumericStrings && typeof item === "string" && /^-?\d+(\.\d+)?$/.test(item)) formData.append(`${formKey}[]`, `__str__${itemStr}`);
					else formData.append(`${formKey}[]`, itemStr);
				}
			});
			continue;
		}
		if (value instanceof Date) {
			formData.append(formKey, value.toISOString());
			continue;
		}
		if (typeof value === "object") {
			toFormData(value, options, formData, formKey);
			continue;
		}
		const strValue = String(value);
		if (preserveNumericStrings && typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) formData.append(formKey, `__str__${strValue}`);
		else formData.append(formKey, strValue);
	}
	return formData;
}
//#endregion
export { toFormData as n, SingleImageUpload as t };
