import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { _ as IconSettings, pt as IconBriefcase } from "./_libs/tabler__icons-react.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, g as EXPERIENCE_STATUS_LABELS, v as EXPERIENCE_TYPES, y as EXPERIENCE_TYPE_LABELS } from "./_ssr/auth-BlELRVlC.mjs";
import { t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { m as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./_ssr/separator-BJ-xJ2or.mjs";
import { a as FieldLabel, i as FieldGroup, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-BUgidPMs.mjs";
import { t as Input$1 } from "./_ssr/input-BEBqmpJz.mjs";
import { t as DatePicker } from "./_ssr/date-picker-Bn0QF3Go.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-aiXNZhJX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-Drp1x8v6.mjs";
import { t as Textarea } from "./_ssr/textarea-BZLxIr78.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-ChqxVJ7_.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-BhhD4THz.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./_ssr/select-DqD9RM1e.mjs";
import { n as updateExperienceSchema } from "./_ssr/experience.schema-CRaklnKN.mjs";
import { t as Route } from "./_experienceId.edit-Brjuzubi.mjs";
import { n as Switch$1, t as InputTag } from "./_ssr/switch-B0wHEd6C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_experienceId.edit-pn59DUjA.js
var import_jsx_runtime = require_jsx_runtime();
var TAB_TRIGGERS = [{
	icon: IconBriefcase,
	title: "Role Details",
	value: "role-details"
}, {
	icon: IconSettings,
	title: "Settings",
	value: "settings"
}];
var TAB_FIELDS = {
	"role-details": [
		"title",
		"description",
		"company",
		"location",
		"type",
		"startDate",
		"endDate",
		"currentlyWorking",
		"skills"
	],
	settings: ["status"]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { experienceId } = Route.useParams();
	const { data: experience } = useSuspenseQuery(trpc.experience.getById.queryOptions({ id: experienceId }));
	const editExperienceMutation = useMutation(trpc.experience.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.experience.getForDashboard.queryFilter());
			globalSuccessToast("Experience updated successfully!");
			router.history.back();
		},
		onError: (data) => {
			globalErrorToast(data.message);
		}
	}));
	const form = useForm({
		validators: { onSubmit: updateExperienceSchema },
		defaultValues: {
			id: experience.id,
			title: experience.title,
			description: experience.description,
			company: experience.company,
			location: experience.location,
			type: experience.type,
			startDate: new Date(experience.startDate).toISOString(),
			endDate: experience.endDate ? new Date(experience.endDate).toISOString() : void 0,
			currentlyWorking: experience.currentlyWorking,
			skills: experience.skills,
			status: experience.status,
			order: experience.order
		},
		onSubmit: async ({ value }) => {
			await editExperienceMutation.mutateAsync(value);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "Edit Experience"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your experience entry for your portfolio. Fill in the details and settings to showcase your work history and skills effectively."
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
						defaultValue: "role-details",
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
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "role-details",
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
																placeholder: "e.g. Software Engineer"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "company",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Company"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value,
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value),
																"aria-invalid": isInvalid,
																placeholder: "e.g. Google"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 md:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "location",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: field.name,
																	children: "Location"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																	id: field.name,
																	value: field.state.value,
																	onBlur: field.handleBlur,
																	onChange: (e) => field.handleChange(e.target.value),
																	"aria-invalid": isInvalid,
																	placeholder: "e.g. Remote, Jakarta, etc."
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "type",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																	htmlFor: "employment-type",
																	children: "Employment Type"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
																	name: field.name,
																	value: field.state.value,
																	onValueChange: (value) => field.handleChange(value),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																		id: "employment-type",
																		"aria-invalid": isInvalid,
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																			placeholder: "Select",
																			children: EXPERIENCE_TYPE_LABELS[field.state.value]
																		})
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EXPERIENCE_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																		value: type,
																		children: EXPERIENCE_TYPE_LABELS[type]
																	}, type)) })]
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 md:grid-cols-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
														name: "startDate",
														children: (field) => {
															const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
																"data-invalid": isInvalid,
																className: "flex flex-col gap-1.5",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Start Date" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																		value: new Date(field.state.value),
																		onChange: (value) => field.handleChange(new Date(value).toISOString()),
																		placeholder: "Select start date"
																	}),
																	isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
																]
															});
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
														name: "endDate",
														children: (field) => {
															const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
																"data-invalid": isInvalid,
																className: "flex flex-col gap-1.5",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "End Date" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																		value: field.state.value ? new Date(field.state.value) : void 0,
																		onChange: (value) => field.handleChange(new Date(value).toISOString()),
																		placeholder: "Select end date"
																	}),
																	isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
																]
															});
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
														name: "currentlyWorking",
														children: (field) => {
															const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
																"data-invalid": isInvalid,
																className: "flex items-center justify-between",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "flex flex-col gap-0.5",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Currently Working Here" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center gap-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
																			checked: field.state.value,
																			onCheckedChange: field.handleChange
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			className: "text-foreground text-sm",
																			children: field.state.value ? "Yes" : "No"
																		})]
																	}),
																	isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
																]
															});
														}
													})
												]
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
																placeholder: "Description of your role and responsibilities",
																rows: 3
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "skills",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Skills" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputTag, {
																value: field.state.value,
																onChange: field.handleChange,
																onBlur: field.handleBlur,
																placeholder: "Add a skill...",
																error: isInvalid ? String(field.state.meta.errors[0]) : void 0
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "settings",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
										className: "gap-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
											name: "status",
											children: (field) => {
												const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
													"data-invalid": isInvalid,
													className: "flex flex-col gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Status" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
															variant: "outline",
															value: [field.state.value],
															onValueChange: (values) => {
																const next = values.find((v) => v !== field.state.value);
																if (next) field.handleChange(next);
															},
															children: EXPERIENCE_STATUS_TYPES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
																value: status,
																"aria-label": status,
																children: EXPERIENCE_STATUS_LABELS[status]
															}, status))
														}),
														isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
													]
												});
											}
										})
									})
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex shrink-0 items-center justify-end gap-2 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							onClick: () => {
								router.history.back();
							},
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
							selector: (state) => state.isSubmitting,
							children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								type: "submit",
								disabled: isSubmitting,
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Update Experience"]
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
