import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Et as IconBold, F as IconListCheck, Ft as IconArrowBackUp, G as IconH1, I as IconLink, L as IconLineDashed, N as IconList, Nt as IconArrowForwardUp, P as IconListNumbers, S as IconQuote, T as IconPhoto, U as IconH3, W as IconH2, f as IconStrikethrough, g as IconSourceCode, h as IconSparkles, it as IconClearFormatting, nt as IconCode, z as IconItalic } from "../_libs/tabler__icons-react.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { t as index_default } from "../_libs/tiptap__extension-image.mjs";
import { t as index_default$1 } from "../_libs/@tiptap/extension-placeholder+[...].mjs";
import { t as index_default$2 } from "../_libs/tiptap__extension-task-item.mjs";
import { t as index_default$3 } from "../_libs/tiptap__extension-task-list.mjs";
import { t as Markdown } from "../_libs/marked+tiptap__markdown.mjs";
import { n as useEditor, r as useEditorState, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { t as index_default$4 } from "../_libs/tiptap__starter-kit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-data-mapper-Ct1Rs6L5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
* Copies a generated prompt (built from the current project fields) to the
* clipboard so the author can paste it into an external assistant such as
* claude.ai — no API key or integration required.
*/
function CopyAiPromptButton({ context, kind = "long" }) {
	async function handleCopy() {
		const prompt = kind === "short" ? buildShortDescriptionPrompt(context) : buildLongDescriptionPrompt(context);
		try {
			await navigator.clipboard.writeText(prompt);
			globalSuccessToast("Prompt copied — paste it into your AI assistant, then paste the result back here.");
		} catch {
			globalErrorToast("Could not access the clipboard. Copy the prompt manually instead.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		type: "button",
		variant: "outline",
		size: "sm",
		className: "h-7 gap-1.5",
		onClick: handleCopy,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, { className: "size-3.5" }), "Copy AI prompt"]
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
/**
* Converts a plain object to FormData
* Handles files, nested objects, arrays, and primitive types
*
* @param data - The object to convert to FormData
* @param options - Configuration options
* @param formData - Optional existing FormData instance to append to (internal use)
* @param parentKey - Used internally for nested objects
* @returns FormData instance
*/
function toFormData(data, options = {}, formData = new FormData(), parentKey) {
	const { preserveNumericStrings = true } = options;
	for (const key in data) {
		if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
		const value = data[key];
		const formKey = parentKey ? `${parentKey}.${key}` : key;
		if (value === void 0 || value === null) continue;
		if (value instanceof File || value instanceof Blob) {
			formData.append(formKey, value);
			continue;
		}
		if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (item instanceof File || item instanceof Blob) formData.append(`${formKey}[]`, item);
				else if (typeof item === "object" && item !== null) toFormData(item, options, formData, `${formKey}[${index}]`);
				else {
					const itemStr = String(item);
					if (preserveNumericStrings && typeof item === "string" && /^-?\d+(\.\d+)?$/.test(item)) formData.append(`${formKey}[]`, `__str__${itemStr}`);
					else formData.append(`${formKey}[]`, itemStr);
				}
			});
			continue;
		}
		if (value instanceof Date) {
			formData.append(formKey, value.toISOString());
			continue;
		}
		if (typeof value === "object") {
			toFormData(value, options, formData, formKey);
			continue;
		}
		const strValue = String(value);
		if (preserveNumericStrings && typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) formData.append(formKey, `__str__${strValue}`);
		else formData.append(formKey, strValue);
	}
	return formData;
}
//#endregion
export { MarkdownEditor as n, toFormData as r, CopyAiPromptButton as t };
