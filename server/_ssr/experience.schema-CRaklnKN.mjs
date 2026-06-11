import { t as zod_default } from "../_libs/zod.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, et as experiences, v as EXPERIENCE_TYPES } from "./auth-BlELRVlC.mjs";
import { t as createInsertSchema } from "./schema-Dv4_ZoX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience.schema-CRaklnKN.js
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
//#endregion
export { updateExperienceSchema as n, createExperienceSchema as t };
