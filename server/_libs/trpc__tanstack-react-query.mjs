import "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "./@base-ui/react+[...].mjs";
import { f as skipToken } from "./tanstack__query-core.mjs";
import { n as infiniteQueryOptions, r as queryOptions } from "./tanstack__react-query.mjs";
import { A as isAsyncIterable, M as isObject, P as run, S as createRecursiveProxy, j as isFunction, l as callProcedure, r as getUntypedClient, t as TRPCUntypedClient } from "./trpc__client+trpc__server.mjs";
require_react();
require_jsx_runtime();
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var require_typeof = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports, module) {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPrimitive = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports, module) {
	var _typeof$1 = require_typeof()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_toPropertyKey = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports, module) {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_defineProperty = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports, module) {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectSpread2 = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports, module) {
	var defineProperty = require_defineProperty();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_asyncIterator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports, module) {
	function _asyncIterator$1(r) {
		var n, t, o, e = 2;
		for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) {
			if (t && null != (n = r[t])) return n.call(r);
			if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
			t = "@@asyncIterator", o = "@@iterator";
		}
		throw new TypeError("Object is not async iterable");
	}
	function AsyncFromSyncIterator(r) {
		function AsyncFromSyncIteratorContinuation(r$1) {
			if (Object(r$1) !== r$1) return Promise.reject(/* @__PURE__ */ new TypeError(r$1 + " is not an object."));
			var n = r$1.done;
			return Promise.resolve(r$1.value).then(function(r$2) {
				return {
					value: r$2,
					done: n
				};
			});
		}
		return AsyncFromSyncIterator = function AsyncFromSyncIterator$1(r$1) {
			this.s = r$1, this.n = r$1.next;
		}, AsyncFromSyncIterator.prototype = {
			s: null,
			n: null,
			next: function next() {
				return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
			},
			"return": function _return(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.resolve({
					value: r$1,
					done: !0
				}) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			},
			"throw": function _throw(r$1) {
				var n = this.s["return"];
				return void 0 === n ? Promise.reject(r$1) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
			}
		}, new AsyncFromSyncIterator(r);
	}
	module.exports = _asyncIterator$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectWithoutPropertiesLoose = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(exports, module) {
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (e.includes(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_objectWithoutProperties = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports, module) {
	var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
	function _objectWithoutProperties$1(e, t) {
		if (null == e) return {};
		var o, r, i = objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var s = Object.getOwnPropertySymbols(e);
			for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	module.exports = _objectWithoutProperties$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_objectSpread2$5 = __toESM(require_objectSpread2(), 1);
var import_asyncIterator = __toESM(require_asyncIterator(), 1);
var import_objectWithoutProperties = __toESM(require_objectWithoutProperties(), 1);
var _excluded = ["cursor", "direction"];
/**
* @internal
*/
function createTRPCOptionsResult(value) {
	return { path: value.path.join(".") };
}
function isPrefixedQueryKey(queryKey) {
	return queryKey.length >= 3;
}
function readQueryKey(queryKey) {
	if (isPrefixedQueryKey(queryKey)) return {
		type: "prefixed",
		prefix: queryKey[0],
		path: queryKey[1],
		args: queryKey[2]
	};
	else return {
		type: "unprefixed",
		prefix: void 0,
		path: queryKey[0],
		args: queryKey[1]
	};
}
/**
* @internal
*/
function getClientArgs(queryKey, opts, infiniteParams) {
	var _queryKeyData$args;
	const queryKeyData = readQueryKey(queryKey);
	let input = (_queryKeyData$args = queryKeyData.args) === null || _queryKeyData$args === void 0 ? void 0 : _queryKeyData$args.input;
	if (infiniteParams) {
		var _queryKeyData$args$in, _queryKeyData$args2;
		input = (0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, (_queryKeyData$args$in = (_queryKeyData$args2 = queryKeyData.args) === null || _queryKeyData$args2 === void 0 ? void 0 : _queryKeyData$args2.input) !== null && _queryKeyData$args$in !== void 0 ? _queryKeyData$args$in : {}), infiniteParams.pageParam !== void 0 ? { cursor: infiniteParams.pageParam } : {}), {}, { direction: infiniteParams.direction });
	}
	return [
		queryKeyData.path.join("."),
		input,
		opts === null || opts === void 0 ? void 0 : opts.trpc
	];
}
/**
* @internal
*/
async function buildQueryFromAsyncIterable(asyncIterable, queryClient, queryKey) {
	const query = queryClient.getQueryCache().build(queryClient, { queryKey });
	query.setState({
		data: [],
		status: "success"
	});
	const aggregate = [];
	var _iteratorAbruptCompletion = false;
	var _didIteratorError = false;
	var _iteratorError;
	try {
		for (var _iterator = (0, import_asyncIterator.default)(asyncIterable), _step; _iteratorAbruptCompletion = !(_step = await _iterator.next()).done; _iteratorAbruptCompletion = false) {
			const value = _step.value;
			aggregate.push(value);
			query.setState({ data: [...aggregate] });
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (_iteratorAbruptCompletion && _iterator.return != null) await _iterator.return();
		} finally {
			if (_didIteratorError) throw _iteratorError;
		}
	}
	return aggregate;
}
/**
* To allow easy interactions with groups of related queries, such as
* invalidating all queries of a router, we use an array as the path when
* storing in tanstack query.
*
* @internal
*/
function getQueryKeyInternal(opts) {
	const key = run(() => {
		const { input, type } = opts;
		const splitPath = opts.path.flatMap((part) => part.split("."));
		if (!input && type === "any") return splitPath.length ? [splitPath] : [];
		if (type === "infinite" && isObject(input) && ("direction" in input || "cursor" in input)) {
			const { cursor: _, direction: __ } = input;
			return [splitPath, {
				input: (0, import_objectWithoutProperties.default)(input, _excluded),
				type: "infinite"
			}];
		}
		return [splitPath, (0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, typeof input !== "undefined" && input !== skipToken && { input }), type && type !== "any" && { type })];
	});
	if (opts.prefix) key.unshift([opts.prefix]);
	return key;
}
/**
* @internal
*/
function getMutationKeyInternal(opts) {
	const key = [opts.path.flatMap((part) => part.split("."))];
	if (opts.prefix) key.unshift([opts.prefix]);
	return key;
}
/**
* @internal
*/
function unwrapLazyArg(valueOrLazy) {
	return isFunction(valueOrLazy) ? valueOrLazy() : valueOrLazy;
}
var import_objectSpread2$4 = __toESM(require_objectSpread2());
function trpcInfiniteQueryOptions(args) {
	var _opts$initialCursor;
	const { input, query, path, queryKey, opts } = args;
	const inputIsSkipToken = input === skipToken;
	const queryFn = async (queryFnContext) => {
		var _opts$trpc;
		return await query(...getClientArgs(queryKey, (0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts), {}, { trpc: (0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts === null || opts === void 0 ? void 0 : opts.trpc), (opts === null || opts === void 0 || (_opts$trpc = opts.trpc) === null || _opts$trpc === void 0 ? void 0 : _opts$trpc.abortOnUnmount) ? { signal: queryFnContext.signal } : { signal: null }) }), {
			direction: queryFnContext.direction,
			pageParam: queryFnContext.pageParam
		}));
	};
	return Object.assign(infiniteQueryOptions((0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts !== null && opts !== void 0 ? opts : {}), {}, {
		queryKey,
		queryFn: inputIsSkipToken ? skipToken : queryFn,
		initialPageParam: (_opts$initialCursor = opts === null || opts === void 0 ? void 0 : opts.initialCursor) !== null && _opts$initialCursor !== void 0 ? _opts$initialCursor : input === null || input === void 0 ? void 0 : input.cursor
	})), { trpc: createTRPCOptionsResult({ path }) });
}
var import_objectSpread2$3 = __toESM(require_objectSpread2());
/**
* @internal
*/
function trpcMutationOptions(args) {
	var _overrides$onSuccess;
	const { mutate, path, opts, overrides } = args;
	const queryClient = unwrapLazyArg(args.queryClient);
	const mutationKey = getMutationKeyInternal({
		path,
		prefix: opts === null || opts === void 0 ? void 0 : opts.keyPrefix
	});
	const defaultOpts = queryClient.defaultMutationOptions(queryClient.getMutationDefaults(mutationKey));
	const mutationSuccessOverride = (_overrides$onSuccess = overrides === null || overrides === void 0 ? void 0 : overrides.onSuccess) !== null && _overrides$onSuccess !== void 0 ? _overrides$onSuccess : (options) => options.originalFn();
	const mutationFn = async (input) => {
		return await mutate(...getClientArgs([...mutationKey, { input }], opts));
	};
	return (0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, opts), {}, {
		mutationKey,
		mutationFn,
		onSuccess(...args$1) {
			var _ref, _opts$meta;
			const originalFn = () => {
				var _opts$onSuccess, _opts$onSuccess2, _defaultOpts$onSucces;
				return (_opts$onSuccess = opts === null || opts === void 0 || (_opts$onSuccess2 = opts.onSuccess) === null || _opts$onSuccess2 === void 0 ? void 0 : _opts$onSuccess2.call(opts, ...args$1)) !== null && _opts$onSuccess !== void 0 ? _opts$onSuccess : defaultOpts === null || defaultOpts === void 0 || (_defaultOpts$onSucces = defaultOpts.onSuccess) === null || _defaultOpts$onSucces === void 0 ? void 0 : _defaultOpts$onSucces.call(defaultOpts, ...args$1);
			};
			return mutationSuccessOverride({
				originalFn,
				queryClient,
				meta: (_ref = (_opts$meta = opts === null || opts === void 0 ? void 0 : opts.meta) !== null && _opts$meta !== void 0 ? _opts$meta : defaultOpts === null || defaultOpts === void 0 ? void 0 : defaultOpts.meta) !== null && _ref !== void 0 ? _ref : {}
			});
		},
		trpc: createTRPCOptionsResult({ path })
	});
}
var import_objectSpread2$2 = __toESM(require_objectSpread2());
/**
* @internal
*/
function trpcQueryOptions(args) {
	const { input, query, path, queryKey, opts } = args;
	const queryClient = unwrapLazyArg(args.queryClient);
	const inputIsSkipToken = input === skipToken;
	const queryFn = async (queryFnContext) => {
		var _opts$trpc;
		const actualOpts = (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts), {}, { trpc: (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts === null || opts === void 0 ? void 0 : opts.trpc), (opts === null || opts === void 0 || (_opts$trpc = opts.trpc) === null || _opts$trpc === void 0 ? void 0 : _opts$trpc.abortOnUnmount) ? { signal: queryFnContext.signal } : { signal: null }) });
		const queryKey$1 = queryFnContext.queryKey;
		const result = await query(...getClientArgs(queryKey$1, actualOpts));
		if (isAsyncIterable(result)) return buildQueryFromAsyncIterable(result, queryClient, queryKey$1);
		return result;
	};
	return Object.assign(queryOptions((0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts), {}, {
		queryKey,
		queryFn: inputIsSkipToken ? skipToken : queryFn
	})), { trpc: createTRPCOptionsResult({ path }) });
}
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
/**
* @internal
*/
var trpcSubscriptionOptions = (args) => {
	var _readQueryKey;
	const { subscribe, path, queryKey, opts = {} } = args;
	const input = (_readQueryKey = readQueryKey(queryKey)) === null || _readQueryKey === void 0 || (_readQueryKey = _readQueryKey.args) === null || _readQueryKey === void 0 ? void 0 : _readQueryKey.input;
	const enabled = "enabled" in opts ? !!opts.enabled : input !== skipToken;
	const _subscribe = (innerOpts) => {
		return subscribe(path.join("."), input !== null && input !== void 0 ? input : void 0, innerOpts);
	};
	return (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
		enabled,
		subscribe: _subscribe,
		queryKey,
		trpc: createTRPCOptionsResult({ path })
	});
};
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
/**
* Create a typed proxy from your router types. Can also be used on the server.
*
* @see https://trpc.io/docs/client/tanstack-react-query/setup#3b-setup-without-react-context
* @see https://trpc.io/docs/client/tanstack-react-query/server-components#5-create-a-trpc-caller-for-server-components
*/
function createTRPCOptionsProxy(opts) {
	const prefix = opts.keyPrefix;
	const callIt = (type) => {
		return (path, input, trpcOpts) => {
			if ("router" in opts) return Promise.resolve(unwrapLazyArg(opts.ctx)).then((ctx) => callProcedure({
				router: opts.router,
				path,
				getRawInput: async () => input,
				ctx,
				type,
				signal: void 0,
				batchIndex: 0
			}));
			return (opts.client instanceof TRPCUntypedClient ? opts.client : getUntypedClient(opts.client))[type](path, input, trpcOpts);
		};
	};
	return createRecursiveProxy(({ args, path: _path }) => {
		const path = [..._path];
		const utilName = path.pop();
		const [arg1, arg2] = args;
		return {
			"~types": void 0,
			pathKey: () => {
				return getQueryKeyInternal({
					path,
					type: "any",
					prefix
				});
			},
			pathFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg1), {}, { queryKey: getQueryKeyInternal({
					path,
					type: "any",
					prefix
				}) });
			},
			queryOptions: () => {
				return trpcQueryOptions({
					input: arg1,
					opts: arg2,
					path,
					queryClient: opts.queryClient,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "query",
						prefix
					}),
					query: callIt("query")
				});
			},
			queryKey: () => {
				return getQueryKeyInternal({
					path,
					input: arg1,
					type: "query",
					prefix
				});
			},
			queryFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg2), {}, { queryKey: getQueryKeyInternal({
					path,
					input: arg1,
					type: "query",
					prefix
				}) });
			},
			infiniteQueryOptions: () => {
				return trpcInfiniteQueryOptions({
					input: arg1,
					opts: arg2,
					path,
					queryClient: opts.queryClient,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "infinite",
						prefix
					}),
					query: callIt("query")
				});
			},
			infiniteQueryKey: () => {
				return getQueryKeyInternal({
					path,
					input: arg1,
					type: "infinite",
					prefix
				});
			},
			infiniteQueryFilter: () => {
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, arg2), {}, { queryKey: getQueryKeyInternal({
					path,
					input: arg1,
					type: "infinite",
					prefix
				}) });
			},
			mutationOptions: () => {
				var _opts$overrides;
				return trpcMutationOptions({
					opts: arg1,
					path,
					queryClient: opts.queryClient,
					mutate: callIt("mutation"),
					overrides: (_opts$overrides = opts.overrides) === null || _opts$overrides === void 0 ? void 0 : _opts$overrides.mutations
				});
			},
			mutationKey: () => {
				return getMutationKeyInternal({
					path,
					prefix
				});
			},
			subscriptionOptions: () => {
				return trpcSubscriptionOptions({
					opts: arg2,
					path,
					queryKey: getQueryKeyInternal({
						path,
						input: arg1,
						type: "any",
						prefix
					}),
					subscribe: callIt("subscription")
				});
			}
		}[utilName]();
	});
}
//#endregion
export { createTRPCOptionsProxy as t };
