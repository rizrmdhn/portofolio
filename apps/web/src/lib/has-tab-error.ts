export function hasTabError(
  fieldMeta: Record<string, { errors: unknown[] }>,
  fields: string[],
) {
  return fields.some((f) => (fieldMeta[f]?.errors?.length ?? 0) > 0);
}
