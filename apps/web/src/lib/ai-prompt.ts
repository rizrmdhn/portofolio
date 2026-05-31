type LinkInput = { label: string; url?: string }

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
