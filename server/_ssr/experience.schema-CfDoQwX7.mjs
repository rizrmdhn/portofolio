import { t as zod_default } from "../_libs/zod.mjs";
import { _ as EXPERIENCE_STATUS_TYPES, rt as experiences, v as EXPERIENCE_TYPES } from "./auth-BhV-4kEC.mjs";
import { t as createInsertSchema } from "./schema-yuc0MhOX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience.schema-CfDoQwX7.js
var experienceAchievementsSchema = zod_default.array(zod_default.string().trim().min(1).max(1e3)).max(50);
var createExperienceSchema = createInsertSchema(experiences, {
	groupId: zod_default.uuid().nullable().optional(),
	title: zod_default.string().max(256),
	description: zod_default.string().max(5e3),
	company: zod_default.string().max(256),
	location: zod_default.string().max(256),
	type: zod_default.enum(EXPERIENCE_TYPES),
	startDate: zod_default.iso.datetime(),
	endDate: zod_default.iso.datetime().or(zod_default.undefined()),
	currentlyWorking: zod_default.boolean(),
	skills: zod_default.string().array(),
	achievements: experienceAchievementsSchema.optional(),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	order: zod_default.number()
}).omit({
	createdAt: true,
	updatedAt: true
});
var updateExperienceSchema = createExperienceSchema.extend({ id: zod_default.string() });
var createExperienceGroupSchema = zod_default.object({
	company: zod_default.string().trim().min(1).max(256),
	label: zod_default.string().trim().min(1).max(256)
});
var addExperiencePositionSchema = zod_default.object({
	sourceId: zod_default.uuid(),
	stint: zod_default.enum(["same", "new"]).default("same"),
	position: zod_default.object({
		title: zod_default.string().trim().min(1).max(256),
		description: zod_default.string().trim().min(1).max(5e3),
		location: zod_default.string().trim().max(256),
		type: zod_default.enum(EXPERIENCE_TYPES),
		startDate: zod_default.iso.datetime(),
		endDate: zod_default.iso.datetime().optional(),
		currentlyWorking: zod_default.boolean(),
		skills: zod_default.array(zod_default.string().trim().min(1).max(256)).max(100),
		achievements: experienceAchievementsSchema,
		status: zod_default.enum(EXPERIENCE_STATUS_TYPES).default("draft")
	}).superRefine((value, ctx) => {
		if (value.currentlyWorking && value.endDate) ctx.addIssue({
			code: "custom",
			path: ["endDate"],
			message: "A current position cannot have an end date."
		});
		if (!value.currentlyWorking && !value.endDate) ctx.addIssue({
			code: "custom",
			path: ["endDate"],
			message: "Enter an end date or mark this position as current."
		});
		if (value.endDate && value.endDate < value.startDate) ctx.addIssue({
			code: "custom",
			path: ["endDate"],
			message: "End date must be on or after start date."
		});
	})
});
//#endregion
export { updateExperienceSchema as a, experienceAchievementsSchema as i, createExperienceGroupSchema as n, createExperienceSchema as r, addExperiencePositionSchema as t };
