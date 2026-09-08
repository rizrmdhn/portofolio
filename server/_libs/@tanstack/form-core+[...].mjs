import { t as EventClient } from "./devtools-event-client+[...].mjs";
//#region ../../node_modules/.pnpm/@tanstack+store@0.9.3/node_modules/@tanstack/store/dist/esm/alien.js
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
	ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
	ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
	ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
	ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
	ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
	ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
	return ReactiveFlags2;
})(ReactiveFlags || {});
/* @__NO_SIDE_EFFECTS__ */
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link2, sub = link2.sub) {
		const dep = link2.dep;
		const prevDep = link2.prevDep;
		const nextDep = link2.nextDep;
		const nextSub = link2.nextSub;
		const prevSub = link2.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link2) {
		let next = link2.nextSub;
		let stack;
		top: do {
			const sub = link2.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link2, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link2 = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link2 = next) !== void 0) {
				next = link2.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link2 = stack.value;
				stack = stack.prev;
				if (link2 !== void 0) {
					next = link2.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link2, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link2.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link2.nextSub !== void 0 || link2.prevSub !== void 0) stack = {
					value: link2,
					prev: stack
				};
				link2 = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link2 = stack.value;
					stack = stack.prev;
				} else link2 = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link2.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link2.sub;
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link2) {
		do {
			const sub = link2.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link2 = link2.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link2 = sub.depsTail;
		while (link2 !== void 0) {
			if (link2 === checkLink) return true;
			link2 = link2.prevDep;
		}
		return false;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+store@0.9.3/node_modules/@tanstack/store/dist/esm/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
	const isObserver = typeof nextHandler === "object";
	const self = isObserver ? nextHandler : void 0;
	return {
		next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
		error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
		complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self)
	};
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect2) {
		queuedEffects[queuedEffectsLength++] = effect2;
		effect2.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function batch(fn) {
	try {
		++batchDepth;
		fn();
	} finally {
		if (!--batchDepth) flush();
	}
}
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
function flush() {
	if (batchDepth > 0) return;
	while (notifyIndex < queuedEffectsLength) {
		const effect2 = queuedEffects[notifyIndex];
		queuedEffects[notifyIndex++] = void 0;
		effect2.notify();
	}
	notifyIndex = 0;
	queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
	const isComputed = typeof valueOrFn === "function";
	const getter = valueOrFn;
	const atom = {
		_snapshot: isComputed ? void 0 : valueOrFn,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: isComputed ? ReactiveFlags.None : ReactiveFlags.Mutable,
		get() {
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		},
		subscribe(observerOrFn) {
			const obs = toObserver(observerOrFn);
			const observed = { current: false };
			const e = effect(() => {
				atom.get();
				if (!observed.current) observed.current = true;
				else obs.next?.(atom._snapshot);
			});
			return { unsubscribe: () => {
				e.stop();
			} };
		},
		_update(getValue) {
			const prevSub = activeSub;
			const compare = options?.compare ?? Object.is;
			if (isComputed) {
				activeSub = atom;
				++cycle;
				atom.depsTail = void 0;
			} else if (getValue === void 0) return false;
			if (isComputed) atom.flags = ReactiveFlags.Mutable | ReactiveFlags.RecursedCheck;
			try {
				const oldValue = atom._snapshot;
				const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
				if (oldValue === void 0 || !compare(oldValue, newValue)) {
					atom._snapshot = newValue;
					return true;
				}
				return false;
			} finally {
				activeSub = prevSub;
				if (isComputed) atom.flags &= ~ReactiveFlags.RecursedCheck;
				purgeDeps(atom);
			}
		}
	};
	if (isComputed) {
		atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
		atom.get = function() {
			const flags = atom.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(atom.deps, atom)) {
				if (atom._update()) {
					const subs = atom.subs;
					if (subs !== void 0) shallowPropagate(subs);
				}
			} else if (flags & ReactiveFlags.Pending) atom.flags = flags & ~ReactiveFlags.Pending;
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		};
	} else atom.set = function(valueOrFn2) {
		if (atom._update(valueOrFn2)) {
			const subs = atom.subs;
			if (subs !== void 0) {
				propagate(subs);
				shallowPropagate(subs);
				flush();
			}
		}
	};
	return atom;
}
function effect(fn) {
	const run = () => {
		const prevSub = activeSub;
		activeSub = effectObj;
		++cycle;
		effectObj.depsTail = void 0;
		effectObj.flags = ReactiveFlags.Watching | ReactiveFlags.RecursedCheck;
		try {
			return fn();
		} finally {
			activeSub = prevSub;
			effectObj.flags &= ~ReactiveFlags.RecursedCheck;
			purgeDeps(effectObj);
		}
	};
	const effectObj = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: ReactiveFlags.Watching | ReactiveFlags.RecursedCheck,
		notify() {
			const flags = this.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(this.deps, this)) run();
			else this.flags = ReactiveFlags.Watching;
		},
		stop() {
			this.flags = ReactiveFlags.None;
			this.depsTail = void 0;
			purgeDeps(this);
		}
	};
	run();
	return effectObj;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+store@0.9.3/node_modules/@tanstack/store/dist/esm/store.js
