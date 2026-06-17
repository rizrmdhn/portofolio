//#region ../../node_modules/.pnpm/reselect@5.1.1/node_modules/reselect/dist/reselect.mjs
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
	if (typeof func !== "function") throw new TypeError(errorMessage);
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
	if (typeof object !== "object") throw new TypeError(errorMessage);
}
function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
	if (!array.every((item) => typeof item === "function")) {
		const itemTypes = array.map((item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item).join(", ");
		throw new TypeError(`${errorMessage}[${itemTypes}]`);
	}
}
var ensureIsArray = (item) => {
	return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
	const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
	assertIsArrayOfFunctions(dependencies, `createSelector expects all input-selectors to be functions, but received the following types: `);
	return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
	const inputSelectorResults = [];
	const { length } = dependencies;
	for (let i = 0; i < length; i++) inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
	return inputSelectorResults;
}
var StrongRef = class {
	constructor(value) {
		this.value = value;
	}
	deref() {
		return this.value;
	}
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
	return {
		s: UNTERMINATED,
		v: void 0,
		o: null,
		p: null
	};
}
function weakMapMemoize(func, options = {}) {
	let fnNode = createCacheNode();
	const { resultEqualityCheck } = options;
	let lastResult;
	let resultsCount = 0;
	function memoized() {
		let cacheNode = fnNode;
		const { length } = arguments;
		for (let i = 0, l = length; i < l; i++) {
			const arg = arguments[i];
			if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
				let objectCache = cacheNode.o;
				if (objectCache === null) cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
				const objectNode = objectCache.get(arg);
				if (objectNode === void 0) {
					cacheNode = createCacheNode();
					objectCache.set(arg, cacheNode);
				} else cacheNode = objectNode;
			} else {
				let primitiveCache = cacheNode.p;
				if (primitiveCache === null) cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
				const primitiveNode = primitiveCache.get(arg);
				if (primitiveNode === void 0) {
					cacheNode = createCacheNode();
					primitiveCache.set(arg, cacheNode);
				} else cacheNode = primitiveNode;
			}
		}
		const terminatedNode = cacheNode;
		let result;
		if (cacheNode.s === TERMINATED) result = cacheNode.v;
		else {
			result = func.apply(null, arguments);
			resultsCount++;
			if (resultEqualityCheck) {
				const lastResultValue = lastResult?.deref?.() ?? lastResult;
				if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
					result = lastResultValue;
					resultsCount !== 0 && resultsCount--;
				}
				lastResult = typeof result === "object" && result !== null || typeof result === "function" ? new Ref(result) : result;
			}
		}
		terminatedNode.s = TERMINATED;
		terminatedNode.v = result;
		return result;
	}
	memoized.clearCache = () => {
		fnNode = createCacheNode();
		memoized.resetResultsCount();
	};
	memoized.resultsCount = () => resultsCount;
	memoized.resetResultsCount = () => {
		resultsCount = 0;
	};
	return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
	const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
		memoize: memoizeOrOptions,
		memoizeOptions: memoizeOptionsFromArgs
	} : memoizeOrOptions;
	const createSelector2 = (...createSelectorArgs) => {
		let recomputations = 0;
		let dependencyRecomputations = 0;
		let lastResult;
		let directlyPassedOptions = {};
		let resultFunc = createSelectorArgs.pop();
		if (typeof resultFunc === "object") {
			directlyPassedOptions = resultFunc;
			resultFunc = createSelectorArgs.pop();
		}
		assertIsFunction(resultFunc, `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`);
		const { memoize, memoizeOptions = [], argsMemoize = weakMapMemoize, argsMemoizeOptions = [], devModeChecks = {} } = {
			...createSelectorCreatorOptions,
			...directlyPassedOptions
		};
		const finalMemoizeOptions = ensureIsArray(memoizeOptions);
		const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
		const dependencies = getDependencies(createSelectorArgs);
		const memoizedResultFunc = memoize(function recomputationWrapper() {
			recomputations++;
			return resultFunc.apply(null, arguments);
		}, ...finalMemoizeOptions);
		const selector = argsMemoize(function dependenciesChecker() {
			dependencyRecomputations++;
			const inputSelectorResults = collectInputSelectorResults(dependencies, arguments);
			lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
			return lastResult;
		}, ...finalArgsMemoizeOptions);
		return Object.assign(selector, {
			resultFunc,
			memoizedResultFunc,
			dependencies,
			dependencyRecomputations: () => dependencyRecomputations,
			resetDependencyRecomputations: () => {
				dependencyRecomputations = 0;
			},
			lastResult: () => lastResult,
			recomputations: () => recomputations,
			resetRecomputations: () => {
				recomputations = 0;
			},
			memoize,
			argsMemoize
		});
	};
	Object.assign(createSelector2, { withTypes: () => createSelector2 });
	return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign((inputSelectorsObject, selectorCreator = createSelector) => {
	assertIsObject(inputSelectorsObject, `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`);
	const inputSelectorKeys = Object.keys(inputSelectorsObject);
	return selectorCreator(inputSelectorKeys.map((key) => inputSelectorsObject[key]), (...inputSelectorResults) => {
		return inputSelectorResults.reduce((composition, value, index) => {
			composition[inputSelectorKeys[index]] = value;
			return composition;
		}, {});
	});
}, { withTypes: () => createStructuredSelector });
//#endregion
//#region ../../node_modules/.pnpm/redux@5.0.1/node_modules/redux/dist/redux.mjs
function formatProdErrorMessage$1(code) {
	return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var symbol_observable_default = typeof Symbol === "function" && Symbol.observable || "@@observable";
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var actionTypes_default = {
	INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
function isPlainObject$1(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore(reducer, preloadedState, enhancer) {
	if (typeof reducer !== "function") throw new Error(formatProdErrorMessage$1(2));
	if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") throw new Error(formatProdErrorMessage$1(0));
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = void 0;
	}
	if (typeof enhancer !== "undefined") {
		if (typeof enhancer !== "function") throw new Error(formatProdErrorMessage$1(1));
		return enhancer(createStore)(reducer, preloadedState);
	}
	let currentReducer = reducer;
	let currentState = preloadedState;
	let currentListeners = /* @__PURE__ */ new Map();
	let nextListeners = currentListeners;
	let listenerIdCounter = 0;
	let isDispatching = false;
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = /* @__PURE__ */ new Map();
			currentListeners.forEach((listener, key) => {
				nextListeners.set(key, listener);
			});
		}
	}
	function getState() {
		if (isDispatching) throw new Error(formatProdErrorMessage$1(3));
		return currentState;
	}
	function subscribe(listener) {
		if (typeof listener !== "function") throw new Error(formatProdErrorMessage$1(4));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(5));
		let isSubscribed = true;
		ensureCanMutateNextListeners();
		const listenerId = listenerIdCounter++;
		nextListeners.set(listenerId, listener);
		return function unsubscribe() {
			if (!isSubscribed) return;
			if (isDispatching) throw new Error(formatProdErrorMessage$1(6));
			isSubscribed = false;
			ensureCanMutateNextListeners();
			nextListeners.delete(listenerId);
			currentListeners = null;
		};
	}
	function dispatch(action) {
		if (!isPlainObject$1(action)) throw new Error(formatProdErrorMessage$1(7));
		if (typeof action.type === "undefined") throw new Error(formatProdErrorMessage$1(8));
		if (typeof action.type !== "string") throw new Error(formatProdErrorMessage$1(17));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(9));
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		} finally {
			isDispatching = false;
		}
		(currentListeners = nextListeners).forEach((listener) => {
			listener();
		});
		return action;
	}
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== "function") throw new Error(formatProdErrorMessage$1(10));
		currentReducer = nextReducer;
		dispatch({ type: actionTypes_default.REPLACE });
	}
	function observable() {
		const outerSubscribe = subscribe;
		return {
			/**
			* The minimal observable subscription method.
			* @param observer Any object that can be used as an observer.
			* The observer object should have a `next` method.
			* @returns An object with an `unsubscribe` method that can
			* be used to unsubscribe the observable from the store, and prevent further
			* emission of values from the observable.
			*/
			subscribe(observer) {
				if (typeof observer !== "object" || observer === null) throw new Error(formatProdErrorMessage$1(11));
				function observeState() {
					const observerAsObserver = observer;
					if (observerAsObserver.next) observerAsObserver.next(getState());
				}
				observeState();
				return { unsubscribe: outerSubscribe(observeState) };
			},
			[symbol_observable_default]() {
				return this;
			}
		};
	}
	dispatch({ type: actionTypes_default.INIT });
	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[symbol_observable_default]: observable
	};
}
function assertReducerShape(reducers) {
	Object.keys(reducers).forEach((key) => {
		const reducer = reducers[key];
		if (typeof reducer(void 0, { type: actionTypes_default.INIT }) === "undefined") throw new Error(formatProdErrorMessage$1(12));
		if (typeof reducer(void 0, { type: actionTypes_default.PROBE_UNKNOWN_ACTION() }) === "undefined") throw new Error(formatProdErrorMessage$1(13));
	});
}
function combineReducers(reducers) {
	const reducerKeys = Object.keys(reducers);
	const finalReducers = {};
	for (let i = 0; i < reducerKeys.length; i++) {
		const key = reducerKeys[i];
		if (typeof reducers[key] === "function") finalReducers[key] = reducers[key];
	}
	const finalReducerKeys = Object.keys(finalReducers);
	let shapeAssertionError;
	try {
		assertReducerShape(finalReducers);
	} catch (e) {
		shapeAssertionError = e;
	}
	return function combination(state = {}, action) {
		if (shapeAssertionError) throw shapeAssertionError;
		let hasChanged = false;
		const nextState = {};
		for (let i = 0; i < finalReducerKeys.length; i++) {
			const key = finalReducerKeys[i];
			const reducer = finalReducers[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey, action);
			if (typeof nextStateForKey === "undefined") {
				action && action.type;
				throw new Error(formatProdErrorMessage$1(14));
			}
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
		hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
		return hasChanged ? nextState : state;
	};
}
function compose(...funcs) {
	if (funcs.length === 0) return (arg) => arg;
	if (funcs.length === 1) return funcs[0];
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
	return (createStore2) => (reducer, preloadedState) => {
		const store = createStore2(reducer, preloadedState);
		let dispatch = () => {
			throw new Error(formatProdErrorMessage$1(15));
		};
		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action, ...args) => dispatch(action, ...args)
		};
		dispatch = compose(...middlewares.map((middleware) => middleware(middlewareAPI)))(store.dispatch);
		return {
			...store,
			dispatch
		};
	};
}
function isAction(action) {
	return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}
