export interface ToFormDataOptions {
  /**
   * If true, numeric strings like "8" will be kept as strings
   * If false (default), they will be converted to numbers on the server
   */
  preserveNumericStrings?: boolean;
}

/**
 * Converts a plain object to FormData
 * Handles files, nested objects, arrays, and primitive types
 *
 * @param data - The object to convert to FormData
 * @param options - Configuration options
 * @param formData - Optional existing FormData instance to append to (internal use)
 * @param parentKey - Used internally for nested objects
 * @returns FormData instance
 */
export function toFormData<T extends Record<string, unknown>>(
  data: T,
  options: ToFormDataOptions = {},
  formData: FormData = new FormData(),
  parentKey?: string,
): FormData {
  const { preserveNumericStrings = true } = options;

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
    const value = data[key] as unknown;
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    // Skip undefined and null values
    if (value === undefined || value === null) {
      continue;
    }

    // Handle File/Blob objects
    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
      continue;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      value.forEach((item: unknown, index) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(`${formKey}[]`, item);
        } else if (typeof item === "object" && item !== null) {
          toFormData(
            item as Record<string, unknown>,
            options,
            formData,
            `${formKey}[${index}]`,
          );
        } else {
          const itemStr = String(item);
          // Prefix with __str__ to preserve numeric strings
          if (
            preserveNumericStrings &&
            typeof item === "string" &&
            /^-?\d+(\.\d+)?$/.test(item)
          ) {
            formData.append(`${formKey}[]`, `__str__${itemStr}`);
          } else {
            formData.append(`${formKey}[]`, itemStr);
          }
        }
      });
      continue;
    }

    // Handle Date objects
    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
      continue;
    }

    // Handle nested objects
    if (typeof value === "object") {
      toFormData(value as Record<string, unknown>, options, formData, formKey);
      continue;
    }

    // Handle booleans, numbers, and strings
    const strValue = String(value);
    // Prefix with __str__ to preserve numeric strings
    if (
      preserveNumericStrings &&
      typeof value === "string" &&
      /^-?\d+(\.\d+)?$/.test(value)
    ) {
      formData.append(formKey, `__str__${strValue}`);
    } else {
      formData.append(formKey, strValue);
    }
  }

  return formData;
}

/**
 * Helper to log FormData contents for debugging
 */
export function logFormData(formData: FormData): void {
  console.log("FormData contents:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, `[File: ${value.name}, ${value.size} bytes]`);
    } else {
      console.log(`${key}:`, value);
    }
  }
}
