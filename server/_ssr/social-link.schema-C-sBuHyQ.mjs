import { t as zod_default } from "../_libs/zod.mjs";
import { C as SOCIAL_ICON_NAMES, kt as socialLinks } from "./auth-BlELRVlC.mjs";
import { t as createInsertSchema } from "./schema-Dv4_ZoX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-link.schema-C-sBuHyQ.js
var createSocialLinkSchema = createInsertSchema(socialLinks, {
	title: zod_default.string().min(2).max(256),
	url: zod_default.url(),
	icon: zod_default.enum(SOCIAL_ICON_NAMES),
	order: zod_default.number()
}).omit({
	createdAt: true,
	updatedAt: true
});
var updateSocialLinkSchema = createSocialLinkSchema.extend({ id: zod_default.string() });
var reorderSocialLinksSchema = zod_default.array(zod_default.object({
	id: zod_default.string(),
	order: zod_default.number().int().min(0)
})).min(1);
//#endregion
export { reorderSocialLinksSchema as n, updateSocialLinkSchema as r, createSocialLinkSchema as t };
