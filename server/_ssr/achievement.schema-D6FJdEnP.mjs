import { t as zod_default } from "../_libs/zod.mjs";
import { h as EXPERIENCE_STATUS_TYPES, k as achievements } from "./auth-BOIJqjd1.mjs";
import { t as createInsertSchema } from "./schema-C2gAthpC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/achievement.schema-D6FJdEnP.js
var createAchievementSchema = createInsertSchema(achievements, {
	title: zod_default.string().min(2).max(256),
	issuer: zod_default.string().min(2).max(256),
	description: zod_default.string().or(zod_default.undefined()),
	date: zod_default.iso.datetime(),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	order: zod_default.number().int().min(0)
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
var updateAchievementSchema = createAchievementSchema.extend({ id: zod_default.string() });
var reorderAchievementsSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderAchievementsSchema as n, updateAchievementSchema as r, createAchievementSchema as t };
