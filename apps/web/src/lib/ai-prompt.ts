type LinkInput = { label: string; url?: string }

export type TranslationPromptInput = {
  /** Human-readable target language, e.g. "Bahasa Indonesia". */
  targetLanguage: string
  /** Label of the field being translated, e.g. "Long Description". */
  fieldLabel: string
  /** The English source text to translate. */
  sourceText: string
  /** When true, instruct the assistant to preserve Markdown formatting. */
  markdown?: boolean
}

/**
 * Builds a ready-to-paste prompt that translates a single piece of portfolio
 * content from English into the target language, preserving formatting and
 * leaving code / brand / tech names untouched. Mirrors the description prompts
 * so the result can be pasted straight back into the translation field.
 */
export function buildTranslationPrompt({
  targetLanguage,
  fieldLabel,
  sourceText,
  markdown,
}: TranslationPromptInput): string {
  return `Translate the following portfolio "${fieldLabel}" from English into ${targetLanguage}.

English source:
${sourceText.trim()}

Guidelines:
- Translate naturally and idiomatically; preserve the original meaning, tone and intent.
- Do NOT translate code, URLs, brand/product names, or technology names (e.g. React, TypeScript, Next.js) — keep them exactly as-is.
${
  markdown
    ? '- Preserve all Markdown formatting exactly (headings, **bold**, _italic_, lists, links, `inline code`). Translate only the human-readable text.'
    : '- Return plain text only — no Markdown, headings, lists or formatting.'
}
- Do not add, remove or invent any information.
- Return only the translated text — no preamble, commentary, quotes or code fences.`
}

export type ProjectPromptInput = {
  title?: string
  description?: string
  longDescription?: string
  tech?: Array<string>
  links?: Array<LinkInput>
}

function normalize(input: ProjectPromptInput) {
  return {
    title: input.title?.trim() || '(untitled project)',
    description: input.description?.trim(),
    longDescription: input.longDescription?.trim(),
    tech: (input.tech ?? []).filter(Boolean),
    links: (input.links ?? []).filter((l) => l.url?.trim()),
  }
}

/**
 * Builds a ready-to-paste prompt for an external assistant (e.g. claude.ai) that
 * generates the project "long description". Output is constrained to the same
 * markdown-safe formatting the editor and public renderer support, so the result
 * can be pasted straight into the Tiptap editor.
 */
export function buildLongDescriptionPrompt(input: ProjectPromptInput): string {
  const { title, description, tech, links } = normalize(input)

  const details = [
    `- Title: ${title}`,
    `- Short description: ${description || '(none provided)'}`,
    `- Tech stack: ${tech.length ? tech.join(', ') : '(none provided)'}`,
    ...(links.length ? [`- Links: ${links.map((l) => `${l.label} (${l.url})`).join(', ')}`] : []),
  ].join('\n')

  return `You are helping write the "long description" for a project on my developer portfolio.

Write a polished, engaging case-study style description in **Markdown**.

Project details:
${details}

Guidelines:
- Use Markdown only: headings, **bold**, _italic_, bullet/numbered lists, links and \`inline code\`. No raw HTML, no images, no underline or coloured text.
- Suggested structure: a 1–2 sentence intro, then short sections such as Overview, Key Features, Tech Highlights and Challenges.
- Keep it concise (~150–300 words), specific and confident.
- Do not invent metrics, dates, client names or facts I haven't given you.
- Return only the Markdown description — no preamble, commentary or code fences around it.`
}

/**
 * Builds a prompt for the short "description" — the one-line tagline shown on
 * project cards. Plain text only (no markdown), since that field is rendered
 * verbatim.
 */
export function buildShortDescriptionPrompt(input: ProjectPromptInput): string {
  const { title, description, longDescription, tech } = normalize(input)

  const details = [
    `- Title: ${title}`,
    `- Tech stack: ${tech.length ? tech.join(', ') : '(none provided)'}`,
    ...(description ? [`- Current draft: ${description}`] : []),
    ...(longDescription ? [`- Long description to summarise from:\n${longDescription}`] : []),
  ].join('\n')

  return `You are helping write the short "description" (tagline) for a project on my developer portfolio. It is the one-line summary shown on project cards.

Project details:
${details}

Guidelines:
- Write 1–2 plain sentences. No Markdown, headings, lists or formatting of any kind.
- Keep it under ~160 characters. Make it punchy and concrete: say what the project is and what it does.
- Do not invent facts I haven't given you.
- Return only the description text — nothing else.`
}
