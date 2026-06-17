import { z as authMiddleware } from "./auth-DYlFpf9M.mjs";
import { l as lazyRouteComponent, u as createFileRoute, v as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CJv0iOL5.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("659a96a03a9626f0844164fe430e164571be9100b882d85c6383faef18ff46d2"));
var $$splitComponentImporter = () => import("./route-CWtkGUrP.mjs");
var Route = createFileRoute("/(core)/dashboard")({
	beforeLoad: async () => {
		const session = await getUser();
		if (!session) throw redirect({ to: "/login" });
		return { session };
	},
	loader: ({ context }) => {
		return context.session;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { createSsrRpc as n, getUser as r, Route as t };
