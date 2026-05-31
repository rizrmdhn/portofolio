import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Markdown } from '@tiptap/markdown'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconLineDashed,
  IconLink,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconPhoto,
  IconQuote,
  IconSourceCode,
  IconStrikethrough,
} from '@tabler/icons-react'
import type { TablerIcon } from '@tabler/icons-react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'

type MarkdownEditorProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  /** Approximate minimum visible height, expressed in textarea-like rows. */
  rows?: number
  'aria-invalid'?: boolean
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
function MarkdownEditor({
  id,
  value,
  onChange,
  onBlur,
  placeholder = 'Write something…',
  rows = 6,
  'aria-invalid': ariaInvalid,
}: MarkdownEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // TanStack Start SSR: mount on the client to avoid hydration mismatch
    extensions: [
      StarterKit.configure({
        underline: false, // not encodable in markdown
        link: { openOnClick: false },
      }),
      Markdown,
      Placeholder.configure({ placeholder }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
    ],
    content: '',
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        class: 'tiptap-content px-3 py-2 outline-none',
        'aria-label': 'Long description',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getMarkdown()),
    onBlur: () => onBlur?.(),
  })

  // Sync external value into the editor (initial load + form resets). Skipped
  // while focused so our own edits never clobber the caret.
  useEffect(() => {
    if (!editor || editor.isFocused) return
    if (value === editor.getMarkdown()) return
    editor.commands.setContent(value || '', { contentType: 'markdown', emitUpdate: false })
  }, [editor, value])

  return (
    <div
      aria-invalid={ariaInvalid}
      style={{ ['--editor-min-h' as string]: `${rows * 1.6}rem` }}
      className={cn(
        'markdown-editor border-input bg-input/20 dark:bg-input/30 overflow-hidden rounded-md border transition-colors',
        'focus-within:border-ring focus-within:ring-ring/30 focus-within:ring-2',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-2',
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

function Toolbar({ editor }: { editor: Editor | null }) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      return {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        strike: editor.isActive('strike'),
        code: editor.isActive('code'),
        h1: editor.isActive('heading', { level: 1 }),
        h2: editor.isActive('heading', { level: 2 }),
        h3: editor.isActive('heading', { level: 3 }),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        taskList: editor.isActive('taskList'),
        blockquote: editor.isActive('blockquote'),
        codeBlock: editor.isActive('codeBlock'),
        link: editor.isActive('link'),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      }
    },
  })

  if (!editor || !state) {
    return <div className="border-input bg-muted/40 h-9 border-b" aria-hidden />
  }

  function toggleLink() {
    if (!editor) return
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt('Link URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  function addImage() {
    if (!editor) return
    const url = window.prompt('Image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="border-input bg-muted/40 flex flex-wrap items-center gap-0.5 border-b p-1">
      <ToolButton
        icon={IconArrowBackUp}
        label="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolButton
        icon={IconArrowForwardUp}
        label="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      />
      <Divider />
      <ToolButton
        icon={IconH1}
        label="Heading 1"
        active={state.h1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <ToolButton
        icon={IconH2}
        label="Heading 2"
        active={state.h2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolButton
        icon={IconH3}
        label="Heading 3"
        active={state.h3}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <Divider />
      <ToolButton
        icon={IconBold}
        label="Bold"
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolButton
        icon={IconItalic}
        label="Italic"
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolButton
        icon={IconStrikethrough}
        label="Strikethrough"
        active={state.strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <ToolButton
        icon={IconCode}
        label="Inline code"
        active={state.code}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <Divider />
      <ToolButton
        icon={IconList}
        label="Bulleted list"
        active={state.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolButton
        icon={IconListNumbers}
        label="Numbered list"
        active={state.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolButton
        icon={IconListCheck}
        label="Task list"
        active={state.taskList}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      />
      <Divider />
      <ToolButton
        icon={IconQuote}
        label="Quote"
        active={state.blockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolButton
        icon={IconSourceCode}
        label="Code block"
        active={state.codeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <ToolButton
        icon={IconLineDashed}
        label="Divider"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      <Divider />
      <ToolButton icon={IconLink} label="Link" active={state.link} onClick={toggleLink} />
      <ToolButton icon={IconPhoto} label="Image" onClick={addImage} />
      <ToolButton
        icon={IconClearFormatting}
        label="Clear formatting"
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
      />
    </div>
  )
}

function ToolButton({
  icon: Icon,
  label,
  active,
  ...props
}: React.ComponentProps<'button'> & { icon: TablerIcon; label: string; active?: boolean }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      data-active={active}
      // Keep the editor selection: prevent the button from stealing focus.
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        'text-foreground/60 hover:bg-background hover:text-foreground inline-flex size-7 items-center justify-center rounded transition-colors',
        'data-active:bg-background data-active:text-foreground',
        'disabled:pointer-events-none disabled:opacity-40',
      )}
      {...props}
    >
      <Icon className="size-4" />
    </button>
  )
}

function Divider() {
  return <span className="bg-border mx-0.5 h-5 w-px" aria-hidden />
}

export { MarkdownEditor }
