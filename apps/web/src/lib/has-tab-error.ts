export function hasTabError(
  fieldMeta: Record<string, { errors: Array<unknown> }>,
  fields: Array<string>,
) {
  return fields.some((f) => (fieldMeta[f]?.errors.length ?? 0) > 0)
}
