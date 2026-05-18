import { t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { r as getRequestHeader } from "./ssr.mjs";
import { t as SuperJSON } from "../_libs/superjson.mjs";
import { n as QueryCache, o as defaultShouldDehydrateQuery, t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { F as splitLink, a as httpBatchLink, i as loggerLink, n as createTRPCClient, o as httpLink, s as isNonJsonSerializable } from "../_libs/trpc__client+trpc__server.mjs";
import { t as createTRPCOptionsProxy } from "../_libs/trpc__tanstack-react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trpc-DhZOnnjr.js
var getBaseUrl = () => {
	if (typeof window !== "undefined") return window.location.origin;
	if (process.env.APP_URL) return process.env.APP_URL;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return "http://localhost:3001";
};
var trpcUrl = `${getBaseUrl()}/api/trpc`;
var getSsrCookie = () => {
	return getRequestHeader("cookie");
};
function withSsrCookieHeaders(headers) {
	const nextHeaders = new Headers(headers);
	const cookie = getSsrCookie();
	if (cookie) nextHeaders.set("cookie", cookie);
	return nextHeaders;
}
function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { staleTime: 60 * 1e3 },
			dehydrate: {
				serializeData: SuperJSON.serialize,
				shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending"
			},
			hydrate: { deserializeData: SuperJSON.deserialize }
		},
		queryCache: new QueryCache({ onError: (error) => {
			if (typeof window !== "undefined") globalErrorToast(error.message || "An unexpected error occurred");
		} })
	});
}
var browserQueryClient;
function getQueryClient() {
	if (typeof window === "undefined") return createQueryClient();
	if (!browserQueryClient) browserQueryClient = createQueryClient();
	return browserQueryClient;
}
function createAppTrpcClient() {
	return createTRPCClient({ links: [loggerLink({ enabled: (op) => op.direction === "down" && op.result instanceof Error }), splitLink({
		condition: (op) => op.type === "mutation" || op.path.startsWith("auth.") || isNonJsonSerializable(op.input),
		true: httpLink({
			url: trpcUrl,
			transformer: SuperJSON,
			async fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
					headers: withSsrCookieHeaders(options?.headers)
				});
			}
		}),
		false: httpBatchLink({
			url: trpcUrl,
			transformer: SuperJSON,
			async fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
					headers: withSsrCookieHeaders(options?.headers)
				});
			}
		})
	})] });
}
function createTrpc(queryClient) {
	return createTRPCOptionsProxy({
		client: createAppTrpcClient(),
		queryClient
	});
}
var trpc = createTrpc(getQueryClient());
//#endregion
export { getQueryClient as n, trpc as r, createTrpc as t };
