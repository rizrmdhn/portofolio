//#region node_modules/.nitro/vite/services/ssr/assets/form-data-mapper-CnusNGMI.js
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
function toFormData(data, options = {}, formData = new FormData(), parentKey) {
	const { preserveNumericStrings = true } = options;
	for (const key in data) {
		if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
		const value = data[key];
		const formKey = parentKey ? `${parentKey}.${key}` : key;
		if (value === void 0 || value === null) continue;
		if (value instanceof File || value instanceof Blob) {
			formData.append(formKey, value);
			continue;
		}
		if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (item instanceof File || item instanceof Blob) formData.append(`${formKey}[]`, item);
				else if (typeof item === "object" && item !== null) toFormData(item, options, formData, `${formKey}[${index}]`);
				else {
					const itemStr = String(item);
					if (preserveNumericStrings && typeof item === "string" && /^-?\d+(\.\d+)?$/.test(item)) formData.append(`${formKey}[]`, `__str__${itemStr}`);
					else formData.append(`${formKey}[]`, itemStr);
				}
			});
			continue;
		}
		if (value instanceof Date) {
			formData.append(formKey, value.toISOString());
			continue;
		}
		if (typeof value === "object") {
			toFormData(value, options, formData, formKey);
			continue;
		}
		const strValue = String(value);
		if (preserveNumericStrings && typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) formData.append(formKey, `__str__${strValue}`);
		else formData.append(formKey, strValue);
	}
	return formData;
}
//#endregion
export { toFormData as t };
