import { env } from '@portofolio/env/server'
import Groq from 'groq-sdk'
import type { TranslateContentInput } from './prompt'
import { buildTranslatePrompt } from './prompt'

export type { TranslateContentInput } from './prompt'

/** Whether a Groq API key is configured. When false, callers should fall back to
 * the copy-a-prompt flow instead of attempting an API translation. */
export const isGroqConfigured = Boolean(env.GROQ_API_KEY)

// Strong instruction-following with good multilingual quality; matched to the
// nuance translation needs (idiom + Markdown preservation).
const TRANSLATION_MODEL = 'llama-3.3-70b-versatile'

// Instantiated lazily so importing this module never throws when the key is
// absent — only an actual translate call requires it.
let client: Groq | undefined
function getClient(): Groq {
  if (!env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured')
  }
  client ??= new Groq({ apiKey: env.GROQ_API_KEY })
  return client
}

/**
 * Translates a single portfolio content field from English into the target
 * language via Groq, returning the translated text only. Throws if no API key is
 * configured or the model returns nothing usable.
 */
export async function translateContent(input: TranslateContentInput): Promise<string> {
  const response = await getClient().chat.completions.create({
    model: TRANSLATION_MODEL,
    temperature: 0.3,
    messages: [{ role: 'user', content: buildTranslatePrompt(input) }],
  })

  const text = response.choices[0]?.message.content?.trim()
  if (!text) throw new Error('Translation model returned no content')
  return text
}