var Store = class {
	constructor(valueOrFn) {
		this.atom = createAtom(valueOrFn);
	}
	setState(updater) {
		this.atom.set(updater);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};
var ReadonlyStore = class {
	constructor(valueOrFn) {
		this.atom = createAtom(valueOrFn);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};
function createStore(valueOrFn) {
	if (typeof valueOrFn === "function") return new ReadonlyStore(valueOrFn);
	return new Store(valueOrFn);
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+pacer-lite@0.1.1/node_modules/@tanstack/pacer-lite/dist/lite-throttler.js
/**
* A lightweight class that creates a throttled function.
*
* This is an alternative to the Throttler in the core @tanstack/pacer package, but is more
* suitable for libraries and npm packages that need minimal overhead. Unlike the core Throttler,
* this version does not use TanStack Store for state management, has no devtools integration,
* and provides only essential throttling functionality.
*
* Throttling ensures a function is called at most once within a specified time window.
* Unlike debouncing which waits for a pause in calls, throttling guarantees consistent
* execution timing regardless of call frequency.
*
* Supports both leading and trailing edge execution:
* - Leading: Execute immediately on first call (default: true)
* - Trailing: Execute after wait period if called during throttle (default: true)
*
* Features:
* - Zero dependencies - no external libraries required
* - Minimal API surface - only essential methods (maybeExecute, flush, cancel)
* - Simple state management - uses basic private properties instead of reactive stores
* - Callback support for monitoring execution events
* - Lightweight - designed for use in npm packages where bundle size matters
*
* @example
* ```ts
* const throttler = new LiteThrottler((scrollY: number) => {
*   updateScrollPosition(scrollY);
* }, {
*   wait: 100,
*   onExecute: (args, throttler) => {
*     console.log('Updated scroll position:', args[0]);
*   }
* });
*
* // Will execute at most once per 100ms
* window.addEventListener('scroll', () => {
*   throttler.maybeExecute(window.scrollY);
* });
* ```
*/
var LiteThrottler = class {
	constructor(fn, options) {
		this.fn = fn;
		this.options = options;
		this.lastExecutionTime = 0;
		this.isPending = false;
		this.maybeExecute = (...args) => {
			const timeSinceLastExecution = Date.now() - this.lastExecutionTime;
			if (this.options.leading && timeSinceLastExecution >= this.options.wait) this.execute(...args);
			else {
				this.lastArgs = args;
				if (!this.timeoutId && this.options.trailing) {
					const timeoutDuration = this.options.wait - timeSinceLastExecution;
					this.isPending = true;
					this.timeoutId = setTimeout(() => {
						if (this.lastArgs !== void 0) this.execute(...this.lastArgs);
					}, timeoutDuration);
				}
			}
		};
		this.execute = (...args) => {
			this.fn(...args);
			this.options.onExecute?.(args, this);
			this.lastExecutionTime = Date.now();
			this.clearTimeout();
			this.lastArgs = void 0;
			this.isPending = false;
		};
		this.flush = () => {
			if (this.isPending && this.lastArgs) this.execute(...this.lastArgs);
		};
		this.cancel = () => {
			this.clearTimeout();
			this.lastArgs = void 0;
			this.isPending = false;
		};
		this.clearTimeout = () => {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = void 0;
			}
		};
		if (this.options.leading === void 0 && this.options.trailing === void 0) {
			this.options.leading = true;
			this.options.trailing = true;
		}
	}
};
/**
* Creates a lightweight throttled function that limits how often the provided function can execute.
*
* This is an alternative to the throttle function in the core @tanstack/pacer package, but is more
* suitable for libraries and npm packages that need minimal overhead. Unlike the core version,
* this function creates a throttler with no external dependencies, devtools integration, or reactive state.
*
* Throttling ensures a function executes at most once within a specified time window,
* regardless of how many times it is called. This is useful for rate-limiting
* expensive operations or UI updates.
*
* @example
* ```ts
* const throttledScroll = liteThrottle(() => {
*   updateScrollIndicator();
* }, { wait: 100 });
*
* // Will execute at most once per 100ms
* window.addEventListener('scroll', throttledScroll);
* ```
*
* @example
* ```ts
* // Leading edge execution - fires immediately then throttles
* const throttledResize = liteThrottle(() => {
*   recalculateLayout();
* }, { wait: 250, leading: true, trailing: false });
* ```
*/
function liteThrottle(fn, options) {
	return new LiteThrottler(fn, options).maybeExecute;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/EventClient.js
var FormEventClient = class extends EventClient {
	constructor() {
		super({
			pluginId: "form-devtools",
			reconnectEveryMs: 1e3
		});
	}
};
var formEventClient = new FormEventClient();
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/utils.js
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function getBy(obj, path) {
	return makePathArray(path).reduce((current, pathPart) => {
		if (current === null) return null;
		if (typeof current !== "undefined") return current[pathPart];
	}, obj);
}
function setBy(obj, _path, updater) {
	const path = makePathArray(_path);
	function doSet(parent) {
		if (!path.length) return functionalUpdate(updater, parent);
		const key = path.shift();
		if (typeof key === "string" || typeof key === "number" && !Array.isArray(parent)) {
			if (typeof parent === "object") {
				if (parent === null) parent = {};
				return {
					...parent,
					[key]: doSet(parent[key])
				};
			}
			return { [key]: doSet() };
		}
		if (Array.isArray(parent) && typeof key === "number") {
			const prefix = parent.slice(0, key);
			return [
				...prefix.length ? prefix : new Array(key),
				doSet(parent[key]),
				...parent.slice(key + 1)
			];
		}
		return [...new Array(key), doSet()];
	}
	return doSet(obj);
}
function deleteBy(obj, _path) {
	const path = makePathArray(_path);
	function doDelete(parent) {
		if (!parent) return;
		if (path.length === 1) {
			const finalPath = path[0];
			if (Array.isArray(parent) && typeof finalPath === "number") return parent.filter((_, i) => i !== finalPath);
			const { [finalPath]: remove, ...rest } = parent;
			return rest;
		}
		const key = path.shift();
		if (typeof key === "string" || typeof key === "number" && !Array.isArray(parent)) {
			if (typeof parent === "object") return {
				...parent,
				[key]: doDelete(parent[key])
			};
		}
		if (typeof key === "number") {
			if (Array.isArray(parent)) {
				if (key >= parent.length) return parent;
				const prefix = parent.slice(0, key);
				return [
					...prefix.length ? prefix : new Array(key),
					doDelete(parent[key]),
					...parent.slice(key + 1)
				];
			}
		}
		throw new Error("It seems we have created an infinite loop in deleteBy. ");
	}
	return doDelete(obj);
}
var reLineOfOnlyDigits = /^(\d+)$/gm;
var reDigitsBetweenDots = /\.(\d+)(?=\.)/gm;
var reStartWithDigitThenDot = /^(\d+)\./gm;
var reDotWithDigitsToEnd = /\.(\d+$)/gm;
var reMultipleDots = /\.{2,}/gm;
var intPrefix = "__int__";
var intReplace = `${intPrefix}$1`;
function makePathArray(str) {
	if (Array.isArray(str)) return [...str];
	if (typeof str !== "string") throw new Error("Path must be a string.");
	return str.replace(/(^\[)|]/gm, "").replace(/\[/g, ".").replace(reLineOfOnlyDigits, intReplace).replace(reDigitsBetweenDots, `.${intReplace}.`).replace(reStartWithDigitThenDot, `${intReplace}.`).replace(reDotWithDigitsToEnd, `.${intReplace}`).replace(reMultipleDots, ".").split(".").map((d) => {
		if (d.startsWith(intPrefix)) {
			const numStr = d.substring(7);
			const num = parseInt(numStr, 10);
			if (String(num) === numStr) return num;
			return numStr;
		}
		return d;
	});
}
function isNonEmptyArray(obj) {
	return !(Array.isArray(obj) && obj.length === 0);
}
function getSyncValidatorArray(cause, options) {
	const runValidation = (props) => {
		return props.validators.filter(Boolean).map((validator) => {
			return {
				cause: validator.cause,
				validate: validator.fn
			};
		});
	};
	return options.validationLogic({
		form: options.form,
		validators: options.validators,
		event: {
			type: cause,
			fieldName: options.fieldName,
			async: false
		},
		runValidation
	});
}
function getAsyncValidatorArray(cause, options) {
	const { asyncDebounceMs } = options;
	const { onBlurAsyncDebounceMs, onChangeAsyncDebounceMs, onDynamicAsyncDebounceMs } = options.validators || {};
	const defaultDebounceMs = asyncDebounceMs ?? 0;
	const runValidation = (props) => {
		return props.validators.filter(Boolean).map((validator) => {
			const validatorCause = validator?.cause || cause;
			let debounceMs = defaultDebounceMs;
			switch (validatorCause) {
				case "change":
					debounceMs = onChangeAsyncDebounceMs ?? defaultDebounceMs;
					break;
				case "blur":
					debounceMs = onBlurAsyncDebounceMs ?? defaultDebounceMs;
					break;
				case "dynamic":
					debounceMs = onDynamicAsyncDebounceMs ?? defaultDebounceMs;
					break;
				case "submit":
					debounceMs = 0;
					break;
			}
			if (cause === "submit") debounceMs = 0;
			return {
				cause: validatorCause,
				validate: validator.fn,
				debounceMs
			};
		});
	};
	return options.validationLogic({
		form: options.form,
		validators: options.validators,
		event: {
			type: cause,
			fieldName: options.fieldName,
			async: true
		},
		runValidation
	});
}
var isGlobalFormValidationError = (error) => {
	return !!error && typeof error === "object" && "fields" in error;
};
function evaluate(objA, objB) {
	if (Object.is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	if (objA instanceof Date && objB instanceof Date) return objA.getTime() === objB.getTime();
	if (objA instanceof Map && objB instanceof Map) {
		if (objA.size !== objB.size) return false;
		for (const [k, v] of objA) if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
		return true;
	}
	if (objA instanceof Set && objB instanceof Set) {
		if (objA.size !== objB.size) return false;
		for (const v of objA) if (!objB.has(v)) return false;
		return true;
	}
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;
	if (keysA.length === 0 && !Array.isArray(objA) && !Array.isArray(objB) && (Object.getPrototypeOf(objA) !== Object.prototype || Object.getPrototypeOf(objB) !== Object.prototype)) return false;
	for (const key of keysA) if (!keysB.includes(key) || !evaluate(objA[key], objB[key])) return false;
	return true;
}
var determineFormLevelErrorSourceAndValue = ({ newFormValidatorError, isPreviousErrorFromFormValidator, previousErrorValue }) => {
	if (newFormValidatorError) return {
		newErrorValue: newFormValidatorError,
		newSource: "form"
	};
	if (isPreviousErrorFromFormValidator) return {
		newErrorValue: void 0,
		newSource: void 0
	};
	if (previousErrorValue) return {
		newErrorValue: previousErrorValue,
		newSource: "field"
	};
	return {
		newErrorValue: void 0,
		newSource: void 0
	};
};
var determineFieldLevelErrorSourceAndValue = ({ formLevelError, fieldLevelError }) => {
	if (fieldLevelError) return {
		newErrorValue: fieldLevelError,
		newSource: "field"
	};
	if (formLevelError) return {
		newErrorValue: formLevelError,
		newSource: "form"
	};
	return {
		newErrorValue: void 0,
		newSource: void 0
	};
};
function mergeOpts(originalOpts, overrides) {
	if (originalOpts === void 0 || originalOpts === null) return overrides;
	return {
		...originalOpts,
		...overrides
	};
}
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);
function uuid() {
	let i = 0;
	let num;
	let out = "";
	if (!BUFFER || IDX + 16 > 256) {
		BUFFER = new Array(256);
		i = 256;
		while (i--) BUFFER[i] = 256 * Math.random() | 0;
		i = 0;
		IDX = 0;
	}
	for (; i < 16; i++) {
		num = BUFFER[IDX + i];
		if (i === 6) out += HEX[num & 15 | 64];
		else if (i === 8) out += HEX[num & 63 | 128];
		else out += HEX[num];
		if (i & 1 && i > 1 && i < 11) out += "-";
	}
	IDX++;
	return out;
}
var throttleFormState = liteThrottle((form) => formEventClient.emit("form-state", {
	id: form.formId,
	state: form.store.state
}), { wait: 300 });
function deepCopy(obj) {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj.getTime());
	if (Array.isArray(obj)) {
		const arrCopy = [];
		for (let i = 0; i < obj.length; i++) arrCopy[i] = deepCopy(obj[i]);
		return arrCopy;
	}
	if (obj instanceof Map) {
		const mapCopy = /* @__PURE__ */ new Map();
		obj.forEach((value, key) => {
			mapCopy.set(key, deepCopy(value));
		});
		return mapCopy;
	}
	if (obj instanceof Set) {
		const setCopy = /* @__PURE__ */ new Set();
		obj.forEach((value) => {
			setCopy.add(deepCopy(value));
		});
		return setCopy;
	}
	const copy = {};
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) copy[key] = deepCopy(obj[key]);
	return copy;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/ValidationLogic.js
var defaultValidationLogic = (props) => {
	if (!props.validators) return props.runValidation({
		validators: [],
		form: props.form
	});
	const isAsync = props.event.async;
	const onMountValidator = isAsync ? void 0 : {
		fn: props.validators.onMount,
		cause: "mount"
	};
	const onChangeValidator = {
		fn: isAsync ? props.validators.onChangeAsync : props.validators.onChange,
		cause: "change"
	};
	const onBlurValidator = {
		fn: isAsync ? props.validators.onBlurAsync : props.validators.onBlur,
		cause: "blur"
	};
	const onSubmitValidator = {
		fn: isAsync ? props.validators.onSubmitAsync : props.validators.onSubmit,
		cause: "submit"
	};
	const onServerValidator = isAsync ? void 0 : {
		fn: () => void 0,
		cause: "server"
	};
	switch (props.event.type) {
		case "mount": return props.runValidation({
			validators: [onMountValidator],
			form: props.form
		});
		case "submit": return props.runValidation({
			validators: [
				onChangeValidator,
				onBlurValidator,
				onSubmitValidator,
				onServerValidator
			],
			form: props.form
		});
		case "server": return props.runValidation({
			validators: [],
			form: props.form
		});
		case "blur": return props.runValidation({
			validators: [onBlurValidator, onServerValidator],
			form: props.form
		});
		case "change": return props.runValidation({
			validators: [onChangeValidator, onServerValidator],
			form: props.form
		});
		default: throw new Error(`Unknown validation event type: ${props.event.type}`);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/standardSchemaValidator.js
function prefixSchemaToErrors(issues, formValue) {
	const schema = /* @__PURE__ */ new Map();
	for (const issue of issues) {
		const issuePath = issue.path ?? [];
		let currentFormValue = formValue;
		let path = "";
		for (let i = 0; i < issuePath.length; i++) {
			const pathSegment = issuePath[i];
			if (pathSegment === void 0) continue;
			const segment = typeof pathSegment === "object" ? pathSegment.key : pathSegment;
			const segmentAsNumber = Number(segment);
			if (Array.isArray(currentFormValue) && !Number.isNaN(segmentAsNumber)) path += `[${segmentAsNumber}]`;
			else path += (i > 0 ? "." : "") + String(segment);
			if (typeof currentFormValue === "object" && currentFormValue !== null) currentFormValue = currentFormValue[segment];
			else currentFormValue = void 0;
		}
		schema.set(path, (schema.get(path) ?? []).concat(issue));
	}
	return Object.fromEntries(schema);
}
var transformFormIssues = (issues, formValue) => {
	const schemaErrors = prefixSchemaToErrors(issues, formValue);
	return {
		form: schemaErrors,
		fields: schemaErrors
	};
};
var standardSchemaValidators = {
	validate({ value, validationSource }, schema) {
		const result = schema["~standard"].validate(value);
		if (result instanceof Promise) throw new Error("async function passed to sync validator");
		if (!result.issues) return;
		if (validationSource === "field") return result.issues;
		return transformFormIssues(result.issues, value);
	},
	async validateAsync({ value, validationSource }, schema) {
		const result = await schema["~standard"].validate(value);
		if (!result.issues) return;
		if (validationSource === "field") return result.issues;
		return transformFormIssues(result.issues, value);
	}
};
var isStandardSchemaValidator = (validator) => !!validator && "~standard" in validator;
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/metaHelper.js
var defaultFieldMeta = {
	isValidating: false,
	isTouched: false,
	isBlurred: false,
	isDirty: false,
	isPristine: true,
	isValid: true,
	isDefaultValue: true,
	errors: [],
	errorMap: {},
	errorSourceMap: {},
	_arrayVersion: 0
};
function metaHelper(formApi) {
	function bumpArrayVersion(field) {
		const currentMeta = formApi.getFieldMeta(field) ?? defaultFieldMeta;
		formApi.setFieldMeta(field, {
			...currentMeta,
			_arrayVersion: (currentMeta._arrayVersion || 0) + 1
		});
	}
	function handleArrayMove(field, fromIndex, toIndex) {
		bumpArrayVersion(field);
		const affectedFields = getAffectedFields(field, fromIndex, "move", toIndex);
		const startIndex = Math.min(fromIndex, toIndex);
		const endIndex = Math.max(fromIndex, toIndex);
		for (let i = startIndex; i <= endIndex; i++) affectedFields.push(getFieldPath(field, i));
		const fromFields = Object.keys(formApi.fieldInfo).reduce((fieldMap, fieldKey) => {
			if (fieldKey.startsWith(getFieldPath(field, fromIndex))) fieldMap.set(fieldKey, formApi.getFieldMeta(fieldKey));
			return fieldMap;
		}, /* @__PURE__ */ new Map());
		shiftMeta(affectedFields, fromIndex < toIndex ? "up" : "down");
		Object.keys(formApi.fieldInfo).filter((fieldKey) => fieldKey.startsWith(getFieldPath(field, toIndex))).forEach((fieldKey) => {
			const fromKey = fieldKey.replace(getFieldPath(field, toIndex), getFieldPath(field, fromIndex));
			const fromMeta = fromFields.get(fromKey);
			if (fromMeta) formApi.setFieldMeta(fieldKey, fromMeta);
		});
	}
	function handleArrayRemove(field, index) {
		bumpArrayVersion(field);
		shiftMeta(getAffectedFields(field, index, "remove"), "up");
	}
	function handleArraySwap(field, index, secondIndex) {
		bumpArrayVersion(field);
		getAffectedFields(field, index, "swap", secondIndex).forEach((fieldKey) => {
			if (!fieldKey.toString().startsWith(getFieldPath(field, index))) return;
			const swappedKey = fieldKey.toString().replace(getFieldPath(field, index), getFieldPath(field, secondIndex));
			const [meta1, meta2] = [formApi.getFieldMeta(fieldKey), formApi.getFieldMeta(swappedKey)];
			if (meta1) formApi.setFieldMeta(swappedKey, meta1);
			if (meta2) formApi.setFieldMeta(fieldKey, meta2);
		});
	}
	function handleArrayInsert(field, insertIndex) {
		bumpArrayVersion(field);
		const affectedFields = getAffectedFields(field, insertIndex, "insert");
		shiftMeta(affectedFields, "down");
		affectedFields.forEach((fieldKey) => {
			if (fieldKey.toString().startsWith(getFieldPath(field, insertIndex))) formApi.setFieldMeta(fieldKey, getEmptyFieldMeta());
		});
	}
	function getFieldPath(field, index) {
		return `${field}[${index}]`;
	}
	function getAffectedFields(field, index, mode, secondIndex) {
		const affectedFieldKeys = [getFieldPath(field, index)];
		switch (mode) {
			case "swap":
				affectedFieldKeys.push(getFieldPath(field, secondIndex));
				break;
			case "move": {
				const [startIndex, endIndex] = [Math.min(index, secondIndex), Math.max(index, secondIndex)];
				for (let i = startIndex; i <= endIndex; i++) affectedFieldKeys.push(getFieldPath(field, i));
				break;
			}
			default: {
				const currentValue = formApi.getFieldValue(field);
				const fieldItems = Array.isArray(currentValue) ? currentValue.length : 0;
				for (let i = index + 1; i < fieldItems; i++) affectedFieldKeys.push(getFieldPath(field, i));
				break;
			}
		}
		return Object.keys(formApi.fieldInfo).filter((fieldKey) => affectedFieldKeys.some((key) => fieldKey.startsWith(key)));
	}
	function updateIndex(fieldKey, direction) {
		return fieldKey.replace(/\[(\d+)\]/, (_, num) => {
			const currIndex = parseInt(num, 10);
			return `[${direction === "up" ? currIndex + 1 : Math.max(0, currIndex - 1)}]`;
		});
	}
	function shiftMeta(fields, direction) {
		(direction === "up" ? fields : [...fields].reverse()).forEach((fieldKey) => {
			const nextFieldKey = updateIndex(fieldKey.toString(), direction);
			const nextFieldMeta = formApi.getFieldMeta(nextFieldKey);
			if (nextFieldMeta) formApi.setFieldMeta(fieldKey, nextFieldMeta);
			else formApi.setFieldMeta(fieldKey, getEmptyFieldMeta());
		});
	}
	const getEmptyFieldMeta = () => defaultFieldMeta;
	return {
		bumpArrayVersion,
		handleArrayMove,
		handleArrayRemove,
		handleArraySwap,
		handleArrayInsert
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/FormApi.js
function getDefaultFormState(defaultState) {
	return {
		values: defaultState.values ?? {},
		errorMap: defaultState.errorMap ?? {},
		fieldMetaBase: defaultState.fieldMetaBase ?? {},
		isSubmitted: defaultState.isSubmitted ?? false,
		isSubmitting: defaultState.isSubmitting ?? false,
		isValidating: defaultState.isValidating ?? false,
		submissionAttempts: defaultState.submissionAttempts ?? 0,
		isSubmitSuccessful: defaultState.isSubmitSuccessful ?? false,
		validationMetaMap: defaultState.validationMetaMap ?? {
			onChange: void 0,
			onBlur: void 0,
			onSubmit: void 0,
			onMount: void 0,
			onServer: void 0,
			onDynamic: void 0
		}
	};
}
var FormApi = class {
	/**
	* Constructs a new `FormApi` instance with the given form options.
	*/
	constructor(opts) {
		this.options = {};
		this.fieldInfo = {};
		this.mount = () => {
			const cleanupDevtoolBroadcast = this.store.subscribe(() => {
				throttleFormState(this);
			});
			const cleanupFormStateListener = formEventClient.on("request-form-state", (e) => {
				if (e.payload.id === this._formId) formEventClient.emit("form-api", {
					id: this._formId,
					state: this.store.state,
					options: this.options
				});
			});
			const cleanupFormResetListener = formEventClient.on("request-form-reset", (e) => {
				if (e.payload.id === this._formId) this.reset();
			});
			const cleanupFormForceSubmitListener = formEventClient.on("request-form-force-submit", (e) => {
				if (e.payload.id === this._formId) {
					this._devtoolsSubmissionOverride = true;
					this.handleSubmit();
					this._devtoolsSubmissionOverride = false;
				}
			});
			const cleanup = () => {
				cleanupFormForceSubmitListener();
				cleanupFormResetListener();
				cleanupFormStateListener();
				cleanupDevtoolBroadcast.unsubscribe();
				formEventClient.emit("form-unmounted", { id: this._formId });
			};
			this.options.listeners?.onMount?.({ formApi: this });
			const { onMount } = this.options.validators || {};
			formEventClient.emit("form-api", {
				id: this._formId,
				state: this.store.state,
				options: this.options
			});
			if (!onMount) return cleanup;
			this.validateSync("mount");
			return cleanup;
		};
		this.update = (options) => {
			if (!options) return;
			const oldOptions = this.options;
			this.options = options;
			const shouldUpdateValues = options.defaultValues && !evaluate(options.defaultValues, oldOptions.defaultValues) && !this.state.isTouched;
			const shouldUpdateState = !evaluate(options.defaultState, oldOptions.defaultState) && !this.state.isTouched;
			if (!shouldUpdateValues && !shouldUpdateState) return;
			batch(() => {
				this.baseStore.setState(() => getDefaultFormState(Object.assign({}, this.state, shouldUpdateState ? options.defaultState : {}, shouldUpdateValues ? { values: options.defaultValues } : {})));
			});
			formEventClient.emit("form-api", {
				id: this._formId,
				state: this.store.state,
				options: this.options
			});
		};
		this.reset = (values, opts2) => {
			const { fieldMeta: currentFieldMeta } = this.state;
			const fieldMetaBase = this.resetFieldMeta(currentFieldMeta);
			if (values && !opts2?.keepDefaultValues) this.options = {
				...this.options,
				defaultValues: values
			};
			this.baseStore.setState(() => {
				let nextValues = values ?? this.options.defaultValues ?? this.options.defaultState?.values;
				if (!values) Object.values(this.fieldInfo).forEach((fieldInfo) => {
					if (fieldInfo.instance && fieldInfo.instance.options.defaultValue !== void 0) nextValues = setBy(nextValues, fieldInfo.instance.name, fieldInfo.instance.options.defaultValue);
				});
				return getDefaultFormState({
					...this.options.defaultState,
					values: nextValues,
					fieldMetaBase
				});
			});
		};
		this.validateAllFields = async (cause) => {
			const fieldValidationPromises = [];
			batch(() => {
				Object.values(this.fieldInfo).forEach((field) => {
					if (!field.instance) return;
					const fieldInstance = field.instance;
					fieldValidationPromises.push(Promise.resolve().then(() => fieldInstance.validate(cause, { skipFormValidation: true })));
					if (!field.instance.state.meta.isTouched) field.instance.setMeta((prev) => ({
						...prev,
						isTouched: true
					}));
				});
			});
			return (await Promise.all(fieldValidationPromises)).flat();
		};
		this.validateArrayFieldsStartingFrom = async (field, index, cause) => {
			const currentValue = this.getFieldValue(field);
			const lastIndex = Array.isArray(currentValue) ? Math.max(currentValue.length - 1, 0) : null;
			const fieldKeysToValidate = [`${field}[${index}]`];
			for (let i = index + 1; i <= (lastIndex ?? 0); i++) fieldKeysToValidate.push(`${field}[${i}]`);
			const fieldsToValidate = Object.keys(this.fieldInfo).filter((fieldKey) => fieldKeysToValidate.some((key) => fieldKey.startsWith(key)));
			const fieldValidationPromises = [];
			batch(() => {
				fieldsToValidate.forEach((nestedField) => {
					fieldValidationPromises.push(Promise.resolve().then(() => this.validateField(nestedField, cause)));
				});
			});
			return (await Promise.all(fieldValidationPromises)).flat();
		};
		this.validateField = (field, cause) => {
			const fieldInstance = this.fieldInfo[field]?.instance;
			if (!fieldInstance) {
				const { hasErrored } = this.validateSync(cause);
				if (hasErrored && !this.options.asyncAlways) return this.getFieldMeta(field)?.errors ?? [];
				return this.validateAsync(cause).then(() => {
					return this.getFieldMeta(field)?.errors ?? [];
				});
			}
			if (!fieldInstance.state.meta.isTouched) fieldInstance.setMeta((prev) => ({
				...prev,
				isTouched: true
			}));
			return fieldInstance.validate(cause);
		};
		this.validateSync = (cause) => {
			const validates = getSyncValidatorArray(cause, {
				...this.options,
				form: this,
				validationLogic: this.options.validationLogic || defaultValidationLogic
			});
			let hasErrored = false;
			const currentValidationErrorMap = {};
			batch(() => {
				for (const validateObj of validates) {
					if (!validateObj.validate) continue;
					const { formError, fieldErrors } = normalizeError$1(this.runValidator({
						validate: validateObj.validate,
						value: {
							value: this.state.values,
							formApi: this,
							validationSource: "form"
						},
						type: "validate"
					}));
					const errorMapKey = getErrorMapKey$1(validateObj.cause);
					const allFieldsToProcess = /* @__PURE__ */ new Set([...Object.keys(this.state.fieldMeta), ...Object.keys(fieldErrors || {})]);
					for (const field of allFieldsToProcess) {
						if (this.baseStore.state.fieldMetaBase[field] === void 0 && !fieldErrors?.[field]) continue;
						const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } = this.getFieldMeta(field) ?? defaultFieldMeta;
						const newFormValidatorError = fieldErrors?.[field];
						const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
							newFormValidatorError,
							isPreviousErrorFromFormValidator: currentErrorMapSource?.[errorMapKey] === "form",
							previousErrorValue: currentErrorMap?.[errorMapKey]
						});
						if (newSource === "form") currentValidationErrorMap[field] = {
							...currentValidationErrorMap[field],
							[errorMapKey]: newFormValidatorError
						};
						if (currentErrorMap?.[errorMapKey] !== newErrorValue) this.setFieldMeta(field, (prev = defaultFieldMeta) => ({
							...prev,
							errorMap: {
								...prev.errorMap,
								[errorMapKey]: newErrorValue
							},
							errorSourceMap: {
								...prev.errorSourceMap,
								[errorMapKey]: newSource
							}
						}));
					}
					if (this.state.errorMap?.[errorMapKey] !== formError) this.baseStore.setState((prev) => ({
						...prev,
						errorMap: {
							...prev.errorMap,
							[errorMapKey]: formError
						}
					}));
					if (formError || fieldErrors) hasErrored = true;
				}
				const submitErrKey = getErrorMapKey$1("submit");
				if (this.state.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored) this.baseStore.setState((prev) => ({
					...prev,
					errorMap: {
						...prev.errorMap,
						[submitErrKey]: void 0
					}
				}));
				const serverErrKey = getErrorMapKey$1("server");
				if (this.state.errorMap?.[serverErrKey] && cause !== "server" && !hasErrored) this.baseStore.setState((prev) => ({
					...prev,
					errorMap: {
						...prev.errorMap,
						[serverErrKey]: void 0
					}
				}));
			});
			return {
				hasErrored,
				fieldsErrorMap: currentValidationErrorMap
			};
		};
		this.validateAsync = async (cause) => {
			const validates = getAsyncValidatorArray(cause, {
				...this.options,
				form: this,
				validationLogic: this.options.validationLogic || defaultValidationLogic
			});
			if (!this.state.isFormValidating) this.baseStore.setState((prev) => ({
				...prev,
				isFormValidating: true
			}));
			const promises = [];
			let fieldErrorsFromFormValidators;
			for (const validateObj of validates) {
				if (!validateObj.validate) continue;
				const key = getErrorMapKey$1(validateObj.cause);
				this.state.validationMetaMap[key]?.lastAbortController.abort();
				const controller = new AbortController();
				this.state.validationMetaMap[key] = { lastAbortController: controller };
				promises.push(new Promise(async (resolve) => {
					let rawError;
					try {
						rawError = await new Promise((rawResolve, rawReject) => {
							setTimeout(async () => {
								if (controller.signal.aborted) return rawResolve(void 0);
								try {
									rawResolve(await this.runValidator({
										validate: validateObj.validate,
										value: {
											value: this.state.values,
											formApi: this,
											validationSource: "form",
											signal: controller.signal
										},
										type: "validateAsync"
									}));
								} catch (e) {
									rawReject(e);
								}
							}, validateObj.debounceMs);
						});
					} catch (e) {
						rawError = e;
					}
					const { formError, fieldErrors: fieldErrorsFromNormalizeError } = normalizeError$1(rawError);
					if (fieldErrorsFromNormalizeError) fieldErrorsFromFormValidators = fieldErrorsFromFormValidators ? {
						...fieldErrorsFromFormValidators,
						...fieldErrorsFromNormalizeError
					} : fieldErrorsFromNormalizeError;
					const errorMapKey = getErrorMapKey$1(validateObj.cause);
					for (const field of Object.keys(this.state.fieldMeta)) {
						if (this.baseStore.state.fieldMetaBase[field] === void 0) continue;
						const fieldMeta = this.getFieldMeta(field);
						if (!fieldMeta) continue;
						const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } = fieldMeta;
						const newFormValidatorError = fieldErrorsFromFormValidators?.[field];
						const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
							newFormValidatorError,
							isPreviousErrorFromFormValidator: currentErrorMapSource?.[errorMapKey] === "form",
							previousErrorValue: currentErrorMap?.[errorMapKey]
						});
						if (currentErrorMap?.[errorMapKey] !== newErrorValue) this.setFieldMeta(field, (prev) => ({
							...prev,
							errorMap: {
								...prev.errorMap,
								[errorMapKey]: newErrorValue
							},
							errorSourceMap: {
								...prev.errorSourceMap,
								[errorMapKey]: newSource
							}
						}));
					}
					this.baseStore.setState((prev) => ({
						...prev,
						errorMap: {
							...prev.errorMap,
							[errorMapKey]: formError
						}
					}));
					resolve(fieldErrorsFromFormValidators ? {
						fieldErrors: fieldErrorsFromFormValidators,
						errorMapKey
					} : void 0);
				}));
			}
			let results = [];
			const fieldsErrorMap = {};
			if (promises.length) {
				results = await Promise.all(promises);
				for (const fieldValidationResult of results) if (fieldValidationResult?.fieldErrors) {
					const { errorMapKey } = fieldValidationResult;
					for (const [field, fieldError] of Object.entries(fieldValidationResult.fieldErrors)) fieldsErrorMap[field] = {
						...fieldsErrorMap[field] || {},
						[errorMapKey]: fieldError
					};
				}
			}
			this.baseStore.setState((prev) => ({
				...prev,
				isFormValidating: false
			}));
			return fieldsErrorMap;
		};
		this.validate = (cause) => {
			const { hasErrored, fieldsErrorMap } = this.validateSync(cause);
			if (hasErrored && !this.options.asyncAlways) return fieldsErrorMap;
			return this.validateAsync(cause);
		};
		this._handleSubmit = async (submitMeta) => {
			this.baseStore.setState((old) => ({
				...old,
				isSubmitted: false,
				submissionAttempts: old.submissionAttempts + 1,
				isSubmitSuccessful: false
			}));
			batch(() => {
				Object.values(this.fieldInfo).forEach((field) => {
					if (!field.instance) return;
					if (!field.instance.state.meta.isTouched) field.instance.setMeta((prev) => ({
						...prev,
						isTouched: true
					}));
				});
			});
			const submitMetaArg = submitMeta ?? this.options.onSubmitMeta;
			if (!this.state.canSubmit && !this._devtoolsSubmissionOverride) {
				this.options.onSubmitInvalid?.({
					value: this.state.values,
					formApi: this,
					meta: submitMetaArg
				});
				return;
			}
			this.baseStore.setState((d) => ({
				...d,
				isSubmitting: true
			}));
			const done = () => {
				this.baseStore.setState((prev) => ({
					...prev,
					isSubmitting: false
				}));
			};
			await this.validateAllFields("submit");
			if (!this.state.isFieldsValid) {
				done();
				this.options.onSubmitInvalid?.({
					value: this.state.values,
					formApi: this,
					meta: submitMetaArg
				});
				formEventClient.emit("form-submission", {
					id: this._formId,
					submissionAttempt: this.state.submissionAttempts,
					successful: false,
					stage: "validateAllFields",
					errors: Object.values(this.state.fieldMeta).map((meta) => meta.errors).flat()
				});
				return;
			}
			await this.validate("submit");
			if (!this.state.isValid) {
				done();
				this.options.onSubmitInvalid?.({
					value: this.state.values,
					formApi: this,
					meta: submitMetaArg
				});
				formEventClient.emit("form-submission", {
					id: this._formId,
					submissionAttempt: this.state.submissionAttempts,
					successful: false,
					stage: "validate",
					errors: this.state.errors
				});
				return;
			}
			batch(() => {
				Object.values(this.fieldInfo).forEach((field) => {
					field.instance?.options.listeners?.onSubmit?.({
						value: field.instance.state.value,
						fieldApi: field.instance
					});
				});
			});
			this.options.listeners?.onSubmit?.({
				formApi: this,
				meta: submitMetaArg
			});
			try {
				await this.options.onSubmit?.({
					value: this.state.values,
					formApi: this,
					meta: submitMetaArg
				});
				batch(() => {
					this.baseStore.setState((prev) => ({
						...prev,
						isSubmitted: true,
						isSubmitSuccessful: true
					}));
					formEventClient.emit("form-submission", {
						id: this._formId,
						submissionAttempt: this.state.submissionAttempts,
						successful: true
					});
					done();
				});
			} catch (err) {
				this.baseStore.setState((prev) => ({
					...prev,
					isSubmitSuccessful: false
				}));
				formEventClient.emit("form-submission", {
					id: this._formId,
					submissionAttempt: this.state.submissionAttempts,
					successful: false,
					stage: "inflight",
					onError: err
				});
				done();
				throw err;
			}
		};
		this.getFieldValue = (field) => getBy(this.state.values, field);
		this.getFieldMeta = (field) => {
			return this.state.fieldMeta[field];
		};
		this.getFieldInfo = (field) => {
			return this.fieldInfo[field] ||= {
				instance: null,
				validationMetaMap: {
					onChange: void 0,
					onBlur: void 0,
					onSubmit: void 0,
					onMount: void 0,
					onServer: void 0,
					onDynamic: void 0
				}
			};
		};
		this.setFieldMeta = (field, updater) => {
			this.baseStore.setState((prev) => {
				return {
					...prev,
					fieldMetaBase: {
						...prev.fieldMetaBase,
						[field]: functionalUpdate(updater, prev.fieldMetaBase[field])
					}
				};
			});
		};
		this.resetFieldMeta = (fieldMeta) => {
			return Object.keys(fieldMeta).reduce((acc, key) => {
				const fieldKey = key;
				acc[fieldKey] = defaultFieldMeta;
				return acc;
			}, {});
		};
		this.setFieldValue = (field, updater, opts2) => {
			const dontUpdateMeta = opts2?.dontUpdateMeta ?? false;
			const dontRunListeners = opts2?.dontRunListeners ?? false;
			const dontValidate = opts2?.dontValidate ?? false;
			batch(() => {
				if (!dontUpdateMeta) this.setFieldMeta(field, (prev) => ({
					...prev,
					isTouched: true,
					isDirty: true,
					errorMap: {
						...prev?.errorMap,
						onMount: void 0
					}
				}));
				this.baseStore.setState((prev) => {
					return {
						...prev,
						values: setBy(prev.values, field, updater)
					};
				});
			});
			if (!dontRunListeners) this.getFieldInfo(field).instance?.triggerOnChangeListener();
			if (!dontValidate) this.validateField(field, "change");
		};
		this.deleteField = (field) => {
			const fieldsToDelete = [...Object.keys(this.fieldInfo).filter((f) => {
				const fieldStr = field.toString();
				return f !== fieldStr && f.startsWith(fieldStr);
			}), field];
			this.baseStore.setState((prev) => {
				const newState = { ...prev };
				fieldsToDelete.forEach((f) => {
					newState.values = deleteBy(newState.values, f);
					delete this.fieldInfo[f];
					delete newState.fieldMetaBase[f];
				});
				return newState;
			});
		};
		this.pushFieldValue = (field, value, options) => {
			this.setFieldValue(field, (prev) => [...Array.isArray(prev) ? prev : [], value], options);
			metaHelper(this).bumpArrayVersion(field);
		};
		this.insertFieldValue = async (field, index, value, options) => {
			this.setFieldValue(field, (prev) => {
				return [
					...prev.slice(0, index),
					value,
					...prev.slice(index)
				];
			}, mergeOpts(options, { dontValidate: true }));
			const dontValidate = options?.dontValidate ?? false;
			if (!dontValidate) await this.validateField(field, "change");
			metaHelper(this).handleArrayInsert(field, index);
			if (!dontValidate) await this.validateArrayFieldsStartingFrom(field, index, "change");
		};
		this.replaceFieldValue = async (field, index, value, options) => {
			this.setFieldValue(field, (prev) => {
				return prev.map((d, i) => i === index ? value : d);
			}, mergeOpts(options, { dontValidate: true }));
			metaHelper(this).bumpArrayVersion(field);
			if (!(options?.dontValidate ?? false)) {
				await this.validateField(field, "change");
				await this.validateArrayFieldsStartingFrom(field, index, "change");
			}
		};
		this.removeFieldValue = async (field, index, options) => {
			const fieldValue = this.getFieldValue(field);
			const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null;
			this.setFieldValue(field, (prev) => {
				return prev.filter((_d, i) => i !== index);
			}, mergeOpts(options, { dontValidate: true }));
			metaHelper(this).handleArrayRemove(field, index);
			if (lastIndex !== null) {
				const start = `${field}[${lastIndex}]`;
				this.deleteField(start);
			}
			if (!(options?.dontValidate ?? false)) {
				await this.validateField(field, "change");
				await this.validateArrayFieldsStartingFrom(field, index, "change");
			}
		};
		this.swapFieldValues = (field, index1, index2, options) => {
			this.setFieldValue(field, (prev) => {
				const prev1 = prev[index1];
				const prev2 = prev[index2];
				return setBy(setBy(prev, `${index1}`, prev2), `${index2}`, prev1);
			}, mergeOpts(options, { dontValidate: true }));
			metaHelper(this).handleArraySwap(field, index1, index2);
			if (!(options?.dontValidate ?? false)) {
				this.validateField(field, "change");
				this.validateField(`${field}[${index1}]`, "change");
				this.validateField(`${field}[${index2}]`, "change");
			}
		};
		this.moveFieldValues = (field, index1, index2, options) => {
			this.setFieldValue(field, (prev) => {
				const next = [...prev];
				next.splice(index2, 0, next.splice(index1, 1)[0]);
				return next;
			}, mergeOpts(options, { dontValidate: true }));
			metaHelper(this).handleArrayMove(field, index1, index2);
			if (!(options?.dontValidate ?? false)) {
				this.validateField(field, "change");
				this.validateField(`${field}[${index1}]`, "change");
				this.validateField(`${field}[${index2}]`, "change");
			}
		};
		this.clearFieldValues = (field, options) => {
			const fieldValue = this.getFieldValue(field);
			const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null;
			this.setFieldValue(field, [], mergeOpts(options, { dontValidate: true }));
			metaHelper(this).bumpArrayVersion(field);
			if (lastIndex !== null) for (let i = 0; i <= lastIndex; i++) {
				const fieldKey = `${field}[${i}]`;
				this.deleteField(fieldKey);
			}
			if (!(options?.dontValidate ?? false)) this.validateField(field, "change");
		};
		this.resetField = (field) => {
			this.baseStore.setState((prev) => {
				const fieldDefault = this.getFieldInfo(field).instance?.options.defaultValue;
				const formDefault = getBy(this.options.defaultValues, field);
				const targetValue = fieldDefault ?? formDefault;
				return {
					...prev,
					fieldMetaBase: {
						...prev.fieldMetaBase,
						[field]: defaultFieldMeta
					},
					values: targetValue !== void 0 ? setBy(prev.values, field, targetValue) : prev.values
				};
			});
		};
		this.setErrorMap = (errorMap) => {
			batch(() => {
				Object.entries(errorMap).forEach(([key, value]) => {
					const errorMapKey = key;
					if (isGlobalFormValidationError(value)) {
						const { formError, fieldErrors } = normalizeError$1(value);
						for (const fieldName of Object.keys(this.fieldInfo)) {
							if (!this.getFieldMeta(fieldName)) continue;
							this.setFieldMeta(fieldName, (prev) => ({
								...prev,
								errorMap: {
									...prev.errorMap,
									[errorMapKey]: fieldErrors?.[fieldName]
								},
								errorSourceMap: {
									...prev.errorSourceMap,
									[errorMapKey]: "form"
								}
							}));
						}
						this.baseStore.setState((prev) => ({
							...prev,
							errorMap: {
								...prev.errorMap,
								[errorMapKey]: formError
							}
						}));
					} else this.baseStore.setState((prev) => ({
						...prev,
						errorMap: {
							...prev.errorMap,
							[errorMapKey]: value
						}
					}));
				});
			});
		};
		this.getAllErrors = () => {
			return {
				form: {
					errors: this.state.errors,
					errorMap: this.state.errorMap
				},
				fields: Object.entries(this.state.fieldMeta).reduce((acc, [fieldName, fieldMeta]) => {
					if (Object.keys(fieldMeta).length && fieldMeta.errors.length) acc[fieldName] = {
						errors: fieldMeta.errors,
						errorMap: fieldMeta.errorMap
					};
					return acc;
				}, {})
			};
		};
		this.parseValuesWithSchema = (schema) => {
			return standardSchemaValidators.validate({
				value: this.state.values,
				validationSource: "form"
			}, schema);
		};
		this.parseValuesWithSchemaAsync = (schema) => {
			return standardSchemaValidators.validateAsync({
				value: this.state.values,
				validationSource: "form"
			}, schema);
		};
		this.timeoutIds = {
			validations: {},
			listeners: {},
			formListeners: {}
		};
		this._formId = opts?.formId ?? uuid();
		this._devtoolsSubmissionOverride = false;
		let baseStoreVal = getDefaultFormState({
			...opts?.defaultState,
			values: opts?.defaultValues ?? opts?.defaultState?.values
		});
		if (opts?.transform) {
			baseStoreVal = opts.transform({ state: baseStoreVal }).state;
			for (const errKey of Object.keys(baseStoreVal.errorMap)) {
				const errKeyMap = baseStoreVal.errorMap[errKey];
				if (errKeyMap === void 0 || !isGlobalFormValidationError(errKeyMap)) continue;
				for (const fieldName of Object.keys(errKeyMap.fields)) {
					const fieldErr = errKeyMap.fields[fieldName];
					if (fieldErr === void 0) continue;
					const existingFieldMeta = baseStoreVal.fieldMetaBase[fieldName];
					baseStoreVal.fieldMetaBase[fieldName] = {
						isTouched: false,
						isValidating: false,
						isBlurred: false,
						isDirty: false,
						_arrayVersion: 0,
						...existingFieldMeta ?? {},
						errorSourceMap: {
							...existingFieldMeta?.["errorSourceMap"] ?? {},
							onChange: "form"
						},
						errorMap: {
							...existingFieldMeta?.["errorMap"] ?? {},
							[errKey]: fieldErr
						}
					};
				}
			}
		}
		this.baseStore = createStore(baseStoreVal);
		let prevBaseStore = void 0;
		this.fieldMetaDerived = createStore((prevVal) => {
			const currBaseStore = this.baseStore.get();
			let originalMetaCount = 0;
			const fieldMeta = {};
			for (const fieldName of Object.keys(currBaseStore.fieldMetaBase)) {
				const currBaseMeta = currBaseStore.fieldMetaBase[fieldName];
				const prevBaseMeta = prevBaseStore?.fieldMetaBase[fieldName];
				const prevFieldInfo = prevVal?.[fieldName];
				const curFieldVal = getBy(currBaseStore.values, fieldName);
				let fieldErrors = prevFieldInfo?.errors;
				if (!prevBaseMeta || currBaseMeta.errorMap !== prevBaseMeta.errorMap) {
					fieldErrors = Object.values(currBaseMeta.errorMap ?? {}).filter((val) => val !== void 0);
					const fieldInstance = this.getFieldInfo(fieldName)?.instance;
					if (!fieldInstance || !fieldInstance.options.disableErrorFlat) fieldErrors = fieldErrors.flat(1);
				}
				const isFieldValid = !isNonEmptyArray(fieldErrors);
				const isFieldPristine = !currBaseMeta.isDirty;
				const isDefaultValue = evaluate(curFieldVal, this.getFieldInfo(fieldName)?.instance?.options.defaultValue ?? getBy(this.options.defaultValues, fieldName));
				if (prevFieldInfo && prevFieldInfo.isPristine === isFieldPristine && prevFieldInfo.isValid === isFieldValid && prevFieldInfo.isDefaultValue === isDefaultValue && prevFieldInfo.errors === fieldErrors && currBaseMeta === prevBaseMeta) {
					fieldMeta[fieldName] = prevFieldInfo;
					originalMetaCount++;
					continue;
				}
				fieldMeta[fieldName] = {
					...currBaseMeta,
					errors: fieldErrors ?? [],
					isPristine: isFieldPristine,
					isValid: isFieldValid,
					isDefaultValue
				};
			}
			if (!Object.keys(currBaseStore.fieldMetaBase).length) return fieldMeta;
			if (prevVal && originalMetaCount === Object.keys(currBaseStore.fieldMetaBase).length) return prevVal;
			prevBaseStore = this.baseStore.get();
			return fieldMeta;
		});
		let prevBaseStoreForStore = void 0;
		this.store = createStore((prevVal) => {
			const currBaseStore = this.baseStore.get();
			const currFieldMeta = this.fieldMetaDerived.get();
			const fieldMetaValues = Object.values(currFieldMeta).filter(Boolean);
			const isFieldsValidating = fieldMetaValues.some((field) => field.isValidating);
			const isFieldsValid = fieldMetaValues.every((field) => field.isValid);
			const isTouched = fieldMetaValues.some((field) => field.isTouched);
			const isBlurred = fieldMetaValues.some((field) => field.isBlurred);
			const isDefaultValue = fieldMetaValues.every((field) => field.isDefaultValue);
			const shouldInvalidateOnMount = isTouched && currBaseStore.errorMap?.onMount;
			const isDirty = fieldMetaValues.some((field) => field.isDirty);
			const isPristine = !isDirty;
			const hasOnMountError = Boolean(currBaseStore.errorMap?.onMount || fieldMetaValues.some((f) => f?.errorMap?.onMount));
			const isValidating = !!isFieldsValidating;
			let errors = prevVal?.errors ?? [];
			if (!prevBaseStoreForStore || currBaseStore.errorMap !== prevBaseStoreForStore.errorMap) errors = Object.values(currBaseStore.errorMap).reduce((prev, curr) => {
				if (curr === void 0) return prev;
				if (curr && isGlobalFormValidationError(curr)) {
					prev.push(curr.form);
					return prev;
				}
				prev.push(curr);
				return prev;
			}, []);
			const isFormValid = errors.length === 0;
			const isValid = isFieldsValid && isFormValid;
			const submitInvalid = this.options.canSubmitWhenInvalid ?? false;
			const canSubmit = currBaseStore.submissionAttempts === 0 && !isTouched && !hasOnMountError || !isValidating && !currBaseStore.isSubmitting && isValid || submitInvalid;
			let errorMap = currBaseStore.errorMap;
			if (shouldInvalidateOnMount) {
				errors = errors.filter((err) => err !== currBaseStore.errorMap.onMount);
				errorMap = Object.assign(errorMap, { onMount: void 0 });
			}
			if (prevVal && prevBaseStoreForStore && prevVal.errorMap === errorMap && prevVal.fieldMeta === this.fieldMetaDerived.state && prevVal.errors === errors && prevVal.isFieldsValidating === isFieldsValidating && prevVal.isFieldsValid === isFieldsValid && prevVal.isFormValid === isFormValid && prevVal.isValid === isValid && prevVal.canSubmit === canSubmit && prevVal.isTouched === isTouched && prevVal.isBlurred === isBlurred && prevVal.isPristine === isPristine && prevVal.isDefaultValue === isDefaultValue && prevVal.isDirty === isDirty && evaluate(prevBaseStoreForStore, currBaseStore)) return prevVal;
			const state = {
				...currBaseStore,
				errorMap,
				fieldMeta: this.fieldMetaDerived.state,
				errors,
				isFieldsValidating,
				isFieldsValid,
				isFormValid,
				isValid,
				canSubmit,
				isTouched,
				isBlurred,
				isPristine,
				isDefaultValue,
				isDirty
			};
			prevBaseStoreForStore = this.baseStore.get();
			return state;
		});
		this.handleSubmit = this.handleSubmit.bind(this);
		this.update(opts || {});
	}
	get state() {
		return this.store.state;
	}
	get formId() {
		return this._formId;
	}
	/**
	* @private
	*/
	runValidator(props) {
		if (isStandardSchemaValidator(props.validate)) return standardSchemaValidators[props.type](props.value, props.validate);
		return props.validate(props.value);
	}
	handleSubmit(submitMeta) {
		return this._handleSubmit(submitMeta);
	}
};
function normalizeError$1(rawError) {
	if (rawError) {
		if (isGlobalFormValidationError(rawError)) return {
			formError: normalizeError$1(rawError.form).formError,
			fieldErrors: rawError.fields
		};
		return { formError: rawError };
	}
	return { formError: void 0 };
}
function getErrorMapKey$1(cause) {
	switch (cause) {
		case "submit": return "onSubmit";
		case "blur": return "onBlur";
		case "mount": return "onMount";
		case "server": return "onServer";
		case "dynamic": return "onDynamic";
		default: return "onChange";
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/FieldApi.js
var FieldApi = class {
	/**
	* Initializes a new `FieldApi` instance.
	*/
	constructor(opts) {
		this.options = {};
		this.mount = () => {
			if (this.options.defaultValue !== void 0 && !this.getMeta().isTouched) this.form.setFieldValue(this.name, this.options.defaultValue, { dontUpdateMeta: true });
			const info = this.getInfo();
			info.instance = this;
			this.update(this.options);
			const { onMount } = this.options.validators || {};
			if (onMount) {
				const error = this.runValidator({
					validate: onMount,
					value: {
						value: this.state.value,
						fieldApi: this,
						validationSource: "field"
					},
					type: "validate"
				});
				if (error) this.setMeta((prev) => ({
					...prev,
					errorMap: {
						...prev?.errorMap,
						onMount: error
					},
					errorSourceMap: {
						...prev?.errorSourceMap,
						onMount: "field"
					}
				}));
			}
			this.options.listeners?.onMount?.({
				value: this.state.value,
				fieldApi: this
			});
			return () => {
				for (const [key, timeout] of Object.entries(this.timeoutIds.validations)) if (timeout) {
					clearTimeout(timeout);
					this.timeoutIds.validations[key] = null;
				}
				for (const [key, timeout] of Object.entries(this.timeoutIds.listeners)) if (timeout) {
					clearTimeout(timeout);
					this.timeoutIds.listeners[key] = null;
				}
				for (const [key, timeout] of Object.entries(this.timeoutIds.formListeners)) if (timeout) {
					clearTimeout(timeout);
					this.timeoutIds.formListeners[key] = null;
				}
				const fieldInfo = this.form.fieldInfo[this.name];
				if (!fieldInfo) return;
				if (fieldInfo.instance !== this) return;
				for (const [key, validationMeta] of Object.entries(fieldInfo.validationMetaMap)) {
					validationMeta?.lastAbortController.abort();
					fieldInfo.validationMetaMap[key] = void 0;
				}
				this.form.baseStore.setState((prev) => ({
					...prev,
					fieldMetaBase: {
						...prev.fieldMetaBase,
						[this.name]: {
							...defaultFieldMeta,
							isTouched: prev.fieldMetaBase[this.name]?.isTouched ?? defaultFieldMeta.isTouched,
							isBlurred: prev.fieldMetaBase[this.name]?.isBlurred ?? defaultFieldMeta.isBlurred,
							isDirty: prev.fieldMetaBase[this.name]?.isDirty ?? defaultFieldMeta.isDirty
						}
					}
				}));
				fieldInfo.instance = null;
				this.options.listeners?.onUnmount?.({
					value: this.state.value,
					fieldApi: this
				});
				this.form.options.listeners?.onFieldUnmount?.({
					formApi: this.form,
					fieldApi: this
				});
			};
		};
		this.update = (opts2) => {
			this.options = opts2;
			this.name = opts2.name;
			if (!this.state.meta.isTouched && this.options.defaultValue !== void 0) {
				if (!evaluate(this.form.getFieldValue(this.name), opts2.defaultValue)) this.form.setFieldValue(this.name, opts2.defaultValue, {
					dontUpdateMeta: true,
					dontValidate: true,
					dontRunListeners: true
				});
			}
			if (!this.form.getFieldMeta(this.name)) this.form.setFieldMeta(this.name, this.state.meta);
		};
		this.getValue = () => {
			return this.form.getFieldValue(this.name);
		};
		this.setValue = (updater, options) => {
			this.form.setFieldValue(this.name, updater, mergeOpts(options, {
				dontRunListeners: true,
				dontValidate: true
			}));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
			if (!options?.dontValidate) this.validate("change");
		};
		this.getMeta = () => this.store.state.meta;
		this.setMeta = (updater) => this.form.setFieldMeta(this.name, updater);
		this.getInfo = () => this.form.getFieldInfo(this.name);
		this.pushValue = (value, options) => {
			this.form.pushFieldValue(this.name, value, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.insertValue = (index, value, options) => {
			this.form.insertFieldValue(this.name, index, value, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.replaceValue = (index, value, options) => {
			this.form.replaceFieldValue(this.name, index, value, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.removeValue = (index, options) => {
			this.form.removeFieldValue(this.name, index, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.swapValues = (aIndex, bIndex, options) => {
			this.form.swapFieldValues(this.name, aIndex, bIndex, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.moveValue = (aIndex, bIndex, options) => {
			this.form.moveFieldValues(this.name, aIndex, bIndex, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.clearValues = (options) => {
			this.form.clearFieldValues(this.name, mergeOpts(options, { dontRunListeners: true }));
			if (!options?.dontRunListeners) this.triggerOnChangeListener();
		};
		this.getLinkedFields = (cause) => {
			const fields = Object.values(this.form.fieldInfo);
			const linkedFields = [];
			for (const field of fields) {
				if (!field.instance) continue;
				const { onChangeListenTo, onBlurListenTo } = field.instance.options.validators || {};
				if (cause === "change" && onChangeListenTo?.includes(this.name)) linkedFields.push(field.instance);
				if (cause === "blur" && onBlurListenTo?.includes(this.name)) linkedFields.push(field.instance);
			}
			return linkedFields;
		};
		this.validateSync = (cause, errorFromForm) => {
			const validates = getSyncValidatorArray(cause, {
				...this.options,
				form: this.form,
				fieldName: this.name,
				validationLogic: this.form.options.validationLogic || defaultValidationLogic
			});
			const linkedFieldValidates = this.getLinkedFields(cause).reduce((acc, field) => {
				const fieldValidates = getSyncValidatorArray(cause, {
					...field.options,
					form: field.form,
					fieldName: field.name,
					validationLogic: field.form.options.validationLogic || defaultValidationLogic
				});
				fieldValidates.forEach((validate) => {
					validate.field = field;
				});
				return acc.concat(fieldValidates);
			}, []);
			let hasErrored = false;
			batch(() => {
				const validateFieldFn = (field, validateObj) => {
					const errorMapKey = getErrorMapKey(validateObj.cause);
					const fieldLevelError = validateObj.validate ? normalizeError(field.runValidator({
						validate: validateObj.validate,
						value: {
							value: field.store.state.value,
							validationSource: "field",
							fieldApi: field
						},
						type: "validate"
					})) : void 0;
					const formLevelError = errorFromForm[errorMapKey];
					const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
						formLevelError,
						fieldLevelError
					});
					if (field.state.meta.errorMap?.[errorMapKey] !== newErrorValue) field.setMeta((prev) => ({
						...prev,
						errorMap: {
							...prev.errorMap,
							[errorMapKey]: newErrorValue
						},
						errorSourceMap: {
							...prev.errorSourceMap,
							[errorMapKey]: newSource
						}
					}));
					if (newErrorValue) hasErrored = true;
				};
				for (const validateObj of validates) validateFieldFn(this, validateObj);
				for (const fieldValitateObj of linkedFieldValidates) {
					if (!fieldValitateObj.validate) continue;
					validateFieldFn(fieldValitateObj.field, fieldValitateObj);
				}
			});
			const submitErrKey = getErrorMapKey("submit");
			if (this.state.meta.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored) this.setMeta((prev) => ({
				...prev,
				errorMap: {
					...prev.errorMap,
					[submitErrKey]: void 0
				},
				errorSourceMap: {
					...prev.errorSourceMap,
					[submitErrKey]: void 0
				}
			}));
			return { hasErrored };
		};
		this.validateAsync = async (cause, formValidationResultPromise) => {
			const validates = getAsyncValidatorArray(cause, {
				...this.options,
				form: this.form,
				fieldName: this.name,
				validationLogic: this.form.options.validationLogic || defaultValidationLogic
			});
			const asyncFormValidationResults = await formValidationResultPromise;
			const linkedFields = this.getLinkedFields(cause);
			const linkedFieldValidates = linkedFields.reduce((acc, field) => {
				const fieldValidates = getAsyncValidatorArray(cause, {
					...field.options,
					form: field.form,
					fieldName: field.name,
					validationLogic: field.form.options.validationLogic || defaultValidationLogic
				});
				fieldValidates.forEach((validate) => {
					validate.field = field;
				});
				return acc.concat(fieldValidates);
			}, []);
			const validatesPromises = [];
			const linkedPromises = [];
			const hasAsyncValidators = validates.some((v) => v.validate) || linkedFieldValidates.some((v) => v.validate);
			if (hasAsyncValidators) {
				if (!this.state.meta.isValidating) this.setMeta((prev) => ({
					...prev,
					isValidating: true
				}));
				for (const linkedField of linkedFields) linkedField.setMeta((prev) => ({
					...prev,
					isValidating: true
				}));
			}
			const validateFieldAsyncFn = (field, validateObj, promises) => {
				const errorMapKey = getErrorMapKey(validateObj.cause);
				const fieldInfo = field.getInfo();
				fieldInfo.validationMetaMap[errorMapKey]?.lastAbortController.abort();
				const controller = new AbortController();
				fieldInfo.validationMetaMap[errorMapKey] = { lastAbortController: controller };
				promises.push(new Promise(async (resolve) => {
					let rawError;
					try {
						rawError = await new Promise((rawResolve, rawReject) => {
							if (field.timeoutIds.validations[validateObj.cause]) clearTimeout(field.timeoutIds.validations[validateObj.cause]);
							field.timeoutIds.validations[validateObj.cause] = setTimeout(async () => {
								if (controller.signal.aborted) return rawResolve(void 0);
								try {
									rawResolve(await this.runValidator({
										validate: validateObj.validate,
										value: {
											value: field.store.state.value,
											fieldApi: field,
											signal: controller.signal,
											validationSource: "field"
										},
										type: "validateAsync"
									}));
								} catch (e) {
									rawReject(e);
								}
							}, validateObj.debounceMs);
						});
					} catch (e) {
						rawError = e;
					}
					if (controller.signal.aborted) return resolve(void 0);
					const fieldLevelError = normalizeError(rawError);
					const formLevelError = asyncFormValidationResults[field.name]?.[errorMapKey];
					const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
						formLevelError,
						fieldLevelError
					});
					if (field.getInfo().instance !== field) return resolve(void 0);
					field.setMeta((prev) => {
						return {
							...prev,
							errorMap: {
								...prev?.errorMap,
								[errorMapKey]: newErrorValue
							},
							errorSourceMap: {
								...prev.errorSourceMap,
								[errorMapKey]: newSource
							}
						};
					});
					resolve(newErrorValue);
				}));
			};
			for (const validateObj of validates) {
				if (!validateObj.validate) continue;
				validateFieldAsyncFn(this, validateObj, validatesPromises);
			}
			for (const fieldValitateObj of linkedFieldValidates) {
				if (!fieldValitateObj.validate) continue;
				validateFieldAsyncFn(fieldValitateObj.field, fieldValitateObj, linkedPromises);
			}
			let results = [];
			if (validatesPromises.length || linkedPromises.length) {
				results = await Promise.all(validatesPromises);
				await Promise.all(linkedPromises);
			}
			if (hasAsyncValidators) {
				this.setMeta((prev) => ({
					...prev,
					isValidating: false
				}));
				for (const linkedField of linkedFields) linkedField.setMeta((prev) => ({
					...prev,
					isValidating: false
				}));
			}
			return results.filter(Boolean);
		};
		this.validate = (cause, opts2) => {
			if (!this.state.meta.isTouched) return [];
			const { fieldsErrorMap } = opts2?.skipFormValidation ? { fieldsErrorMap: {} } : this.form.validateSync(cause);
			const { hasErrored } = this.validateSync(cause, fieldsErrorMap[this.name] ?? {});
			if (hasErrored && !this.options.asyncAlways) {
				this.getInfo().validationMetaMap[getErrorMapKey(cause)]?.lastAbortController.abort();
				return this.state.meta.errors;
			}
			const formValidationResultPromise = opts2?.skipFormValidation ? Promise.resolve({}) : this.form.validateAsync(cause);
			return this.validateAsync(cause, formValidationResultPromise);
		};
		this.handleChange = (updater) => {
			this.setValue(updater);
		};
		this.handleBlur = () => {
			if (!this.state.meta.isTouched) this.setMeta((prev) => ({
				...prev,
				isTouched: true
			}));
			if (!this.state.meta.isBlurred) this.setMeta((prev) => ({
				...prev,
				isBlurred: true
			}));
			this.validate("blur");
			this.triggerOnBlurListener();
		};
		this.setErrorMap = (errorMap) => {
			this.setMeta((prev) => ({
				...prev,
				errorMap: {
					...prev.errorMap,
					...errorMap
				}
			}));
		};
		this.parseValueWithSchema = (schema) => {
			return standardSchemaValidators.validate({
				value: this.state.value,
				validationSource: "field"
			}, schema);
		};
		this.parseValueWithSchemaAsync = (schema) => {
			return standardSchemaValidators.validateAsync({
				value: this.state.value,
				validationSource: "field"
			}, schema);
		};
		this.triggerOnChangeListener = () => {
			const formDebounceMs = this.form.options.listeners?.onChangeDebounceMs;
			if (formDebounceMs && formDebounceMs > 0) {
				if (this.timeoutIds.formListeners.change) clearTimeout(this.timeoutIds.formListeners.change);
				this.timeoutIds.formListeners.change = setTimeout(() => {
					this.form.options.listeners?.onChange?.({
						formApi: this.form,
						fieldApi: this
					});
				}, formDebounceMs);
			} else this.form.options.listeners?.onChange?.({
				formApi: this.form,
				fieldApi: this
			});
			const fieldDebounceMs = this.options.listeners?.onChangeDebounceMs;
			if (fieldDebounceMs && fieldDebounceMs > 0) {
				if (this.timeoutIds.listeners.change) clearTimeout(this.timeoutIds.listeners.change);
				this.timeoutIds.listeners.change = setTimeout(() => {
					this.options.listeners?.onChange?.({
						value: this.state.value,
						fieldApi: this
					});
				}, fieldDebounceMs);
			} else this.options.listeners?.onChange?.({
				value: this.state.value,
				fieldApi: this
			});
		};
		this.form = opts.form;
		this.name = opts.name;
		this.options = opts;
		this.timeoutIds = {
			validations: {},
			listeners: {},
			formListeners: {}
		};
		this.store = createStore((prevVal) => {
			this.form.store.get();
			const meta = this.form.getFieldMeta(this.name) ?? {
				...defaultFieldMeta,
				...opts.defaultMeta
			};
			let value = this.form.getFieldValue(this.name);
			if (!meta.isTouched && value === void 0 && this.options.defaultValue !== void 0 && !evaluate(value, this.options.defaultValue)) value = this.options.defaultValue;
			if (prevVal && prevVal.value === value && prevVal.meta === meta) return prevVal;
			return {
				value,
				meta
			};
		});
	}
	/**
	* The current field state.
	*/
	get state() {
		return this.store.state;
	}
	/**
	* @private
	*/
	runValidator(props) {
		if (isStandardSchemaValidator(props.validate)) return standardSchemaValidators[props.type](props.value, props.validate);
		return props.validate(props.value);
	}
	triggerOnBlurListener() {
		const formDebounceMs = this.form.options.listeners?.onBlurDebounceMs;
		if (formDebounceMs && formDebounceMs > 0) {
			if (this.timeoutIds.formListeners.blur) clearTimeout(this.timeoutIds.formListeners.blur);
			this.timeoutIds.formListeners.blur = setTimeout(() => {
				this.form.options.listeners?.onBlur?.({
					formApi: this.form,
					fieldApi: this
				});
			}, formDebounceMs);
		} else this.form.options.listeners?.onBlur?.({
			formApi: this.form,
			fieldApi: this
		});
		const fieldDebounceMs = this.options.listeners?.onBlurDebounceMs;
		if (fieldDebounceMs && fieldDebounceMs > 0) {
			if (this.timeoutIds.listeners.blur) clearTimeout(this.timeoutIds.listeners.blur);
			this.timeoutIds.listeners.blur = setTimeout(() => {
				this.options.listeners?.onBlur?.({
					value: this.state.value,
					fieldApi: this
				});
			}, fieldDebounceMs);
		} else this.options.listeners?.onBlur?.({
			value: this.state.value,
			fieldApi: this
		});
	}
};
function normalizeError(rawError) {
	if (rawError) return rawError;
}
function getErrorMapKey(cause) {
	switch (cause) {
		case "submit": return "onSubmit";
		case "blur": return "onBlur";
		case "mount": return "onMount";
		case "server": return "onServer";
		case "dynamic": return "onDynamic";
		default: return "onChange";
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+form-core@1.32.0/node_modules/@tanstack/form-core/dist/esm/transform.js
function mergeAndUpdate(form, fn) {
	if (!fn) return;
	const newObj = Object.assign({}, form, { state: deepCopy(form.state) });
	fn(newObj);
	if (newObj.fieldInfo !== form.fieldInfo) form.fieldInfo = newObj.fieldInfo;
	if (newObj.options !== form.options) form.options = newObj.options;
	const diffedObject = Object.keys({
		values: null,
		validationMetaMap: null,
		fieldMetaBase: null,
		isSubmitting: null,
		isSubmitted: null,
		isValidating: null,
		submissionAttempts: null,
		isSubmitSuccessful: null,
		_force_re_eval: null
	}).reduce((prev, key) => {
		if (form.state[key] !== newObj.state[key]) prev[key] = newObj.state[key];
		return prev;
	}, {});
	batch(() => {
		if (Object.keys(diffedObject).length) form.baseStore.setState((prev) => ({
			...prev,
			...diffedObject
		}));
		if (newObj.state.errorMap !== form.state.errorMap) form.setErrorMap(newObj.state.errorMap);
	});
	return newObj;
}
//#endregion
export { uuid as a, functionalUpdate as i, FieldApi as n, batch as o, FormApi as r, createAtom as s, mergeAndUpdate as t };
