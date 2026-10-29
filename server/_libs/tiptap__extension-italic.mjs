import { A as markPasteRule, i as Mark, j as mergeAttributes, k as markInputRule } from "./@tiptap/core+[...].mjs";
//#region ../../node_modules/.pnpm/@tiptap+extension-italic@3.24.0_@tiptap+core@3.24.0_@tiptap+pm@3.24.0_/node_modules/@tiptap/extension-italic/dist/index.js
var starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
var starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
var underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
var underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;
var Italic = Mark.create({
	name: "italic",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "em" },
			{
				tag: "i",
				getAttrs: (node) => node.style.fontStyle !== "normal" && null
			},
			{
				style: "font-style=normal",
				clearMark: (mark) => mark.type.name === this.name
			},
			{ style: "font-style=italic" }
		];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"em",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	addCommands() {
		return {
			setItalic: () => ({ commands }) => {
				return commands.setMark(this.name);
			},
			toggleItalic: () => ({ commands }) => {
				return commands.toggleMark(this.name);
			},
			unsetItalic: () => ({ commands }) => {
				return commands.unsetMark(this.name);
			}
		};
	},
	markdownTokenName: "em",
	parseMarkdown: (token, helpers) => {
		return helpers.applyMark("italic", helpers.parseInline(token.tokens || []));
	},
	markdownOptions: { htmlReopen: {
		open: "<em>",
		close: "</em>"
	} },
	renderMarkdown: (node, h) => {
		return `*${h.renderChildren(node)}*`;
	},
	addKeyboardShortcuts() {
		return {
			"Mod-i": () => this.editor.commands.toggleItalic(),
			"Mod-I": () => this.editor.commands.toggleItalic()
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
export { Italic as t };
