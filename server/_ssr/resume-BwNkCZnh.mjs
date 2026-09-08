import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Y as IconFileText, Z as IconEye, x as IconRefresh } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { a as FieldLabel, o as Spinner, r as FieldError, t as Field } from "./spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./input-S9SQN3Mi.mjs";
import { t as Textarea } from "./textarea-Bd7wxdEL.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./select-DywxwuYX.mjs";
import { t as useOptimisticMutation } from "./optimistic-update-BoGazu9o.mjs";
import { i as resumeSettingsSchema, n as RESUME_FONT_LABELS, r as RESUME_TEMPLATES, t as RESUME_FONTS } from "./resume.schema-CP_JsKO1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-BwNkCZnh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TEMPLATE_LABELS = {
	ats: "ATS (Plain, Single Column)",
	creative: "Creative (Two Column)"
};
function ResumeSettingsPage() {
	const queryClient = useQueryClient();
	const [previewDataUrl, setPreviewDataUrl] = (0, import_react.useState)(null);
	const { data: settings } = useSuspenseQuery(trpc.resume.getSettings.queryOptions());
	const { data: cv } = useSuspenseQuery(trpc.resume.get.queryOptions());
	const { data: stats } = useSuspenseQuery(trpc.resume.getStats.queryOptions());
	const { data: allProjects } = useSuspenseQuery(trpc.project.getAll.queryOptions());
	const { data: allCertifications } = useSuspenseQuery(trpc.certification.getAll.queryOptions());
	const saveSettings = useMutation(trpc.resume.saveSettings.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.resume.getSettings.queryOptions());
			globalSuccessToast("Settings saved");
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const generate = useMutation(trpc.resume.generate.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.resume.get.queryOptions());
			globalSuccessToast("Resume generated and uploaded successfully!");
		},
		onError: (err) => globalErrorToast(`Generation failed: ${err.message}`)
	}));
	const toggleFeatured = useOptimisticMutation(trpc.resume.toggleProjectFeatured.mutationOptions(), {
		queryOptions: trpc.project.getAll.queryOptions(),
		operation: {
			type: "update",
			getId: (input) => input.id,
			getUpdatedFields: (input) => ({ featuredAtResume: input.value })
		},
		onError: (err) => {
			globalErrorToast(err.message);
		}
	});
	const toggleCertFeatured = useOptimisticMutation(trpc.resume.toggleCertificationFeatured.mutationOptions(), {
		queryOptions: trpc.certification.getAll.queryOptions(),
		operation: {
			type: "update",
			getId: (input) => input.id,
			getUpdatedFields: (input) => ({ featuredAtResume: input.value })
		},
		onError: (err) => {
			globalErrorToast(err.message);
		}
	});
	const preview = useMutation(trpc.resume.preview.mutationOptions({
		onSuccess: (data) => {
			setPreviewDataUrl(`data:application/pdf;base64,${data.base64}`);
		},
		onError: (err) => globalErrorToast(`Preview failed: ${err.message}`)
	}));
	const form = useForm({
		validators: { onSubmit: resumeSettingsSchema },
		defaultValues: {
			template: settings.template,
			accentColor: settings.accentColor,
			font: settings.font,
			summary: settings.summary
		},
		onSubmit: async ({ value }) => {
			await saveSettings.mutateAsync(value);
		}
	});
	const publishedProjects = allProjects.filter((p) => p.status === "published" && p.isVisible);
	const publishedCertifications = allCertifications.filter((c) => c.status === "published");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-3xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-foreground text-base font-bold",
					children: "Resume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "Configure and generate your PDF resume."
				})] }), cv?.data.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/$locale/resume",
						params: { locale: "en" },
						target: "_blank",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "outline",
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFileText, { className: "size-4" }), "View Public Page"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: cv.data.url,
						target: "_blank",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "outline",
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFileText, { className: "size-4" }), "Download PDF"]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border rounded-lg border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-[10px] font-medium tracking-widest uppercase",
						children: "Total Downloads"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground mt-1 text-3xl font-bold",
						children: stats.downloadCount
					}),
					cv?.data.uploadedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground mt-1 text-xs",
						children: [
							"Last generated:",
							" ",
							new Date(cv.data.uploadedAt).toLocaleString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					form.handleSubmit();
				},
				className: "border-border flex flex-col gap-4 rounded-lg border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Appearance Settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "template",
						children: (field) => {
							const isInvalid = field.state.meta.errors.length > 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								className: "flex flex-col gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "template",
										children: "Template"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
										value: field.state.value,
										onValueChange: (v) => field.handleChange(v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "template",
											"aria-invalid": isInvalid,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												placeholder: "Select template",
												children: TEMPLATE_LABELS[field.state.value]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RESUME_TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: t,
											children: TEMPLATE_LABELS[t]
										}, t)) })]
									}),
									isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
								]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "font",
						children: (field) => {
							const isInvalid = field.state.meta.errors.length > 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								className: "flex flex-col gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "font",
										children: "Font"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
										value: field.state.value,
										onValueChange: (v) => field.handleChange(v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "font",
											"aria-invalid": isInvalid,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												placeholder: "Select font",
												children: RESUME_FONT_LABELS[field.state.value]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RESUME_FONTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: f,
											children: RESUME_FONT_LABELS[f]
										}, f)) })]
									}),
									isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
								]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "accentColor",
						children: (field) => {
							const isInvalid = field.state.meta.errors.length > 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								className: "flex flex-col gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "accentColor",
										children: "Accent Color"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "color",
											value: field.state.value,
											onChange: (e) => field.handleChange(e.target.value),
											className: "border-border h-9 w-12 cursor-pointer rounded border bg-transparent p-0.5"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "accentColor",
											value: field.state.value,
											onChange: (e) => field.handleChange(e.target.value),
											placeholder: "#3b82f6",
											className: "w-32 font-mono text-sm",
											"aria-invalid": isInvalid
										})]
									}),
									isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
								]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "summary",
						children: (field) => {
							const isInvalid = field.state.meta.errors.length > 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								className: "flex flex-col gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "summary",
										children: "Resume Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "summary",
										value: field.state.value ?? "",
										onChange: (e) => field.handleChange(e.target.value || void 0),
										placeholder: "A professional summary shown in the resume PDF. Falls back to your profile bio if left empty.",
										className: "min-h-24",
										"aria-invalid": isInvalid
									}),
									isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
								]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
							selector: (s) => s.isSubmitting,
							children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								type: "submit",
								disabled: isSubmitting,
								variant: "outline",
								children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }), "Save Settings"]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border flex flex-col gap-3 rounded-lg border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Projects on Resume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-0.5 text-xs",
					children: "Select which published projects to include in the generated PDF."
				})] }), publishedProjects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: publishedProjects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-3 py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: project.featuredAtResume,
								onChange: (e) => toggleFeatured.mutate({
									id: project.id,
									value: e.target.checked
								}),
								className: "size-4 rounded accent-current"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-sm",
								children: project.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: project.tech.slice(0, 3).join(", ")
							})
						]
					}, project.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "No published visible projects found."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border flex flex-col gap-3 rounded-lg border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Certifications on Resume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-0.5 text-xs",
					children: "Select which published certifications to include in the generated PDF."
				})] }), publishedCertifications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: publishedCertifications.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-3 py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: cert.featuredAtResume,
								onChange: (e) => toggleCertFeatured.mutate({
									id: cert.id,
									value: e.target.checked
								}),
								className: "size-4 rounded accent-current"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-sm",
								children: cert.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: cert.issuer
							})
						]
					}, cert.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-xs",
					children: "No published certifications found."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border flex flex-col gap-3 rounded-lg border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-0.5 text-xs",
						children: "Render a preview using your current settings without uploading."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
						selector: (s) => ({
							template: s.values.template,
							accentColor: s.values.accentColor,
							font: s.values.font,
							summary: s.values.summary
						}),
						children: ({ template, accentColor, font, summary }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: preview.isPending,
							onClick: () => preview.mutate({
								template,
								accentColor,
								font,
								summary
							}),
							children: [preview.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, { className: "size-4" }), previewDataUrl ? "Refresh Preview" : "Load Preview"]
						})
					})]
				}), previewDataUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: previewDataUrl,
					className: "border-border w-full rounded border",
					style: { height: "70vh" },
					title: "Resume Preview"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				size: "lg",
				onClick: () => generate.mutate(),
				disabled: generate.isPending,
				className: "w-fit",
				children: [generate.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRefresh, { className: "size-4" }), "Generate & Upload Resume"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-2 text-xs",
				children: "Renders the PDF with your current settings and uploads it to storage. The public resume page will update immediately."
			})] })
		]
	});
}
//#endregion
export { ResumeSettingsPage as component };