//#endregion
//#region ../../node_modules/.pnpm/immer@11.1.8/node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
	throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
	if (!value) return false;
	return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
	if (!value || !isObjectish(value)) return false;
	const proto = getPrototypeOf(value);
	if (proto === null || proto === O[PROTOTYPE]) return true;
	const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
	if (Ctor === Object) return true;
	if (!isFunction(Ctor)) return false;
	let ctorString = cachedCtorStrings.get(Ctor);
	if (ctorString === void 0) {
		ctorString = Function.toString.call(Ctor);
		cachedCtorStrings.set(Ctor, ctorString);
	}
	return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
	if (getArchtype(obj) === 0) (strict ? Reflect.ownKeys(obj) : O.keys(obj)).forEach((key) => {
		iter(key, obj[key], obj);
	});
	else obj.forEach((entry, index) => iter(index, entry, obj));
}
function getArchtype(thing) {
	const state = thing[DRAFT_STATE];
	return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.get(prop) : thing[prop];
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
	if (type === 2) thing.set(propOrOldValue, value);
	else if (type === 3) thing.add(value);
	else thing[propOrOldValue] = value;
};
function is(x, y) {
	if (x === y) return x !== 0 || 1 / x === 1 / y;
	else return x !== x && y !== y;
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean$1 = (target) => typeof target === "boolean";
function isArrayIndex(value) {
	const n = +value;
	return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
	if (isMap(base)) return new Map(base);
	if (isSet(base)) return new Set(base);
	if (isArray(base)) return Array[PROTOTYPE].slice.call(base);
	const isPlain = isPlainObject(base);
	if (strict === true || strict === "class_only" && !isPlain) {
		const descriptors = O.getOwnPropertyDescriptors(base);
		delete descriptors[DRAFT_STATE];
		let keys = Reflect.ownKeys(descriptors);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const desc = descriptors[key];
			if (desc[WRITABLE] === false) {
				desc[WRITABLE] = true;
				desc[CONFIGURABLE] = true;
			}
			if (desc.get || desc.set) descriptors[key] = {
				[CONFIGURABLE]: true,
				[WRITABLE]: true,
				[ENUMERABLE]: desc[ENUMERABLE],
				[VALUE]: base[key]
			};
		}
		return O.create(getPrototypeOf(base), descriptors);
	} else {
		const proto = getPrototypeOf(base);
		if (proto !== null && isPlain) return { ...base };
		const obj = O.create(proto);
		return O.assign(obj, base);
	}
}
function freeze(obj, deep = false) {
	if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
	if (getArchtype(obj) > 1) O.defineProperties(obj, {
		set: dontMutateMethodOverride,
		add: dontMutateMethodOverride,
		clear: dontMutateMethodOverride,
		delete: dontMutateMethodOverride
	});
	O.freeze(obj);
	if (deep) each(obj, (_key, value) => {
		freeze(value, true);
	}, false);
	return obj;
}
function dontMutateFrozenCollections() {
	die(2);
}
var dontMutateMethodOverride = { [VALUE]: dontMutateFrozenCollections };
function isFrozen(obj) {
	if (obj === null || !isObjectish(obj)) return true;
	return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
	const plugin = plugins[pluginKey];
	if (!plugin) die(0, pluginKey);
	return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
	drafts_: [],
	parent_,
	immer_,
	canAutoFreeze_: true,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
	arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
	if (patchListener) {
		scope.patchPlugin_ = getPlugin(PluginPatches);
		scope.patches_ = [];
		scope.inversePatches_ = [];
		scope.patchListener_ = patchListener;
	}
}
function revokeScope(scope) {
	leaveScope(scope);
	scope.drafts_.forEach(revokeDraft);
	scope.drafts_ = null;
}
function leaveScope(scope) {
	if (scope === currentScope) currentScope = scope.parent_;
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
	const state = draft[DRAFT_STATE];
	if (state.type_ === 0 || state.type_ === 1) state.revoke_();
	else state.revoked_ = true;
}
function processResult(result, scope) {
	scope.unfinalizedDrafts_ = scope.drafts_.length;
	const baseDraft = scope.drafts_[0];
	if (result !== void 0 && result !== baseDraft) {
		if (baseDraft[DRAFT_STATE].modified_) {
			revokeScope(scope);
			die(4);
		}
		if (isDraftable(result)) result = finalize(scope, result);
		const { patchPlugin_ } = scope;
		if (patchPlugin_) patchPlugin_.generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope);
	} else result = finalize(scope, baseDraft);
	maybeFreeze(scope, result, true);
	revokeScope(scope);
	if (scope.patches_) scope.patchListener_(scope.patches_, scope.inversePatches_);
	return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
	if (isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	if (!state) return handleValue(value, rootScope.handledSet_, rootScope);
	if (!isSameScope(state, rootScope)) return value;
	if (!state.modified_) return state.base_;
	if (!state.finalized_) {
		const { callbacks_ } = state;
		if (callbacks_) while (callbacks_.length > 0) callbacks_.pop()(rootScope);
		generatePatchesAndFinalize(state, rootScope);
	}
	return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
	if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) freeze(value, deep);
}
function markStateFinalized(state) {
	state.finalized_ = true;
	state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
	const parentCopy = latest(parent);
	const parentType = parent.type_;
	if (originalKey !== void 0) {
		if (get(parentCopy, originalKey, parentType) === draftValue) {
			set(parentCopy, originalKey, finalizedValue, parentType);
			return;
		}
	}
	if (!parent.draftLocations_) {
		const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
		each(parentCopy, (key, value) => {
			if (isDraft(value)) {
				const keys = draftLocations.get(value) || [];
				keys.push(key);
				draftLocations.set(value, keys);
			}
		});
	}
	const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
	for (const location of locations) set(parentCopy, location, finalizedValue, parentType);
}
function registerChildFinalizationCallback(parent, child, key) {
	parent.callbacks_.push(function childCleanup(rootScope) {
		const state = child;
		if (!state || !isSameScope(state, rootScope)) return;
		rootScope.mapSetPlugin_?.fixSetContents(state);
		const finalizedValue = getFinalValue(state);
		updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
		generatePatchesAndFinalize(state, rootScope);
	});
}
function generatePatchesAndFinalize(state, rootScope) {
	if (state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0)) {
		const { patchPlugin_ } = rootScope;
		if (patchPlugin_) {
			const basePath = patchPlugin_.getPath(state);
			if (basePath) patchPlugin_.generatePatches_(state, basePath, rootScope);
		}
		markStateFinalized(state);
	}
}
function handleCrossReference(target, key, value) {
	const { scope_ } = target;
	if (isDraft(value)) {
		const state = value[DRAFT_STATE];
		if (isSameScope(state, scope_)) state.callbacks_.push(function crossReferenceCleanup() {
			prepareCopy(target);
			updateDraftInParent(target, value, getFinalValue(state), key);
		});
	} else if (isDraftable(value)) target.callbacks_.push(function nestedDraftCleanup() {
		const targetCopy = latest(target);
		if (target.type_ === 3) {
			if (targetCopy.has(value)) handleValue(value, scope_.handledSet_, scope_);
		} else if (get(targetCopy, key, target.type_) === value) {
			if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) handleValue(get(target.copy_, key, target.type_), scope_.handledSet_, scope_);
		}
	});
}
function handleValue(target, handledSet, rootScope) {
	if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) return target;
	if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) return target;
	handledSet.add(target);
	each(target, (key, value) => {
		if (isDraft(value)) {
			const state = value[DRAFT_STATE];
			if (isSameScope(state, rootScope)) {
				set(target, key, getFinalValue(state), target.type_);
				markStateFinalized(state);
			}
		} else if (isDraftable(value)) handleValue(value, handledSet, rootScope);
	});
	return target;
}
function createProxyProxy(base, parent) {
	const baseIsArray = isArray(base);
	const state = {
		type_: baseIsArray ? 1 : 0,
		scope_: parent ? parent.scope_ : getCurrentScope(),
		modified_: false,
		finalized_: false,
		assigned_: void 0,
		parent_: parent,
		base_: base,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: false,
		callbacks_: void 0
	};
	let target = state;
	let traps = objectTraps;
	if (baseIsArray) {
		target = [state];
		traps = arrayTraps;
	}
	const { revoke, proxy } = Proxy.revocable(target, traps);
	state.draft_ = proxy;
	state.revoke_ = revoke;
	return [proxy, state];
}
var objectTraps = {
	get(state, prop) {
		if (prop === DRAFT_STATE) return state;
		let arrayPlugin = state.scope_.arrayMethodsPlugin_;
		const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
		if (isArrayWithStringProp) {
			if (arrayPlugin?.isArrayOperationMethod(prop)) return arrayPlugin.createMethodInterceptor(state, prop);
		}
		const source = latest(state);
		if (!has(source, prop, state.type_)) return readPropFromProto(state, source, prop);
		const value = source[prop];
		if (state.finalized_ || !isDraftable(value)) return value;
		if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(state.operationMethod) && isArrayIndex(prop)) return value;
		if (value === peek(state.base_, prop)) {
			prepareCopy(state);
			const childKey = state.type_ === 1 ? +prop : prop;
			const childDraft = createProxy(state.scope_, value, state, childKey);
			return state.copy_[childKey] = childDraft;
		}
		return value;
	},
	has(state, prop) {
		return prop in latest(state);
	},
	ownKeys(state) {
		return Reflect.ownKeys(latest(state));
	},
	set(state, prop, value) {
		const desc = getDescriptorFromProto(latest(state), prop);
		if (desc?.set) {
			desc.set.call(state.draft_, value);
			return true;
		}
		if (!state.modified_) {
			const current2 = peek(latest(state), prop);
			const currentState = current2?.[DRAFT_STATE];
			if (currentState && currentState.base_ === value) {
				state.copy_[prop] = value;
				state.assigned_.set(prop, false);
				return true;
			}
			if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_))) return true;
			prepareCopy(state);
			markChanged(state);
		}
		if (state.copy_[prop] === value && (value !== void 0 || prop in state.copy_) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
		state.copy_[prop] = value;
		state.assigned_.set(prop, true);
		handleCrossReference(state, prop, value);
		return true;
	},
	deleteProperty(state, prop) {
		prepareCopy(state);
		if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
			state.assigned_.set(prop, false);
			markChanged(state);
		} else state.assigned_.delete(prop);
		if (state.copy_) delete state.copy_[prop];
		return true;
	},
	getOwnPropertyDescriptor(state, prop) {
		const owner = latest(state);
		const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
		if (!desc) return desc;
		return {
			[WRITABLE]: true,
			[CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
			[ENUMERABLE]: desc[ENUMERABLE],
			[VALUE]: owner[prop]
		};
	},
	defineProperty() {
		die(11);
	},
	getPrototypeOf(state) {
		return getPrototypeOf(state.base_);
	},
	setPrototypeOf() {
		die(12);
	}
};
var arrayTraps = {};
for (let key in objectTraps) {
	let fn = objectTraps[key];
	arrayTraps[key] = function() {
		const args = arguments;
		args[0] = args[0][0];
		return fn.apply(this, args);
	};
}
arrayTraps.deleteProperty = function(state, prop) {
	return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
	return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
	const state = draft[DRAFT_STATE];
	return (state ? latest(state) : draft)[prop];
}
function readPropFromProto(state, source, prop) {
	const desc = getDescriptorFromProto(source, prop);
	return desc ? VALUE in desc ? desc[VALUE] : desc.get?.call(state.draft_) : void 0;
}
function getDescriptorFromProto(source, prop) {
	if (!(prop in source)) return void 0;
	let proto = getPrototypeOf(source);
	while (proto) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop);
		if (desc) return desc;
		proto = getPrototypeOf(proto);
	}
}
function markChanged(state) {
	if (!state.modified_) {
		state.modified_ = true;
		if (state.parent_) markChanged(state.parent_);
	}
}
function prepareCopy(state) {
	if (!state.copy_) {
		state.assigned_ = /* @__PURE__ */ new Map();
		state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
	}
}
var Immer2 = class {
	constructor(config) {
		this.autoFreeze_ = true;
		this.useStrictShallowCopy_ = false;
		this.useStrictIteration_ = false;
		/**
		* The `produce` function takes a value and a "recipe function" (whose
		* return value often depends on the base state). The recipe function is
		* free to mutate its first argument however it wants. All mutations are
		* only ever applied to a __copy__ of the base state.
		*
		* Pass only a function to create a "curried producer" which relieves you
		* from passing the recipe function every time.
		*
		* Only plain objects and arrays are made mutable. All other objects are
		* considered uncopyable.
		*
		* Note: This function is __bound__ to its `Immer` instance.
		*
		* @param {any} base - the initial state
		* @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
		* @param {Function} patchListener - optional function that will be called with all the patches produced here
		* @returns {any} a new state, or the initial state if nothing was modified
		*/
		this.produce = (base, recipe, patchListener) => {
			if (isFunction(base) && !isFunction(recipe)) {
				const defaultBase = recipe;
				recipe = base;
				const self = this;
				return function curriedProduce(base2 = defaultBase, ...args) {
					return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
				};
			}
			if (!isFunction(recipe)) die(6);
			if (patchListener !== void 0 && !isFunction(patchListener)) die(7);
			let result;
			if (isDraftable(base)) {
				const scope = enterScope(this);
				const proxy = createProxy(scope, base, void 0);
				let hasError = true;
				try {
					result = recipe(proxy);
					hasError = false;
				} finally {
					if (hasError) revokeScope(scope);
					else leaveScope(scope);
				}
				usePatchesInScope(scope, patchListener);
				return processResult(result, scope);
			} else if (!base || !isObjectish(base)) {
				result = recipe(base);
				if (result === void 0) result = base;
				if (result === NOTHING) result = void 0;
				if (this.autoFreeze_) freeze(result, true);
				if (patchListener) {
					const p = [];
					const ip = [];
					getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
						patches_: p,
						inversePatches_: ip
					});
					patchListener(p, ip);
				}
				return result;
			} else die(1, base);
		};
		this.produceWithPatches = (base, recipe) => {
			if (isFunction(base)) return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
			let patches, inversePatches;
			return [
				this.produce(base, recipe, (p, ip) => {
					patches = p;
					inversePatches = ip;
				}),
				patches,
				inversePatches
			];
		};
		if (isBoolean$1(config?.autoFreeze)) this.setAutoFreeze(config.autoFreeze);
		if (isBoolean$1(config?.useStrictShallowCopy)) this.setUseStrictShallowCopy(config.useStrictShallowCopy);
		if (isBoolean$1(config?.useStrictIteration)) this.setUseStrictIteration(config.useStrictIteration);
	}
	createDraft(base) {
		if (!isDraftable(base)) die(8);
		if (isDraft(base)) base = current(base);
		const scope = enterScope(this);
		const proxy = createProxy(scope, base, void 0);
		proxy[DRAFT_STATE].isManual_ = true;
		leaveScope(scope);
		return proxy;
	}
	finishDraft(draft, patchListener) {
		const state = draft && draft[DRAFT_STATE];
		if (!state || !state.isManual_) die(9);
		const { scope_: scope } = state;
		usePatchesInScope(scope, patchListener);
		return processResult(void 0, scope);
	}
	/**
	* Pass true to automatically freeze all copies created by Immer.
	*
	* By default, auto-freezing is enabled.
	*/
	setAutoFreeze(value) {
		this.autoFreeze_ = value;
	}
	/**
	* Pass true to enable strict shallow copy.
	*
	* By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
	*/
	setUseStrictShallowCopy(value) {
		this.useStrictShallowCopy_ = value;
	}
	/**
	* Pass false to use faster iteration that skips non-enumerable properties
	* but still handles symbols for compatibility.
	*
	* By default, strict iteration is enabled (includes all own properties).
	*/
	setUseStrictIteration(value) {
		this.useStrictIteration_ = value;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(base, patches) {
		let i;
		for (i = patches.length - 1; i >= 0; i--) {
			const patch = patches[i];
			if (patch.path.length === 0 && patch.op === "replace") {
				base = patch.value;
				break;
			}
		}
		if (i > -1) patches = patches.slice(i + 1);
		const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
		if (isDraft(base)) return applyPatchesImpl(base, patches);
		return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
	}
};
function createProxy(rootScope, value, parent, key) {
	const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
	(parent?.scope_ ?? getCurrentScope()).drafts_.push(draft);
	state.callbacks_ = parent?.callbacks_ ?? [];
	state.key_ = key;
	if (parent && key !== void 0) registerChildFinalizationCallback(parent, state, key);
	else state.callbacks_.push(function rootDraftCleanup(rootScope2) {
		rootScope2.mapSetPlugin_?.fixSetContents(state);
		const { patchPlugin_ } = rootScope2;
		if (state.modified_ && patchPlugin_) patchPlugin_.generatePatches_(state, [], rootScope2);
	});
	return draft;
}
function current(value) {
	if (!isDraft(value)) die(10, value);
	return currentImpl(value);
}
function currentImpl(value) {
	if (!isDraftable(value) || isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	let copy;
	let strict = true;
	if (state) {
		if (!state.modified_) return state.base_;
		state.finalized_ = true;
		copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
		strict = state.scope_.immer_.shouldUseStrictIteration();
	} else copy = shallowCopy(value, true);
	each(copy, (key, childValue) => {
		set(copy, key, currentImpl(childValue));
	}, strict);
	if (state) state.finalized_ = false;
	return copy;
}
var produce = new Immer2().produce;
//#endregion
//#region ../../node_modules/.pnpm/redux-thunk@3.1.0_redux@5.0.1/node_modules/redux-thunk/dist/redux-thunk.mjs
function createThunkMiddleware(extraArgument) {
	const middleware = ({ dispatch, getState }) => (next) => (action) => {
		if (typeof action === "function") return action(dispatch, getState, extraArgument);
		return next(action);
	};
	return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
//#endregion
//#region ../../node_modules/.pnpm/@reduxjs+toolkit@2.11.2_react-redux@9.2.0_@types+react@19.2.14_react@19.2.6_redux@5.0.1__react@19.2.6/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length === 0) return void 0;
	if (typeof arguments[0] === "object") return compose;
	return compose.apply(null, arguments);
};
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function createAction(type, prepareAction) {
	function actionCreator(...args) {
		if (prepareAction) {
			let prepared = prepareAction(...args);
			if (!prepared) throw new Error(formatProdErrorMessage(0));
			return {
				type,
				payload: prepared.payload,
				..."meta" in prepared && { meta: prepared.meta },
				..."error" in prepared && { error: prepared.error }
			};
		}
		return {
			type,
			payload: args[0]
		};
	}
	actionCreator.toString = () => `${type}`;
	actionCreator.type = type;
	actionCreator.match = (action) => isAction(action) && action.type === type;
	return actionCreator;
}
var Tuple = class _Tuple extends Array {
	constructor(...items) {
		super(...items);
		Object.setPrototypeOf(this, _Tuple.prototype);
	}
	static get [Symbol.species]() {
		return _Tuple;
	}
	concat(...arr) {
		return super.concat.apply(this, arr);
	}
	prepend(...arr) {
		if (arr.length === 1 && Array.isArray(arr[0])) return new _Tuple(...arr[0].concat(this));
		return new _Tuple(...arr.concat(this));
	}
};
function freezeDraftable(val) {
	return isDraftable(val) ? produce(val, () => {}) : val;
}
function getOrInsertComputed(map, key, compute) {
	if (map.has(key)) return map.get(key);
	return map.set(key, compute(key)).get(key);
}
function isBoolean(x) {
	return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
	const { thunk: thunk$1 = true, immutableCheck = true, serializableCheck = true, actionCreatorCheck = true } = options ?? {};
	let middlewareArray = new Tuple();
	if (thunk$1) if (isBoolean(thunk$1)) middlewareArray.push(thunk);
	else middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
	return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var prepareAutoBatched = () => (payload) => ({
	payload,
	meta: { [SHOULD_AUTOBATCH]: true }
});
var createQueueWithTimer = (timeout) => {
	return (notify) => {
		setTimeout(notify, timeout);
	};
};
var autoBatchEnhancer = (options = { type: "raf" }) => (next) => (...args) => {
	const store = next(...args);
	let notifying = true;
	let shouldNotifyAtEndOfTick = false;
	let notificationQueued = false;
	const listeners = /* @__PURE__ */ new Set();
	const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
	const notifyListeners = () => {
		notificationQueued = false;
		if (shouldNotifyAtEndOfTick) {
			shouldNotifyAtEndOfTick = false;
			listeners.forEach((l) => l());
		}
	};
	return Object.assign({}, store, {
		subscribe(listener2) {
			const wrappedListener = () => notifying && listener2();
			const unsubscribe = store.subscribe(wrappedListener);
			listeners.add(listener2);
			return () => {
				unsubscribe();
				listeners.delete(listener2);
			};
		},
		dispatch(action) {
			try {
				notifying = !action?.meta?.[SHOULD_AUTOBATCH];
				shouldNotifyAtEndOfTick = !notifying;
				if (shouldNotifyAtEndOfTick) {
					if (!notificationQueued) {
						notificationQueued = true;
						queueCallback(notifyListeners);
					}
				}
				return store.dispatch(action);
			} finally {
				notifying = true;
			}
		}
	});
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
	const { autoBatch = true } = options ?? {};
	let enhancerArray = new Tuple(middlewareEnhancer);
	if (autoBatch) enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
	return enhancerArray;
};
function configureStore(options) {
	const getDefaultMiddleware = buildGetDefaultMiddleware();
	const { reducer = void 0, middleware, devTools = true, duplicateMiddlewareCheck = true, preloadedState = void 0, enhancers = void 0 } = options || {};
	let rootReducer;
	if (typeof reducer === "function") rootReducer = reducer;
	else if (isPlainObject$1(reducer)) rootReducer = combineReducers(reducer);
	else throw new Error(formatProdErrorMessage(1));
	let finalMiddleware;
	if (typeof middleware === "function") finalMiddleware = middleware(getDefaultMiddleware);
	else finalMiddleware = getDefaultMiddleware();
	let finalCompose = compose;
	if (devTools) finalCompose = composeWithDevTools({
		trace: false,
		...typeof devTools === "object" && devTools
	});
	const getDefaultEnhancers = buildGetDefaultEnhancers(applyMiddleware(...finalMiddleware));
	let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
	const composedEnhancer = finalCompose(...storeEnhancers);
	return createStore(rootReducer, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
	const actionsMap = {};
	const actionMatchers = [];
	let defaultCaseReducer;
	const builder = {
		addCase(typeOrActionCreator, reducer) {
			const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
			if (!type) throw new Error(formatProdErrorMessage(28));
			if (type in actionsMap) throw new Error(formatProdErrorMessage(29));
			actionsMap[type] = reducer;
			return builder;
		},
		addAsyncThunk(asyncThunk, reducers) {
			if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
			if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
			if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
			if (reducers.settled) actionMatchers.push({
				matcher: asyncThunk.settled,
				reducer: reducers.settled
			});
			return builder;
		},
		addMatcher(matcher, reducer) {
			actionMatchers.push({
				matcher,
				reducer
			});
			return builder;
		},
		addDefaultCase(reducer) {
			defaultCaseReducer = reducer;
			return builder;
		}
	};
	builderCallback(builder);
	return [
		actionsMap,
		actionMatchers,
		defaultCaseReducer
	];
}
function isStateFunction(x) {
	return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
	let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
	let getInitialState;
	if (isStateFunction(initialState)) getInitialState = () => freezeDraftable(initialState());
	else {
		const frozenInitialState = freezeDraftable(initialState);
		getInitialState = () => frozenInitialState;
	}
	function reducer(state = getInitialState(), action) {
		let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)];
		if (caseReducers.filter((cr) => !!cr).length === 0) caseReducers = [finalDefaultCaseReducer];
		return caseReducers.reduce((previousState, caseReducer) => {
			if (caseReducer) if (isDraft(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) return previousState;
				return result;
			} else if (!isDraftable(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) {
					if (previousState === null) return previousState;
					throw Error("A case reducer on a non-draftable value must not return undefined");
				}
				return result;
			} else return produce(previousState, (draft) => {
				return caseReducer(draft, action);
			});
			return previousState;
		}, state);
	}
	reducer.getInitialState = getInitialState;
	return reducer;
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = (size = 21) => {
	let id = "";
	let i = size;
	while (i--) id += urlAlphabet[Math.random() * 64 | 0];
	return id;
};
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
	return `${slice}/${actionKey}`;
}
function buildCreateSlice({ creators } = {}) {
	const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
	return function createSlice2(options) {
		const { name, reducerPath = name } = options;
		if (!name) throw new Error(formatProdErrorMessage(11));
		const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
		const reducerNames = Object.keys(reducers);
		const context = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		};
		const contextMethods = {
			addCase(typeOrActionCreator, reducer2) {
				const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
				if (!type) throw new Error(formatProdErrorMessage(12));
				if (type in context.sliceCaseReducersByType) throw new Error(formatProdErrorMessage(13));
				context.sliceCaseReducersByType[type] = reducer2;
				return contextMethods;
			},
			addMatcher(matcher, reducer2) {
				context.sliceMatchers.push({
					matcher,
					reducer: reducer2
				});
				return contextMethods;
			},
			exposeAction(name2, actionCreator) {
				context.actionCreators[name2] = actionCreator;
				return contextMethods;
			},
			exposeCaseReducer(name2, reducer2) {
				context.sliceCaseReducersByName[name2] = reducer2;
				return contextMethods;
			}
		};
		reducerNames.forEach((reducerName) => {
			const reducerDefinition = reducers[reducerName];
			const reducerDetails = {
				reducerName,
				type: getType(name, reducerName),
				createNotation: typeof options.reducers === "function"
			};
			if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
			else handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
		});
		function buildReducer() {
			const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
			const finalCaseReducers = {
				...extraReducers,
				...context.sliceCaseReducersByType
			};
			return createReducer(options.initialState, (builder) => {
				for (let key in finalCaseReducers) builder.addCase(key, finalCaseReducers[key]);
				for (let sM of context.sliceMatchers) builder.addMatcher(sM.matcher, sM.reducer);
				for (let m of actionMatchers) builder.addMatcher(m.matcher, m.reducer);
				if (defaultCaseReducer) builder.addDefaultCase(defaultCaseReducer);
			});
		}
		const selectSelf = (state) => state;
		const injectedSelectorCache = /* @__PURE__ */ new Map();
		const injectedStateCache = /* @__PURE__ */ new WeakMap();
		let _reducer;
		function reducer(state, action) {
			if (!_reducer) _reducer = buildReducer();
			return _reducer(state, action);
		}
		function getInitialState() {
			if (!_reducer) _reducer = buildReducer();
			return _reducer.getInitialState();
		}
		function makeSelectorProps(reducerPath2, injected = false) {
			function selectSlice(state) {
				let sliceState = state[reducerPath2];
				if (typeof sliceState === "undefined") {
					if (injected) sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
				}
				return sliceState;
			}
			function getSelectors(selectState = selectSelf) {
				return getOrInsertComputed(getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap()), selectState, () => {
					const map = {};
					for (const [name2, selector] of Object.entries(options.selectors ?? {})) map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
					return map;
				});
			}
			return {
				reducerPath: reducerPath2,
				getSelectors,
				get selectors() {
					return getSelectors(selectSlice);
				},
				selectSlice
			};
		}
		const slice = {
			name,
			reducer,
			actions: context.actionCreators,
			caseReducers: context.sliceCaseReducersByName,
			getInitialState,
			...makeSelectorProps(reducerPath),
			injectInto(injectable, { reducerPath: pathOpt, ...config } = {}) {
				const newReducerPath = pathOpt ?? reducerPath;
				injectable.inject({
					reducerPath: newReducerPath,
					reducer
				}, config);
				return {
					...slice,
					...makeSelectorProps(newReducerPath, true)
				};
			}
		};
		return slice;
	};
}
function wrapSelector(selector, selectState, getInitialState, injected) {
	function wrapper(rootState, ...args) {
		let sliceState = selectState(rootState);
		if (typeof sliceState === "undefined") {
			if (injected) sliceState = getInitialState();
		}
		return selector(sliceState, ...args);
	}
	wrapper.unwrapped = selector;
	return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
	function asyncThunk(payloadCreator, config) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator,
			...config
		};
	}
	asyncThunk.withTypes = () => asyncThunk;
	return {
		reducer(caseReducer) {
			return Object.assign({ [caseReducer.name](...args) {
				return caseReducer(...args);
			} }[caseReducer.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(prepare, reducer) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare,
				reducer
			};
		},
		asyncThunk
	};
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
	let caseReducer;
	let prepareCallback;
	if ("reducer" in maybeReducerWithPrepare) {
		if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) throw new Error(formatProdErrorMessage(17));
		caseReducer = maybeReducerWithPrepare.reducer;
		prepareCallback = maybeReducerWithPrepare.prepare;
	} else caseReducer = maybeReducerWithPrepare;
	context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context, cAT) {
	if (!cAT) throw new Error(formatProdErrorMessage(18));
	const { payloadCreator, fulfilled, pending, rejected, settled, options } = reducerDefinition;
	const thunk = cAT(type, payloadCreator, options);
	context.exposeAction(reducerName, thunk);
	if (fulfilled) context.addCase(thunk.fulfilled, fulfilled);
	if (pending) context.addCase(thunk.pending, pending);
	if (rejected) context.addCase(thunk.rejected, rejected);
	if (settled) context.addMatcher(thunk.settled, settled);
	context.exposeCaseReducer(reducerName, {
		fulfilled: fulfilled || noop,
		pending: pending || noop,
		rejected: rejected || noop,
		settled: settled || noop
	});
}
function noop() {}
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = `task-${cancelled}`;
var taskCompleted = `task-${completed}`;
var listenerCancelled = `${listener}-${cancelled}`;
var listenerCompleted = `${listener}-${completed}`;
var TaskAbortError = class {
	constructor(code) {
		this.code = code;
		this.message = `${task} ${cancelled} (reason: ${code})`;
	}
	name = "TaskAbortError";
	message;
};
var assertFunction = (func, expected) => {
	if (typeof func !== "function") throw new TypeError(formatProdErrorMessage(32));
};
var noop2 = () => {};
var catchRejection = (promise, onError = noop2) => {
	promise.catch(onError);
	return promise;
};
var addAbortSignalListener = (abortSignal, callback) => {
	abortSignal.addEventListener("abort", callback, { once: true });
	return () => abortSignal.removeEventListener("abort", callback);
};
var validateActive = (signal) => {
	if (signal.aborted) throw new TaskAbortError(signal.reason);
};
function raceWithSignal(signal, promise) {
	let cleanup = noop2;
	return new Promise((resolve, reject) => {
		const notifyRejection = () => reject(new TaskAbortError(signal.reason));
		if (signal.aborted) {
			notifyRejection();
			return;
		}
		cleanup = addAbortSignalListener(signal, notifyRejection);
		promise.finally(() => cleanup()).then(resolve, reject);
	}).finally(() => {
		cleanup = noop2;
	});
}
var runTask = async (task2, cleanUp) => {
	try {
		await Promise.resolve();
		return {
			status: "ok",
			value: await task2()
		};
	} catch (error) {
		return {
			status: error instanceof TaskAbortError ? "cancelled" : "rejected",
			error
		};
	} finally {
		cleanUp?.();
	}
};
var createPause = (signal) => {
	return (promise) => {
		return catchRejection(raceWithSignal(signal, promise).then((output) => {
			validateActive(signal);
			return output;
		}));
	};
};
var createDelay = (signal) => {
	const pause = createPause(signal);
	return (timeoutMs) => {
		return pause(new Promise((resolve) => setTimeout(resolve, timeoutMs)));
	};
};
var { assign } = Object;
var INTERNAL_NIL_TOKEN = {};
var alm = "listenerMiddleware";
var createFork = (parentAbortSignal, parentBlockingPromises) => {
	const linkControllers = (controller) => addAbortSignalListener(parentAbortSignal, () => controller.abort(parentAbortSignal.reason));
	return (taskExecutor, opts) => {
		assertFunction(taskExecutor, "taskExecutor");
		const childAbortController = new AbortController();
		linkControllers(childAbortController);
		const result = runTask(async () => {
			validateActive(parentAbortSignal);
			validateActive(childAbortController.signal);
			const result2 = await taskExecutor({
				pause: createPause(childAbortController.signal),
				delay: createDelay(childAbortController.signal),
				signal: childAbortController.signal
			});
			validateActive(childAbortController.signal);
			return result2;
		}, () => childAbortController.abort(taskCompleted));
		if (opts?.autoJoin) parentBlockingPromises.push(result.catch(noop2));
		return {
			result: createPause(parentAbortSignal)(result),
			cancel() {
				childAbortController.abort(taskCancelled);
			}
		};
	};
};
var createTakePattern = (startListening, signal) => {
	const take = async (predicate, timeout) => {
		validateActive(signal);
		let unsubscribe = () => {};
		const promises = [new Promise((resolve, reject) => {
			let stopListening = startListening({
				predicate,
				effect: (action, listenerApi) => {
					listenerApi.unsubscribe();
					resolve([
						action,
						listenerApi.getState(),
						listenerApi.getOriginalState()
					]);
				}
			});
			unsubscribe = () => {
				stopListening();
				reject();
			};
		})];
		if (timeout != null) promises.push(new Promise((resolve) => setTimeout(resolve, timeout, null)));
		try {
			const output = await raceWithSignal(signal, Promise.race(promises));
			validateActive(signal);
			return output;
		} finally {
			unsubscribe();
		}
	};
	return (predicate, timeout) => catchRejection(take(predicate, timeout));
};
var getListenerEntryPropsFrom = (options) => {
	let { type, actionCreator, matcher, predicate, effect } = options;
	if (type) predicate = createAction(type).match;
	else if (actionCreator) {
		type = actionCreator.type;
		predicate = actionCreator.match;
	} else if (matcher) predicate = matcher;
	else if (predicate) {} else throw new Error(formatProdErrorMessage(21));
	assertFunction(effect, "options.listener");
	return {
		predicate,
		type,
		effect
	};
};
var createListenerEntry = /* @__PURE__ */ assign((options) => {
	const { type, predicate, effect } = getListenerEntryPropsFrom(options);
	return {
		id: nanoid(),
		effect,
		type,
		predicate,
		pending: /* @__PURE__ */ new Set(),
		unsubscribe: () => {
			throw new Error(formatProdErrorMessage(22));
		}
	};
}, { withTypes: () => createListenerEntry });
var findListenerEntry = (listenerMap, options) => {
	const { type, effect, predicate } = getListenerEntryPropsFrom(options);
	return Array.from(listenerMap.values()).find((entry) => {
		return (typeof type === "string" ? entry.type === type : entry.predicate === predicate) && entry.effect === effect;
	});
};
var cancelActiveListeners = (entry) => {
	entry.pending.forEach((controller) => {
		controller.abort(listenerCancelled);
	});
};
var createClearListenerMiddleware = (listenerMap, executingListeners) => {
	return () => {
		for (const listener2 of executingListeners.keys()) cancelActiveListeners(listener2);
		listenerMap.clear();
	};
};
var safelyNotifyError = (errorHandler, errorToNotify, errorInfo) => {
	try {
		errorHandler(errorToNotify, errorInfo);
	} catch (errorHandlerError) {
		setTimeout(() => {
			throw errorHandlerError;
		}, 0);
	}
};
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
var clearAllListeners = /* @__PURE__ */ createAction(`${alm}/removeAll`);
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
var defaultErrorHandler = (...args) => {
	console.error(`${alm}/error`, ...args);
};
var createListenerMiddleware = (middlewareOptions = {}) => {
	const listenerMap = /* @__PURE__ */ new Map();
	const executingListeners = /* @__PURE__ */ new Map();
	const trackExecutingListener = (entry) => {
		const count = executingListeners.get(entry) ?? 0;
		executingListeners.set(entry, count + 1);
	};
	const untrackExecutingListener = (entry) => {
		const count = executingListeners.get(entry) ?? 1;
		if (count === 1) executingListeners.delete(entry);
		else executingListeners.set(entry, count - 1);
	};
	const { extra, onError = defaultErrorHandler } = middlewareOptions;
	assertFunction(onError, "onError");
	const insertEntry = (entry) => {
		entry.unsubscribe = () => listenerMap.delete(entry.id);
		listenerMap.set(entry.id, entry);
		return (cancelOptions) => {
			entry.unsubscribe();
			if (cancelOptions?.cancelActive) cancelActiveListeners(entry);
		};
	};
	const startListening = (options) => {
		return insertEntry(findListenerEntry(listenerMap, options) ?? createListenerEntry(options));
	};
	assign(startListening, { withTypes: () => startListening });
	const stopListening = (options) => {
		const entry = findListenerEntry(listenerMap, options);
		if (entry) {
			entry.unsubscribe();
			if (options.cancelActive) cancelActiveListeners(entry);
		}
		return !!entry;
	};
	assign(stopListening, { withTypes: () => stopListening });
	const notifyListener = async (entry, action, api, getOriginalState) => {
		const internalTaskController = new AbortController();
		const take = createTakePattern(startListening, internalTaskController.signal);
		const autoJoinPromises = [];
		try {
			entry.pending.add(internalTaskController);
			trackExecutingListener(entry);
			await Promise.resolve(entry.effect(action, assign({}, api, {
				getOriginalState,
				condition: (predicate, timeout) => take(predicate, timeout).then(Boolean),
				take,
				delay: createDelay(internalTaskController.signal),
				pause: createPause(internalTaskController.signal),
				extra,
				signal: internalTaskController.signal,
				fork: createFork(internalTaskController.signal, autoJoinPromises),
				unsubscribe: entry.unsubscribe,
				subscribe: () => {
					listenerMap.set(entry.id, entry);
				},
				cancelActiveListeners: () => {
					entry.pending.forEach((controller, _, set) => {
						if (controller !== internalTaskController) {
							controller.abort(listenerCancelled);
							set.delete(controller);
						}
					});
				},
				cancel: () => {
					internalTaskController.abort(listenerCancelled);
					entry.pending.delete(internalTaskController);
				},
				throwIfCancelled: () => {
					validateActive(internalTaskController.signal);
				}
			})));
		} catch (listenerError) {
			if (!(listenerError instanceof TaskAbortError)) safelyNotifyError(onError, listenerError, { raisedBy: "effect" });
		} finally {
			await Promise.all(autoJoinPromises);
			internalTaskController.abort(listenerCompleted);
			untrackExecutingListener(entry);
			entry.pending.delete(internalTaskController);
		}
	};
	const clearListenerMiddleware = createClearListenerMiddleware(listenerMap, executingListeners);
	const middleware = (api) => (next) => (action) => {
		if (!isAction(action)) return next(action);
		if (addListener.match(action)) return startListening(action.payload);
		if (clearAllListeners.match(action)) {
			clearListenerMiddleware();
			return;
		}
		if (removeListener.match(action)) return stopListening(action.payload);
		let originalState = api.getState();
		const getOriginalState = () => {
			if (originalState === INTERNAL_NIL_TOKEN) throw new Error(formatProdErrorMessage(23));
			return originalState;
		};
		let result;
		try {
			result = next(action);
			if (listenerMap.size > 0) {
				const currentState = api.getState();
				const listenerEntries = Array.from(listenerMap.values());
				for (const entry of listenerEntries) {
					let runListener = false;
					try {
						runListener = entry.predicate(action, currentState, originalState);
					} catch (predicateError) {
						runListener = false;
						safelyNotifyError(onError, predicateError, { raisedBy: "predicate" });
					}
					if (!runListener) continue;
					notifyListener(entry, action, api, getOriginalState);
				}
			}
		} finally {
			originalState = INTERNAL_NIL_TOKEN;
		}
		return result;
	};
	return {
		middleware,
		startListening,
		stopListening,
		clearListeners: clearListenerMiddleware
	};
};
function formatProdErrorMessage(code) {
	return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
export { createSlice as a, combineReducers as c, createListenerMiddleware as i, createSelector as l, configureStore as n, prepareAutoBatched as o, createAction as r, current as s, autoBatchEnhancer as t };
