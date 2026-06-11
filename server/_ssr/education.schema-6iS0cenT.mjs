import { t as zod_default } from "../_libs/zod.mjs";
import { X as education, _ as EXPERIENCE_STATUS_TYPES, p as DEGREE_TYPES } from "./auth-BlELRVlC.mjs";
import { t as createInsertSchema } from "./schema-Dv4_ZoX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education.schema-6iS0cenT.js
var createEducationSchema = createInsertSchema(education, {
	institution: zod_default.string().min(2).max(256),
	degreeLevel: zod_default.enum(DEGREE_TYPES),
	major: zod_default.string().min(2).max(256),
	gpa: zod_default.string().max(64).or(zod_default.undefined()),
	startYear: zod_default.iso.datetime(),
	endYear: zod_default.iso.datetime().or(zod_default.undefined()),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	order: zod_default.number().int().min(0)
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
var updateEducationSchema = createEducationSchema.extend({ id: zod_default.string() });
var reorderEducationSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderEducationSchema as n, updateEducationSchema as r, createEducationSchema as t };
