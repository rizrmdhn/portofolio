import { l as lazyRouteComponent, u as createFileRoute, y as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as isLocale } from "./src-wHgUA5Hr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BFBD3usl.js
var $$splitComponentImporter = () => import("./route-o4GBy7LU.mjs");
var Route = createFileRoute("/$locale")({
	beforeLoad: ({ params }) => {
		if (!isLocale(params.locale)) throw notFound();
		return { locale: params.locale };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
