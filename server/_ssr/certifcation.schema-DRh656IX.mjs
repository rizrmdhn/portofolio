import { t as zod_default } from "../_libs/zod.mjs";
import { H as certifications, _ as EXPERIENCE_STATUS_TYPES } from "./auth-DYlFpf9M.mjs";
import { t as createInsertSchema } from "./schema-Bqf323k_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certifcation.schema-DRh656IX.js
var createCertificationSchema = createInsertSchema(certifications, {
	title: zod_default.string().min(2).max(256),
	issuer: zod_default.string().min(2).max(256),
	certificateUrl: zod_default.url().or(zod_default.undefined()),
	certificateId: zod_default.string().min(1).max(256).or(zod_default.undefined()),
	issueYear: zod_default.iso.datetime(),
	expiryYear: zod_default.iso.datetime().or(zod_default.undefined()),
	status: zod_default.enum(EXPERIENCE_STATUS_TYPES),
	order: zod_default.number().int().min(0)
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
var updateCertificationSchema = createCertificationSchema.extend({ id: zod_default.string() });
var reorderCertificationsSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderCertificationsSchema as n, updateCertificationSchema as r, createCertificationSchema as t };
