//#region node_modules/.nitro/vite/services/ssr/assets/has-tab-error-8GKW7_Vv.js
function hasTabError(fieldMeta, fields) {
	return fields.some((f) => (fieldMeta[f]?.errors.length ?? 0) > 0);
}
//#endregion
export { hasTabError as t };
