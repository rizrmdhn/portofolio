import { b as notFound, d as createFileRoute, u as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as isLocale } from "./src-B5fQghAn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Dz1jm7V_.js
var $$splitComponentImporter = () => import("./route-2I1b6ou3.mjs");
var Route = createFileRoute("/$locale")({
	beforeLoad: ({ params }) => {
		if (!isLocale(params.locale)) throw notFound();
		return { locale: params.locale };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
