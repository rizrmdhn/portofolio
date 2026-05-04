export class NotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} not found: ${id}`);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} "${value}" already exists`);
    this.name = "ConflictError";
  }
}

export class RelationNotFoundError extends Error {
  constructor(entity: string, relatedEntity: string, id: string) {
    super(`${entity}: ${relatedEntity} not found: ${id}`);
    this.name = "RelationNotFoundError";
  }
}

export class QueryError extends Error {
  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message, { cause });
    this.name = "QueryError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
