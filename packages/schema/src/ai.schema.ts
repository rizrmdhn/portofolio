import { z } from 'zod'

/** Input for the dashboard's auto-translate (Groq) mutation. Mirrors the
 * copy-prompt builder's fields so both paths share the same shape. */
export const aiTranslateSchema = z.object({
  /** Human-readable target language, e.g. "Bahasa Indonesia". */
  targetLanguage: z.string().min(1),
  /** Label of the field being translated, e.g. "Long Description". */
  fieldLabel: z.string().min(1),
  /** English source text to translate. */
  sourceText: z.string().min(1),
  /** Preserve Markdown formatting when true. */
  markdown: z.boolean().optional(),
})

export type AiTranslateInput = z.infer<typeof aiTranslateSchema>
