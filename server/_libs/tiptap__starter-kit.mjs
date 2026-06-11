import { r as Extension } from "./@tiptap/core+[...].mjs";
import { a as UndoRedo, i as TrailingNode, n as Dropcursor, r as Gapcursor } from "./@tiptap/extension-placeholder+[...].mjs";
import { i as OrderedList, n as ListItem, r as ListKeymap, t as BulletList } from "./tiptap__extension-list.mjs";
import { t as Blockquote } from "./tiptap__extension-blockquote.mjs";
import { t as Bold } from "./tiptap__extension-bold.mjs";
import { t as Code } from "./tiptap__extension-code.mjs";
import { t as CodeBlock } from "./tiptap__extension-code-block.mjs";
import { t as Document } from "./tiptap__extension-document.mjs";
import { t as HardBreak } from "./tiptap__extension-hard-break.mjs";
import { t as Heading } from "./tiptap__extension-heading.mjs";
import { t as HorizontalRule } from "./@tiptap/extension-horizontal-rule+[...].mjs";
import { t as Italic } from "./tiptap__extension-italic.mjs";
import { t as Link } from "./@tiptap/extension-link+[...].mjs";
import { t as Paragraph } from "./tiptap__extension-paragraph.mjs";
import { t as Strike } from "./tiptap__extension-strike.mjs";
import { t as Text } from "./tiptap__extension-text.mjs";
import { t as Underline } from "./tiptap__extension-underline.mjs";
var index_default = Extension.create({
	name: "starterKit",
	addExtensions() {
		var _a, _b, _c, _d;
		const extensions = [];
		if (this.options.bold !== false) extensions.push(Bold.configure(this.options.bold));
		if (this.options.blockquote !== false) extensions.push(Blockquote.configure(this.options.blockquote));
		if (this.options.bulletList !== false) extensions.push(BulletList.configure(this.options.bulletList));
		if (this.options.code !== false) extensions.push(Code.configure(this.options.code));
		if (this.options.codeBlock !== false) extensions.push(CodeBlock.configure(this.options.codeBlock));
		if (this.options.document !== false) extensions.push(Document.configure(this.options.document));
		if (this.options.dropcursor !== false) extensions.push(Dropcursor.configure(this.options.dropcursor));
		if (this.options.gapcursor !== false) extensions.push(Gapcursor.configure(this.options.gapcursor));
		if (this.options.hardBreak !== false) extensions.push(HardBreak.configure(this.options.hardBreak));
		if (this.options.heading !== false) extensions.push(Heading.configure(this.options.heading));
		if (this.options.undoRedo !== false) extensions.push(UndoRedo.configure(this.options.undoRedo));
		if (this.options.horizontalRule !== false) extensions.push(HorizontalRule.configure(this.options.horizontalRule));
		if (this.options.italic !== false) extensions.push(Italic.configure(this.options.italic));
		if (this.options.listItem !== false) extensions.push(ListItem.configure(this.options.listItem));
		if (this.options.listKeymap !== false) extensions.push(ListKeymap.configure((_a = this.options) == null ? void 0 : _a.listKeymap));
		if (this.options.link !== false) extensions.push(Link.configure((_b = this.options) == null ? void 0 : _b.link));
		if (this.options.orderedList !== false) extensions.push(OrderedList.configure(this.options.orderedList));
		if (this.options.paragraph !== false) extensions.push(Paragraph.configure(this.options.paragraph));
		if (this.options.strike !== false) extensions.push(Strike.configure(this.options.strike));
		if (this.options.text !== false) extensions.push(Text.configure(this.options.text));
		if (this.options.underline !== false) extensions.push(Underline.configure((_c = this.options) == null ? void 0 : _c.underline));
		if (this.options.trailingNode !== false) extensions.push(TrailingNode.configure((_d = this.options) == null ? void 0 : _d.trailingNode));
		return extensions;
	}
});
//#endregion
export { index_default as t };
