import { C as union, S as string, s as _enum, t as zod_default, u as array, y as object } from "../_libs/zod.mjs";
import { Dt as projects, _ as EXPERIENCE_STATUS_TYPES, s as COLOR_VALUES } from "./auth-BlELRVlC.mjs";
import { t as createInsertSchema } from "./schema-Dv4_ZoX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project.schema-C6URTE0X.js
var filterSchema = object({
	id: string(),
	value: union([string(), array(string())]),
	variant: _enum([
		"text",
		"number",
		"date",
		"select",
		"multiSelect",
		"boolean"
	]),
	operator: _enum([
		"eq",
		"ne",
		"lt",
		"lte",
		"gt",
		"gte",
		"ilike",
		"notIlike",
		"isEmpty",
		"isNotEmpty",
		"inArray",
		"notInArray",
		"between"
	]),
	filterId: string()
});
/**
* Creates a reusable pagination schema with shared filtering, sorting, and soft-delete fields.
* Pass in your resource-specific sortable fields enum to generate a fully typed schema.
*
* @example
* ```ts
* const SORTABLE_CLUSTER_FIELDS = ["name", "createdAt", "updatedAt"] as const;
*
* const getAllClustersSchema = createPaginationSchema(SORTABLE_CLUSTER_FIELDS).extend({
*   name: z.string().default(""),
* });
* ```
*/
function createPaginationSchema(sortableFields, defaultSort = {
	id: sortableFields[0],
	desc: false
}) {
	return zod_default.object({
		page: zod_default.number().int().min(1).default(1),
		perPage: zod_default.number().int().min(1).max(100).default(10),
		sort: zod_default.array(zod_default.object({
			id: zod_default.enum(sortableFields),
			desc: zod_default.boolean()
		})).default([defaultSort]),
		createdAt: zod_default.array(zod_default.coerce.number()).default([]),
		filters: zod_default.array(filterSchema).default([]),
		joinOperator: zod_default.enum(["and", "or"]).default("and")
	});
}
var createProjectSchema = createInsertSchema(projects, {
	title: zod_default.string().max(256),
	description: zod_default.string().max(5e3),
	longDescription: zod_default.string().max(1e4).or(zod_default.undefined()),
	tech: zod_default.array(zod_default.string()).min(1),
	githubUrl: zod_default.url().or(zod_default.undefined()),
	liveUrl: zod_default.url().or(zod_default.undefined()),
	playstoreUrl: zod_default.url().or(zod_default.undefined()),
	appstoreUrl: zod_default.url().or(zod_default.undefined()),
	coverColor: zod_default.enum(COLOR_VALUES),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	isVisible: zod_default.boolean(),
	order: zod_default.number()
}).omit({
	id: true,
	slug: true,
	createdAt: true,
	updatedAt: true,
	featureAt: true
}).extend({
	pictures: zod_default.array(zod_default.file().max(5 * 1024 * 1024)).or(zod_default.undefined()),
	featured: zod_default.boolean()
});
var updateProjectSchema = createProjectSchema.extend({ id: zod_default.string() });
var getProjectsSchema = createPaginationSchema([
	"title",
	"status",
	"order",
	"createdAt",
	"updatedAt"
], {
	id: "order",
	desc: false
}).extend({
	perPage: zod_default.number().int().min(1).max(100).default(100),
	search: zod_default.string().default("")
});
var reorderProjectsSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
var addProjectImageSchema = zod_default.object({
	projectId: zod_default.string(),
	picture: zod_default.file().max(5 * 1024 * 1024)
});
var reorderProjectImagesSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderProjectsSchema as a, reorderProjectImagesSchema as i, createProjectSchema as n, updateProjectSchema as o, getProjectsSchema as r, addProjectImageSchema as t };
