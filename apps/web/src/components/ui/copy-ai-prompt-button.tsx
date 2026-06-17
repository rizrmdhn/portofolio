import { IconSparkles } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  buildLongDescriptionPrompt,
  buildShortDescriptionPrompt,
  buildTranslationPrompt,
} from '@/lib/ai-prompt'
import type { ProjectPromptInput, TranslationPromptInput } from '@/lib/ai-prompt'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'

type CopyAiPromptButtonProps = {
  /** Project-description prompt source (used unless `translate` is provided). */
  context?: ProjectPromptInput
  /** Which description prompt to generate. Defaults to the long description. */
  kind?: 'short' | 'long'
  /** When provided, generates a translation prompt instead of a description one. */
  translate?: TranslationPromptInput
  /** Button label. Defaults to "Copy AI prompt". */
  label?: string
}

/**
 * Copies a generated prompt to the clipboard so the author can paste it into an
 * external assistant such as claude.ai — no API key or integration required.
 * Generates either a project-description prompt (default) or, when `translate`
 * is given, a translation prompt for a single content field.
 */
function CopyAiPromptButton({
  context,
  kind = 'long',
  translate,
  label = 'Copy AI prompt',
}: CopyAiPromptButtonProps) {
  async function handleCopy() {
    const prompt = translate
      ? buildTranslationPrompt(translate)
      : kind === 'short'
        ? buildShortDescriptionPrompt(context ?? {})
        : buildLongDescriptionPrompt(context ?? {})
    try {
      await navigator.clipboard.writeText(prompt)
      globalSuccessToast(
        'Prompt copied — paste it into your AI assistant, then paste the result back here.',
      )
    } catch {
      globalErrorToast('Could not access the clipboard. Copy the prompt manually instead.')
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" className="h-7 gap-1.5" onClick={handleCopy}>
      <IconSparkles className="size-3.5" />
      {label}
    </Button>
  )
}

export { CopyAiPromptButton }
