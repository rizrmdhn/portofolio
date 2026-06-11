import { z as authMiddleware } from "./auth-BlELRVlC.mjs";
import { _ as redirect, l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CAYgh4qu.js
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
var $$splitComponentImporter = () => import("./route-m9jGr1vx.mjs");
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
export { getUser as n, Route as t };
