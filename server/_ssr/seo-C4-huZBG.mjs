import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./separator-DENx5VjH.mjs";
import { a as FieldLabel, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./input-S9SQN3Mi.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./tabs-B41n_N7t.mjs";
import { t as Textarea } from "./textarea-Bd7wxdEL.mjs";
import { i as seoSettingsSchema, n as SEO_PAGE_LABELS, t as SEO_PAGES } from "./seo.schema-D_UyVqxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-C4-huZBG.js
var import_jsx_runtime = require_jsx_runtime();
function SeoSettingsPage() {
	const queryClient = useQueryClient();
	const { data: settings } = useSuspenseQuery(trpc.seo.getAll.queryOptions());
	const save = useMutation(trpc.seo.save.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.seo.getAll.queryFilter());
			SEO_PAGES.forEach((page) => {
				queryClient.invalidateQueries(trpc.seo.getPage.queryFilter({ page }));
			});
			globalSuccessToast("SEO settings saved");
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		validators: { onSubmit: seoSettingsSchema },
		defaultValues: { pages: Object.fromEntries(SEO_PAGES.map((page) => [page, {
			title: settings.pages[page].title,
			description: settings.pages[page].description,
			ogImage: settings.pages[page].ogImage
		}])) },
		onSubmit: async ({ value }) => {
			await save.mutateAsync(value);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "SEO Metadata"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Customize the page title, description, and OG image for each public page."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			},
			className: "flex flex-1 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
					defaultValue: "home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						variant: "line",
						children: SEO_PAGES.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: page,
							children: SEO_PAGE_LABELS[page]
						}, page))
					}), SEO_PAGES.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: page,
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex max-w-xl flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: `pages.${page}.title`,
									children: (field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
											"data-invalid": isInvalid,
											className: "flex flex-col gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: `${page}-title`,
													children: "Title"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
													id: `${page}-title`,
													value: field.state.value ?? "",
													onBlur: field.handleBlur,
													onChange: (e) => field.handleChange(e.target.value || void 0),
													"aria-invalid": isInvalid,
													placeholder: `Default: page-specific title`,
													maxLength: 120
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Max 120 characters. Shown in browser tab and search results." }),
												isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
											]
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: `pages.${page}.description`,
									children: (field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
											"data-invalid": isInvalid,
											className: "flex flex-col gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: `${page}-description`,
													children: "Description"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: `${page}-description`,
													value: field.state.value ?? "",
													onBlur: field.handleBlur,
													onChange: (e) => field.handleChange(e.target.value || void 0),
													"aria-invalid": isInvalid,
													placeholder: "Brief description shown in search engine results...",
													rows: 3,
													maxLength: 320
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Max 320 characters. Shown in search engine results." }),
												isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
											]
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: `pages.${page}.ogImage`,
									children: (field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
											"data-invalid": isInvalid,
											className: "flex flex-col gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: `${page}-ogImage`,
													children: "OG Image URL"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
													id: `${page}-ogImage`,
													value: field.state.value ?? "",
													onBlur: field.handleBlur,
													onChange: (e) => field.handleChange(e.target.value || void 0),
													"aria-invalid": isInvalid,
													placeholder: "https://example.com/og-image.png",
													type: "url"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Full URL to the image shown when this page is shared on social media (1200×630 recommended)." }),
												isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
											]
										});
									}
								})
							]
						})
					}, page))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex shrink-0 items-center justify-end gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
						selector: (state) => state.isSubmitting,
						children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							type: "submit",
							disabled: isSubmitting,
							children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Save SEO Settings"]
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { SeoSettingsPage as component };
