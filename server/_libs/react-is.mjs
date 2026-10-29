import { t as __commonJSMin } from "../_runtime.mjs";
//#region ../../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/cjs/react-is.production.min.js
/** @license React v17.0.2
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116;
	if ("function" === typeof Symbol && Symbol.for) {
		var x = Symbol.for;
		b = x("react.element");
		c = x("react.portal");
		d = x("react.fragment");
		e = x("react.strict_mode");
		f = x("react.profiler");
		g = x("react.provider");
		h = x("react.context");
		k = x("react.forward_ref");
		l = x("react.suspense");
		m = x("react.suspense_list");
		n = x("react.memo");
		p = x("react.lazy");
		x("react.block");
		x("react.server.block");
		x("react.fundamental");
		x("react.debug_trace_mode");
		x("react.legacy_hidden");
	}
	function y(a) {
		if ("object" === typeof a && null !== a) {
			var t = a.$$typeof;
			switch (t) {
				case b: switch (a = a.type, a) {
					case d:
					case f:
					case e:
					case l:
					case m: return a;
					default: switch (a = a && a.$$typeof, a) {
						case h:
						case k:
						case p:
						case n:
						case g: return a;
						default: return t;
					}
				}
				case c: return t;
			}
		}
	}
	exports.isFragment = function(a) {
		return y(a) === d;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/index.js
var require_react_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production_min();
}));
//#endregion
export { require_react_is as t };
