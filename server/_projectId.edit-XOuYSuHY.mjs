import { o as __toESM } from "./_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "./_libs/@base-ui/react+[...].mjs";
import { O as IconLink, b as IconPencil, f as IconSettings, o as IconUpload } from "./_libs/tabler__icons-react.mjs";
import { a as COLOR_VALUES } from "./_ssr/auth-BOIJqjd1.mjs";
import { r as cn, t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { m as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./_ssr/separator-BJ-xJ2or.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-BUgidPMs.mjs";
import { t as Input$1 } from "./_ssr/input-BEBqmpJz.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-aiXNZhJX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-BQpsd2Aa.mjs";
import { t as Textarea } from "./_ssr/textarea-BZLxIr78.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-ChqxVJ7_.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-BhhD4THz.mjs";
import { n as Switch$1, t as InputTag } from "./_ssr/switch-CaXwWI9d.mjs";
import { i as updateProjectSchema } from "./_ssr/project.schema-CaO0cEu4.mjs";
import { t as Route } from "./_projectId.edit-C-jrTXak.mjs";
import { n as toFormData, t as SingleImageUpload } from "./_ssr/form-data-mapper-BrKDL16Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_projectId.edit-XOuYSuHY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	media: ["picture", "coverColor"],
	settings: [
		"status",
		"isVisible",
		"featured",
		"order"
	]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { projectId } = Route.useParams();
	const { data: project } = useSuspenseQuery(trpc.project.getById.queryOptions({ id: projectId }));
	const [existingImageUrl, setExistingImageUrl] = (0, import_react.useState)(project.imageUrl ?? null);
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
			coverColor: project.coverColor,
			status: project.status,
			isVisible: project.isVisible,
			order: project.order,
			featured: project.featureAt !== null,
			picture: void 0
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
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Description"
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
													name: "longDescription",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Long Description"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
																	id: field.name,
																	value: field.state.value ?? "",
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value),
																	placeholder: "Detailed description of your project",
																	rows: 6
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
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "picture",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Cover Image" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Recommended size: 1200x630px. Max 5MB." }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleImageUpload, {
																...field,
																value: field.state.value ?? existingImageUrl,
																onChange: (file) => {
																	if (file === null) setExistingImageUrl(null);
																	field.handleChange(file ?? void 0);
																},
																error: field.state.meta.errors.join(", ")
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
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
