import { z } from 'zod'

/**
 * Prefix used to mark strings that should not be coerced to numbers
 */
const STRING_PREFIX = '__str__'

/**
 * Coerces a string value to its appropriate type
 * Handles booleans, numbers, and keeps strings as-is
 */
function coerceValue(value: string | File): string | number | boolean | File {
  // Keep File/Blob as-is
  if (value instanceof File) {
    return value
  }

  const strValue = String(value)

  // Check for preserved string prefix (numeric strings that should stay as strings)
  if (strValue.startsWith(STRING_PREFIX)) {
    return strValue.slice(STRING_PREFIX.length)
  }

  // Handle booleans
  if (strValue === 'true') return true
  if (strValue === 'false') return false

  // Handle empty strings
  if (strValue === '') return ''

  // Handle numbers (but not strings that start with 0 like "007")
  if (/^-?\d+(\.\d+)?$/.test(strValue) && !strValue.startsWith('0')) {
    const num = Number(strValue)
    if (!isNaN(num)) return num
  }

  // Handle numbers that start with 0 but are just "0"
  if (strValue === '0') return 0

  return strValue
}

/**
 * Parses FormData into a structured object
 * Handles arrays (field[]), nested objects (field.nested), and files
 */
interface FormRecord {
  [key: string]: FormValue
}
type FormValue = string | number | boolean | File | Array<FormValue> | FormRecord

export function parseFormData(formData: FormData): Record<string, FormValue> {
  const result: Record<string, FormValue> = {}

  for (const [key, value] of formData as unknown as Iterable<[string, string | File]>) {
    const coercedValue = coerceValue(value)

    // Handle array notation: field[]
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2)
      if (!result[cleanKey]) {
        result[cleanKey] = []
      }
      ;(result[cleanKey] as Array<FormValue>).push(coercedValue)
      continue
    }

    // Handle nested notation: field.nested or field[0]
    if (key.includes('.') || key.includes('[')) {
      setNestedValue(result, key, coercedValue)
      continue
    }

    // Check if key already exists (multiple values with same name)
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(coercedValue)
      } else {
        result[key] = [result[key], coercedValue]
      }
    } else {
      result[key] = coercedValue
    }
  }

  return result
}

function setNestedValue(obj: Record<string, FormValue>, path: string, value: FormValue): void {
  const keys = path.match(/[^.[\]]+/g) || []
  let current: FormRecord = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    if (key !== undefined && nextKey !== undefined && !current[key]) {
      current[key] = /^\d+$/.test(nextKey) ? [] : {}
    }
    if (key !== undefined) {
      current = current[key] as FormRecord
    }
  }

  const lastKey = keys[keys.length - 1]
  if (lastKey !== undefined) {
    const existing = current[lastKey]
    if (existing) {
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        current[lastKey] = [existing, value]
      }
    } else {
      current[lastKey] = value
    }
  }
}

function fillMissingKeys(parsed: Record<string, FormValue>, schema: z.ZodTypeAny): void {
  if (schema instanceof z.ZodObject) {
    for (const key of Object.keys(schema.shape)) {
      if (!(key in parsed)) {
        ;(parsed as Record<string, unknown>)[key] = undefined
      }
    }
  }
}

export function parseAndValidate<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T,
): z.infer<T> {
  const parsed = parseFormData(formData)
  fillMissingKeys(parsed, schema)
  return schema.parse(parsed)
}

export function parseAndValidateSafe<T extends z.ZodTypeAny>(formData: FormData, schema: T) {
  const parsed = parseFormData(formData)
  fillMissingKeys(parsed, schema)
  return schema.safeParse(parsed)
}
