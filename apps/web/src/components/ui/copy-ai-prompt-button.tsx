import { IconSparkles } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  buildLongDescriptionPrompt,
  buildShortDescriptionPrompt,
  buildTranslationPrompt,
} from '@/lib/ai-prompt'
import type { ProjectPromptInput, TranslationPromptInput } from '@/lib/ai-prompt'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'

type CopyAiPromptButtonProps = {
  /** Project-description prompt source (used unless `translate` is provided). */
  context?: ProjectPromptInput
  /** Which description prompt to generate. Defaults to the long description. */
  kind?: 'short' | 'long'
  /** When provided, generates a translation prompt instead of a description one. */
  translate?: TranslationPromptInput
  /** Called with the translated text when auto-translation (Groq) succeeds. */
  onResult?: (text: string) => void
  /** Button label. Defaults to "Copy AI prompt". */
  label?: string
}

/**
 * AI helper for content fields. For translation fields it auto-translates via
 * Groq when the server has an API key configured (filling the field through
 * `onResult`); otherwise — and for description prompts — it copies a ready-to-paste
 * prompt to the clipboard so the author can run it in an external assistant.
 */
function CopyAiPromptButton({
  context,
  kind = 'long',
  translate,
  onResult,
  label = 'Copy AI prompt',
}: CopyAiPromptButtonProps) {
  // Only probe Groq availability for translation buttons; description prompts are
  // always copy-only.
  const statusQuery = useQuery(
    trpc.ai.status.queryOptions(undefined, { enabled: Boolean(translate) }),
  )
  const canAutoTranslate = Boolean(translate) && statusQuery.data?.groq === true

  const translateMutation = useMutation(
    trpc.ai.translate.mutationOptions({
      onSuccess: ({ text }) => {
        onResult?.(text)
        globalSuccessToast('Translated — review and tweak as needed.')
      },
      onError: (error) => globalErrorToast(error.message || 'Translation failed. Try again.'),
    }),
  )

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

  function handleClick() {
    if (canAutoTranslate && translate) {
      translateMutation.mutate(translate)
      return
    }
    void handleCopy()
  }

  const isTranslating = translateMutation.isPending

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-7 gap-1.5"
      onClick={handleClick}
      disabled={isTranslating}
    >
      {isTranslating ? <Spinner className="size-3.5" /> : <IconSparkles className="size-3.5" />}
      {label}
    </Button>
  )
}

export { CopyAiPromptButton }
