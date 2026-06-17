import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as AVAILABILITY_STATUS_LABELS, r as AVAILABILITY_STATUS_TYPES } from "./auth-DYlFpf9M.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { a as useQuery, i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./separator-DENx5VjH.mjs";
import { a as FieldLabel, i as FieldGroup, o as Spinner, r as FieldError, t as Field } from "./spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./input-S9SQN3Mi.mjs";
import { t as Textarea } from "./textarea-Bd7wxdEL.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./toggle-group-OtdFSgTJ.mjs";
import { i as TranslationEditor } from "./translation-editor-D6Ynl2kU.mjs";
import { t as updateProfileSchema } from "./profile.schema-ZuTH-r7-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-BYP1Rw2o.js
var import_jsx_runtime = require_jsx_runtime();
var PROFILE_TRANSLATION_FIELDS = [{
	name: "title",
	label: "Title",
	type: "input",
	placeholder: "e.g. Full Stack Developer",
	noTranslate: true
}, {
	name: "bio",
	label: "Bio",
	type: "textarea",
	placeholder: "A short bio about yourself"
}];
function ProfileTranslationsSection({ profileId, sourceValues }) {
	const queryClient = useQueryClient();
	const translationsQuery = useQuery(trpc.profile.getTranslations.queryOptions({ profileId }));
	const invalidate = () => queryClient.invalidateQueries(trpc.profile.getTranslations.queryFilter({ profileId }));
	const upsert = useMutation(trpc.profile.upsertTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation saved");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to save translation")
	}));
	const remove = useMutation(trpc.profile.deleteTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation removed");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to remove translation")
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationEditor, {
		fields: PROFILE_TRANSLATION_FIELDS,
		translations: translationsQuery.data ?? [],
		sourceValues,
		isLoading: translationsQuery.isLoading,
		savingLocale: upsert.isPending ? upsert.variables.locale : null,
		removingLocale: remove.isPending ? remove.variables.locale : null,
		onSave: (locale, values) => upsert.mutate({
			profileId,
			locale,
			title: values.title ?? "",
			bio: values.bio ?? ""
		}),
		onRemove: (locale) => remove.mutate({
			profileId,
			locale
		})
	});
}
function RouteComponent() {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(trpc.profile.get.queryOptions());
	const updateProfile = useMutation(trpc.profile.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.profile.get.queryOptions());
			globalSuccessToast("Profile updated successfully");
		},
		onError: (error) => {
			globalErrorToast(error.message || "Failed to update profile");
		}
	}));
	const form = useForm({
		validators: { onSubmit: updateProfileSchema },
		defaultValues: {
			id: data.id,
			name: data.name,
			title: data.title,
			bio: data.bio,
			email: data.email,
			location: data.location ?? void 0,
			availabilityStatus: data.availabilityStatus
		},
		onSubmit: async ({ value }) => {
			await updateProfile.mutateAsync(value);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-foreground text-base font-bold",
					children: "Profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "Update your public profile information."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				},
				className: "grid gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
					className: "gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "name",
							children: (field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									"data-invalid": isInvalid,
									className: "flex flex-col gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											htmlFor: field.name,
											children: "Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: field.name,
											name: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value),
											"aria-invalid": isInvalid,
											placeholder: "Your full name"
										}),
										isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
									]
								});
							}
						}),
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
											name: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value),
											"aria-invalid": isInvalid,
											placeholder: "e.g. Full Stack Developer"
										}),
										isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
									]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "email",
							children: (field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									"data-invalid": isInvalid,
									className: "flex flex-col gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											htmlFor: field.name,
											children: "Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: field.name,
											name: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value),
											"aria-invalid": isInvalid,
											placeholder: "your@email.com",
											type: "email"
										}),
										isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
									]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
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
											name: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value),
											"aria-invalid": isInvalid,
											placeholder: "City, State"
										}),
										isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
									]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "availabilityStatus",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Availability Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
									variant: "outline",
									value: [field.state.value],
									onValueChange: (values) => {
										const next = values.find((v) => v !== field.state.value);
										if (next) field.handleChange(next);
									},
									children: AVAILABILITY_STATUS_TYPES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
										value: status,
										"aria-label": status,
										children: AVAILABILITY_STATUS_LABELS[status]
									}, status))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "bio",
							children: (field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									"data-invalid": isInvalid,
									className: "flex flex-col gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											htmlFor: field.name,
											children: "Bio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: field.name,
											name: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value),
											"aria-invalid": isInvalid,
											placeholder: "Write a short bio about yourself",
											rows: 4
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground text-right text-xs",
											children: [field.state.value.length, " characters"]
										}),
										isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
									]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
								selector: (state) => state.isSubmitting,
								children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									type: "submit",
									disabled: isSubmitting,
									children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Save Changes"]
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-foreground text-base font-bold",
					children: "Translations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "Translate your title and bio. Empty fields fall back to the default content."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTranslationsSection, {
				profileId: data.id,
				sourceValues: {
					title: data.title,
					bio: data.bio
				}
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
