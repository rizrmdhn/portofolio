import { t as zod_default } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume.schema-Cf-MY_YY.js
var RESUME_TEMPLATES = ["ats", "creative"];
var RESUME_FONTS = [
	"Liberation Sans",
	"Inter",
	"Arimo"
];
var RESUME_FONT_LABELS = {
	"Liberation Sans": "Liberation Sans (Arial-compatible)",
	Inter: "Inter (Modern)",
	Arimo: "Arimo (Google Fonts)"
};
var resumeSettingsSchema = zod_default.object({
	template: zod_default.enum(RESUME_TEMPLATES),
	accentColor: zod_default.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g. #3b82f6)"),
	font: zod_default.enum(RESUME_FONTS),
	summary: zod_default.string().or(zod_default.undefined())
});
//#endregion
export { resumeSettingsSchema as i, RESUME_FONT_LABELS as n, RESUME_TEMPLATES as r, RESUME_FONTS as t };
