import { A as markPasteRule, i as Mark, j as mergeAttributes, k as markInputRule, t as h } from "./@tiptap/core+[...].mjs";
//#region ../../node_modules/.pnpm/@tiptap+extension-bold@3.24.0_@tiptap+core@3.24.0_@tiptap+pm@3.24.0_/node_modules/@tiptap/extension-bold/dist/index.js
var starInputRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
var starPasteRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
var underscoreInputRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
var underscorePasteRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;
var Bold = Mark.create({
	name: "bold",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (node) => node.style.fontWeight !== "normal" && null
			},
			{
				style: "font-weight=400",
				clearMark: (mark) => mark.type.name === this.name
			},
			{
				style: "font-weight",
				getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
			}
		];
	},
	renderHTML({ HTMLAttributes }) {
		return /* @__PURE__ */ h("strong", {
			...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			children: /* @__PURE__ */ h("slot", {})
		});
	},
	markdownTokenName: "strong",
	parseMarkdown: (token, helpers) => {
		return helpers.applyMark("bold", helpers.parseInline(token.tokens || []));
	},
	markdownOptions: { htmlReopen: {
		open: "<strong>",
		close: "</strong>"
	} },
	renderMarkdown: (node, h) => {
		return `**${h.renderChildren(node)}**`;
	},
	addCommands() {
		return {
			setBold: () => ({ commands }) => {
				return commands.setMark(this.name);
			},
			toggleBold: () => ({ commands }) => {
				return commands.toggleMark(this.name);
			},
			unsetBold: () => ({ commands }) => {
				return commands.unsetMark(this.name);
			}
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-b": () => this.editor.commands.toggleBold(),
			"Mod-B": () => this.editor.commands.toggleBold()
		};
	},
	addInputRules() {
		return [markInputRule({
			find: starInputRegex,
			type: this.type
		}), markInputRule({
			find: underscoreInputRegex,
			type: this.type
		})];
	},
	addPasteRules() {
		return [markPasteRule({
			find: starPasteRegex,
			type: this.type
		}), markPasteRule({
			find: underscorePasteRegex,
			type: this.type
		})];
	}
});
//#endregion
export { Bold as t };
