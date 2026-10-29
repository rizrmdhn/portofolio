import { d as createFileRoute, u as lazyRouteComponent, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { B as authMiddleware } from "./auth-BhV-4kEC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Bc8etnI9.js
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
var $$splitComponentImporter = () => import("./route-DDEXfXja.mjs");
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
