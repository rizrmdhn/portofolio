import { i as __toESM } from "../../_runtime.mjs";
import { _t as require_react, gt as require_jsx_runtime } from "../@base-ui/react+[...].mjs";
import { v as isRedirect } from "./react-router+[...].mjs";
import { o as QueryClientProvider } from "../tanstack__react-query.mjs";
import { c as hydrate, s as dehydrateQuery } from "../tanstack__query-core.mjs";
//#region ../../node_modules/.pnpm/@tanstack+router-ssr-query-core@1.169.3_@tanstack+query-core@5.105.0_@tanstack+router-core@1.171.39/node_modules/@tanstack/router-ssr-query-core/dist/esm/index.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var shouldDehydrateAllQueries = () => true;
function setupCoreRouterSsrQueryIntegration({ router, queryClient, dehydrateOptions, hydrateOptions, handleRedirects = true }) {
	{
		const originalDehydrate = router.options.dehydrate;
		let streamState;
		let cleanedUp = false;
		const finalizeQueryStream = (failure) => {
			const state = streamState;
			streamState = void 0;
			if (!state) return;
			state.unsubscribe();
			try {
				if (failure) state.controller.error(failure.error);
				else state.controller.close();
			} catch {}
		};
		const teardown = () => {
			cleanedUp = true;
			finalizeQueryStream();
			queryClient.clear();
		};
		router.serverSsrLifecycle = {
			...router.serverSsrLifecycle,
			onServerSsrAttach: [...router.serverSsrLifecycle?.onServerSsrAttach ?? [], (serverSsr) => serverSsr.onCleanup(teardown)]
		};
		router.options.dehydrate = async () => {
			let originalDehydrated;
			try {
				originalDehydrated = await originalDehydrate?.();
			} finally {
				if (cleanedUp) queryClient.clear();
			}
			if (cleanedUp) return;
			const currentDehydrateOptions = queryClient.getDefaultOptions().dehydrate;
			const shouldDehydrateQuery = dehydrateOptions?.shouldDehydrateQuery ?? currentDehydrateOptions?.shouldDehydrateQuery ?? shouldDehydrateAllQueries;
			const serializeData = dehydrateOptions?.serializeData ?? currentDehydrateOptions?.serializeData;
			const shouldRedactErrors = dehydrateOptions?.shouldRedactErrors ?? currentDehydrateOptions?.shouldRedactErrors;
			const initialQueries = new Array();
			const sentQueries = /* @__PURE__ */ new Set();
			for (const query of queryClient.getQueryCache().getAll()) if (shouldDehydrateQuery(query)) {
				initialQueries.push(dehydrateQuery(query, serializeData, shouldRedactErrors));
				sentQueries.add(query.queryHash);
			}
			let controller;
			const stream = new ReadableStream({ start(value) {
				controller = value;
			} });
			const flushPendingQueries = () => {
				const state = streamState;
				const queries = state?.pendingQueries;
				if (!state || !queries) return;
				state.pendingQueries = void 0;
				const dehydratedQueries = new Array();
				for (const query of queries.values()) {
					if (state.sentQueries.has(query.queryHash) || !shouldDehydrateQuery(query)) continue;
					dehydratedQueries.push(dehydrateQuery(query, serializeData, shouldRedactErrors));
					state.sentQueries.add(query.queryHash);
				}
				if (dehydratedQueries.length > 0) state.controller.enqueue(dehydratedQueries);
			};
			const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
				const state = streamState;
				if (!state) return;
				if (state.sentQueries.has(event.query.queryHash) || !event.query.promise) return;
				if (!state.pendingQueries) {
					state.pendingQueries = /* @__PURE__ */ new Map();
					queueMicrotask(() => {
						try {
							flushPendingQueries();
						} catch (error) {
							finalizeQueryStream({ error });
						}
					});
				}
				state.pendingQueries.set(event.query.queryHash, event.query);
			});
			streamState = {
				controller,
				sentQueries,
				unsubscribe
			};
			const finishRendering = () => {
				try {
					flushPendingQueries();
				} catch (error) {
					finalizeQueryStream({ error });
					return;
				}
				finalizeQueryStream();
			};
			router.serverSsr.onRenderFinished(finishRendering);
			return {
				...originalDehydrated,
				query: {
					...initialQueries.length > 0 && { initial: initialQueries },
					stream
				}
			};
		};
		return;
	}
	const originalHydrate = router.options.hydrate;
	router.options.hydrate = async (dehydrated) => {
		const query = dehydrated.query;
		try {
			await originalHydrate?.(dehydrated);
			if (query.initial) hydrate(queryClient, { queries: query.initial }, hydrateOptions);
		} catch (error) {
			query.stream.cancel(error).catch(() => {});
			throw error;
		}
		const reader = query.stream.getReader();
		(async () => {
			try {
				for (;;) {
					const { done, value } = await reader.read();
					if (done) return;
					hydrate(queryClient, { queries: value }, hydrateOptions);
				}
			} catch (error) {
				console.error("Error reading query stream:", error);
				reader.cancel(error).catch(() => {});
			} finally {
				reader.releaseLock();
			}
		})();
	};
	if (handleRedirects) {
		const originalMutationCacheConfig = queryClient.getMutationCache().config;
		queryClient.getMutationCache().config = {
			...originalMutationCacheConfig,
			onError: (error, ...rest) => {
				if (isRedirect(error)) {
					error.options._fromLocation = router.stores.location.get();
					return router.navigate(router.resolveRedirect(error).options);
				}
				return originalMutationCacheConfig.onError?.(error, ...rest);
			}
		};
		const originalQueryCacheConfig = queryClient.getQueryCache().config;
		queryClient.getQueryCache().config = {
			...originalQueryCacheConfig,
			onError: (error, ...rest) => {
				if (isRedirect(error)) {
					error.options._fromLocation = router.stores.location.get();
					return router.navigate(router.resolveRedirect(error).options);
				}
				return originalQueryCacheConfig.onError?.(error, ...rest);
			}
		};
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-router-ssr-query@1.167.3_@tanstack+query-core@5.105.0_@tanstack+react-q_04da3562e33ac1029858d95bef1d9c52/node_modules/@tanstack/react-router-ssr-query/dist/esm/index.js
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
