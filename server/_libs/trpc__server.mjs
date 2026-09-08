import { A as isAsyncIterable, C as getErrorShape, D as abortSignalsAnyPonyfill, E as require_objectSpread2, I as isObservable, L as observableToAsyncIterable, M as isObject, N as mergeWithoutOverrides, O as emptyObject, P as run, T as require_defineProperty, _ as isTrackedEnvelope, b as __commonJS, c as TRPCError, d as createRouterFactory, f as defaultFormatter, g as getTRPCErrorFromUnknown, h as getProcedureAtPath, j as isFunction, k as identity, m as getDataTransformer, p as defaultTransformer, u as createCallerFactory, v as mergeRouters, w as getHTTPStatusCode, x as __toESM, y as transformTRPCResponse } from "./trpc__client+trpc__server.mjs";
//#region ../../node_modules/.pnpm/@trpc+server@11.17.0_typescript@6.0.3/node_modules/@trpc/server/dist/resolveResponse-CdASWfAV.mjs
function parseConnectionParamsFromUnknown(parsed) {
	try {
		if (parsed === null) return null;
		if (!isObject(parsed)) throw new Error("Expected object");
		const nonStringValues = Object.entries(parsed).filter(([_key, value]) => typeof value !== "string");
		if (nonStringValues.length > 0) throw new Error(`Expected connectionParams to be string values. Got ${nonStringValues.map(([key, value]) => `${key}: ${typeof value}`).join(", ")}`);
		return parsed;
	} catch (cause) {
		throw new TRPCError({
			code: "PARSE_ERROR",
			message: "Invalid connection params shape",
			cause
		});
	}
}
function parseConnectionParamsFromString(str) {
	let parsed;
	try {
		parsed = JSON.parse(str);
	} catch (cause) {
		throw new TRPCError({
			code: "PARSE_ERROR",
			message: "Not JSON-parsable query params",
			cause
		});
	}
	return parseConnectionParamsFromUnknown(parsed);
}
var import_objectSpread2$1$4 = __toESM(require_objectSpread2(), 1);
function getAcceptHeader(headers) {
	var _ref, _headers$get;
	return (_ref = headers.get("trpc-accept")) !== null && _ref !== void 0 ? _ref : ((_headers$get = headers.get("accept")) === null || _headers$get === void 0 ? void 0 : _headers$get.split(",").some((t) => t.trim() === "application/jsonl")) ? "application/jsonl" : null;
}
/**
* Memoize a function that takes no arguments
* @internal
*/
function memo(fn) {
	let promise = null;
	const sym = Symbol.for("@trpc/server/http/memo");
	let value = sym;
	return {
		read: async () => {
			var _promise;
			if (value !== sym) return value;
			(_promise = promise) !== null && _promise !== void 0 || (promise = fn().catch((cause) => {
				if (cause instanceof TRPCError) throw cause;
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: cause instanceof Error ? cause.message : "Invalid input",
					cause
				});
			}));
			value = await promise;
			promise = null;
			return value;
		},
		result: () => {
			return value !== sym ? value : void 0;
		}
	};
}
var jsonContentTypeHandler = {
	isMatch(req) {
		var _req$headers$get;
		return !!((_req$headers$get = req.headers.get("content-type")) === null || _req$headers$get === void 0 ? void 0 : _req$headers$get.startsWith("application/json"));
	},
	async parse(opts) {
		var _types$values$next$va;
		const { req } = opts;
		const isBatchCall = opts.searchParams.get("batch") === "1";
		const maxBatchSize = opts.maxBatchSize;
		const paths = isBatchCall ? opts.path.split(",") : [opts.path];
		if (isBatchCall && typeof maxBatchSize === "number" && paths.length > maxBatchSize) throw new TRPCError({
			code: "BAD_REQUEST",
			message: `Batch call exceeds maximum size`
		});
		const getInputs = memo(async () => {
			let inputs = void 0;
			if (req.method === "GET") {
				const queryInput = opts.searchParams.get("input");
				if (queryInput) inputs = JSON.parse(queryInput);
			} else inputs = await req.json();
			if (inputs === void 0) return emptyObject();
			if (!isBatchCall) {
				const result = emptyObject();
				result[0] = opts.router._def._config.transformer.input.deserialize(inputs);
				return result;
			}
			if (!isObject(inputs)) throw new TRPCError({
				code: "BAD_REQUEST",
				message: "\"input\" needs to be an object when doing a batch call"
			});
			const acc = emptyObject();
			for (const index of paths.keys()) {
				const input = inputs[index];
				if (input !== void 0) acc[index] = opts.router._def._config.transformer.input.deserialize(input);
			}
			return acc;
		});
		const calls = await Promise.all(paths.map(async (path, index) => {
			const procedure = await getProcedureAtPath(opts.router, path);
			return {
				batchIndex: index,
				path,
				procedure,
				getRawInput: async () => {
					let input = (await getInputs.read())[index];
					if ((procedure === null || procedure === void 0 ? void 0 : procedure._def.type) === "subscription") {
						var _ref2, _opts$headers$get;
						const lastEventId = (_ref2 = (_opts$headers$get = opts.headers.get("last-event-id")) !== null && _opts$headers$get !== void 0 ? _opts$headers$get : opts.searchParams.get("lastEventId")) !== null && _ref2 !== void 0 ? _ref2 : opts.searchParams.get("Last-Event-Id");
						if (lastEventId) if (isObject(input)) input = (0, import_objectSpread2$1$4.default)((0, import_objectSpread2$1$4.default)({}, input), {}, { lastEventId });
						else {
							var _input;
							(_input = input) !== null && _input !== void 0 || (input = { lastEventId });
						}
					}
					return input;
				},
				result: () => {
					var _getInputs$result;
					return (_getInputs$result = getInputs.result()) === null || _getInputs$result === void 0 ? void 0 : _getInputs$result[index];
				}
			};
		}));
		const types = new Set(calls.map((call) => {
			var _call$procedure;
			return (_call$procedure = call.procedure) === null || _call$procedure === void 0 ? void 0 : _call$procedure._def.type;
		}).filter(Boolean));
		/* istanbul ignore if -- @preserve */
		if (types.size > 1) throw new TRPCError({
			code: "BAD_REQUEST",
			message: `Cannot mix procedure types in call: ${Array.from(types).join(", ")}`
		});
		const type = (_types$values$next$va = types.values().next().value) !== null && _types$values$next$va !== void 0 ? _types$values$next$va : "unknown";
		const connectionParamsStr = opts.searchParams.get("connectionParams");
		return {
			isBatchCall,
			accept: getAcceptHeader(req.headers),
			calls,
			type,
			connectionParams: connectionParamsStr === null ? null : parseConnectionParamsFromString(connectionParamsStr),
			signal: req.signal,
			url: opts.url
		};
	}
};
var handlers = [
	jsonContentTypeHandler,
	{
		isMatch(req) {
			var _req$headers$get2;
			return !!((_req$headers$get2 = req.headers.get("content-type")) === null || _req$headers$get2 === void 0 ? void 0 : _req$headers$get2.startsWith("multipart/form-data"));
		},
		async parse(opts) {
			const { req } = opts;
			if (req.method !== "POST") throw new TRPCError({
				code: "METHOD_NOT_SUPPORTED",
				message: "Only POST requests are supported for multipart/form-data requests"
			});
			const getInputs = memo(async () => {
				return await req.formData();
			});
			const procedure = await getProcedureAtPath(opts.router, opts.path);
			return {
				accept: null,
				calls: [{
					batchIndex: 0,
					path: opts.path,
					getRawInput: getInputs.read,
					result: getInputs.result,
					procedure
				}],
				isBatchCall: false,
				type: "mutation",
				connectionParams: null,
				signal: req.signal,
				url: opts.url
			};
		}
	},
	{
		isMatch(req) {
			var _req$headers$get3;
			return !!((_req$headers$get3 = req.headers.get("content-type")) === null || _req$headers$get3 === void 0 ? void 0 : _req$headers$get3.startsWith("application/octet-stream"));
		},
		async parse(opts) {
			const { req } = opts;
			if (req.method !== "POST") throw new TRPCError({
				code: "METHOD_NOT_SUPPORTED",
				message: "Only POST requests are supported for application/octet-stream requests"
			});
			const getInputs = memo(async () => {
				return req.body;
			});
			return {
				calls: [{
					batchIndex: 0,
					path: opts.path,
					getRawInput: getInputs.read,
					result: getInputs.result,
					procedure: await getProcedureAtPath(opts.router, opts.path)
				}],
				isBatchCall: false,
				accept: null,
				type: "mutation",
				connectionParams: null,
				signal: req.signal,
				url: opts.url
			};
		}
	}
];
function getContentTypeHandler(req) {
	const handler = handlers.find((handler$1) => handler$1.isMatch(req));
	if (handler) return handler;
	if (!handler && req.method === "GET") return jsonContentTypeHandler;
	throw new TRPCError({
		code: "UNSUPPORTED_MEDIA_TYPE",
		message: req.headers.has("content-type") ? `Unsupported content-type "${req.headers.get("content-type")}` : "Missing content-type header"
	});
}
async function getRequestInfo(opts) {
	return await getContentTypeHandler(opts.req).parse(opts);
}
function isAbortError(error) {
	return isObject(error) && error["name"] === "AbortError";
}
function throwAbortError(message = "AbortError") {
	throw new DOMException(message, "AbortError");
}
/*!
* is-plain-object <https://github.com/jonschlinkert/is-plain-object>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
function isObject$1(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject(o) {
	var ctor, prot;
	if (isObject$1(o) === false) return false;
	ctor = o.constructor;
	if (ctor === void 0) return true;
	prot = ctor.prototype;
	if (isObject$1(prot) === false) return false;
	if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
	return true;
}
var import_defineProperty$1 = __toESM(require_defineProperty(), 1);
var _Symbol$toStringTag;
/** Memory safe (weakmapped) cache of the ProxyPromise for each Promise,
* which is retained for the lifetime of the original Promise.
*/
var subscribableCache = /* @__PURE__ */ new WeakMap();
/** A NOOP function allowing a consistent interface for settled
* SubscribedPromises (settled promises are not subscribed - they resolve
* immediately). */
var NOOP = () => {};
_Symbol$toStringTag = Symbol.toStringTag;
/**
* Every `Promise<T>` can be shadowed by a single `ProxyPromise<T>`. It is
* created once, cached and reused throughout the lifetime of the Promise. Get a
* Promise's ProxyPromise using `Unpromise.proxy(promise)`.
*
* The `ProxyPromise<T>` attaches handlers to the original `Promise<T>`
* `.then()` and `.catch()` just once. Promises derived from it use a
* subscription- (and unsubscription-) based mechanism that monitors these
* handlers.
*
* Every time you call `.subscribe()`, `.then()` `.catch()` or `.finally()` on a
* `ProxyPromise<T>` it returns a `SubscribedPromise<T>` having an additional
* `unsubscribe()` method. Calling `unsubscribe()` detaches reference chains
* from the original, potentially long-lived Promise, eliminating memory leaks.
*
* This approach can eliminate the memory leaks that otherwise come about from
* repeated `race()` or `any()` calls invoking `.then()` and `.catch()` multiple
* times on the same long-lived native Promise (subscriptions which can never be
* cleaned up).
*
* `Unpromise.race(promises)` is a reference implementation of `Promise.race`
* avoiding memory leaks when using long-lived unsettled Promises.
*
* `Unpromise.any(promises)` is a reference implementation of `Promise.any`
* avoiding memory leaks when using long-lived unsettled Promises.
*
* `Unpromise.resolve(promise)` returns an ephemeral `SubscribedPromise<T>` for
* any given `Promise<T>` facilitating arbitrary async/await patterns. Behind
* the scenes, `resolve` is implemented simply as
* `Unpromise.proxy(promise).subscribe()`. Don't forget to call `.unsubscribe()`
* to tidy up!
*
*/
var Unpromise = class Unpromise {
	constructor(arg) {
		(0, import_defineProperty$1.default)(this, "promise", void 0);
		(0, import_defineProperty$1.default)(this, "subscribers", []);
		(0, import_defineProperty$1.default)(this, "settlement", null);
		(0, import_defineProperty$1.default)(this, _Symbol$toStringTag, "Unpromise");
		if (typeof arg === "function") this.promise = new Promise(arg);
		else this.promise = arg;
		const thenReturn = this.promise.then((value) => {
			const { subscribers } = this;
			this.subscribers = null;
			this.settlement = {
				status: "fulfilled",
				value
			};
			subscribers === null || subscribers === void 0 || subscribers.forEach(({ resolve }) => {
				resolve(value);
			});
		});
		if ("catch" in thenReturn) thenReturn.catch((reason) => {
			const { subscribers } = this;
			this.subscribers = null;
			this.settlement = {
				status: "rejected",
				reason
			};
			subscribers === null || subscribers === void 0 || subscribers.forEach(({ reject }) => {
				reject(reason);
			});
		});
	}
	/** Create a promise that mitigates uncontrolled subscription to a long-lived
	* Promise via .then() and .catch() - otherwise a source of memory leaks.
	*
	* The returned promise has an `unsubscribe()` method which can be called when
	* the Promise is no longer being tracked by application logic, and which
	* ensures that there is no reference chain from the original promise to the
	* new one, and therefore no memory leak.
	*
	* If original promise has not yet settled, this adds a new unique promise
	* that listens to then/catch events, along with an `unsubscribe()` method to
	* detach it.
	*
	* If original promise has settled, then creates a new Promise.resolve() or
	* Promise.reject() and provided unsubscribe is a noop.
	*
	* If you call `unsubscribe()` before the returned Promise has settled, it
	* will never settle.
	*/
	subscribe() {
		let promise;
		let unsubscribe;
		const { settlement } = this;
		if (settlement === null) {
			if (this.subscribers === null) throw new Error("Unpromise settled but still has subscribers");
			const subscriber = withResolvers();
			this.subscribers = listWithMember(this.subscribers, subscriber);
			promise = subscriber.promise;
			unsubscribe = () => {
				if (this.subscribers !== null) this.subscribers = listWithoutMember(this.subscribers, subscriber);
			};
		} else {
			const { status } = settlement;
			if (status === "fulfilled") promise = Promise.resolve(settlement.value);
			else promise = Promise.reject(settlement.reason);
			unsubscribe = NOOP;
		}
		return Object.assign(promise, { unsubscribe });
	}
	/** STANDARD PROMISE METHODS (but returning a SubscribedPromise) */
	then(onfulfilled, onrejected) {
		const subscribed = this.subscribe();
		const { unsubscribe } = subscribed;
		return Object.assign(subscribed.then(onfulfilled, onrejected), { unsubscribe });
	}
	catch(onrejected) {
		const subscribed = this.subscribe();
		const { unsubscribe } = subscribed;
		return Object.assign(subscribed.catch(onrejected), { unsubscribe });
	}
	finally(onfinally) {
		const subscribed = this.subscribe();
		const { unsubscribe } = subscribed;
		return Object.assign(subscribed.finally(onfinally), { unsubscribe });
	}
	/** Unpromise STATIC METHODS */
	/** Create or Retrieve the proxy Unpromise (a re-used Unpromise for the VM lifetime
	* of the provided Promise reference) */
	static proxy(promise) {
		const cached = Unpromise.getSubscribablePromise(promise);
		return typeof cached !== "undefined" ? cached : Unpromise.createSubscribablePromise(promise);
	}
	/** Create and store an Unpromise keyed by an original Promise. */
	static createSubscribablePromise(promise) {
		const created = new Unpromise(promise);
		subscribableCache.set(promise, created);
		subscribableCache.set(created, created);
		return created;
	}
	/** Retrieve a previously-created Unpromise keyed by an original Promise. */
	static getSubscribablePromise(promise) {
		return subscribableCache.get(promise);
	}
	/** Promise STATIC METHODS */
	/** Lookup the Unpromise for this promise, and derive a SubscribedPromise from
	* it (that can be later unsubscribed to eliminate Memory leaks) */
	static resolve(value) {
		const promise = typeof value === "object" && value !== null && "then" in value && typeof value.then === "function" ? value : Promise.resolve(value);
		return Unpromise.proxy(promise).subscribe();
	}
	static async any(values) {
		const subscribedPromises = (Array.isArray(values) ? values : [...values]).map(Unpromise.resolve);
		try {
			return await Promise.any(subscribedPromises);
		} finally {
			subscribedPromises.forEach(({ unsubscribe }) => {
				unsubscribe();
			});
		}
	}
	static async race(values) {
		const subscribedPromises = (Array.isArray(values) ? values : [...values]).map(Unpromise.resolve);
		try {
			return await Promise.race(subscribedPromises);
		} finally {
			subscribedPromises.forEach(({ unsubscribe }) => {
				unsubscribe();
			});
		}
	}
	/** Create a race of SubscribedPromises that will fulfil to a single winning
	* Promise (in a 1-Tuple). Eliminates memory leaks from long-lived promises
	* accumulating .then() and .catch() subscribers. Allows simple logic to
	* consume the result, like...
	* ```ts
	* const [ winner ] = await Unpromise.race([ promiseA, promiseB ]);
	* if(winner === promiseB){
	*   const result = await promiseB;
	*   // do the thing
	* }
	* ```
	* */
	static async raceReferences(promises) {
		const selfPromises = promises.map(resolveSelfTuple);
		try {
			return await Promise.race(selfPromises);
		} finally {
			for (const promise of selfPromises) promise.unsubscribe();
		}
	}
};
/** Promises a 1-tuple containing the original promise when it resolves. Allows
* awaiting the eventual Promise ***reference*** (easy to destructure and
* exactly compare with ===). Avoids resolving to the Promise ***value*** (which
* may be ambiguous and therefore hard to identify as the winner of a race).
* You can call unsubscribe on the Promise to mitigate memory leaks.
* */
function resolveSelfTuple(promise) {
	return Unpromise.proxy(promise).then(() => [promise]);
}
/** VENDORED (Future) PROMISE UTILITIES */
/** Reference implementation of https://github.com/tc39/proposal-promise-with-resolvers */
function withResolvers() {
	let resolve;
	let reject;
	return {
		promise: new Promise((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		}),
		resolve,
		reject
	};
}
/** IMMUTABLE LIST OPERATIONS */
function listWithMember(arr, member) {
	return [...arr, member];
}
function listWithoutIndex(arr, index) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
function listWithoutMember(arr, member) {
	const index = arr.indexOf(member);
	if (index !== -1) return listWithoutIndex(arr, index);
	return arr;
}
var _Symbol, _Symbol$dispose, _Symbol2, _Symbol2$asyncDispose;
(_Symbol$dispose = (_Symbol = Symbol).dispose) !== null && _Symbol$dispose !== void 0 || (_Symbol.dispose = Symbol());
(_Symbol2$asyncDispose = (_Symbol2 = Symbol).asyncDispose) !== null && _Symbol2$asyncDispose !== void 0 || (_Symbol2.asyncDispose = Symbol());
/**
* Takes a value and a dispose function and returns a new object that implements the Disposable interface.
* The returned object is the original value augmented with a Symbol.dispose method.
* @param thing The value to make disposable
* @param dispose Function to call when disposing the resource
* @returns The original value with Symbol.dispose method added
*/
function makeResource(thing, dispose) {
	const it = thing;
	const existing = it[Symbol.dispose];
	it[Symbol.dispose] = () => {
		dispose();
		existing === null || existing === void 0 || existing();
	};
	return it;
}
/**
* Takes a value and an async dispose function and returns a new object that implements the AsyncDisposable interface.
* The returned object is the original value augmented with a Symbol.asyncDispose method.
* @param thing The value to make async disposable
* @param dispose Async function to call when disposing the resource
* @returns The original value with Symbol.asyncDispose method added
*/
function makeAsyncResource(thing, dispose) {
	const it = thing;
	const existing = it[Symbol.asyncDispose];
	it[Symbol.asyncDispose] = async () => {
		await dispose();
		await (existing === null || existing === void 0 ? void 0 : existing());
	};
	return it;
}
var disposablePromiseTimerResult = Symbol();
function timerResource(ms) {
	let timer = null;
	return makeResource({ start() {
		if (timer) throw new Error("Timer already started");
		return new Promise((resolve) => {
			timer = setTimeout(() => resolve(disposablePromiseTimerResult), ms);
		});
	} }, () => {
		if (timer) clearTimeout(timer);
	});
}
var require_usingCtx = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(exports, module) {
	function _usingCtx() {
		var r = "function" == typeof SuppressedError ? SuppressedError : function(r$1, e$1) {
			var n$1 = Error();
			return n$1.name = "SuppressedError", n$1.error = r$1, n$1.suppressed = e$1, n$1;
		}, e = {}, n = [];
		function using(r$1, e$1) {
			if (null != e$1) {
				if (Object(e$1) !== e$1) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
				if (r$1) var o = e$1[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];
				if (void 0 === o && (o = e$1[Symbol.dispose || Symbol["for"]("Symbol.dispose")], r$1)) var t = o;
				if ("function" != typeof o) throw new TypeError("Object is not disposable.");
				t && (o = function o$1() {
					try {
						t.call(e$1);
					} catch (r$2) {
						return Promise.reject(r$2);
					}
				}), n.push({
					v: e$1,
					d: o,
					a: r$1
				});
			} else r$1 && n.push({
				d: e$1,
				a: r$1
			});
			return e$1;
		}
		return {
			e,
			u: using.bind(null, !1),
			a: using.bind(null, !0),
			d: function d() {
				var o, t = this.e, s = 0;
				function next() {
					for (; o = n.pop();) try {
						if (!o.a && 1 === s) return s = 0, n.push(o), Promise.resolve().then(next);
						if (o.d) {
							var r$1 = o.d.call(o.v);
							if (o.a) return s |= 2, Promise.resolve(r$1).then(next, err);
						} else s |= 1;
					} catch (r$2) {
						return err(r$2);
					}
					if (1 === s) return t !== e ? Promise.reject(t) : Promise.resolve();
					if (t !== e) throw t;
				}
				function err(n$1) {
					return t = t !== e ? new r(n$1, t) : n$1, next();
				}
				return next();
			}
		};
	}
	module.exports = _usingCtx, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_OverloadYield = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(exports, module) {
	function _OverloadYield(e, d) {
		this.v = e, this.k = d;
	}
	module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_awaitAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(exports, module) {
	var OverloadYield$2 = require_OverloadYield();
	function _awaitAsyncGenerator$5(e) {
		return new OverloadYield$2(e, 0);
	}
	module.exports = _awaitAsyncGenerator$5, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var require_wrapAsyncGenerator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(exports, module) {
	var OverloadYield$1 = require_OverloadYield();
	function _wrapAsyncGenerator$6(e) {
		return function() {
			return new AsyncGenerator(e.apply(this, arguments));
		};
	}
	function AsyncGenerator(e) {
		var r, t;
		function resume(r$1, t$1) {
			try {
				var n = e[r$1](t$1), o = n.value, u = o instanceof OverloadYield$1;
				Promise.resolve(u ? o.v : o).then(function(t$2) {
					if (u) {
						var i = "return" === r$1 ? "return" : "next";
						if (!o.k || t$2.done) return resume(i, t$2);
						t$2 = e[i](t$2).value;
					}
					settle(n.done ? "return" : "normal", t$2);
				}, function(e$1) {
					resume("throw", e$1);
				});
			} catch (e$1) {
				settle("throw", e$1);
			}
		}
		function settle(e$1, n) {
			switch (e$1) {
				case "return":
					r.resolve({
						value: n,
						done: !0
					});
					break;
				case "throw":
					r.reject(n);
					break;
				default: r.resolve({
					value: n,
					done: !1
				});
			}
			(r = r.next) ? resume(r.key, r.arg) : t = null;
		}
		this._invoke = function(e$1, n) {
			return new Promise(function(o, u) {
				var i = {
					key: e$1,
					arg: n,
					resolve: o,
					reject: u,
					next: null
				};
				t ? t = t.next = i : (r = t = i, resume(e$1, n));
			});
		}, "function" != typeof e["return"] && (this["return"] = void 0);
	}
	AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
		return this;
	}, AsyncGenerator.prototype.next = function(e) {
		return this._invoke("next", e);
	}, AsyncGenerator.prototype["throw"] = function(e) {
		return this._invoke("throw", e);
	}, AsyncGenerator.prototype["return"] = function(e) {
		return this._invoke("return", e);
	};
	module.exports = _wrapAsyncGenerator$6, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_usingCtx$4 = __toESM(require_usingCtx(), 1);
var import_awaitAsyncGenerator$4 = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$5 = __toESM(require_wrapAsyncGenerator(), 1);
function iteratorResource(iterable) {
	const iterator = iterable[Symbol.asyncIterator]();
	if (iterator[Symbol.asyncDispose]) return iterator;
	return makeAsyncResource(iterator, async () => {
		var _iterator$return;
		await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
	});
}
/**
* Derives a new {@link AsyncGenerator} based of {@link iterable}, that yields its first
* {@link count} values. Then, a grace period of {@link gracePeriodMs} is started in which further
* values may still come through. After this period, the generator aborts.
*/
function takeWithGrace(_x, _x2) {
	return _takeWithGrace.apply(this, arguments);
}
function _takeWithGrace() {
	_takeWithGrace = (0, import_wrapAsyncGenerator$5.default)(function* (iterable, opts) {
		try {
			var _usingCtx$1 = (0, import_usingCtx$4.default)();
			const iterator = _usingCtx$1.a(iteratorResource(iterable));
			let result;
			const timer = _usingCtx$1.u(timerResource(opts.gracePeriodMs));
			let count = opts.count;
			let timerPromise = new Promise(() => {});
			while (true) {
				result = yield (0, import_awaitAsyncGenerator$4.default)(Unpromise.race([iterator.next(), timerPromise]));
				if (result === disposablePromiseTimerResult) throwAbortError();
				if (result.done) return result.value;
				yield result.value;
				if (--count === 0) timerPromise = timer.start();
				result = null;
			}
		} catch (_) {
			_usingCtx$1.e = _;
		} finally {
			yield (0, import_awaitAsyncGenerator$4.default)(_usingCtx$1.d());
		}
	});
	return _takeWithGrace.apply(this, arguments);
}
function createDeferred() {
	let resolve;
	let reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
var import_usingCtx$3 = __toESM(require_usingCtx(), 1);
var import_awaitAsyncGenerator$3 = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$4 = __toESM(require_wrapAsyncGenerator(), 1);
function createManagedIterator(iterable, onResult) {
	const iterator = iterable[Symbol.asyncIterator]();
	let state = "idle";
	function cleanup() {
		state = "done";
		onResult = () => {};
	}
	function pull() {
		if (state !== "idle") return;
		state = "pending";
		iterator.next().then((result) => {
			if (result.done) {
				state = "done";
				onResult({
					status: "return",
					value: result.value
				});
				cleanup();
				return;
			}
			state = "idle";
			onResult({
				status: "yield",
				value: result.value
			});
		}).catch((cause) => {
			onResult({
				status: "error",
				error: cause
			});
			cleanup();
		});
	}
	return {
		pull,
		destroy: async () => {
			var _iterator$return;
			cleanup();
			await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
		}
	};
}
/**
* Creates a new async iterable that merges multiple async iterables into a single stream.
* Values from the input iterables are yielded in the order they resolve, similar to Promise.race().
*
* New iterables can be added dynamically using the returned {@link MergedAsyncIterables.add} method, even after iteration has started.
*
* If any of the input iterables throws an error, that error will be propagated through the merged stream.
* Other iterables will not continue to be processed.
*
* @template TYield The type of values yielded by the input iterables
*/
function mergeAsyncIterables() {
	let state = "idle";
	let flushSignal = createDeferred();
	/**
	* used while {@link state} is `idle`
	*/
	const iterables = [];
	/**
	* used while {@link state} is `pending`
	*/
	const iterators = /* @__PURE__ */ new Set();
	const buffer = [];
	function initIterable(iterable) {
		if (state !== "pending") return;
		const iterator = createManagedIterator(iterable, (result) => {
			if (state !== "pending") return;
			switch (result.status) {
				case "yield":
					buffer.push([iterator, result]);
					break;
				case "return":
					iterators.delete(iterator);
					break;
				case "error":
					buffer.push([iterator, result]);
					iterators.delete(iterator);
					break;
			}
			flushSignal.resolve();
		});
		iterators.add(iterator);
		iterator.pull();
	}
	return {
		add(iterable) {
			switch (state) {
				case "idle":
					iterables.push(iterable);
					break;
				case "pending":
					initIterable(iterable);
					break;
				case "done": break;
			}
		},
		[Symbol.asyncIterator]() {
			return (0, import_wrapAsyncGenerator$4.default)(function* () {
				try {
					var _usingCtx$1 = (0, import_usingCtx$3.default)();
					if (state !== "idle") throw new Error("Cannot iterate twice");
					state = "pending";
					_usingCtx$1.a(makeAsyncResource({}, async () => {
						state = "done";
						const errors = [];
						await Promise.all(Array.from(iterators.values()).map(async (it) => {
							try {
								await it.destroy();
							} catch (cause) {
								errors.push(cause);
							}
						}));
						buffer.length = 0;
						iterators.clear();
						flushSignal.resolve();
						if (errors.length > 0) throw new AggregateError(errors);
					}));
					while (iterables.length > 0) initIterable(iterables.shift());
					while (iterators.size > 0) {
						yield (0, import_awaitAsyncGenerator$3.default)(flushSignal.promise);
						while (buffer.length > 0) {
							const [iterator, result] = buffer.shift();
							switch (result.status) {
								case "yield":
									yield result.value;
									iterator.pull();
									break;
								case "error": throw result.error;
							}
						}
						flushSignal = createDeferred();
					}
				} catch (_) {
					_usingCtx$1.e = _;
				} finally {
					yield (0, import_awaitAsyncGenerator$3.default)(_usingCtx$1.d());
				}
			})();
		}
	};
}
/**
* Creates a ReadableStream from an AsyncIterable.
*
* @param iterable - The source AsyncIterable to stream from
* @returns A ReadableStream that yields values from the AsyncIterable
*/
function readableStreamFrom(iterable) {
	const iterator = iterable[Symbol.asyncIterator]();
	return new ReadableStream({
		async cancel() {
			var _iterator$return;
			await ((_iterator$return = iterator.return) === null || _iterator$return === void 0 ? void 0 : _iterator$return.call(iterator));
		},
		async pull(controller) {
			const result = await iterator.next();
			if (result.done) {
				controller.close();
				return;
			}
			controller.enqueue(result.value);
		}
	});
}
var import_usingCtx$2 = __toESM(require_usingCtx(), 1);
var import_awaitAsyncGenerator$2 = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$3 = __toESM(require_wrapAsyncGenerator(), 1);
var PING_SYM = Symbol("ping");
/**
* Derives a new {@link AsyncGenerator} based of {@link iterable}, that yields {@link PING_SYM}
* whenever no value has been yielded for {@link pingIntervalMs}.
*/
function withPing(_x, _x2) {
	return _withPing.apply(this, arguments);
}
function _withPing() {
	_withPing = (0, import_wrapAsyncGenerator$3.default)(function* (iterable, pingIntervalMs) {
		try {
			var _usingCtx$1 = (0, import_usingCtx$2.default)();
			const iterator = _usingCtx$1.a(iteratorResource(iterable));
			let result;
			let nextPromise = iterator.next();
			while (true) try {
				var _usingCtx3 = (0, import_usingCtx$2.default)();
				const pingPromise = _usingCtx3.u(timerResource(pingIntervalMs));
				result = yield (0, import_awaitAsyncGenerator$2.default)(Unpromise.race([nextPromise, pingPromise.start()]));
				if (result === disposablePromiseTimerResult) {
					yield PING_SYM;
					continue;
				}
				if (result.done) return result.value;
				nextPromise = iterator.next();
				yield result.value;
				result = null;
			} catch (_) {
				_usingCtx3.e = _;
			} finally {
				_usingCtx3.d();
			}
		} catch (_) {
			_usingCtx$1.e = _;
		} finally {
			yield (0, import_awaitAsyncGenerator$2.default)(_usingCtx$1.d());
		}
	});
	return _withPing.apply(this, arguments);
}
var require_asyncIterator = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(exports, module) {
	function _asyncIterator$2(r) {
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
	module.exports = _asyncIterator$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_awaitAsyncGenerator$1 = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$2 = __toESM(require_wrapAsyncGenerator(), 1);
var import_usingCtx$1 = __toESM(require_usingCtx(), 1);
var import_asyncIterator$1 = __toESM(require_asyncIterator(), 1);
var CHUNK_VALUE_TYPE_PROMISE = 0;
var CHUNK_VALUE_TYPE_ASYNC_ITERABLE = 1;
var PROMISE_STATUS_FULFILLED = 0;
var PROMISE_STATUS_REJECTED = 1;
var ASYNC_ITERABLE_STATUS_RETURN = 0;
var ASYNC_ITERABLE_STATUS_YIELD = 1;
var ASYNC_ITERABLE_STATUS_ERROR = 2;
function isPromise(value) {
	return (isObject(value) || isFunction(value)) && typeof (value === null || value === void 0 ? void 0 : value["then"]) === "function" && typeof (value === null || value === void 0 ? void 0 : value["catch"]) === "function";
}
var MaxDepthError = class extends Error {
	constructor(path) {
		super("Max depth reached at path: " + path.join("."));
		this.path = path;
	}
};
function createBatchStreamProducer(_x3) {
	return _createBatchStreamProducer.apply(this, arguments);
}
function _createBatchStreamProducer() {
	_createBatchStreamProducer = (0, import_wrapAsyncGenerator$2.default)(function* (opts) {
		const { data } = opts;
		let counter = 0;
		const placeholder = 0;
		const mergedIterables = mergeAsyncIterables();
		function registerAsync(callback) {
			const idx = counter++;
			const iterable$1 = callback(idx);
			mergedIterables.add(iterable$1);
			return idx;
		}
		function encodePromise(promise, path) {
			return registerAsync(/* @__PURE__ */ function() {
				var _ref = (0, import_wrapAsyncGenerator$2.default)(function* (idx) {
					const error = checkMaxDepth(path);
					if (error) {
						promise.catch((cause) => {
							var _opts$onError;
							(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
								error: cause,
								path
							});
						});
						promise = Promise.reject(error);
					}
					try {
						yield [
							idx,
							PROMISE_STATUS_FULFILLED,
							encode(yield (0, import_awaitAsyncGenerator$1.default)(promise), path)
						];
					} catch (cause) {
						var _opts$onError2, _opts$formatError;
						(_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, {
							error: cause,
							path
						});
						yield [
							idx,
							PROMISE_STATUS_REJECTED,
							(_opts$formatError = opts.formatError) === null || _opts$formatError === void 0 ? void 0 : _opts$formatError.call(opts, {
								error: cause,
								path
							})
						];
					}
				});
				return function(_x) {
					return _ref.apply(this, arguments);
				};
			}());
		}
		function encodeAsyncIterable(iterable$1, path) {
			return registerAsync(/* @__PURE__ */ function() {
				var _ref2 = (0, import_wrapAsyncGenerator$2.default)(function* (idx) {
					try {
						var _usingCtx$1 = (0, import_usingCtx$1.default)();
						const error = checkMaxDepth(path);
						if (error) throw error;
						const iterator = _usingCtx$1.a(iteratorResource(iterable$1));
						try {
							while (true) {
								const next = yield (0, import_awaitAsyncGenerator$1.default)(iterator.next());
								if (next.done) {
									yield [
										idx,
										ASYNC_ITERABLE_STATUS_RETURN,
										encode(next.value, path)
									];
									break;
								}
								yield [
									idx,
									ASYNC_ITERABLE_STATUS_YIELD,
									encode(next.value, path)
								];
							}
						} catch (cause) {
							var _opts$onError3, _opts$formatError2;
							(_opts$onError3 = opts.onError) === null || _opts$onError3 === void 0 || _opts$onError3.call(opts, {
								error: cause,
								path
							});
							yield [
								idx,
								ASYNC_ITERABLE_STATUS_ERROR,
								(_opts$formatError2 = opts.formatError) === null || _opts$formatError2 === void 0 ? void 0 : _opts$formatError2.call(opts, {
									error: cause,
									path
								})
							];
						}
					} catch (_) {
						_usingCtx$1.e = _;
					} finally {
						yield (0, import_awaitAsyncGenerator$1.default)(_usingCtx$1.d());
					}
				});
				return function(_x2) {
					return _ref2.apply(this, arguments);
				};
			}());
		}
		function checkMaxDepth(path) {
			if (opts.maxDepth && path.length > opts.maxDepth) return new MaxDepthError(path);
			return null;
		}
		function encodeAsync(value, path) {
			if (isPromise(value)) return [CHUNK_VALUE_TYPE_PROMISE, encodePromise(value, path)];
			if (isAsyncIterable(value)) {
				if (opts.maxDepth && path.length >= opts.maxDepth) throw new Error("Max depth reached");
				return [CHUNK_VALUE_TYPE_ASYNC_ITERABLE, encodeAsyncIterable(value, path)];
			}
			return null;
		}
		function encode(value, path) {
			if (value === void 0) return [[]];
			const reg = encodeAsync(value, path);
			if (reg) return [[placeholder], [null, ...reg]];
			if (!isPlainObject(value)) return [[value]];
			const newObj = emptyObject();
			const asyncValues = [];
			for (const [key, item] of Object.entries(value)) {
				const transformed = encodeAsync(item, [...path, key]);
				if (!transformed) {
					newObj[key] = item;
					continue;
				}
				newObj[key] = placeholder;
				asyncValues.push([key, ...transformed]);
			}
			return [[newObj], ...asyncValues];
		}
		const newHead = emptyObject();
		for (const [key, item] of Object.entries(data)) newHead[key] = encode(item, [key]);
		yield newHead;
		let iterable = mergedIterables;
		if (opts.pingMs) iterable = withPing(mergedIterables, opts.pingMs);
		var _iteratorAbruptCompletion = false;
		var _didIteratorError = false;
		var _iteratorError;
		try {
			for (var _iterator = (0, import_asyncIterator$1.default)(iterable), _step; _iteratorAbruptCompletion = !(_step = yield (0, import_awaitAsyncGenerator$1.default)(_iterator.next())).done; _iteratorAbruptCompletion = false) yield _step.value;
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (_iteratorAbruptCompletion && _iterator.return != null) yield (0, import_awaitAsyncGenerator$1.default)(_iterator.return());
			} finally {
				if (_didIteratorError) throw _iteratorError;
			}
		}
	});
	return _createBatchStreamProducer.apply(this, arguments);
}
/**
* JSON Lines stream producer
* @see https://jsonlines.org/
*/
function jsonlStreamProducer(opts) {
	let stream = readableStreamFrom(createBatchStreamProducer(opts));
	const { serialize } = opts;
	if (serialize) stream = stream.pipeThrough(new TransformStream({ transform(chunk, controller) {
		if (chunk === PING_SYM) controller.enqueue(PING_SYM);
		else controller.enqueue(serialize(chunk));
	} }));
	return stream.pipeThrough(new TransformStream({ transform(chunk, controller) {
		if (chunk === PING_SYM) controller.enqueue(" ");
		else controller.enqueue(JSON.stringify(chunk) + "\n");
	} })).pipeThrough(new TextEncoderStream());
}
var require_asyncGeneratorDelegate = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncGeneratorDelegate.js"(exports, module) {
	var OverloadYield = require_OverloadYield();
	function _asyncGeneratorDelegate$1(t) {
		var e = {}, n = !1;
		function pump(e$1, r) {
			return n = !0, r = new Promise(function(n$1) {
				n$1(t[e$1](r));
			}), {
				done: !1,
				value: new OverloadYield(r, 1)
			};
		}
		return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function() {
			return this;
		}, e.next = function(t$1) {
			return n ? (n = !1, t$1) : pump("next", t$1);
		}, "function" == typeof t["throw"] && (e["throw"] = function(t$1) {
			if (n) throw n = !1, t$1;
			return pump("throw", t$1);
		}), "function" == typeof t["return"] && (e["return"] = function(t$1) {
			return n ? (n = !1, t$1) : pump("return", t$1);
		}), e;
	}
	module.exports = _asyncGeneratorDelegate$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });
var import_asyncIterator = __toESM(require_asyncIterator(), 1);
var import_awaitAsyncGenerator = __toESM(require_awaitAsyncGenerator(), 1);
var import_wrapAsyncGenerator$1 = __toESM(require_wrapAsyncGenerator(), 1);
var import_asyncGeneratorDelegate = __toESM(require_asyncGeneratorDelegate(), 1);
__toESM(require_usingCtx(), 1);
var PING_EVENT = "ping";
var SERIALIZED_ERROR_EVENT = "serialized-error";
var CONNECTED_EVENT = "connected";
var RETURN_EVENT = "return";
/**
*
* @see https://html.spec.whatwg.org/multipage/server-sent-events.html
*/
function sseStreamProducer(opts) {
	var _opts$ping$enabled, _opts$ping, _opts$ping$intervalMs, _opts$ping2, _opts$client;
	const { serialize = identity } = opts;
	const ping = {
		enabled: (_opts$ping$enabled = (_opts$ping = opts.ping) === null || _opts$ping === void 0 ? void 0 : _opts$ping.enabled) !== null && _opts$ping$enabled !== void 0 ? _opts$ping$enabled : false,
		intervalMs: (_opts$ping$intervalMs = (_opts$ping2 = opts.ping) === null || _opts$ping2 === void 0 ? void 0 : _opts$ping2.intervalMs) !== null && _opts$ping$intervalMs !== void 0 ? _opts$ping$intervalMs : 1e3
	};
	const client = (_opts$client = opts.client) !== null && _opts$client !== void 0 ? _opts$client : {};
	if (ping.enabled && client.reconnectAfterInactivityMs && ping.intervalMs > client.reconnectAfterInactivityMs) throw new Error(`Ping interval must be less than client reconnect interval to prevent unnecessary reconnection - ping.intervalMs: ${ping.intervalMs} client.reconnectAfterInactivityMs: ${client.reconnectAfterInactivityMs}`);
	function generator() {
		return _generator.apply(this, arguments);
	}
	function _generator() {
		_generator = (0, import_wrapAsyncGenerator$1.default)(function* () {
			yield {
				event: CONNECTED_EVENT,
				data: JSON.stringify(client)
			};
			let iterable = opts.data;
			if (opts.emitAndEndImmediately) iterable = takeWithGrace(iterable, {
				count: 1,
				gracePeriodMs: 1
			});
			if (ping.enabled && ping.intervalMs !== Infinity && ping.intervalMs > 0) iterable = withPing(iterable, ping.intervalMs);
			let value;
			let chunk;
			var _iteratorAbruptCompletion = false;
			var _didIteratorError = false;
			var _iteratorError;
			try {
				for (var _iterator = (0, import_asyncIterator.default)(iterable), _step; _iteratorAbruptCompletion = !(_step = yield (0, import_awaitAsyncGenerator.default)(_iterator.next())).done; _iteratorAbruptCompletion = false) {
					value = _step.value;
					if (value === PING_SYM) {
						yield {
							event: PING_EVENT,
							data: ""
						};
						continue;
					}
					chunk = isTrackedEnvelope(value) ? {
						id: value[0],
						data: value[1]
					} : { data: value };
					chunk.data = JSON.stringify(serialize(chunk.data));
					yield chunk;
					value = null;
					chunk = null;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (_iteratorAbruptCompletion && _iterator.return != null) yield (0, import_awaitAsyncGenerator.default)(_iterator.return());
				} finally {
					if (_didIteratorError) throw _iteratorError;
				}
			}
		});
		return _generator.apply(this, arguments);
	}
	function generatorWithErrorHandling() {
		return _generatorWithErrorHandling.apply(this, arguments);
	}
	function _generatorWithErrorHandling() {
		_generatorWithErrorHandling = (0, import_wrapAsyncGenerator$1.default)(function* () {
			try {
				yield* (0, import_asyncGeneratorDelegate.default)((0, import_asyncIterator.default)(generator()));
				yield {
					event: RETURN_EVENT,
					data: ""
				};
			} catch (cause) {
				var _opts$formatError, _opts$formatError2;
				if (isAbortError(cause)) return;
				const error = getTRPCErrorFromUnknown(cause);
				const data = (_opts$formatError = (_opts$formatError2 = opts.formatError) === null || _opts$formatError2 === void 0 ? void 0 : _opts$formatError2.call(opts, { error })) !== null && _opts$formatError !== void 0 ? _opts$formatError : null;
				yield {
					event: SERIALIZED_ERROR_EVENT,
					data: JSON.stringify(serialize(data))
				};
			}
		});
		return _generatorWithErrorHandling.apply(this, arguments);
	}
	return readableStreamFrom(generatorWithErrorHandling()).pipeThrough(new TransformStream({ transform(chunk, controller) {
		if ("event" in chunk) controller.enqueue(`event: ${chunk.event}\n`);
		if ("data" in chunk) controller.enqueue(`data: ${chunk.data}\n`);
		if ("id" in chunk) controller.enqueue(`id: ${chunk.id}\n`);
		if ("comment" in chunk) controller.enqueue(`: ${chunk.comment}\n`);
		controller.enqueue("\n\n");
	} })).pipeThrough(new TextEncoderStream());
}
var sseHeaders = {
	"Content-Type": "text/event-stream",
	"Cache-Control": "no-cache, no-transform",
	"X-Accel-Buffering": "no",
	Connection: "keep-alive"
};
var import_wrapAsyncGenerator = __toESM(require_wrapAsyncGenerator(), 1);
var import_objectSpread2$5 = __toESM(require_objectSpread2(), 1);
function errorToAsyncIterable(err) {
	return run((0, import_wrapAsyncGenerator.default)(function* () {
		throw err;
	}));
}
function combinedAbortController(signal) {
	const controller = new AbortController();
	return {
		signal: abortSignalsAnyPonyfill([signal, controller.signal]),
		controller
	};
}
var TYPE_ACCEPTED_METHOD_MAP = {
	mutation: ["POST"],
	query: ["GET"],
	subscription: ["GET"]
};
var TYPE_ACCEPTED_METHOD_MAP_WITH_METHOD_OVERRIDE = {
	mutation: ["POST"],
	query: ["GET", "POST"],
	subscription: ["GET", "POST"]
};
function initResponse(initOpts) {
	var _responseMeta, _info$calls$find$proc, _info$calls$find;
	const { ctx, info, responseMeta, untransformedJSON, errors = [], headers } = initOpts;
	let status = untransformedJSON ? getHTTPStatusCode(untransformedJSON) : 200;
	const eagerGeneration = !untransformedJSON;
	const data = eagerGeneration ? [] : Array.isArray(untransformedJSON) ? untransformedJSON : [untransformedJSON];
	const meta = (_responseMeta = responseMeta === null || responseMeta === void 0 ? void 0 : responseMeta({
		ctx,
		info,
		paths: info === null || info === void 0 ? void 0 : info.calls.map((call) => call.path),
		data,
		errors,
		eagerGeneration,
		type: (_info$calls$find$proc = info === null || info === void 0 || (_info$calls$find = info.calls.find((call) => {
			var _call$procedure;
			return (_call$procedure = call.procedure) === null || _call$procedure === void 0 ? void 0 : _call$procedure._def.type;
		})) === null || _info$calls$find === void 0 || (_info$calls$find = _info$calls$find.procedure) === null || _info$calls$find === void 0 ? void 0 : _info$calls$find._def.type) !== null && _info$calls$find$proc !== void 0 ? _info$calls$find$proc : "unknown"
	})) !== null && _responseMeta !== void 0 ? _responseMeta : {};
	if (meta.headers) {
		if (meta.headers instanceof Headers) for (const [key, value] of meta.headers.entries()) headers.append(key, value);
		else
 /**
		* @deprecated, delete in v12
		*/
		for (const [key, value] of Object.entries(meta.headers)) if (Array.isArray(value)) for (const v of value) headers.append(key, v);
		else if (typeof value === "string") headers.set(key, value);
	}
	if (meta.status) status = meta.status;
	return { status };
}
function caughtErrorToData(cause, errorOpts) {
	const { router, req, onError } = errorOpts.opts;
	const error = getTRPCErrorFromUnknown(cause);
	onError === null || onError === void 0 || onError({
		error,
		path: errorOpts.path,
		input: errorOpts.input,
		ctx: errorOpts.ctx,
		type: errorOpts.type,
		req
	});
	const untransformedJSON = { error: getErrorShape({
		config: router._def._config,
		error,
		type: errorOpts.type,
		path: errorOpts.path,
		input: errorOpts.input,
		ctx: errorOpts.ctx
	}) };
	const transformedJSON = transformTRPCResponse(router._def._config, untransformedJSON);
	return {
		error,
		untransformedJSON,
		body: JSON.stringify(transformedJSON)
	};
}
/**
* Check if a value is a stream-like object
* - if it's an async iterable
* - if it's an object with async iterables or promises
*/
function isDataStream(v) {
	if (!isObject(v)) return false;
	if (isAsyncIterable(v)) return true;
	return Object.values(v).some(isPromise) || Object.values(v).some(isAsyncIterable);
}
async function resolveResponse(opts) {
	var _ref, _opts$allowBatching, _opts$batching, _opts$allowMethodOver, _config$sse$enabled, _config$sse;
	const { router, req } = opts;
	const headers = new Headers([["vary", "trpc-accept, accept"]]);
	const config = router._def._config;
	const url = new URL(req.url);
	if (req.method === "HEAD") return new Response(null, { status: 204 });
	const allowBatching = (_ref = (_opts$allowBatching = opts.allowBatching) !== null && _opts$allowBatching !== void 0 ? _opts$allowBatching : (_opts$batching = opts.batching) === null || _opts$batching === void 0 ? void 0 : _opts$batching.enabled) !== null && _ref !== void 0 ? _ref : true;
	const allowMethodOverride = ((_opts$allowMethodOver = opts.allowMethodOverride) !== null && _opts$allowMethodOver !== void 0 ? _opts$allowMethodOver : false) && req.method === "POST";
	const infoTuple = await run(async () => {
		try {
			return [void 0, await getRequestInfo({
				req,
				path: decodeURIComponent(opts.path),
				router,
				searchParams: url.searchParams,
				headers: opts.req.headers,
				url,
				maxBatchSize: opts.maxBatchSize
			})];
		} catch (cause) {
			return [getTRPCErrorFromUnknown(cause), void 0];
		}
	});
	const ctxManager = run(() => {
		let result = void 0;
		return {
			valueOrUndefined: () => {
				if (!result) return void 0;
				return result[1];
			},
			value: () => {
				const [err, ctx] = result;
				if (err) throw err;
				return ctx;
			},
			create: async (info) => {
				if (result) throw new Error("This should only be called once - report a bug in tRPC");
				try {
					result = [void 0, await opts.createContext({ info })];
				} catch (cause) {
					result = [getTRPCErrorFromUnknown(cause), void 0];
				}
			}
		};
	});
	const methodMapper = allowMethodOverride ? TYPE_ACCEPTED_METHOD_MAP_WITH_METHOD_OVERRIDE : TYPE_ACCEPTED_METHOD_MAP;
	/**
	* @deprecated
	*/
	const isStreamCall = getAcceptHeader(req.headers) === "application/jsonl";
	const experimentalSSE = (_config$sse$enabled = (_config$sse = config.sse) === null || _config$sse === void 0 ? void 0 : _config$sse.enabled) !== null && _config$sse$enabled !== void 0 ? _config$sse$enabled : true;
	try {
		const [infoError, info] = infoTuple;
		if (infoError) throw infoError;
		if (info.isBatchCall && !allowBatching) throw new TRPCError({
			code: "BAD_REQUEST",
			message: `Batching is not enabled on the server`
		});
		/* istanbul ignore if -- @preserve */
		if (isStreamCall && !info.isBatchCall) throw new TRPCError({
			message: `Streaming requests must be batched (you can do a batch of 1)`,
			code: "BAD_REQUEST"
		});
		await ctxManager.create(info);
		const rpcCalls = info.calls.map(async (call) => {
			const proc = call.procedure;
			const combinedAbort = combinedAbortController(opts.req.signal);
			try {
				if (opts.error) throw opts.error;
				if (!proc) throw new TRPCError({
					code: "NOT_FOUND",
					message: `No procedure found on path "${call.path}"`
				});
				if (!methodMapper[proc._def.type].includes(req.method)) throw new TRPCError({
					code: "METHOD_NOT_SUPPORTED",
					message: `Unsupported ${req.method}-request to ${proc._def.type} procedure at path "${call.path}"`
				});
				if (proc._def.type === "subscription") {
					var _config$sse2;
					/* istanbul ignore if -- @preserve */
					if (info.isBatchCall) throw new TRPCError({
						code: "BAD_REQUEST",
						message: `Cannot batch subscription calls`
					});
					if ((_config$sse2 = config.sse) === null || _config$sse2 === void 0 ? void 0 : _config$sse2.maxDurationMs) {
						function cleanup() {
							clearTimeout(timer);
							combinedAbort.signal.removeEventListener("abort", cleanup);
							combinedAbort.controller.abort();
						}
						const timer = setTimeout(cleanup, config.sse.maxDurationMs);
						combinedAbort.signal.addEventListener("abort", cleanup);
					}
				}
				return [void 0, {
					data: await proc({
						path: call.path,
						getRawInput: call.getRawInput,
						ctx: ctxManager.value(),
						type: proc._def.type,
						signal: combinedAbort.signal,
						batchIndex: call.batchIndex
					}),
					signal: proc._def.type === "subscription" ? combinedAbort.signal : void 0
				}];
			} catch (cause) {
				var _opts$onError, _call$procedure$_def$, _call$procedure2;
				const error = getTRPCErrorFromUnknown(cause);
				const input = call.result();
				(_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
					error,
					path: call.path,
					input,
					ctx: ctxManager.valueOrUndefined(),
					type: (_call$procedure$_def$ = (_call$procedure2 = call.procedure) === null || _call$procedure2 === void 0 ? void 0 : _call$procedure2._def.type) !== null && _call$procedure$_def$ !== void 0 ? _call$procedure$_def$ : "unknown",
					req: opts.req
				});
				return [error, void 0];
			}
		});
		if (!info.isBatchCall) {
			const [call] = info.calls;
			const [error, result] = await rpcCalls[0];
			switch (info.type) {
				case "unknown":
				case "mutation":
				case "query": {
					headers.set("content-type", "application/json");
					if (isDataStream(result === null || result === void 0 ? void 0 : result.data)) throw new TRPCError({
						code: "UNSUPPORTED_MEDIA_TYPE",
						message: "Cannot use stream-like response in non-streaming request - use httpBatchStreamLink"
					});
					const res = error ? { error: getErrorShape({
						config,
						ctx: ctxManager.valueOrUndefined(),
						error,
						input: call.result(),
						path: call.path,
						type: info.type
					}) } : { result: { data: result.data } };
					const headResponse$1 = initResponse({
						ctx: ctxManager.valueOrUndefined(),
						info,
						responseMeta: opts.responseMeta,
						errors: error ? [error] : [],
						headers,
						untransformedJSON: [res]
					});
					return new Response(JSON.stringify(transformTRPCResponse(config, res)), {
						status: headResponse$1.status,
						headers
					});
				}
				case "subscription": {
					const iterable = run(() => {
						if (error) return errorToAsyncIterable(error);
						if (!experimentalSSE) return errorToAsyncIterable(new TRPCError({
							code: "METHOD_NOT_SUPPORTED",
							message: "Missing experimental flag \"sseSubscriptions\""
						}));
						if (!isObservable(result.data) && !isAsyncIterable(result.data)) return errorToAsyncIterable(new TRPCError({
							message: `Subscription ${call.path} did not return an observable or a AsyncGenerator`,
							code: "INTERNAL_SERVER_ERROR"
						}));
						return isObservable(result.data) ? observableToAsyncIterable(result.data, opts.req.signal) : result.data;
					});
					const stream = sseStreamProducer((0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, config.sse), {}, {
						data: iterable,
						serialize: (v) => config.transformer.output.serialize(v),
						formatError(errorOpts) {
							var _call$procedure$_def$2, _call$procedure3, _opts$onError2;
							const error$1 = getTRPCErrorFromUnknown(errorOpts.error);
							const input = call === null || call === void 0 ? void 0 : call.result();
							const path = call === null || call === void 0 ? void 0 : call.path;
							const type = (_call$procedure$_def$2 = call === null || call === void 0 || (_call$procedure3 = call.procedure) === null || _call$procedure3 === void 0 ? void 0 : _call$procedure3._def.type) !== null && _call$procedure$_def$2 !== void 0 ? _call$procedure$_def$2 : "unknown";
							(_opts$onError2 = opts.onError) === null || _opts$onError2 === void 0 || _opts$onError2.call(opts, {
								error: error$1,
								path,
								input,
								ctx: ctxManager.valueOrUndefined(),
								req: opts.req,
								type
							});
							return getErrorShape({
								config,
								ctx: ctxManager.valueOrUndefined(),
								error: error$1,
								input,
								path,
								type
							});
						}
					}));
					for (const [key, value] of Object.entries(sseHeaders)) headers.set(key, value);
					const headResponse$1 = initResponse({
						ctx: ctxManager.valueOrUndefined(),
						info,
						responseMeta: opts.responseMeta,
						errors: [],
						headers,
						untransformedJSON: null
					});
					const abortSignal = result === null || result === void 0 ? void 0 : result.signal;
					let responseBody = stream;
					if (abortSignal) {
						const reader = stream.getReader();
						const onAbort = () => void reader.cancel();
						if (abortSignal.aborted) onAbort();
						else abortSignal.addEventListener("abort", onAbort, { once: true });
						responseBody = new ReadableStream({
							async pull(controller) {
								const chunk = await reader.read();
								if (chunk.done) {
									abortSignal.removeEventListener("abort", onAbort);
									controller.close();
								} else controller.enqueue(chunk.value);
							},
							cancel() {
								abortSignal.removeEventListener("abort", onAbort);
								return reader.cancel();
							}
						});
					}
					return new Response(responseBody, {
						headers,
						status: headResponse$1.status
					});
				}
			}
		}
		if (info.accept === "application/jsonl") {
			headers.set("content-type", "application/json");
			headers.set("transfer-encoding", "chunked");
			const headResponse$1 = initResponse({
				ctx: ctxManager.valueOrUndefined(),
				info,
				responseMeta: opts.responseMeta,
				errors: [],
				headers,
				untransformedJSON: null
			});
			const stream = jsonlStreamProducer((0, import_objectSpread2$5.default)((0, import_objectSpread2$5.default)({}, config.jsonl), {}, {
				maxDepth: Infinity,
				data: rpcCalls.map(async (res, index) => {
					const [error, result] = await res;
					const call = info.calls[index];
					if (error) {
						var _procedure$_def$type, _procedure;
						return { error: getErrorShape({
							config,
							ctx: ctxManager.valueOrUndefined(),
							error,
							input: call.result(),
							path: call.path,
							type: (_procedure$_def$type = (_procedure = call.procedure) === null || _procedure === void 0 ? void 0 : _procedure._def.type) !== null && _procedure$_def$type !== void 0 ? _procedure$_def$type : "unknown"
						}) };
					}
					/**
					* Not very pretty, but we need to wrap nested data in promises
					* Our stream producer will only resolve top-level async values or async values that are directly nested in another async value
					*/
					const iterable = isObservable(result.data) ? observableToAsyncIterable(result.data, opts.req.signal) : Promise.resolve(result.data);
					return { result: Promise.resolve({ data: iterable }) };
				}),
				serialize: (data) => config.transformer.output.serialize(data),
				onError: (cause) => {
					var _opts$onError3, _info$type;
					(_opts$onError3 = opts.onError) === null || _opts$onError3 === void 0 || _opts$onError3.call(opts, {
						error: getTRPCErrorFromUnknown(cause.error),
						path: void 0,
						input: void 0,
						ctx: ctxManager.valueOrUndefined(),
						req: opts.req,
						type: (_info$type = info === null || info === void 0 ? void 0 : info.type) !== null && _info$type !== void 0 ? _info$type : "unknown"
					});
				},
				formatError(errorOpts) {
					var _call$procedure$_def$3, _call$procedure4;
					const call = info === null || info === void 0 ? void 0 : info.calls[errorOpts.path[0]];
					const error = getTRPCErrorFromUnknown(errorOpts.error);
					const input = call === null || call === void 0 ? void 0 : call.result();
					const path = call === null || call === void 0 ? void 0 : call.path;
					const type = (_call$procedure$_def$3 = call === null || call === void 0 || (_call$procedure4 = call.procedure) === null || _call$procedure4 === void 0 ? void 0 : _call$procedure4._def.type) !== null && _call$procedure$_def$3 !== void 0 ? _call$procedure$_def$3 : "unknown";
					return getErrorShape({
						config,
						ctx: ctxManager.valueOrUndefined(),
						error,
						input,
						path,
						type
					});
				}
			}));
			return new Response(stream, {
				headers,
				status: headResponse$1.status
			});
		}
		/**
		* Non-streaming response:
		* - await all responses in parallel, blocking on the slowest one
		* - create headers with known response body
		* - return a complete HTTPResponse
		*/
		headers.set("content-type", "application/json");
		const results = (await Promise.all(rpcCalls)).map((res) => {
			const [error, result] = res;
			if (error) return res;
			if (isDataStream(result.data)) return [new TRPCError({
				code: "UNSUPPORTED_MEDIA_TYPE",
				message: "Cannot use stream-like response in non-streaming request - use httpBatchStreamLink"
			}), void 0];
			return res;
		});
		const resultAsRPCResponse = results.map(([error, result], index) => {
			const call = info.calls[index];
			if (error) {
				var _call$procedure$_def$4, _call$procedure5;
				return { error: getErrorShape({
					config,
					ctx: ctxManager.valueOrUndefined(),
					error,
					input: call.result(),
					path: call.path,
					type: (_call$procedure$_def$4 = (_call$procedure5 = call.procedure) === null || _call$procedure5 === void 0 ? void 0 : _call$procedure5._def.type) !== null && _call$procedure$_def$4 !== void 0 ? _call$procedure$_def$4 : "unknown"
				}) };
			}
			return { result: { data: result.data } };
		});
		const errors = results.map(([error]) => error).filter(Boolean);
		const headResponse = initResponse({
			ctx: ctxManager.valueOrUndefined(),
			info,
			responseMeta: opts.responseMeta,
			untransformedJSON: resultAsRPCResponse,
			errors,
			headers
		});
		return new Response(JSON.stringify(transformTRPCResponse(config, resultAsRPCResponse)), {
			status: headResponse.status,
			headers
		});
	} catch (cause) {
		var _info$type2;
		const [_infoError, info] = infoTuple;
		const ctx = ctxManager.valueOrUndefined();
		const { error, untransformedJSON, body } = caughtErrorToData(cause, {
			opts,
			ctx: ctxManager.valueOrUndefined(),
			type: (_info$type2 = info === null || info === void 0 ? void 0 : info.type) !== null && _info$type2 !== void 0 ? _info$type2 : "unknown"
		});
		const headResponse = initResponse({
			ctx,
			info,
			responseMeta: opts.responseMeta,
			untransformedJSON,
			errors: [error],
			headers
		});
		return new Response(body, {
			status: headResponse.status,
			headers
		});
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@trpc+server@11.17.0_typescript@6.0.3/node_modules/@trpc/server/dist/initTRPC-BRf4imah.mjs
var import_objectSpread2$2 = __toESM(require_objectSpread2(), 1);
/** @internal */
var middlewareMarker = "middlewareMarker";
/**
* @internal
*/
function createMiddlewareFactory() {
	function createMiddlewareInner(middlewares) {
		return {
			_middlewares: middlewares,
			unstable_pipe(middlewareBuilderOrFn) {
				const pipedMiddleware = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
				return createMiddlewareInner([...middlewares, ...pipedMiddleware]);
			}
		};
	}
	function createMiddleware(fn) {
		return createMiddlewareInner([fn]);
	}
	return createMiddleware;
}
/**
* @internal
* Please note, `trpc-openapi` uses this function.
*/
function createInputMiddleware(parse) {
	const inputMiddleware = async function inputValidatorMiddleware(opts) {
		let parsedInput;
		const rawInput = await opts.getRawInput();
		try {
			parsedInput = await parse(rawInput);
		} catch (cause) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				cause
			});
		}
		const combinedInput = isObject(opts.input) && isObject(parsedInput) ? (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts.input), parsedInput) : parsedInput;
		return opts.next({ input: combinedInput });
	};
	inputMiddleware._type = "input";
	return inputMiddleware;
}
/**
* @internal
*/
function createOutputMiddleware(parse) {
	const outputMiddleware = async function outputValidatorMiddleware({ next }) {
		const result = await next();
		if (!result.ok) return result;
		try {
			const data = await parse(result.data);
			return (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, result), {}, { data });
		} catch (cause) {
			throw new TRPCError({
				message: "Output validation failed",
				code: "INTERNAL_SERVER_ERROR",
				cause
			});
		}
	};
	outputMiddleware._type = "output";
	return outputMiddleware;
}
var import_defineProperty = __toESM(require_defineProperty(), 1);
/** A schema error with useful information. */
var StandardSchemaV1Error = class extends Error {
	/**
	* Creates a schema error with useful information.
	*
	* @param issues The schema issues.
	*/
	constructor(issues) {
		var _issues$;
		super((_issues$ = issues[0]) === null || _issues$ === void 0 ? void 0 : _issues$.message);
		(0, import_defineProperty.default)(this, "issues", void 0);
		this.name = "SchemaError";
		this.issues = issues;
	}
};
function getParseFn(procedureParser) {
	const parser = procedureParser;
	const isStandardSchema = "~standard" in parser;
	if (typeof parser === "function" && typeof parser.assert === "function") return parser.assert.bind(parser);
	if (typeof parser === "function" && !isStandardSchema) return parser;
	if (typeof parser.parseAsync === "function") return parser.parseAsync.bind(parser);
	if (typeof parser.parse === "function") return parser.parse.bind(parser);
	if (typeof parser.validateSync === "function") return parser.validateSync.bind(parser);
	if (typeof parser.create === "function") return parser.create.bind(parser);
	if (typeof parser.assert === "function") return (value) => {
		parser.assert(value);
		return value;
	};
	if (isStandardSchema) return async (value) => {
		const result = await parser["~standard"].validate(value);
		if (result.issues) throw new StandardSchemaV1Error(result.issues);
		return result.value;
	};
	throw new Error("Could not find a validator fn");
}
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
var import_objectWithoutProperties = __toESM(__commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports, module) {
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
} })(), 1);
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
var _excluded = [
	"middlewares",
	"inputs",
	"meta"
];
function createNewBuilder(def1, def2) {
	const { middlewares = [], inputs, meta } = def2, rest = (0, import_objectWithoutProperties.default)(def2, _excluded);
	return createBuilder((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, mergeWithoutOverrides(def1, rest)), {}, {
		inputs: [...def1.inputs, ...inputs !== null && inputs !== void 0 ? inputs : []],
		middlewares: [...def1.middlewares, ...middlewares],
		meta: def1.meta && meta ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, def1.meta), meta) : meta !== null && meta !== void 0 ? meta : def1.meta
	}));
}
function createBuilder(initDef = {}) {
	const _def = (0, import_objectSpread2$1.default)({
		procedure: true,
		inputs: [],
		middlewares: []
	}, initDef);
	return {
		_def,
		input(input) {
			const parser = getParseFn(input);
			return createNewBuilder(_def, {
				inputs: [input],
				middlewares: [createInputMiddleware(parser)]
			});
		},
		output(output) {
			return createNewBuilder(_def, {
				output,
				middlewares: [createOutputMiddleware(getParseFn(output))]
			});
		},
		meta(meta) {
			return createNewBuilder(_def, { meta });
		},
		use(middlewareBuilderOrFn) {
			return createNewBuilder(_def, { middlewares: "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn] });
		},
		unstable_concat(builder$1) {
			return createNewBuilder(_def, builder$1._def);
		},
		concat(builder$1) {
			return createNewBuilder(_def, builder$1._def);
		},
		query(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "query" }), resolver);
		},
		mutation(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "mutation" }), resolver);
		},
		subscription(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "subscription" }), resolver);
		},
		experimental_caller(caller) {
			return createNewBuilder(_def, { caller });
		}
	};
}
function createResolver(_defIn, resolver) {
	const finalBuilder = createNewBuilder(_defIn, {
		resolver,
		middlewares: [async function resolveMiddleware(opts) {
			return {
				marker: middlewareMarker,
				ok: true,
				data: await resolver(opts),
				ctx: opts.ctx
			};
		}]
	});
	const _def = (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, finalBuilder._def), {}, {
		type: _defIn.type,
		experimental_caller: Boolean(finalBuilder._def.caller),
		meta: finalBuilder._def.meta,
		$types: null
	});
	const invoke = createProcedureCaller(finalBuilder._def);
	const callerOverride = finalBuilder._def.caller;
	if (!callerOverride) return invoke;
	const callerWrapper = async (...args) => {
		return await callerOverride({
			args,
			invoke,
			_def
		});
	};
	callerWrapper._def = _def;
	return callerWrapper;
}
var codeblock = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/v11/server/server-side-calls
`.trim();
async function callRecursive(index, _def, opts) {
	try {
		const middleware = _def.middlewares[index];
		return await middleware((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
			meta: _def.meta,
			input: opts.input,
			next(_nextOpts) {
				var _nextOpts$getRawInput;
				const nextOpts = _nextOpts;
				return callRecursive(index + 1, _def, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
					ctx: (nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.ctx) ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts.ctx), nextOpts.ctx) : opts.ctx,
					input: nextOpts && "input" in nextOpts ? nextOpts.input : opts.input,
					getRawInput: (_nextOpts$getRawInput = nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.getRawInput) !== null && _nextOpts$getRawInput !== void 0 ? _nextOpts$getRawInput : opts.getRawInput
				}));
			}
		}));
	} catch (cause) {
		return {
			ok: false,
			error: getTRPCErrorFromUnknown(cause),
			marker: middlewareMarker
		};
	}
}
function createProcedureCaller(_def) {
	async function procedure(opts) {
		if (!opts || !("getRawInput" in opts)) throw new Error(codeblock);
		const result = await callRecursive(0, _def, opts);
		if (!result) throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "No result from middlewares - did you forget to `return next()`?"
		});
		if (!result.ok) throw result.error;
		return result.data;
	}
	procedure._def = _def;
	procedure.procedure = true;
	procedure.meta = _def.meta;
	return procedure;
}
var _globalThis$process, _globalThis$process2, _globalThis$process3;
/**
* The default check to see if we're in a server
*/
var isServerDefault = typeof window === "undefined" || "Deno" in window || ((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process = _globalThis$process.env) === null || _globalThis$process === void 0 ? void 0 : _globalThis$process["NODE_ENV"]) === "test" || !!((_globalThis$process2 = globalThis.process) === null || _globalThis$process2 === void 0 || (_globalThis$process2 = _globalThis$process2.env) === null || _globalThis$process2 === void 0 ? void 0 : _globalThis$process2["JEST_WORKER_ID"]) || !!((_globalThis$process3 = globalThis.process) === null || _globalThis$process3 === void 0 || (_globalThis$process3 = _globalThis$process3.env) === null || _globalThis$process3 === void 0 ? void 0 : _globalThis$process3["VITEST_WORKER_ID"]);
var import_objectSpread2$3 = __toESM(require_objectSpread2(), 1);
/**
* Builder to initialize the tRPC root object - use this exactly once per backend
* @see https://trpc.io/docs/v11/quickstart
*/
var initTRPC = new class TRPCBuilder {
	/**
	* Add a context shape as a generic to the root object
	* @see https://trpc.io/docs/v11/server/context
	*/
	context() {
		return new TRPCBuilder();
	}
	/**
	* Add a meta shape as a generic to the root object
	* @see https://trpc.io/docs/v11/quickstart
	*/
	meta() {
		return new TRPCBuilder();
	}
	/**
	* Create the root object
	* @see https://trpc.io/docs/v11/server/routers#initialize-trpc
	*/
	create(opts) {
		var _opts$transformer, _opts$isDev, _globalThis$process$1, _opts$allowOutsideOfS, _opts$errorFormatter, _opts$isServer;
		const config = (0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, opts), {}, {
			transformer: getDataTransformer((_opts$transformer = opts === null || opts === void 0 ? void 0 : opts.transformer) !== null && _opts$transformer !== void 0 ? _opts$transformer : defaultTransformer),
			isDev: (_opts$isDev = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _opts$isDev !== void 0 ? _opts$isDev : ((_globalThis$process$1 = globalThis.process) === null || _globalThis$process$1 === void 0 ? void 0 : _globalThis$process$1.env["NODE_ENV"]) !== "production",
			allowOutsideOfServer: (_opts$allowOutsideOfS = opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== null && _opts$allowOutsideOfS !== void 0 ? _opts$allowOutsideOfS : false,
			errorFormatter: (_opts$errorFormatter = opts === null || opts === void 0 ? void 0 : opts.errorFormatter) !== null && _opts$errorFormatter !== void 0 ? _opts$errorFormatter : defaultFormatter,
			isServer: (_opts$isServer = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer !== void 0 ? _opts$isServer : isServerDefault,
			$types: null
		});
		var _opts$isServer2;
		if (!((_opts$isServer2 = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer2 !== void 0 ? _opts$isServer2 : isServerDefault) && (opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== true) throw new Error(`You're trying to use @trpc/server in a non-server environment. This is not supported by default.`);
		return {
			_config: config,
			procedure: createBuilder({ meta: opts === null || opts === void 0 ? void 0 : opts.defaultMeta }),
			middleware: createMiddlewareFactory(),
			router: createRouterFactory(config),
			mergeRouters,
			createCallerFactory: createCallerFactory()
		};
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/@trpc+server@11.17.0_typescript@6.0.3/node_modules/@trpc/server/dist/adapters/fetch/index.mjs
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
var trimSlashes = (path) => {
	path = path.startsWith("/") ? path.slice(1) : path;
	path = path.endsWith("/") ? path.slice(0, -1) : path;
	return path;
};
async function fetchRequestHandler(opts) {
	const resHeaders = new Headers();
	const createContext = async (innerOpts) => {
		var _opts$createContext;
		return (_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2.default)({
			req: opts.req,
			resHeaders
		}, innerOpts));
	};
	const pathname = trimSlashes(new URL(opts.req.url).pathname);
	const endpoint = trimSlashes(opts.endpoint);
	const path = trimSlashes(pathname.slice(endpoint.length));
	return await resolveResponse((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
		req: opts.req,
		createContext,
		path,
		error: null,
		onError(o) {
			var _opts$onError;
			opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, o), {}, { req: opts.req }));
		},
		responseMeta(data) {
			var _opts$responseMeta;
			const meta = (_opts$responseMeta = opts.responseMeta) === null || _opts$responseMeta === void 0 ? void 0 : _opts$responseMeta.call(opts, data);
			if (meta === null || meta === void 0 ? void 0 : meta.headers) {
				if (meta.headers instanceof Headers) for (const [key, value] of meta.headers.entries()) resHeaders.append(key, value);
				else
 /**
				* @deprecated, delete in v12
				*/
				for (const [key, value] of Object.entries(meta.headers)) if (Array.isArray(value)) for (const v of value) resHeaders.append(key, v);
				else if (typeof value === "string") resHeaders.set(key, value);
			}
			return {
				headers: resHeaders,
				status: meta === null || meta === void 0 ? void 0 : meta.status
			};
		}
	}));
}
//#endregion
export { initTRPC as n, fetchRequestHandler as t };
