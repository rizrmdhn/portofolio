import { pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { C as SOCIAL_ICON_NAMES, S as SOCIAL_ICON_MAP } from "./_ssr/auth-DYlFpf9M.mjs";
import { t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { h as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-jr2byFtO.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./_ssr/separator-DENx5VjH.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./_ssr/input-S9SQN3Mi.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-DTrDwLXS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./_ssr/select-DywxwuYX.mjs";
import { r as updateSocialLinkSchema } from "./_ssr/social-link.schema-C9VdAIW_.mjs";
import { t as Route } from "./_socialLinkId.edit-BsS6Tqfb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_socialLinkId.edit-EZSUbY-S.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { socialLinkId } = Route.useParams();
	const { data: socialLink } = useSuspenseQuery(trpc.socialLink.getById.queryOptions({ id: socialLinkId }));
	const updateMutation = useMutation(trpc.socialLink.update.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.socialLink.getForDashboard.queryFilter());
			globalSuccessToast("Social link updated!");
			router.history.back();
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		validators: { onSubmit: updateSocialLinkSchema },
		defaultValues: {
			id: socialLink.id,
			title: socialLink.title,
			url: socialLink.url,
			icon: socialLink.icon,
			order: socialLink.order
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
				children: "Edit Social Link"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update your social link details."
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
						className: "min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
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
														placeholder: "e.g. GitHub"
													}),
													isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
												]
											});
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
										name: "icon",
										children: (field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											const SelectedIcon = SOCIAL_ICON_MAP[field.state.value].icon;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
												"data-invalid": isInvalid,
												className: "flex flex-col gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Icon" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
														value: field.state.value,
														onValueChange: (v) => field.handleChange(v),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"aria-invalid": isInvalid,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "flex items-center gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedIcon, { className: "size-4 shrink-0" }), SOCIAL_ICON_MAP[field.state.value].label]
															}) })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SOCIAL_ICON_NAMES.map((name) => {
															const meta = SOCIAL_ICON_MAP[name];
															const ItemIcon = meta.icon;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																value: name,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIcon, { className: "size-4 shrink-0" }), meta.label]
																})
															}, name);
														}) })]
													}),
													isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
												]
											});
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
										name: "url",
										children: (field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
												"data-invalid": isInvalid,
												className: "flex flex-col gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
														htmlFor: field.name,
														children: "URL"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
														id: field.name,
														value: field.state.value,
														onBlur: field.handleBlur,
														onChange: (e) => field.handleChange(e.target.value),
														"aria-invalid": isInvalid,
														placeholder: "https://github.com/username"
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
