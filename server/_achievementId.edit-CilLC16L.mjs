import { ft as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { f as IconSettings, s as IconTrophy } from "./_libs/tabler__icons-react.mjs";
import { h as EXPERIENCE_STATUS_TYPES, m as EXPERIENCE_STATUS_LABELS } from "./_ssr/auth-BOIJqjd1.mjs";
import { t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { r as updateAchievementSchema } from "./_ssr/achievement.schema-D6FJdEnP.mjs";
import { m as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { t as Route } from "./_achievementId.edit-CtbT5pPw.mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-8obnNYxS.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as Separator$1 } from "./_ssr/separator-BJ-xJ2or.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-BUgidPMs.mjs";
import { t as Input$1 } from "./_ssr/input-BEBqmpJz.mjs";
import { t as DatePicker } from "./_ssr/date-picker-Bn0QF3Go.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-aiXNZhJX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-BQpsd2Aa.mjs";
import { t as Textarea } from "./_ssr/textarea-BZLxIr78.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-ChqxVJ7_.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-BhhD4THz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_achievementId.edit-CilLC16L.js
var import_jsx_runtime = require_jsx_runtime();
var TAB_TRIGGERS = [{
	icon: IconTrophy,
	title: "Achievement Details",
	value: "details"
}, {
	icon: IconSettings,
	title: "Settings",
	value: "settings"
}];
var TAB_FIELDS = {
	details: [
		"title",
		"issuer",
		"description",
		"date"
	],
	settings: ["status", "order"]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { achievementId } = Route.useParams();
	const { data: record } = useSuspenseQuery(trpc.achievement.getById.queryOptions({ id: achievementId }));
	const updateMutation = useMutation(trpc.achievement.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.achievement.getForDashboard.queryFilter());
			globalSuccessToast("Achievement updated successfully!");
			router.history.back();
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		validators: { onSubmit: updateAchievementSchema },
		defaultValues: {
			id: record.id,
			title: record.title,
			issuer: record.issuer,
			description: record.description ?? void 0,
			date: new Date(record.date).toISOString(),
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
				children: "Edit Achievement"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your achievement details."
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
																placeholder: "e.g. 1st Place — National Hackathon"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "issuer",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Issuer / Organizer"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value,
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value),
																"aria-invalid": isInvalid,
																placeholder: "e.g. Ministry of Education"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "date",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Date" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																value: field.state.value ? new Date(field.state.value) : void 0,
																onChange: (value) => field.handleChange(new Date(value).toISOString()),
																placeholder: "Select date"
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
																children: "Description (optional)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
																id: field.name,
																value: field.state.value ?? "",
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value || void 0),
																"aria-invalid": isInvalid,
																placeholder: "Brief description of the achievement...",
																rows: 3
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
