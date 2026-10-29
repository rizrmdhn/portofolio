import { i as __toESM } from "../_runtime.mjs";
import { _t as require_react, gt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as zod_default } from "../_libs/zod.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { a as useQuery, s as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-4wm9p9_t.mjs";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, r as FieldError, t as Field } from "./spinner-DvsX77LV.mjs";
import { t as Input$1 } from "./input-B-t3jVgw.mjs";
import { t as Textarea } from "./textarea-Omqy-S8G.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { a as SelectTrigger, i as SelectItem, n as SelectContent, o as SelectValue, r as SelectGroup, t as Select$1 } from "./select-DVlBoDLL.mjs";
import { n as createExperienceGroupSchema, t as addExperiencePositionSchema } from "./experience.schema-CfDoQwX7.mjs";
import { r as useTranslations } from "./locale-context-DcXzRisY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-group-field-BG8c8bpg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lines = (text) => text.split("\n").map((line) => line.trim()).filter(Boolean);
var newPositionDefaults = (source) => ({
	stint: "same",
	title: "",
	description: "",
	location: source.location,
	type: source.type,
	startDate: "",
	endDate: "",
	currentlyWorking: false,
	skills: "",
	achievements: "",
	status: "draft"
});
function positionPayload(sourceId, { stint, ...value }) {
	return {
		sourceId,
		stint,
		position: {
			...value,
			startDate: value.startDate ? `${value.startDate}T00:00:00.000Z` : "",
			endDate: value.endDate && !value.currentlyWorking ? `${value.endDate}T00:00:00.000Z` : void 0,
			skills: lines(value.skills),
			achievements: lines(value.achievements)
		}
	};
}
var newPositionSchema = zod_default.object({
	stint: zod_default.enum(["same", "new"]),
	title: zod_default.string(),
	description: zod_default.string(),
	location: zod_default.string(),
	type: addExperiencePositionSchema.shape.position.shape.type,
	startDate: zod_default.string(),
	endDate: zod_default.string(),
	currentlyWorking: zod_default.boolean(),
	skills: zod_default.string(),
	achievements: zod_default.string(),
	status: addExperiencePositionSchema.shape.position.shape.status.removeDefault()
}).superRefine((value, ctx) => {
	const parsed = addExperiencePositionSchema.shape.position.safeParse(positionPayload("", value).position);
	if (!parsed.success) for (const issue of parsed.error.issues) {
		const key = issue.path[0];
		ctx.addIssue({
			code: "custom",
			path: [String(key)],
			message: issue.message
		});
	}
});
var newGroupSchema = (company) => zod_default.object({ label: createExperienceGroupSchema.shape.label }).superRefine((_, ctx) => {
	const result = createExperienceGroupSchema.shape.company.safeParse(company());
	if (!result.success) for (const issue of result.error.issues) ctx.addIssue({
		code: "custom",
		path: ["label"],
		message: issue.message
	});
});
async function refreshAfterCommit(refresh, onError, timeoutMs = 1e4) {
	let timer;
	try {
		await Promise.race([refresh(), new Promise((_, reject) => {
			timer = setTimeout(() => reject(/* @__PURE__ */ new Error("Refresh timed out")), timeoutMs);
		})]);
	} catch {
		onError();
	} finally {
		clearTimeout(timer);
	}
}
function ExperienceAchievements({ value, onChange, onBlur, invalid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Optional achievements, displayed in the order entered below." }),
		value.map((achievement, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			"data-invalid": invalid,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
					htmlFor: `achievement-${index}`,
					children: ["Achievement ", index + 1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `achievement-${index}`,
					value: achievement,
					maxLength: 1e3,
					"aria-invalid": invalid,
					onBlur,
					onChange: (event) => onChange(value.map((item, i) => i === index ? event.target.value : item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => onChange(value.filter((_, i) => i !== index)),
					children: ["Remove achievement ", index + 1]
				})
			]
		}, index)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			type: "button",
			variant: "outline",
			size: "sm",
			disabled: value.length >= 50,
			onClick: () => onChange([...value, ""]),
			children: "Add achievement"
		})
	] });
}
function ExperienceGroupField({ company, value, onChange }) {
	const { t } = useTranslations();
	const messages = t.experienceGroup;
	const queryClient = useQueryClient();
	const groups = useQuery(trpc.experience.getGroups.queryOptions());
	const create = useMutation(trpc.experience.createGroup.mutationOptions({ onError: (error) => globalErrorToast(error.message) }));
	const form = useForm({
		defaultValues: { label: "" },
		validators: { onChange: newGroupSchema(() => company) },
		onSubmit: async ({ value: submitted }) => {
			onChange((await create.mutateAsync(createExperienceGroupSchema.parse({
				company,
				label: submitted.label
			}))).id);
			await refreshAfterCommit(() => queryClient.invalidateQueries(trpc.experience.getGroups.queryFilter()), () => globalErrorToast(messages.loadError));
			form.reset();
		}
	});
	(0, import_react.useEffect)(() => {
		if (form.state.fieldMeta.label?.isTouched || form.state.submissionAttempts > 0) form.validate("change");
	}, [company, form]);
	const selected = groups.data?.find((group) => group.id === value);
	const mismatch = !!selected && selected.company.trim() !== company.trim();
	const options = groups.data?.filter((group) => group.company.trim() === company.trim() || group.id === value) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
		selector: (state) => [
			state.isSubmitting,
			state.canSubmit,
			state.values.label
		],
		children: ([pending, canSubmit, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
			"data-invalid": mismatch,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: "experience-group",
					children: messages.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					value: value ?? "none",
					onValueChange: (id) => onChange(id === "none" ? null : id),
					disabled: pending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "experience-group",
						"aria-invalid": mismatch,
						"aria-describedby": "experience-group-help",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: selected ? `${selected.company} - ${selected.label}` : value ? messages.label : messages.none })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "none",
						children: messages.none
					}), options.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: group.id,
						children: [
							group.company,
							" - ",
							group.label
						]
					}, group.id))] }) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					id: "experience-group-help",
					children: messages.help
				}),
				mismatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: messages.mismatch }),
				groups.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: messages.loadError }),
				groups.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					variant: "outline",
					onClick: () => void groups.refetch(),
					children: messages.retry
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "label",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				"data-invalid": !field.state.meta.isValid,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "experience-group-label",
						children: messages.newLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "experience-group-label",
						name: field.name,
						value: field.state.value,
						maxLength: 256,
						placeholder: messages.placeholder,
						onChange: (event) => field.handleChange(event.target.value),
						onBlur: field.handleBlur,
						"aria-invalid": !field.state.meta.isValid,
						disabled: pending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors }),
					create.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
						role: "alert",
						children: create.error.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						disabled: !company.trim() || company.trim().length > 256 || !label.trim() || pending || !canSubmit,
						onClick: async () => {
							if (form.state.isSubmitting) return;
							try {
								await form.handleSubmit();
							} catch {}
						},
						children: messages.create
					})
				]
			})
		})] })
	});
}
//#endregion
export { positionPayload as a, newPositionSchema as i, ExperienceGroupField as n, refreshAfterCommit as o, newPositionDefaults as r, ExperienceAchievements as t };
