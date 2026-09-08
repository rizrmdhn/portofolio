import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { B as IconItalic, Dt as IconBold, F as IconListCheck, G as IconH2, I as IconLink, It as IconArrowBackUp, K as IconH1, L as IconLineDashed, N as IconList, P as IconListNumbers, Pt as IconArrowForwardUp, S as IconQuote, T as IconPhoto, W as IconH3, at as IconClearFormatting, f as IconStrikethrough, g as IconSourceCode, h as IconSparkles, l as IconTrash, rt as IconCode } from "../_libs/tabler__icons-react.mjs";
import { r as cn, t as Button$1 } from "./button-Byofh5wQ.mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { a as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-BmBe4ExZ.mjs";
import { a as FieldLabel, n as FieldDescription, o as Spinner, t as Field } from "./spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./input-S9SQN3Mi.mjs";
import { t as Textarea } from "./textarea-Bd7wxdEL.mjs";
import { r as LOCALE_LABELS, t as LOCALES } from "./src-wHgUA5Hr.mjs";
import { t as index_default } from "../_libs/tiptap__extension-image.mjs";
import { t as index_default$1 } from "../_libs/@tiptap/extension-placeholder+[...].mjs";
import { t as index_default$2 } from "../_libs/tiptap__extension-task-item.mjs";
import { t as index_default$3 } from "../_libs/tiptap__extension-task-list.mjs";
import { t as Markdown } from "../_libs/marked+tiptap__markdown.mjs";
import { n as useEditor, r as useEditorState, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { t as index_default$4 } from "../_libs/tiptap__starter-kit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translation-editor-D6Ynl2kU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Builds a ready-to-paste prompt that translates a single piece of portfolio
* content from English into the target language, preserving formatting and
* leaving code / brand / tech names untouched. Mirrors the description prompts
* so the result can be pasted straight back into the translation field.
*/
function buildTranslationPrompt({ targetLanguage, fieldLabel, sourceText, markdown }) {
	return `Translate the following portfolio "${fieldLabel}" from English into ${targetLanguage}.

English source:
${sourceText.trim()}

Guidelines:
- Translate naturally and idiomatically — write what a native speaker would actually say, not a literal word-for-word rendering.
- For short section headings and labels (e.g. "Overview", "Key Features", "Tech Highlights", "Challenges"), use the conventional native equivalent; if there is no natural one and a literal translation would sound awkward, keep the English heading as-is.
- Preferred Indonesian (Bahasa Indonesia) terms — use these exact phrasings when the heading matches: "Tech Highlights" / "Tech Stack" / "Technologies Used" → "Teknologi Digunakan".
- Do NOT translate code, URLs, brand/product names, or technology names (e.g. React, TypeScript, Next.js) — keep them exactly as-is.
${markdown ? "- Preserve all Markdown formatting exactly (headings, **bold**, _italic_, lists, links, `inline code`). Translate only the human-readable text." : "- Return plain text only — no Markdown, headings, lists or formatting."}
- Do not add, remove or invent any information.
- Return only the translated text — no preamble, commentary, quotes or code fences.`;
}
function normalize(input) {
	return {
		title: input.title?.trim() || "(untitled project)",
		description: input.description?.trim(),
		longDescription: input.longDescription?.trim(),
		tech: (input.tech ?? []).filter(Boolean),
		links: (input.links ?? []).filter((l) => l.url?.trim())
	};
}
/**
* Builds a ready-to-paste prompt for an external assistant (e.g. claude.ai) that
* generates the project "long description". Output is constrained to the same
* markdown-safe formatting the editor and public renderer support, so the result
* can be pasted straight into the Tiptap editor.
*/
function buildLongDescriptionPrompt(input) {
	const { title, description, tech, links } = normalize(input);
	return `You are helping write the "long description" for a project on my developer portfolio.

Write a polished, engaging case-study style description in **Markdown**.

Project details:
${[
		`- Title: ${title}`,
		`- Short description: ${description || "(none provided)"}`,
		`- Tech stack: ${tech.length ? tech.join(", ") : "(none provided)"}`,
		...links.length ? [`- Links: ${links.map((l) => `${l.label} (${l.url})`).join(", ")}`] : []
	].join("\n")}

Guidelines:
- Use Markdown only: headings, **bold**, _italic_, bullet/numbered lists, links and \`inline code\`. No raw HTML, no images, no underline or coloured text.
- Suggested structure: a 1–2 sentence intro, then short sections such as Overview, Key Features, Tech Highlights and Challenges.
- Keep it concise (~150–300 words), specific and confident.
- Do not invent metrics, dates, client names or facts I haven't given you.
- Return only the Markdown description — no preamble, commentary or code fences around it.`;
}
/**
* Builds a prompt for the short "description" — the one-line tagline shown on
* project cards. Plain text only (no markdown), since that field is rendered
* verbatim.
*/
function buildShortDescriptionPrompt(input) {
	const { title, description, longDescription, tech } = normalize(input);
	return `You are helping write the short "description" (tagline) for a project on my developer portfolio. It is the one-line summary shown on project cards.

Project details:
${[
		`- Title: ${title}`,
		`- Tech stack: ${tech.length ? tech.join(", ") : "(none provided)"}`,
		...description ? [`- Current draft: ${description}`] : [],
		...longDescription ? [`- Long description to summarise from:\n${longDescription}`] : []
	].join("\n")}

Guidelines:
- Write 1–2 plain sentences. No Markdown, headings, lists or formatting of any kind.
- Keep it under ~160 characters. Make it punchy and concrete: say what the project is and what it does.
- Do not invent facts I haven't given you.
- Return only the description text — nothing else.`;
}
/**
* AI helper for content fields. For translation fields it auto-translates via
* Groq when the server has an API key configured (filling the field through
* `onResult`); otherwise — and for description prompts — it copies a ready-to-paste
* prompt to the clipboard so the author can run it in an external assistant.
*/
function CopyAiPromptButton({ context, kind = "long", translate, onResult, label = "Copy AI prompt" }) {
	const statusQuery = useQuery(trpc.ai.status.queryOptions(void 0, { enabled: Boolean(translate) }));
	const canAutoTranslate = Boolean(translate) && statusQuery.data?.groq === true;
	const translateMutation = useMutation(trpc.ai.translate.mutationOptions({
		onSuccess: ({ text }) => {
			onResult?.(text);
			globalSuccessToast("Translated — review and tweak as needed.");
		},
		onError: (error) => globalErrorToast(error.message || "Translation failed. Try again.")
	}));
	async function handleCopy() {
		const prompt = translate ? buildTranslationPrompt(translate) : kind === "short" ? buildShortDescriptionPrompt(context ?? {}) : buildLongDescriptionPrompt(context ?? {});
		try {
			await navigator.clipboard.writeText(prompt);
			globalSuccessToast("Prompt copied — paste it into your AI assistant, then paste the result back here.");
		} catch {
			globalErrorToast("Could not access the clipboard. Copy the prompt manually instead.");
		}
	}
	function handleClick() {
		if (canAutoTranslate && translate) {
			translateMutation.mutate(translate);
			return;
		}
		handleCopy();
	}
	const isTranslating = translateMutation.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		type: "button",
		variant: "outline",
		size: "sm",
		className: "h-7 gap-1.5",
		onClick: handleClick,
		disabled: isTranslating,
		children: [isTranslating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, { className: "size-3.5" }), label]
	});
}
/**
* WYSIWYG markdown editor built on Tiptap.
*
* Editing happens on Tiptap's structured document model (so lists, headings and
* toggling are correct by construction), but the stored value stays a raw
* markdown string via the official `@tiptap/markdown` extension — no schema
* change, and the public page keeps rendering with the same `<Markdown>` helper.
*
* Only markdown-representable formatting is exposed so everything round-trips
* through storage and renders identically for visitors (no underline / colour /
* alignment, which GFM cannot encode).
*/
function MarkdownEditor({ id, value, onChange, onBlur, placeholder = "Write something…", rows = 6, "aria-invalid": ariaInvalid }) {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			index_default$4.configure({
				underline: false,
				link: { openOnClick: false }
			}),
			Markdown,
			index_default$1.configure({ placeholder }),
			index_default$3,
			index_default$2.configure({ nested: true }),
			index_default
		],
		content: "",
		editorProps: { attributes: {
			...id ? { id } : {},
			class: "tiptap-content px-3 py-2 outline-none",
			"aria-label": "Long description"
		} },
		onUpdate: ({ editor }) => onChange(editor.getMarkdown()),
		onBlur: () => onBlur?.()
	});
	(0, import_react.useEffect)(() => {
		if (!editor || editor.isFocused) return;
		if (value === editor.getMarkdown()) return;
		editor.commands.setContent(value || "", {
			contentType: "markdown",
			emitUpdate: false
		});
	}, [editor, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-invalid": ariaInvalid,
		style: { ["--editor-min-h"]: `${rows * 1.6}rem` },
		className: cn("markdown-editor border-input bg-input/20 dark:bg-input/30 overflow-hidden rounded-md border transition-colors", "focus-within:border-ring focus-within:ring-ring/30 focus-within:ring-2", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, { editor }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, { editor })]
	});
}
function Toolbar({ editor }) {
	const state = useEditorState({
		editor,
		selector: ({ editor }) => {
			if (!editor) return null;
			return {
				bold: editor.isActive("bold"),
				italic: editor.isActive("italic"),
				strike: editor.isActive("strike"),
				code: editor.isActive("code"),
				h1: editor.isActive("heading", { level: 1 }),
				h2: editor.isActive("heading", { level: 2 }),
				h3: editor.isActive("heading", { level: 3 }),
				bulletList: editor.isActive("bulletList"),
				orderedList: editor.isActive("orderedList"),
				taskList: editor.isActive("taskList"),
				blockquote: editor.isActive("blockquote"),
				codeBlock: editor.isActive("codeBlock"),
				link: editor.isActive("link"),
				canUndo: editor.can().undo(),
				canRedo: editor.can().redo()
			};
		}
	});
	if (!editor || !state) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-input bg-muted/40 h-9 border-b",
		"aria-hidden": true
	});
	function toggleLink() {
		if (!editor) return;
		if (editor.isActive("link")) {
			editor.chain().focus().unsetLink().run();
			return;
		}
		const url = window.prompt("Link URL");
		if (url) editor.chain().focus().setLink({ href: url }).run();
	}
	function addImage() {
		if (!editor) return;
		const url = window.prompt("Image URL");
		if (url) editor.chain().focus().setImage({ src: url }).run();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-input bg-muted/40 flex flex-wrap items-center gap-0.5 border-b p-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconArrowBackUp,
				label: "Undo",
				disabled: !state.canUndo,
				onClick: () => editor.chain().focus().undo().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconArrowForwardUp,
				label: "Redo",
				disabled: !state.canRedo,
				onClick: () => editor.chain().focus().redo().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconH1,
				label: "Heading 1",
				active: state.h1,
				onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconH2,
				label: "Heading 2",
				active: state.h2,
				onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconH3,
				label: "Heading 3",
				active: state.h3,
				onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconBold,
				label: "Bold",
				active: state.bold,
				onClick: () => editor.chain().focus().toggleBold().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconItalic,
				label: "Italic",
				active: state.italic,
				onClick: () => editor.chain().focus().toggleItalic().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconStrikethrough,
				label: "Strikethrough",
				active: state.strike,
				onClick: () => editor.chain().focus().toggleStrike().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconCode,
				label: "Inline code",
				active: state.code,
				onClick: () => editor.chain().focus().toggleCode().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconList,
				label: "Bulleted list",
				active: state.bulletList,
				onClick: () => editor.chain().focus().toggleBulletList().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconListNumbers,
				label: "Numbered list",
				active: state.orderedList,
				onClick: () => editor.chain().focus().toggleOrderedList().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconListCheck,
				label: "Task list",
				active: state.taskList,
				onClick: () => editor.chain().focus().toggleTaskList().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconQuote,
				label: "Quote",
				active: state.blockquote,
				onClick: () => editor.chain().focus().toggleBlockquote().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconSourceCode,
				label: "Code block",
				active: state.codeBlock,
				onClick: () => editor.chain().focus().toggleCodeBlock().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconLineDashed,
				label: "Divider",
				onClick: () => editor.chain().focus().setHorizontalRule().run()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconLink,
				label: "Link",
				active: state.link,
				onClick: toggleLink
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconPhoto,
				label: "Image",
				onClick: addImage
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
				icon: IconClearFormatting,
				label: "Clear formatting",
				onClick: () => editor.chain().focus().unsetAllMarks().clearNodes().run()
			})
		]
	});
}
function ToolButton({ icon: Icon, label, active, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		title: label,
		"aria-label": label,
		"aria-pressed": active,
		"data-active": active,
		onMouseDown: (e) => e.preventDefault(),
		className: cn("text-foreground/60 hover:bg-background hover:text-foreground inline-flex size-7 items-center justify-center rounded transition-colors", "data-active:bg-background data-active:text-foreground", "disabled:pointer-events-none disabled:opacity-40"),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
	});
}
function Divider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bg-border mx-0.5 h-5 w-px",
		"aria-hidden": true
	});
}
/** Locales authored as translations — every supported locale except the default
* (which lives on the base record). */
var NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== "en");
/** Renders the right control for a translation field. Controlled by the caller. */
function FieldInput({ id, field, value, onChange }) {
	if (field.type === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		id,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder: field.placeholder,
		rows: 3
	});
	if (field.type === "markdown") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownEditor, {
		id,
		value,
		onChange,
		placeholder: field.placeholder,
		rows: 6
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		id,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder: field.placeholder,
		readOnly: field.noTranslate,
		className: field.noTranslate ? "text-muted-foreground" : void 0
	});
}
/**
* Label row with an optional "Translate with AI" button. When the server has a
* Groq key configured it auto-translates the field's English source and fills the
* field via `onTranslated`; otherwise it copies a prompt for an external
* assistant. Hidden when there is no source text to translate.
*/
function FieldLabelRow({ htmlFor, locale, field, sourceText, onTranslated }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor,
			children: field.label
		}), !field.noTranslate && sourceText?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyAiPromptButton, {
			label: "Translate with AI",
			onResult: onTranslated,
			translate: {
				targetLanguage: LOCALE_LABELS[locale],
				fieldLabel: field.label,
				sourceText,
				markdown: field.type === "markdown"
			}
		})]
	});
}
function LocaleSection({ locale, fields, initial, sourceValues, hasExisting, isSaving, isRemoving, onSave, onRemove }) {
	const [values, setValues] = (0, import_react.useState)(initial);
	const set = (name, value) => setValues((prev) => ({
		...prev,
		[name]: value
	}));
	const fieldValue = (field) => field.noTranslate ? sourceValues?.[field.name] ?? "" : values[field.name] ?? "";
	const requiredMissing = fields.some((f) => !f.optional && !fieldValue(f).trim());
	const handleSave = () => {
		const payload = { ...values };
		for (const f of fields) if (f.noTranslate) payload[f.name] = sourceValues?.[f.name] ?? "";
		onSave(payload);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-border flex flex-col gap-4 rounded-lg border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-foreground text-sm font-semibold",
					children: LOCALE_LABELS[locale]
				}), hasExisting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					variant: "ghost",
					size: "sm",
					className: "text-destructive",
					onClick: onRemove,
					disabled: isRemoving,
					children: [isRemoving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, { className: "size-4" }), "Remove"]
				})]
			}),
			fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelRow, {
					htmlFor: `${locale}-${field.name}`,
					locale,
					field,
					sourceText: sourceValues?.[field.name],
					onTranslated: (text) => set(field.name, text)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					id: `${locale}-${field.name}`,
					field,
					value: fieldValue(field),
					onChange: (value) => set(field.name, value)
				})]
			}, field.name)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					onClick: handleSave,
					disabled: isSaving || requiredMissing,
					children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, hasExisting ? "Update translation" : "Save translation"]
				})
			})
		]
	});
}
/**
* Renders one editable section per non-default locale for a content entity. The
* base (English) copy is edited on the entity's main form; this only authors the
* translated overlays. Presentational — the parent owns the tRPC query/mutations.
*/
function TranslationEditor({ fields, translations, sourceValues, isLoading, savingLocale, removingLocale, onSave, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Provide translations for the fields below. Anything left empty falls back to the default (English) content on the public site." }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-muted-foreground flex items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Loading translations…"]
		}) : NON_DEFAULT_LOCALES.map((locale) => {
			const existing = translations.find((t) => t.locale === locale);
			const initial = {};
			for (const field of fields) {
				if (field.noTranslate) continue;
				const raw = existing?.[field.name];
				initial[field.name] = typeof raw === "string" ? raw : "";
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSection, {
				locale,
				fields,
				initial,
				sourceValues,
				hasExisting: Boolean(existing),
				isSaving: savingLocale === locale,
				isRemoving: removingLocale === locale,
				onSave: (values) => onSave(locale, values),
				onRemove: () => onRemove(locale)
			}, `${locale}:${JSON.stringify(initial)}`);
		})]
	});
}
/**
* Controlled, button-less variant for **create** forms: the new entity has no id
* yet, so translations can't be saved individually. The parent holds the draft
* and persists each complete locale right after the base record is created.
*/
function TranslationDraftEditor({ fields, value, sourceValues, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: "Optionally translate the fields below. A language is saved only when all its required fields are filled; anything left blank falls back to the default (English) content." }), NON_DEFAULT_LOCALES.map((locale) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-border flex flex-col gap-4 rounded-lg border p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-foreground text-sm font-semibold",
				children: LOCALE_LABELS[locale]
			}), fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelRow, {
					htmlFor: `draft-${locale}-${field.name}`,
					locale,
					field,
					sourceText: sourceValues?.[field.name],
					onTranslated: (text) => onChange(locale, field.name, text)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					id: `draft-${locale}-${field.name}`,
					field,
					value: value[locale]?.[field.name] ?? (field.noTranslate ? sourceValues?.[field.name] ?? "" : ""),
					onChange: (fieldValue) => onChange(locale, field.name, fieldValue)
				})]
			}, field.name))]
		}, locale))]
	});
}
/**
* Effective values to persist for one draft locale: the user's typed values,
* with `noTranslate` fields (e.g. the title) defaulted to the base source so they
* stay identical across locales without manual entry.
*/
function resolveDraftLocale(draft, locale, fields, sourceValues) {
	const typed = draft[locale] ?? {};
	const out = {};
	for (const field of fields) {
		const value = typed[field.name];
		out[field.name] = value?.trim() || (field.noTranslate ? sourceValues?.[field.name] ?? "" : value ?? "");
	}
	return out;
}
/**
* Helper for create forms: returns the locales the author actually started
* translating (at least one translatable field filled) whose required fields all
* resolve to a value, ready to upsert after the entity is created.
*/
function completeDraftLocales(draft, fields, sourceValues) {
	return NON_DEFAULT_LOCALES.filter((locale) => {
		const typed = draft[locale];
		if (!fields.some((f) => !f.noTranslate && typed?.[f.name]?.trim())) return false;
		const values = resolveDraftLocale(draft, locale, fields, sourceValues);
		return fields.every((f) => f.optional || Boolean(values[f.name]?.trim()));
	});
}
//#endregion
export { completeDraftLocales as a, TranslationEditor as i, MarkdownEditor as n, resolveDraftLocale as o, TranslationDraftEditor as r, CopyAiPromptButton as t };
