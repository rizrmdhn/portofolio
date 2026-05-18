import { t as zod_default } from "../_libs/zod.mjs";
import { Y as experiences, g as EXPERIENCE_TYPES, h as EXPERIENCE_STATUS_TYPES } from "./auth-BOIJqjd1.mjs";
import { t as createInsertSchema } from "./schema-C2gAthpC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience.schema-SMBSG9ed.js
var createExperienceSchema = createInsertSchema(experiences, {
	title: zod_default.string().max(256),
	description: zod_default.string().max(5e3),
	company: zod_default.string().max(256),
	location: zod_default.string().max(256),
	type: zod_default.enum(EXPERIENCE_TYPES),
	startDate: zod_default.iso.datetime(),
	endDate: zod_default.iso.datetime().or(zod_default.undefined()),
	currentlyWorking: zod_default.boolean(),
	skills: zod_default.string().array(),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	order: zod_default.number()
}).omit({
	createdAt: true,
	updatedAt: true
});
var updateExperienceSchema = createExperienceSchema.extend({ id: zod_default.string() });
var reorderExperiencesSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderExperiencesSchema as n, updateExperienceSchema as r, createExperienceSchema as t };
