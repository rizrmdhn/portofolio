import { IconSparkles } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { buildLongDescriptionPrompt, buildShortDescriptionPrompt } from '@/lib/ai-prompt'
import type { ProjectPromptInput } from '@/lib/ai-prompt'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'

type CopyAiPromptButtonProps = {
  context: ProjectPromptInput
  /** Which field's prompt to generate. Defaults to the long description. */
  kind?: 'short' | 'long'
}

/**
 * Copies a generated prompt (built from the current project fields) to the
 * clipboard so the author can paste it into an external assistant such as
 * claude.ai — no API key or integration required.
 */
function CopyAiPromptButton({ context, kind = 'long' }: CopyAiPromptButtonProps) {
  async function handleCopy() {
    const prompt =
      kind === 'short' ? buildShortDescriptionPrompt(context) : buildLongDescriptionPrompt(context)
    try {
      await navigator.clipboard.writeText(prompt)
      globalSuccessToast('Prompt copied — paste it into your AI assistant, then paste the result back here.')
    } catch {
      globalErrorToast('Could not access the clipboard. Copy the prompt manually instead.')
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" className="h-7 gap-1.5" onClick={handleCopy}>
      <IconSparkles className="size-3.5" />
      Copy AI prompt
    </Button>
  )
}

export { CopyAiPromptButton }
