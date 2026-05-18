import { o as __toESM } from "../../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../@base-ui/react+[...].mjs";
import "./react-router+[...].mjs";
import { s as dehydrate } from "../tanstack__query-core.mjs";
import { o as QueryClientProvider } from "../tanstack__react-query.mjs";
//#region ../../node_modules/.pnpm/@tanstack+router-ssr-query-core@1.168.0_@tanstack+query-core@5.100.10_@tanstack+router-core@1.169.2/node_modules/@tanstack/router-ssr-query-core/dist/esm/index.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function setupCoreRouterSsrQueryIntegration({ router, queryClient, dehydrateOptions, hydrateOptions, handleRedirects = true }) {
	router.options.hydrate;
	const ogDehydrate = router.options.dehydrate;
	{
		const sentQueries = /* @__PURE__ */ new Set();
		const queryStream = createPushableStream();
		let unsubscribe = void 0;
		router.options.dehydrate = async () => {
			router.serverSsr.onRenderFinished(() => {
				queryStream.close();
				unsubscribe?.();
				unsubscribe = void 0;
			});
			const dehydratedRouter = {
				...await ogDehydrate?.(),
				queryStream: queryStream.stream
			};
			const dehydratedQueryClient = dehydrate(queryClient, dehydrateOptions);
			if (dehydratedQueryClient.queries.length > 0) {
				dehydratedQueryClient.queries.forEach((query) => {
					sentQueries.add(query.queryHash);
				});
				dehydratedRouter.dehydratedQueryClient = dehydratedQueryClient;
			}
			return dehydratedRouter;
		};
		const ogClientOptions = queryClient.getDefaultOptions();
		queryClient.setDefaultOptions({
			...ogClientOptions,
			dehydrate: {
				shouldDehydrateQuery: () => true,
				...ogClientOptions.dehydrate
			}
		});
		unsubscribe = queryClient.getQueryCache().subscribe((event) => {
			if (!router.serverSsr?.isDehydrated()) return;
			if (sentQueries.has(event.query.queryHash)) return;
			if (!event.query.promise) return;
			if (queryStream.isClosed()) {
				console.warn(`tried to stream query ${event.query.queryHash} after stream was already closed`);
				return;
			}
			const dehydratedQuery = dehydrate(queryClient, {
				...dehydrateOptions,
				shouldDehydrateQuery: (query) => {
					if (query.queryHash !== event.query.queryHash) return false;
					return (ogClientOptions.dehydrate?.shouldDehydrateQuery?.(query) ?? true) && (dehydrateOptions?.shouldDehydrateQuery?.(query) ?? true);
				}
			});
			if (dehydratedQuery.queries.length === 0) return;
			sentQueries.add(event.query.queryHash);
			queryStream.enqueue(dehydratedQuery);
		});
	}
}
function createPushableStream() {
	let controllerRef;
	const stream = new ReadableStream({ start(controller) {
		controllerRef = controller;
	} });
	let _isClosed = false;
	return {
		stream,
		enqueue: (chunk) => controllerRef.enqueue(chunk),
		close: () => {
			controllerRef.close();
			_isClosed = true;
		},
		isClosed: () => _isClosed,
		error: (err) => controllerRef.error(err)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-router-ssr-query@1.166.12_@tanstack+query-core@5.100.10_@tanstack+react_bf3810c3651749ea51f4c5fb8f6854bf/node_modules/@tanstack/react-router-ssr-query/dist/esm/index.js
var import_jsx_runtime = require_jsx_runtime();
function setupRouterSsrQueryIntegration(opts) {
	setupCoreRouterSsrQueryIntegration(opts);
	if (opts.wrapQueryClient === false) return;
	const OGWrap = opts.router.options.Wrap || import_react.Fragment;
	opts.router.options.Wrap = ({ children }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
			client: opts.queryClient,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OGWrap, { children })
		});
	};
}
//#endregion
export { setupRouterSsrQueryIntegration as t };
