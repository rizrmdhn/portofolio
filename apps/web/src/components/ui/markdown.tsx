import type { ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

type MarkdownProps = {
  children: string
  className?: string
}

/**
 * Renders user-authored markdown safely.
 *
 * `rehype-sanitize` strips any raw HTML / dangerous attributes, so this is safe
 * to render on public pages. `remark-gfm` adds tables, task lists, strikethrough
 * and autolinks. Element styling is matched to the muted prose used across the
 * project pages rather than pulling in the typography plugin.
 */
function Markdown({ children, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        'text-muted-foreground text-[15px] leading-[1.8] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ className, ...props }) => (
            <h1
              className={cn(
                'text-foreground mt-8 mb-3 text-xl font-semibold tracking-tight',
                className,
              )}
              {...props}
            />
          ),
          h2: ({ className, ...props }) => (
            <h2
              className={cn(
                'text-foreground mt-7 mb-3 text-lg font-semibold tracking-tight',
                className,
              )}
              {...props}
            />
          ),
          h3: ({ className, ...props }) => (
            <h3
              className={cn('text-foreground mt-6 mb-2 text-base font-semibold', className)}
              {...props}
            />
          ),
          p: ({ className, ...props }) => (
            <p className={cn('mb-4', className)} {...props} />
          ),
          a: ({ className, ...props }) => (
            <a
              className={cn('text-foreground font-medium underline underline-offset-4', className)}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ className, ...props }) => {
            const isTaskList = className?.includes('contains-task-list')
            return (
              <ul
                className={cn(
                  'mb-4 space-y-1.5',
                  isTaskList ? 'ml-0 list-none' : 'ml-5 list-disc',
                  className,
                )}
                {...props}
              />
            )
          },
          ol: ({ className, ...props }) => (
            <ol className={cn('mb-4 ml-5 list-decimal space-y-1.5', className)} {...props} />
          ),
          li: ({ className, ...props }) => {
            const isTaskItem = className?.includes('task-list-item')
            return (
              <li
                className={cn(isTaskItem ? 'flex items-start gap-2' : 'pl-1', className)}
                {...props}
              />
            )
          },
          input: ({ className, ...props }) => (
            // Task-list checkboxes — kept read-only on the public page.
            <input
              className={cn('border-border mt-1.5 size-3.5 shrink-0 rounded', className)}
              {...props}
              disabled
            />
          ),
          img: ({ className, ...props }) => (
            <img
              loading="lazy"
              className={cn('border-border my-4 max-w-full rounded-lg border', className)}
              {...props}
            />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              className={cn('border-border my-4 border-l-2 pl-4 italic', className)}
              {...props}
            />
          ),
          code: ({ className, ...props }) => (
            <code
              className={cn(
                'bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]',
                className,
              )}
              {...props}
            />
          ),
          pre: ({ className, ...props }) => (
            <pre
              className={cn(
                'bg-muted my-4 overflow-x-auto rounded-lg p-4 font-mono text-[13px] [&>code]:bg-transparent [&>code]:p-0',
                className,
              )}
              {...props}
            />
          ),
          hr: ({ className, ...props }) => (
            <hr className={cn('border-border my-6', className)} {...props} />
          ),
          strong: ({ className, ...props }) => (
            <strong className={cn('text-foreground font-semibold', className)} {...props} />
          ),
          table: ({ className, ...props }: ComponentProps<'table'>) => (
            <div className="my-4 overflow-x-auto">
              <table className={cn('w-full text-sm', className)} {...props} />
            </div>
          ),
          th: ({ className, ...props }) => (
            <th
              className={cn('border-border border px-3 py-1.5 text-left font-semibold', className)}
              {...props}
            />
          ),
          td: ({ className, ...props }) => (
            <td className={cn('border-border border px-3 py-1.5', className)} {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export { Markdown }
