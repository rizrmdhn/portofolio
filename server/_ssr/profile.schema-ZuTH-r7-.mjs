import { t as zod_default } from "../_libs/zod.mjs";
import { r as AVAILABILITY_STATUS_TYPES } from "./auth-DYlFpf9M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.schema-ZuTH-r7-.js
var updateProfileSchema = zod_default.object({
	id: zod_default.string(),
	name: zod_default.string().min(2).max(256),
	title: zod_default.string().min(2).max(256),
	bio: zod_default.string().min(2).max(256),
	email: zod_default.email(),
	location: zod_default.string().min(2).max(256).or(zod_default.undefined()),
	availabilityStatus: zod_default.enum(AVAILABILITY_STATUS_TYPES)
});
//#endregion
export { updateProfileSchema as t };
