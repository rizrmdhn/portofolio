import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { _ as IconSettings, dt as IconCertificate } from "./_libs/tabler__icons-react.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, g as EXPERIENCE_STATUS_LABELS } from "./_ssr/auth-BlELRVlC.mjs";
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
import { r as updateCertificationSchema } from "./_ssr/certifcation.schema-uh_z_JGq.mjs";
import { t as Route } from "./_certificateId.edit-CHl4e_h-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_certificateId.edit-Cb0b42B3.js
var import_jsx_runtime = require_jsx_runtime();
var TAB_TRIGGERS = [{
	icon: IconCertificate,
	title: "Certificate Details",
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
		"certificateUrl",
		"certificateId",
		"issueYear",
		"expiryYear"
	],
	settings: ["status", "order"]
};
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { certificateId } = Route.useParams();
	const { data: certificate } = useSuspenseQuery(trpc.certification.getById.queryOptions({ id: certificateId }));
	const updateMutation = useMutation(trpc.certification.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.certification.getForDashboard.queryFilter());
			globalSuccessToast("Certificate updated successfully!");
			router.history.back();
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		validators: { onSubmit: updateCertificationSchema },
		defaultValues: {
			id: certificate.id,
			title: certificate.title,
			issuer: certificate.issuer,
			certificateUrl: certificate.certificateUrl ?? void 0,
			certificateId: certificate.certificateId ?? void 0,
			issueYear: new Date(certificate.issueYear).toISOString(),
			expiryYear: certificate.expiryYear ? new Date(certificate.expiryYear).toISOString() : void 0,
			status: certificate.status,
			order: certificate.order
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
				children: "Edit Certificate"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your certificate details."
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
																placeholder: "e.g. AWS Certified Developer"
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
																children: "Issuer"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value,
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value),
																"aria-invalid": isInvalid,
																placeholder: "e.g. Amazon Web Services"
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 md:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "issueYear",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Issue Year" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																	value: field.state.value ? new Date(field.state.value) : void 0,
																	onChange: (value) => field.handleChange(new Date(value).toISOString()),
																	placeholder: "Select issue year"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "expiryYear",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															className: "flex flex-col gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Expiry Year" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
																	value: field.state.value ? new Date(field.state.value) : void 0,
																	onChange: (value) => field.handleChange(new Date(value).toISOString()),
																	placeholder: "Select expiry year (optional)"
																}),
																isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
															]
														});
													}
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "certificateUrl",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Certificate URL"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value ?? "",
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value || void 0),
																"aria-invalid": isInvalid,
																placeholder: "https://..."
															}),
															isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
														]
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
												name: "certificateId",
												children: (field) => {
													const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
														"data-invalid": isInvalid,
														className: "flex flex-col gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
																htmlFor: field.name,
																children: "Certificate ID"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
																id: field.name,
																value: field.state.value ?? "",
																onBlur: field.handleBlur,
																onChange: (e) => field.handleChange(e.target.value || void 0),
																"aria-invalid": isInvalid,
																placeholder: "e.g. ABC-123-XYZ"
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
