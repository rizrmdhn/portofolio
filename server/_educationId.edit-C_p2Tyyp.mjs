import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { _ as IconSettings, b as IconSchool } from "./_libs/tabler__icons-react.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, g as EXPERIENCE_STATUS_LABELS, m as DEGREE_TYPE_LABELS, p as DEGREE_TYPES } from "./_ssr/auth-BlELRVlC.mjs";
import { t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { m as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./_ssr/separator-BJ-xJ2or.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-BUgidPMs.mjs";
import { t as Input$1 } from "./_ssr/input-BEBqmpJz.mjs";
import { t as DatePicker } from "./_ssr/date-picker-Bn0QF3Go.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-aiXNZhJX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-Drp1x8v6.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-ChqxVJ7_.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-BhhD4THz.mjs";
import { r as updateEducationSchema } from "./_ssr/education.schema-6iS0cenT.mjs";
import { t as Route } from "./_educationId.edit-g99HAqKG.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./_ssr/select-DqD9RM1e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_educationId.edit-C_p2Tyyp.js
var import_jsx_runtime = require_jsx_runtime();
var TAB_TRIGGERS = [{
	icon: IconSchool,
	title: "Education Details",
	value: "details"
}, {
	icon: IconSettings,
	title: "Settings",
	value: "settings"
}];
var TAB_FIELDS = {
	details: [
		"institution",
		"degreeLevel",
		"major",
		"gpa",
		"startYear",
		"endYear"
	],
	settings: ["status", "order"]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { educationId } = Route.useParams();
	const { data: record } = useSuspenseQuery(trpc.education.getById.queryOptions({ id: educationId }));
	const updateMutation = useMutation(trpc.education.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.education.getForDashboard.queryFilter());
			globalSuccessToast("Education updated successfully!");
			router.history.back();
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		validators: { onSubmit: updateEducationSchema },
		defaultValues: {
			id: record.id,
			institution: record.institution,
			degreeLevel: record.degreeLevel,
			major: record.major,
			gpa: record.gpa ?? void 0,
			startYear: new Date(record.startYear).toISOString(),
			endYear: record.endYear ? new Date(record.endYear).toISOString() : void 0,
			status: record.status,
			order: record.order
		},
		onSubmit: async ({ value }) => {
			await updateMutation.mutateAsync(value);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "Edit Education"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your education details."
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
						defaultValue: "details",
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
									value: "details",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
										className: "gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "institution",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Institution"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value,
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value),
																"aria-invalid": isInvalid,
																placeholder: "e.g. University of Indonesia"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "degreeLevel",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Degree Level" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
																value: field.state.value,
																onValueChange: (v) => field.handleChange(v),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																	"aria-invalid": isInvalid,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																		placeholder: "Select degree level",
																		children: DEGREE_TYPE_LABELS[field.state.value]
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEGREE_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																	value: d,
																	children: DEGREE_TYPE_LABELS[d]
																}, d)) })]
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "major",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Major / Field of Study"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value,
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value),
																"aria-invalid": isInvalid,
																placeholder: "e.g. Computer Science"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "gpa",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "GPA (optional)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value ?? "",
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value || void 0),
																"aria-invalid": isInvalid,
																placeholder: "e.g. 3.75"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 md:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "startYear",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Start Year" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																	value: field.state.value ? new Date(field.state.value) : void 0,
																	onChange: (value) => field.handleChange(new Date(value).toISOString()),
																	placeholder: "Select start year"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "endYear",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "End Year (optional)" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																	value: field.state.value ? new Date(field.state.value) : void 0,
																	onChange: (value) => field.handleChange(new Date(value).toISOString()),
																	placeholder: "Leave empty if ongoing"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})]
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "settings",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
										className: "gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
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
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
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
										})]
									})
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex shrink-0 items-center justify-end gap-2 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
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
