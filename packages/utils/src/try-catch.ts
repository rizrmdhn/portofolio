export function tryCatch<T>(fn: () => T): [T, null] | [null, Error] {
  try {
    return [fn(), null];
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}

// async variant
export async function tryCatchAsync<T>(
  fn: () => Promise<T>,
): Promise<[T, null] | [null, Error]> {
  try {
    return [await fn(), null];
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}
