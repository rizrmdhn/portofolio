import { z as authMiddleware } from "./auth-BlELRVlC.mjs";
import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-user-CT3AqioI.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
