import { r as createServerFn } from "./ssr.mjs";
import { B as authMiddleware } from "./auth-BhV-4kEC.mjs";
import { t as createServerRpc } from "./createServerRpc-DknHmG0z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-user-DL_8Iwau.js
var getUser_createServerFn_handler = createServerRpc({
	id: "659a96a03a9626f0844164fe430e164571be9100b882d85c6383faef18ff46d2",
	name: "getUser",
	filename: "src/functions/get-user.ts"
}, (opts) => getUser.__executeServer(opts));
var getUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getUser_createServerFn_handler, ({ context }) => {
	return context.session;
});
//#endregion
export { getUser_createServerFn_handler };
