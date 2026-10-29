import { i as __toESM } from "./_runtime.mjs";
import { _t as require_react, b as CheckboxIndicator, gt as require_jsx_runtime, x as CheckboxRoot } from "./_libs/@base-ui/react+[...].mjs";
import { g as useRouter, p as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as IconPlus, U as IconHistory, _ as IconSettings, dt as IconCheck, mt as IconBriefcase, z as IconLanguage } from "./_libs/tabler__icons-react.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, g as EXPERIENCE_STATUS_LABELS, v as EXPERIENCE_TYPES, y as EXPERIENCE_TYPE_LABELS } from "./_ssr/auth-BhV-4kEC.mjs";
import { r as cn, t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-jr2byFtO.mjs";
import { a as useQuery, i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-4wm9p9_t.mjs";
import { t as Separator$1 } from "./_ssr/separator-BjRfWQiz.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-DvsX77LV.mjs";
import { t as Input$1 } from "./_ssr/input-B-t3jVgw.mjs";
import { d as format, m as enUS, t as id } from "./_libs/date-fns.mjs";
import { t as DatePicker } from "./_ssr/date-picker-CAcjE60x.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-D7plvMrZ.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-5xIUub8b.mjs";
import { t as Textarea } from "./_ssr/textarea-Omqy-S8G.mjs";
import { n as ToggleGroupItem, t as ToggleGroup$1 } from "./_ssr/toggle-group-EtuwbSrZ.mjs";
import { t as hasTabError } from "./_ssr/has-tab-error-BdRIAUwr.mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./_ssr/select-DVlBoDLL.mjs";
import { a as updateExperienceSchema, i as experienceAchievementsSchema, t as addExperiencePositionSchema } from "./_ssr/experience.schema-CfDoQwX7.mjs";
import { n as Route, t as EDIT_TABS } from "./_experienceId.edit-DBfarjPZ.mjs";
import { n as useLocale, r as useTranslations } from "./_ssr/locale-context-DcXzRisY.mjs";
import { t as Badge } from "./_ssr/badge-CNx_OxWt.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog$1 } from "./_ssr/dialog-Djqg5NLE.mjs";
import { a as positionPayload, i as newPositionSchema, n as ExperienceGroupField, o as refreshAfterCommit, r as newPositionDefaults, t as ExperienceAchievements } from "./_ssr/experience-group-field-BG8c8bpg.mjs";
import { i as TranslationEditor } from "./_ssr/translation-editor-vdi41gN8.mjs";
import { n as Switch$1, t as InputTag } from "./_ssr/switch-D30VUD-6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_experienceId.edit-DXy8Iejv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function invalidatePositionQueries(queryClient, api, sourceId) {
	await Promise.all([
		queryClient.invalidateQueries(api.experience.getForDashboard.queryFilter()),
		queryClient.invalidateQueries(api.experience.getById.queryFilter({ id: sourceId })),
		queryClient.invalidateQueries(api.experience.getGroups.queryFilter()),
		queryClient.invalidateQueries(api.experience.getAll.queryFilter())
	]);
}
function Checkbox$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
		"data-slot": "checkbox",
		className: cn("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {})
		})
	});
}
function ExperienceCareerHistory({ entryId, source, disabled, onSaved }) {
	const { t } = useTranslations();
	const locale = useLocale() === "id" ? id : enUS;
	const m = t.experiencePosition;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const history = useQuery(trpc.experience.getForDashboard.queryOptions({}));
	const roles = (source.groupId ? history.data?.filter((role) => role.groupId === source.groupId) : void 0) ?? [source];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange: (value) => {
			if (!busy) setOpen(value);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-w-0 flex-col gap-4",
			"aria-labelledby": "career-history-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "career-history-title",
							className: "text-sm font-medium",
							children: m.history
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs wrap-anywhere",
							children: source.company
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTrigger, {
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "w-fit shrink-0",
							disabled,
							"aria-describedby": disabled ? "add-position-guidance" : void 0
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {
							"data-icon": "inline-start",
							"aria-hidden": "true"
						}), m.add]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-2",
					children: [history.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: m.historyError }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex min-w-0 flex-col gap-1",
						children: roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								from: "/dashboard/experience/$experienceId/edit",
								to: ".",
								search: (prev) => ({
									...prev,
									position: role.id === entryId ? void 0 : role.id
								}),
								activeOptions: { explicitUndefined: true },
								"aria-current": role.id === source.id ? "page" : void 0,
								className: cn("hover:bg-muted focus-visible:ring-ring flex min-w-0 flex-col gap-1 rounded-md px-3 py-2.5 wrap-anywhere focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-4", role.id === source.id && "bg-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: role.title
									}), role.id === source.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: m.editing
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground shrink-0 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: role.startDate.slice(0, 10),
											children: format(role.startDate, "dd MMM yyyy", { locale })
										}),
										" – ",
										role.currentlyWorking ? m.present : role.endDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: role.endDate.slice(0, 10),
											children: format(role.endDate, "dd MMM yyyy", { locale })
										}) : null
									]
								})]
							})
						}, role.id))
					})]
				}),
				disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "add-position-guidance",
					className: "text-muted-foreground text-xs",
					children: m.dirty
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPositionForm, {
					source,
					disabled,
					onClose: () => {
						setBusy(false);
						setOpen(false);
					},
					onBusy: setBusy,
					onSaved
				})
			]
		})
	});
}
function NewPositionForm({ source, disabled, onClose, onSaved, onBusy }) {
	const { t } = useTranslations();
	const m = t.experiencePosition;
	const queryClient = useQueryClient();
	const mutation = useMutation(trpc.experience.addPosition.mutationOptions());
	const form = useForm({
		defaultValues: newPositionDefaults(source),
		validators: { onChange: newPositionSchema },
		onSubmit: async ({ value }) => {
			if (disabled) return;
			onBusy(true);
			try {
				const result = await mutation.mutateAsync(addExperiencePositionSchema.parse(positionPayload(source.id, value)));
				try {
					onSaved(result.sourceGroupId);
					await refreshAfterCommit(() => invalidatePositionQueries(queryClient, trpc, source.id), () => globalErrorToast(m.historyError));
				} finally {
					onClose();
				}
			} finally {
				onBusy(false);
			}
		}
	});
	const textField = (key, label, pending, currentlyWorking, type = "text") => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
		name: key,
		children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			"data-invalid": !field.state.meta.isValid,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: `new-position-${key}`,
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: `new-position-${key}`,
					name: field.name,
					type,
					value: field.state.value,
					onChange: (e) => field.handleChange(e.target.value),
					onBlur: field.handleBlur,
					"aria-invalid": !field.state.meta.isValid,
					disabled: pending || key === "endDate" && currentlyWorking
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
		selector: (state) => [
			state.isSubmitting,
			state.canSubmit,
			state.values.currentlyWorking
		],
		children: ([pending, canSubmit, currentlyWorking]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90svh] overflow-y-auto sm:max-w-xl",
			showCloseButton: !pending,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: m.add }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: m.context })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: async (event) => {
					event.preventDefault();
					event.stopPropagation();
					if (form.state.isSubmitting || disabled) return;
					try {
						await form.handleSubmit();
					} catch {}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "new-position-company",
						children: m.company
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "new-position-company",
						value: source.company,
						readOnly: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "stint",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": !field.state.meta.isValid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									id: "new-position-stint",
									children: m.employment
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup$1, {
									"aria-labelledby": "new-position-stint",
									"aria-invalid": !field.state.meta.isValid,
									variant: "outline",
									value: [field.state.value],
									disabled: pending,
									onBlur: field.handleBlur,
									onValueChange: (items) => {
										const next = items.find((item) => item !== field.state.value);
										if (next === "same" || next === "new") field.handleChange(next);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
										value: "same",
										children: m.same
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
										value: "new",
										children: m.newStint
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: field.state.value === "same" ? m.sameHelp : m.newHelp }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
							]
						})
					}),
					textField("title", m.title, pending, currentlyWorking),
					textField("location", m.location, pending, currentlyWorking),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "type",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": !field.state.meta.isValid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "new-position-type",
									children: m.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
									value: field.state.value,
									disabled: pending,
									onValueChange: (value) => {
										if (EXPERIENCE_TYPES.includes(value)) field.handleChange(value);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "new-position-type",
										onBlur: field.handleBlur,
										"aria-invalid": !field.state.meta.isValid,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: EXPERIENCE_TYPE_LABELS[field.state.value] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, { children: EXPERIENCE_TYPES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value,
										children: EXPERIENCE_TYPE_LABELS[value]
									}, value)) }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
							]
						})
					}),
					textField("startDate", m.start, pending, currentlyWorking, "date"),
					textField("endDate", m.end, pending, currentlyWorking, "date"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "currentlyWorking",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": !field.state.meta.isValid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: "new-position-current",
									children: m.current
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
									id: "new-position-current",
									checked: field.state.value,
									disabled: pending,
									onCheckedChange: field.handleChange,
									onBlur: field.handleBlur,
									"aria-invalid": !field.state.meta.isValid
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
							]
						})
					}),
					[
						"description",
						"achievements",
						"skills"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: key,
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": !field.state.meta.isValid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									htmlFor: `new-position-${key}`,
									children: m[key]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: `new-position-${key}`,
									name: field.name,
									value: field.state.value,
									disabled: pending,
									"aria-invalid": !field.state.meta.isValid,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
							]
						})
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "status",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							"data-invalid": !field.state.meta.isValid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									id: "new-position-status",
									children: m.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
									"aria-labelledby": "new-position-status",
									"aria-invalid": !field.state.meta.isValid,
									variant: "outline",
									value: [field.state.value],
									disabled: pending,
									onBlur: field.handleBlur,
									onValueChange: (items) => {
										const next = items.find((item) => item !== field.state.value);
										if (next && EXPERIENCE_STATUS_TYPES.includes(next)) field.handleChange(next);
									},
									children: EXPERIENCE_STATUS_TYPES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
										value,
										children: EXPERIENCE_STATUS_LABELS[value]
									}, value))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
							]
						})
					}),
					disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: m.dirty }),
					mutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
						role: "alert",
						children: mutation.error.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						disabled: pending,
						onClick: onClose,
						children: m.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: pending || !canSubmit || disabled,
						children: pending ? m.saving : m.save
					})] })
				] })
			})]
		})
	});
}
var EXPERIENCE_TRANSLATION_FIELDS = [
	{
		name: "achievements",
		label: "Achievements (one per line; leave blank to use English)",
		type: "textarea",
		optional: true
	},
	{
		name: "title",
		label: "Role / Title",
		type: "input",
		placeholder: "Senior Engineer",
		noTranslate: true
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		placeholder: "What you did in this role"
	}
];
function ExperienceTranslationsTab({ experienceId, sourceValues }) {
	const queryClient = useQueryClient();
	const translationsQuery = useQuery(trpc.experience.getTranslations.queryOptions({ experienceId }));
	const invalidate = () => queryClient.invalidateQueries(trpc.experience.getTranslations.queryFilter({ experienceId }));
	const upsert = useMutation(trpc.experience.upsertTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation saved");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to save translation")
	}));
	const remove = useMutation(trpc.experience.deleteTranslation.mutationOptions({
		onSuccess: async () => {
			await invalidate();
			globalSuccessToast("Translation removed");
		},
		onError: (error) => globalErrorToast(error.message || "Failed to remove translation")
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationEditor, {
		fields: EXPERIENCE_TRANSLATION_FIELDS,
		translations: (translationsQuery.data ?? []).map((row) => ({
			...row,
			achievements: row.achievements?.join("\n") ?? ""
		})),
		sourceValues,
		isLoading: translationsQuery.isLoading,
		savingLocale: upsert.isPending ? upsert.variables.locale : null,
		removingLocale: remove.isPending ? remove.variables.locale : null,
		onSave: (locale, values) => upsert.mutate({
			experienceId,
			locale,
			title: values.title ?? "",
			description: values.description ?? "",
			achievements: values.achievements?.trim() ? values.achievements.split("\n").map((line) => line.trim()).filter(Boolean) : null
		}),
		onRemove: (locale) => remove.mutate({
			experienceId,
			locale
		})
	});
}
var isEditTab = (value) => EDIT_TABS.includes(value);
var TAB_TRIGGERS = [
	{
		icon: IconBriefcase,
		title: "Role Details",
		value: "role-details"
	},
	{
		icon: IconHistory,
		title: "Career history",
		value: "career-history"
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
	"role-details": [
		"title",
		"description",
		"company",
		"location",
		"type",
		"startDate",
		"endDate",
		"currentlyWorking",
		"skills",
		"achievements"
	],
	settings: ["status", "groupId"],
	"career-history": [],
	translations: []
};
function RouteComponent() {
	const { experienceId: entryId } = Route.useParams();
	const { position } = Route.useSearch();
	const experienceId = position ?? entryId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceEditor, {
		entryId,
		experienceId
	}, experienceId);
}
function ExperienceEditor({ entryId, experienceId }) {
	const { t } = useTranslations();
	const queryClient = useQueryClient();
	const router = useRouter();
	const navigate = Route.useNavigate();
	const { tab: activeTab = "role-details" } = Route.useSearch();
	const { data: experience } = useSuspenseQuery(trpc.experience.getById.queryOptions({ id: experienceId }));
	const editExperienceMutation = useMutation(trpc.experience.update.mutationOptions({
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries(trpc.experience.getForDashboard.queryFilter()),
				queryClient.invalidateQueries(trpc.experience.getById.queryFilter({ id: experienceId })),
				queryClient.invalidateQueries(trpc.experience.getAll.queryFilter())
			]);
			globalSuccessToast("Experience updated successfully!");
			router.history.back();
		},
		onError: (data) => {
			globalErrorToast(data.message);
		}
	}));
	const [initialExperience] = (0, import_react.useState)(experience);
	const form = useForm({
		validators: { onSubmit: updateExperienceSchema.extend({
			achievements: experienceAchievementsSchema,
			groupId: updateExperienceSchema.shape.groupId.nonoptional()
		}) },
		defaultValues: {
			id: initialExperience.id,
			title: initialExperience.title,
			description: initialExperience.description,
			company: initialExperience.company,
			groupId: initialExperience.groupId ?? null,
			location: initialExperience.location,
			type: initialExperience.type,
			startDate: new Date(initialExperience.startDate).toISOString(),
			endDate: initialExperience.endDate ? new Date(initialExperience.endDate).toISOString() : void 0,
			currentlyWorking: initialExperience.currentlyWorking,
			skills: initialExperience.skills,
			achievements: initialExperience.achievements,
			status: initialExperience.status,
			order: initialExperience.order
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
						value: activeTab,
						onValueChange: (value) => {
							if (!isEditTab(value)) return;
							navigate({
								search: (prev) => ({
									...prev,
									tab: value === "role-details" ? void 0 : value
								}),
								replace: true
							});
						},
						className: "min-h-0 flex-1 gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 overflow-x-auto px-4 pt-4 pb-2",
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
												tab.value === "career-history" ? t.experiencePosition.history : tab.title,
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
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
													name: "achievements",
													children: (field) => {
														const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
															"data-invalid": isInvalid,
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Achievements" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceAchievements, {
																	value: field.state.value,
																	onChange: field.handleChange,
																	onBlur: field.handleBlur,
																	invalid: isInvalid
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
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "career-history",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
											selector: (state) => ({
												company: state.values.company,
												groupId: state.values.groupId
											}),
											children: ({ company, groupId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCareerHistory, {
												entryId,
												source: experience,
												disabled: company !== experience.company || groupId !== (experience.groupId ?? null),
												onSaved: (savedGroupId) => form.setFieldValue("groupId", savedGroupId)
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "settings",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
											className: "gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
												selector: (state) => state.values.company,
												children: (company) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
													name: "groupId",
													children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceGroupField, {
														company,
														value: field.state.value ?? null,
														onChange: field.handleChange
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
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
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "translations",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceTranslationsTab, {
											experienceId,
											sourceValues: {
												title: experience.title,
												description: experience.description,
												achievements: experience.achievements.join("\n")
											}
										})
									})
								]
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
