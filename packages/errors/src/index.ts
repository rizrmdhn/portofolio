export class NotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} not found: ${id}`)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends Error {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} "${value}" already exists`)
    this.name = 'ConflictError'
  }
}

export class RelationNotFoundError extends Error {
  constructor(entity: string, relatedEntity: string, id: string) {
    super(`${entity}: ${relatedEntity} not found: ${id}`)
    this.name = 'RelationNotFoundError'
  }
}

export class QueryError extends Error {
  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'QueryError'
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class RateLimitError extends Error {
  constructor(message = 'Too many requests, please try again later') {
    super(message)
    this.name = 'RateLimitError'
  }
}

export class ExternalServiceError extends Error {
  constructor(
    service: string,
    message: string,
    override readonly cause?: unknown,
  ) {
    super(`${service}: ${message}`, { cause })
    this.name = 'ExternalServiceError'
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message)
    this.name = 'TimeoutError'
  }
}

export class ParseError extends Error {
  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'ParseError'
  }
}

export class ImageConversionError extends Error {
  _tag = 'ImageConversionError'
  constructor(
    message: string,
    public override readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'ImageConversionError'
  }
}

export class InvalidImageError extends ImageConversionError {
  override readonly _tag = 'InvalidImageError'
  constructor(message: string, cause?: unknown) {
    super(`Invalid image: ${message}`, cause)
    this.name = 'InvalidImageError'
  }
}
