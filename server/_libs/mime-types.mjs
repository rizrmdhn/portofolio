import { i as __require, t as __commonJSMin } from "../_runtime.mjs";
import { t as require_mime_db } from "./mime-db.mjs";
//#region ../../node_modules/.pnpm/mime-types@3.0.2/node_modules/mime-types/mimeScore.js
var require_mimeScore = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var FACET_SCORES = {
		"prs.": 100,
		"x-": 200,
		"x.": 300,
		"vnd.": 400,
		default: 900
	};
	var SOURCE_SCORES = {
		nginx: 10,
		apache: 20,
		iana: 40,
		default: 30
	};
	var TYPE_SCORES = {
		application: 1,
		font: 2,
		audio: 2,
		video: 3,
		default: 0
	};
	/**
	* Get each component of the score for a mime type.  The sum of these is the
	* total score.  The higher the score, the more "official" the type.
	*/
	module.exports = function mimeScore(mimeType, source = "default") {
		if (mimeType === "application/octet-stream") return 0;
		const [type, subtype] = mimeType.split("/");
		const facetScore = FACET_SCORES[subtype.replace(/(\.|x-).*/, "$1")] || FACET_SCORES.default;
		const sourceScore = SOURCE_SCORES[source] || SOURCE_SCORES.default;
		const typeScore = TYPE_SCORES[type] || TYPE_SCORES.default;
		const lengthScore = 1 - mimeType.length / 100;
		return facetScore + sourceScore + typeScore + lengthScore;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/mime-types@3.0.2/node_modules/mime-types/index.js
/*!
* mime-types
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_mime_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Module dependencies.
	* @private
	*/
	var db = require_mime_db();
	var extname = __require("path").extname;
	var mimeScore = require_mimeScore();
	/**
	* Module variables.
	* @private
	*/
	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
	var TEXT_TYPE_REGEXP = /^text\//i;
	/**
	* Module exports.
	* @public
	*/
	exports.charset = charset;
	exports.charsets = { lookup: charset };
	exports.contentType = contentType;
	exports.extension = extension;
	exports.extensions = Object.create(null);
	exports.lookup = lookup;
	exports.types = Object.create(null);
	exports._extensionConflicts = [];
	populateMaps(exports.extensions, exports.types);
	/**
	* Get the default charset for a MIME type.
	*
	* @param {string} type
	* @return {false|string}
	*/
	function charset(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var mime = match && db[match[1].toLowerCase()];
		if (mime && mime.charset) return mime.charset;
		if (match && TEXT_TYPE_REGEXP.test(match[1])) return "UTF-8";
		return false;
	}
	/**
	* Create a full Content-Type header given a MIME type or extension.
	*
	* @param {string} str
	* @return {false|string}
	*/
	function contentType(str) {
		if (!str || typeof str !== "string") return false;
		var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
		if (!mime) return false;
		if (mime.indexOf("charset") === -1) {
			var charset = exports.charset(mime);
			if (charset) mime += "; charset=" + charset.toLowerCase();
		}
		return mime;
	}
	/**
	* Get the default extension for a MIME type.
	*
	* @param {string} type
	* @return {false|string}
	*/
	function extension(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var exts = match && exports.extensions[match[1].toLowerCase()];
		if (!exts || !exts.length) return false;
		return exts[0];
	}
	/**
	* Lookup the MIME type for a file path/extension.
	*
	* @param {string} path
	* @return {false|string}
	*/
	function lookup(path) {
		if (!path || typeof path !== "string") return false;
		var extension = extname("x." + path).toLowerCase().slice(1);
		if (!extension) return false;
		return exports.types[extension] || false;
	}
	/**
	* Populate the extensions and types maps.
	* @private
	*/
	function populateMaps(extensions, types) {
		Object.keys(db).forEach(function forEachMimeType(type) {
			var exts = db[type].extensions;
			if (!exts || !exts.length) return;
			extensions[type] = exts;
			for (var i = 0; i < exts.length; i++) {
				var extension = exts[i];
				types[extension] = _preferredType(extension, types[extension], type);
				const legacyType = _preferredTypeLegacy(extension, types[extension], type);
				if (legacyType !== types[extension]) exports._extensionConflicts.push([
					extension,
					legacyType,
					types[extension]
				]);
			}
		});
	}
	function _preferredType(ext, type0, type1) {
		return (type0 ? mimeScore(type0, db[type0].source) : 0) > (type1 ? mimeScore(type1, db[type1].source) : 0) ? type0 : type1;
	}
	function _preferredTypeLegacy(ext, type0, type1) {
		var SOURCE_RANK = [
			"nginx",
			"apache",
			void 0,
			"iana"
		];
		var score0 = type0 ? SOURCE_RANK.indexOf(db[type0].source) : 0;
		var score1 = type1 ? SOURCE_RANK.indexOf(db[type1].source) : 0;
		if (exports.types[extension] !== "application/octet-stream" && (score0 > score1 || score0 === score1 && exports.types[extension]?.slice(0, 12) === "application/")) return type0;
		return score0 > score1 ? type0 : type1;
	}
}));
//#endregion
export { require_mime_types as t };
