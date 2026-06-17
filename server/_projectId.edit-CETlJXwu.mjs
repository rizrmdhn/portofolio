import { i as __toESM } from "./_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { E as IconPencil, I as IconLink, _ as IconSettings, it as IconCloudUpload, l as IconTrash, p as IconStar, q as IconGripVertical, s as IconUpload, t as IconStarFilled, z as IconLanguage } from "./_libs/tabler__icons-react.mjs";
import { s as COLOR_VALUES } from "./_ssr/auth-DYlFpf9M.mjs";
import { r as cn, t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { h as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-jr2byFtO.mjs";
import { a as useQuery, i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./_ssr/separator-DENx5VjH.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./_ssr/input-S9SQN3Mi.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-DTrDwLXS.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-B41n_N7t.mjs";
import { t as Textarea } from "./_ssr/textarea-Bd7wxdEL.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-OtdFSgTJ.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-8GKW7_Vv.mjs";
import { i as TranslationEditor, n as MarkdownEditor, t as CopyAiPromptButton } from "./_ssr/translation-editor-D6Ynl2kU.mjs";
import { n as Switch$1, t as InputTag } from "./_ssr/switch-aiLZ_xDd.mjs";
import { o as updateProjectSchema } from "./_ssr/project.schema-CNVBu7uQ.mjs";
import { t as Route } from "./_projectId.edit-CDTYROsV.mjs";
import { t as toFormData } from "./_ssr/form-data-mapper-CnusNGMI.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "./_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, r as rectSortingStrategy, t as SortableContext } from "./_libs/dnd-kit__sortable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_projectId.edit-CETlJXwu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_SIZE = 5 * 1024 * 1024;
var ACCEPT = "image/jpeg, image/png, image/webp";
function ProjectImagesManager({ projectId }) {
	const queryClient = useQueryClient();
	const dndId = (0, import_react.useId)();
	const { data, isLoading } = useQuery(trpc.project.getImages.queryOptions({ projectId }));
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (data) setItems(data);
	}, [data]);
	const invalidate = (0, import_react.useCallback)(async () => {
		await queryClient.invalidateQueries(trpc.project.getImages.queryFilter({ projectId }));
		await queryClient.invalidateQueries(trpc.project.getPaginatedProjects.queryFilter());
		await queryClient.invalidateQueries(trpc.project.getById.queryFilter({ id: projectId }));
	}, [projectId, queryClient]);
	const addMutation = useMutation(trpc.project.addImage.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Image added");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to add image")
	}));
	const removeMutation = useMutation(trpc.project.removeImage.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Image removed");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to remove image")
	}));
	const setCoverMutation = useMutation(trpc.project.setCover.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Cover updated");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to set cover")
	}));
	const reorderMutation = useMutation(trpc.project.reorderImages.mutationOptions({
		onSuccess: async () => {
			await invalidate();
		},
		onError: async (error) => {
			globalErrorToast(error.message || "Failed to reorder images");
			await invalidate();
		}
	}));
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.findIndex((i) => i.id === active.id);
		const newIndex = items.findIndex((i) => i.id === over.id);
		if (oldIndex === -1 || newIndex === -1) return;
		const reordered = arrayMove(items, oldIndex, newIndex);
		setItems(reordered);
		reorderMutation.mutate(reordered.map((img, index) => ({
			id: img.id,
			order: index
		})));
	}
	function handleAddFile(file) {
		const formData = toFormData({
			projectId,
			picture: file
		});
		addMutation.mutate(formData);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddImageDropzone, {
			onFile: handleAddFile,
			isUploading: addMutation.isPending
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-muted-foreground flex items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Loading images..."]
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: "No images yet. Add one above — the first image becomes the cover."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			id: dndId,
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
				items: items.map((i) => i.id),
				strategy: rectSortingStrategy,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: items.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableImageCard, {
						image,
						onSetCover: () => setCoverMutation.mutate({
							id: image.id,
							projectId
						}),
						onRemove: () => removeMutation.mutate({ id: image.id }),
						isBusy: removeMutation.isPending || setCoverMutation.isPending || reorderMutation.isPending
					}, image.id))
				})
			})
		})]
	});
}
function SortableImageCard({ image, onSetCover, onRemove, isBusy }) {
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
				src: image.imageUrl,
				alt: "Project",
				className: "aspect-video w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "bg-background/80 text-muted-foreground hover:text-foreground absolute top-1.5 left-1.5 cursor-grab rounded-md p-1 backdrop-blur-sm active:cursor-grabbing",
				...attributes,
				...listeners,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4" })
			}),
			image.isCover && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "bg-primary text-primary-foreground absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconStarFilled, { className: "size-3" }), "Cover"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-1.5", "bg-linear-to-t from-black/70 to-transparent"),
				children: [!image.isCover ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "h-7 px-2 text-xs",
					onClick: onSetCover,
					disabled: isBusy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconStar, { className: "size-3.5" }), "Set as Cover"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					size: "icon",
					variant: "destructive",
					className: "size-7",
					onClick: onRemove,
					disabled: isBusy,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, { className: "size-3.5" })
				})]
			})
		]
	});
}
function AddImageDropzone({ onFile, isUploading }) {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const validate = (file) => {
		if (!file.type.startsWith("image/")) return "File must be an image";
		if (file.size > MAX_SIZE) return "File size must be less than 5MB";
		return null;
	};
	const handleFile = (file) => {
		const validationError = validate(file);
		if (validationError) {
			setError(validationError);
			return;
		}
		setError(null);
		onFile(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: ACCEPT,
				className: "hidden",
				onChange: (e) => {
					const file = e.target.files?.[0];
					if (file) handleFile(file);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: isUploading,
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
					const file = e.dataTransfer.files?.[0];
					if (file) handleFile(file);
				},
				className: cn("flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-6 transition-colors", isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50", isUploading && "cursor-not-allowed opacity-60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-border flex size-8 items-center justify-center rounded-full border",
						children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCloudUpload, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground text-sm font-medium",
						children: isUploading ? "Uploading..." : "Add image"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: "Choose a file or drag & drop · JPG, PNG, WebP up to 5MB"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive text-xs",
				children: error
			})
		]
	});
}
var PROJECT_TRANSLATION_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "input",
		placeholder: "My awesome project",
		noTranslate: true
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		placeholder: "Short description of your project"
	},
	{
		name: "longDescription",
		label: "Long Description",
		type: "markdown",
		placeholder: "Detailed description of your project",
		optional: true
	}
];
function ProjectTranslationsTab({ projectId, sourceValues }) {
	const queryClient = useQueryClient();
	const translationsQuery = useQuery(trpc.project.getTranslations.queryOptions({ projectId }));
	const invalidate = () => queryClient.invalidateQueries(trpc.project.getTranslations.queryFilter({ projectId }));
	const upsert = useMutation(trpc.project.upsertTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation saved");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to save translation")
	}));
	const remove = useMutation(trpc.project.deleteTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation removed");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to remove translation")
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationEditor, {
		fields: PROJECT_TRANSLATION_FIELDS,
		translations: translationsQuery.data ?? [],
		sourceValues,
		isLoading: translationsQuery.isLoading,
		savingLocale: upsert.isPending ? upsert.variables.locale : null,
		removingLocale: remove.isPending ? remove.variables.locale : null,
		onSave: (locale, values) => upsert.mutate({
			projectId,
			locale,
			title: values.title ?? "",
			description: values.description ?? "",
			longDescription: values.longDescription?.trim() ? values.longDescription : null
		}),
		onRemove: (locale) => remove.mutate({
			projectId,
			locale
		})
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
	},
	{
		icon: IconLanguage,
		title: "Translations",
		value: "translations"
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
	],
	translations: []
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { projectId } = Route.useParams();
	const { data: project } = useSuspenseQuery(trpc.project.getById.queryOptions({ id: projectId }));
	const editProjectMutation = useMutation(trpc.project.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.project.getPaginatedProjects.queryFilter());
			await queryClient.invalidateQueries(trpc.project.getById.queryOptions({ id: projectId }));
			globalSuccessToast("Project updated successfully");
		},
		onError: (error) => {
			globalErrorToast(error.message || "Failed to update project");
		}
	}));
	const form = useForm({
		validators: { onSubmit: updateProjectSchema },
		defaultValues: {
			id: project.id,
			title: project.title,
			description: project.description,
			longDescription: project.longDescription ?? void 0,
			tech: project.tech,
			githubUrl: project.githubUrl ?? void 0,
			liveUrl: project.liveUrl ?? void 0,
			playstoreUrl: project.playstoreUrl ?? void 0,
			appstoreUrl: project.appstoreUrl ?? void 0,
			pictures: void 0,
			coverColor: project.coverColor,
			status: project.status,
			isVisible: project.isVisible,
			order: project.order,
			featured: project.featureAt !== null
		},
		onSubmit: async ({ value }) => {
			const formData = toFormData(value);
			await editProjectMutation.mutateAsync(formData);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "Edit project"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your portfolio project"
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
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Add multiple images. The first image becomes the cover; drag to reorder and use “Set as Cover” to change it. Recommended size: 1200x630px. Max 5MB each." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectImagesManager, { projectId })
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
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "translations",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
											selector: (s) => ({
												title: s.values.title,
												description: s.values.description,
												longDescription: s.values.longDescription
											}),
											children: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTranslationsTab, {
												projectId,
												sourceValues: {
													title: v.title,
													description: v.description,
													longDescription: v.longDescription ?? ""
												}
											})
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
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Save Changes"]
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
