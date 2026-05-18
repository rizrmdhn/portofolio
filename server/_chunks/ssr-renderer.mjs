import { n as HTTPError, o as toRequest } from "../_libs/h3+rou3+srvx.mjs";
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };
