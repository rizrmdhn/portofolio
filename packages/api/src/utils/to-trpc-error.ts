import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  QueryError,
  RelationNotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@portofolio/queries/errors'
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server'
import { TRPCError } from '@trpc/server'

const errorMap: Array<[new (...args: Array<any>) => Error, TRPC_ERROR_CODE_KEY]> = [
  [NotFoundError, 'NOT_FOUND'],
  [RelationNotFoundError, 'NOT_FOUND'],
  [ConflictError, 'CONFLICT'],
  [UnauthorizedError, 'UNAUTHORIZED'],
  [ForbiddenError, 'FORBIDDEN'],
  [ValidationError, 'BAD_REQUEST'],
  [QueryError, 'INTERNAL_SERVER_ERROR'],
]

function parseGeminiStatus(err: Error): number | null {
  try {
    const parsed = JSON.parse(err.message)
    return parsed?.error?.code ?? null
  } catch {
    return null
  }
}

export function toTRPCError(err: Error): TRPCError {
  for (const [ErrorClass, code] of errorMap) {
    if (err instanceof ErrorClass) return new TRPCError({ code, message: err.message })
  }

  const geminiStatus = parseGeminiStatus(err)
  if (geminiStatus === 429) {
    return new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'AI generation quota exceeded. Please wait a moment and try again.',
    })
  }

  return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err.message })
}
