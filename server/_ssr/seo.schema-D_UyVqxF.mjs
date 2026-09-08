import { t as zod_default } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo.schema-D_UyVqxF.js
var SEO_PAGES = [
	"home",
	"projects",
	"certificates",
	"resume"
];
var SEO_PAGE_LABELS = {
	home: "Home",
	projects: "Projects",
	certificates: "Certificates",
	resume: "Resume"
};
var seoPageSchema = zod_default.enum(SEO_PAGES);
var seoPageSettingsSchema = zod_default.object({
	title: zod_default.string().max(120).or(zod_default.undefined()),
	description: zod_default.string().max(320).or(zod_default.undefined()),
	ogImage: zod_default.url().or(zod_default.undefined())
});
var seoSettingsSchema = zod_default.object({ pages: zod_default.object(Object.fromEntries(SEO_PAGES.map((page) => [page, seoPageSettingsSchema]))) });
//#endregion
export { seoSettingsSchema as i, SEO_PAGE_LABELS as n, seoPageSchema as r, SEO_PAGES as t };
