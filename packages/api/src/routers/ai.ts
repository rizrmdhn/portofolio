import { isGroqConfigured, translateContent } from '@portofolio/ai'
import { aiTranslateSchema } from '@portofolio/schema/ai.schema'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { createTRPCRouter, protectedProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const aiRouter = createTRPCRouter({
  /** Whether server-side AI features (Groq) are configured. The dashboard uses
   * this to decide between auto-translate and the copy-a-prompt fallback. */
  status: protectedProcedure.query(() => ({ groq: isGroqConfigured })),

  /** Translates a single content field from English into the target language. */
  translate: protectedProcedure.input(aiTranslateSchema).mutation(async ({ input }) => {
    const [text, err] = await tryCatchAsync(() => translateContent(input))
    if (err) throw toTRPCError(err)
    return { text }
  }),
})
