import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { E as IconPencil, I as IconLink, K as IconGripVertical, _ as IconSettings, l as IconTrash, p as IconStar, rt as IconCloudUpload, s as IconUpload, t as IconStarFilled } from "../_libs/tabler__icons-react.mjs";
import { t as v7 } from "../_libs/uuid.mjs";
import { s as COLOR_VALUES } from "./auth-BlELRVlC.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { s as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./separator-BJ-xJ2or.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./spinner-BUgidPMs.mjs";
import { t as Input$1 } from "./input-BEBqmpJz.mjs";
import { t as ScrollArea$1 } from "./scroll-area-aiXNZhJX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./tabs-Drp1x8v6.mjs";
import { t as Textarea } from "./textarea-BZLxIr78.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./toggle-group-ChqxVJ7_.mjs";
import { t as hasTabError } from "./has-tab-error-BhhD4THz.mjs";
import { n as Switch$1, t as InputTag } from "./switch-B0wHEd6C.mjs";
import { n as createProjectSchema } from "./project.schema-C6URTE0X.mjs";
import { n as MarkdownEditor, r as toFormData, t as CopyAiPromptButton } from "./form-data-mapper-Ct1Rs6L5.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, r as rectSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { t as Route } from "./create-CphWUitp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-0wdUbQin.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_SIZE = 5 * 1024 * 1024;
var ACCEPT = "image/jpeg, image/png, image/webp";
/**
* Buffers selected images in local state with previews — nothing is uploaded
* until the parent form submits. The first image (index 0) is the cover; drag
* to reorder or use the star to promote an image to cover.
*/
function ProjectImagesInput({ value, onChange, disabled = false }) {
	const dndId = (0, import_react.useId)();
	const inputRef = (0, import_react.useRef)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const valueRef = (0, import_react.useRef)(value);
	valueRef.current = value;
	(0, import_react.useEffect)(() => {
		return () => {
			for (const img of valueRef.current) URL.revokeObjectURL(img.preview);
		};
	}, []);
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	function addFiles(files) {
		const noCoverYet = value.length === 0;
		const next = [];
		for (const file of files) {
			if (!file.type.startsWith("image/")) {
				setError("Only image files are allowed");
				continue;
			}
			if (file.size > MAX_SIZE) {
				setError("Each image must be less than 5MB");
				continue;
			}
			next.push({
				id: v7(),
				file,
				preview: URL.createObjectURL(file),
				isCover: noCoverYet && next.length === 0
			});
		}
		if (next.length > 0) {
			setError(null);
			onChange([...value, ...next]);
		}
	}
	function removeImage(id) {
		const target = value.find((img) => img.id === id);
		if (target) URL.revokeObjectURL(target.preview);
		let remaining = value.filter((img) => img.id !== id);
		if (target?.isCover && remaining.length > 0 && !remaining.some((img) => img.isCover)) remaining = remaining.map((img, idx) => idx === 0 ? {
			...img,
			isCover: true
		} : img);
		onChange(remaining);
	}
	function setCover(id) {
		onChange(value.map((img) => ({
			...img,
			isCover: img.id === id
		})));
	}
	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = value.findIndex((i) => i.id === active.id);
		const newIndex = value.findIndex((i) => i.id === over.id);
		if (oldIndex === -1 || newIndex === -1) return;
		onChange(arrayMove(value, oldIndex, newIndex));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: ACCEPT,
				multiple: true,
				className: "hidden",
				onChange: (e) => {
					if (e.target.files) addFiles(Array.from(e.target.files));
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled,
				onClick: () => inputRef.current?.click(),
				onDragEnter: (e) => {
					e.preventDefault();
					setIsDragging(true);
				},
				onDragLeave: (e) => {
					e.preventDefault();
					setIsDragging(false);
				},
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault();
					setIsDragging(false);
					if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
				},
				className: cn("flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-6 transition-colors", isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50", disabled && "cursor-not-allowed opacity-60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-border flex size-8 items-center justify-center rounded-full border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCloudUpload, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground text-sm font-medium",
						children: "Add images"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: "Choose files or drag & drop · JPG, PNG, WebP up to 5MB each"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive text-xs",
				children: error
			}),
			value.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
				id: dndId,
				sensors,
				collisionDetection: closestCenter,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
					items: value.map((i) => i.id),
					strategy: rectSortingStrategy,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: value.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableImageCard, {
							image,
							isCover: image.isCover,
							onSetCover: () => setCover(image.id),
							onRemove: () => removeImage(image.id)
						}, image.id))
					})
				})
			})
		]
	});
}
function SortableImageCard({ image, isCover, onSetCover, onRemove }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1
		},
		className: "group border-border bg-card relative overflow-hidden rounded-md border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image.preview,
				alt: "Preview",
				className: "aspect-video w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "bg-background/80 text-muted-foreground hover:text-foreground absolute top-1.5 left-1.5 cursor-grab rounded-md p-1 backdrop-blur-sm active:cursor-grabbing",
				...attributes,
				...listeners,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4" })
			}),
			isCover && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "bg-primary text-primary-foreground absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconStarFilled, { className: "size-3" }), "Cover"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-linear-to-t from-black/70 to-transparent p-1.5",
				children: [!isCover ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "h-7 px-2 text-xs",
					onClick: onSetCover,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconStar, { className: "size-3.5" }), "Set as Cover"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					size: "icon",
					variant: "destructive",
					className: "size-7",
					onClick: onRemove,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, { className: "size-3.5" })
				})]
			})
		]
	});
}
var TAB_TRIGGERS = [
	{
		icon: IconPencil,
		title: "Content",
		value: "content"
	},
	{
		icon: IconLink,
		title: "Links",
		value: "links"
	},
	{
		icon: IconUpload,
		title: "Media",
		value: "media"
	},
	{
		icon: IconSettings,
		title: "Settings",
		value: "settings"
	}
];
var TAB_FIELDS = {
	content: [
		"title",
		"description",
		"longDescription",
		"tech"
	],
	links: [
		"githubUrl",
		"liveUrl",
		"playstoreUrl",
		"appstoreUrl"
	],
	media: ["coverColor"],
	settings: [
		"status",
		"isVisible",
		"featured",
		"order"
	]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();
	const router = useRouter();
	const [images, setImages] = (0, import_react.useState)([]);
	const createProjectMutation = useMutation(trpc.project.create.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.project.getPaginatedProjects.queryFilter());
			globalSuccessToast("Project created successfully");
			navigate({ to: "/dashboard/projects" });
		},
		onError: (data) => {
			globalErrorToast(data.message || "Failed to create project");
		}
	}));
	const form = useForm({
		validators: { onSubmit: createProjectSchema },
		defaultValues: {
			title: "",
			description: "",
			longDescription: void 0,
			tech: [],
			githubUrl: void 0,
			liveUrl: void 0,
			playstoreUrl: void 0,
			appstoreUrl: void 0,
			pictures: void 0,
			coverColor: "#ffffff",
			status: "draft",
			isVisible: false,
			order: 0,
			featured: false
		},
		onSubmit: async ({ value }) => {
			let pictures = [];
			const cover = images.find((img) => img.isCover) ?? images[0];
			if (cover) pictures = [cover, ...images.filter((img) => img.id !== cover.id)].map((img) => img.file);
			const formData = toFormData({
				...value,
				pictures
			});
			await createProjectMutation.mutateAsync(formData);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "Create a new project"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Create a new portofolio project"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				},
				className: "flex w-full flex-1 flex-col overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
						defaultValue: "content",
						className: "min-h-0 flex-1 gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 px-4 pt-4 pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
								selector: (state) => state.fieldMeta,
								children: (fieldMeta) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
									variant: "line",
									children: TAB_TRIGGERS.map((tab) => {
										const hasError = hasTabError(fieldMeta, TAB_FIELDS[tab.value] ?? []);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: tab.value,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, {}),
												tab.title,
												hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-destructive size-1.5 rounded-full" })
											]
										}, tab.value);
									})
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
							className: "min-h-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 pb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "content",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
											className: "gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "title",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Title"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value,
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value),
																	"aria-invalid": isInvalid,
																	placeholder: "My awesome project"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "description",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-between gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																		htmlFor: field.name,
																		children: "Description"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
																		selector: (s) => ({
																			title: s.values.title,
																			tech: s.values.tech,
																			longDescription: s.values.longDescription
																		}),
																		children: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyAiPromptButton, {
																			kind: "short",
																			context: {
																				title: v.title,
																				tech: v.tech,
																				longDescription: v.longDescription
																			}
																		})
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
																	id: field.name,
																	value: field.state.value,
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value),
																	placeholder: "Short description of your project",
																	rows: 3
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "tech",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Technologies" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputTag, {
																	value: field.state.value,
																	onChange: field.handleChange,
																	onBlur: field.handleBlur,
																	placeholder: "Add a technology...",
																	error: isInvalid ? String(field.state.meta.errors[0]) : void 0
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "longDescription",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-between gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																		htmlFor: field.name,
																		children: "Long Description"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
																		selector: (s) => ({
																			title: s.values.title,
																			description: s.values.description,
																			tech: s.values.tech,
																			githubUrl: s.values.githubUrl,
																			liveUrl: s.values.liveUrl,
																			playstoreUrl: s.values.playstoreUrl,
																			appstoreUrl: s.values.appstoreUrl
																		}),
																		children: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyAiPromptButton, { context: {
																			title: v.title,
																			description: v.description,
																			tech: v.tech,
																			links: [
																				{
																					label: "GitHub",
																					url: v.githubUrl
																				},
																				{
																					label: "Live",
																					url: v.liveUrl
																				},
																				{
																					label: "Play Store",
																					url: v.playstoreUrl
																				},
																				{
																					label: "App Store",
																					url: v.appstoreUrl
																				}
																			]
																		} })
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownEditor, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (value) => field.handleChange(value === "" ? void 0 : value),
																	placeholder: "Detailed description of your project",
																	"aria-invalid": isInvalid,
																	rows: 6
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Supports Markdown — headings, **bold**, lists, links and code." }),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "links",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
											className: "gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "External links shown on project card. Leave blank to hide." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "githubUrl",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "GitHub URL"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value || void 0),
																	placeholder: "https://github.com/...",
																	type: "url"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "liveUrl",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Live URL"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value || void 0),
																	placeholder: "https://...",
																	type: "url"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "playstoreUrl",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Play Store URL"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value || void 0),
																	placeholder: "https://play.google.com/...",
																	type: "url"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "appstoreUrl",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "App Store URL"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value || void 0),
																	placeholder: "https://apps.apple.com/...",
																	type: "url"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "media",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
											className: "gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
												className: "flex flex-col gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Images" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Add one or more images. The first image becomes the cover — drag to reorder or use “Set as Cover”. Recommended size: 1200x630px. Max 5MB each." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectImagesInput, {
														value: images,
														onChange: setImages
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "coverColor",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Cover Color" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Fallback when image unavailable" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex flex-wrap gap-2",
																children: COLOR_VALUES.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => field.handleChange(color),
																	className: cn("size-7 rounded-md border-2 transition-transform hover:scale-110", field.state.value === color ? "border-foreground scale-110" : "border-transparent"),
																	style: { backgroundColor: color },
																	title: color
																}, color))
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "settings",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
											className: "gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "status",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Status" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
																	variant: "outline",
																	value: [field.state.value],
																	onValueChange: (values) => {
																		const next = values.find((v) => v !== field.state.value);
																		if (next) field.handleChange(next);
																	},
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
																		value: "draft",
																		children: "Draft"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
																		value: "published",
																		children: "Published"
																	})]
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "isVisible",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex items-center justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "flex flex-col gap-0.5",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Visibility" })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
																		checked: field.state.value,
																		onCheckedChange: field.handleChange
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-foreground text-sm",
																		children: "Visible in public portfolio"
																	})]
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "featured",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex items-center justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "flex flex-col gap-0.5",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Feature on homepage" })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
																		checked: field.state.value,
																		onCheckedChange: field.handleChange
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-foreground text-sm",
																		children: "Show in featured section on homepage"
																	})]
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "order",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Order"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	type: "number",
																	value: field.state.value,
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(Number(e.target.value))
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Lower = earlier" }),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})
											]
										})
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex shrink-0 items-center justify-end gap-2 px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							onClick: () => router.history.back(),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
							selector: (state) => state.isSubmitting,
							children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								type: "submit",
								disabled: isSubmitting,
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Create Project"]
							})
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { RouteComponent as component };
