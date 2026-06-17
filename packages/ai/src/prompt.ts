export interface TranslateContentInput {
  /** Human-readable target language, e.g. "Bahasa Indonesia". */
  targetLanguage: string
  /** Label of the field being translated, e.g. "Long Description". */
  fieldLabel: string
  /** The English source text to translate. */
  sourceText: string
  /** When true, instruct the model to preserve Markdown formatting. */
  markdown?: boolean | undefined
}

/**
 * Builds the translation instruction sent to Groq. Mirrors the client-side
 * copy-prompt builder (`apps/web/src/lib/ai-prompt.ts`) so the auto-translate and
 * copy-a-prompt paths produce equivalent results — keep the two in sync.
 */
export function buildTranslatePrompt({
  targetLanguage,
  fieldLabel,
  sourceText,
  markdown,
}: TranslateContentInput): string {
  return `Translate the following portfolio "${fieldLabel}" from English into ${targetLanguage}.

English source:
${sourceText.trim()}

Guidelines:
- Translate naturally and idiomatically — write what a native speaker would actually say, not a literal word-for-word rendering.
- For short section headings and labels (e.g. "Overview", "Key Features", "Tech Highlights", "Challenges"), use the conventional native equivalent; if there is no natural one and a literal translation would sound awkward, keep the English heading as-is.
- Preferred Indonesian (Bahasa Indonesia) terms — use these exact phrasings when the heading matches: "Tech Highlights" / "Tech Stack" / "Technologies Used" → "Teknologi Digunakan".
- Do NOT translate code, URLs, brand/product names, or technology names (e.g. React, TypeScript, Next.js) — keep them exactly as-is.
${
  markdown
    ? '- Preserve all Markdown formatting exactly (headings, **bold**, _italic_, lists, links, `inline code`). Translate only the human-readable text.'
    : '- Return plain text only — no Markdown, headings, lists or formatting.'
}
- Do not add, remove or invent any information.
- Return only the translated text — no preamble, commentary, quotes or code fences.`
}
