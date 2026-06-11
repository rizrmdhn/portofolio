globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import "./_libs/hookable.mjs";
import { t as getContext } from "./_libs/unctx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import "node:async_hooks";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.a)) };
globalThis.__nitro_vite_envs__ = services;
getContext("nitro-app", {
	asyncContext: void 0,
	AsyncLocalStorage: void 0
});
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/android-chrome-192x192.png": {
		"type": "image/png",
		"etag": "\"1508-kf4tHbs4buG2IxA20ELPiUtLciw\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 5384,
		"path": "../public/android-chrome-192x192.png"
	},
	"/android-chrome-512x512.png": {
		"type": "image/png",
		"etag": "\"835a-EO4LDv+eJk3lCJH6XUKxWaHJIZk\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 33626,
		"path": "../public/android-chrome-512x512.png"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"13e9-L8uNYhsx2o7cqaGy4FgYENKQOF0\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 5097,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon-16x16.png": {
		"type": "image/png",
		"etag": "\"fd-ENXEorhsSWrIx4BNw9eemZFk+4M\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 253,
		"path": "../public/favicon-16x16.png"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"1f0-OE1Q/5tTq+lcl3E2gwCeCkQDk8U\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 496,
		"path": "../public/favicon-32x32.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3c2e-4KdSqoxK3fCPnINyL+mxklfhPDY\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 15406,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"43-BEzmj4PuhUNHX+oW9uOnPSihxtU\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 67,
		"path": "../public/robots.txt"
	},
	"/site.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"107-vzG6+RvdL83iSkXj8qG+M3M8b2k\"",
		"mtime": "2026-06-11T22:17:17.354Z",
		"size": 263,
		"path": "../public/site.webmanifest"
	},
	"/assets/CompositeItem-CzUFLFyb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-B5PDsOnuCQbfYoaORHrboKGTuIM\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 384,
		"path": "../public/assets/CompositeItem-CzUFLFyb.js"
	},
	"/assets/CompositeList-DaGl4eSR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa5-8n4oCGs9hqpicUtPE3zpwm2kAg0\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 12197,
		"path": "../public/assets/CompositeList-DaGl4eSR.js"
	},
	"/assets/FormContext-COGn3rM-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Kf6qgviAGp7wGku3/c9z6rM96SI\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 259,
		"path": "../public/assets/FormContext-COGn3rM-.js"
	},
	"/assets/CompositeRoot-GrLaMIPh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe4-1OBuObV+6DBZBPGJbt4dQ/R9rYo\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 4068,
		"path": "../public/assets/CompositeRoot-GrLaMIPh.js"
	},
	"/assets/IconArrowRight-CQvyja7_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-rHTjmmISaC7YnuK3RryAD9rCqV0\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 213,
		"path": "../public/assets/IconArrowRight-CQvyja7_.js"
	},
	"/assets/IconBriefcase-DC6laLtO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-nXe04etNetmuKP8PJ1+NTFbx8tc\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 360,
		"path": "../public/assets/IconBriefcase-DC6laLtO.js"
	},
	"/assets/IconAt-f9Xf4Xsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-7QF7HoKYx7LkstUKYSC0zMpbtJg\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 225,
		"path": "../public/assets/IconAt-f9Xf4Xsz.js"
	},
	"/assets/IconCertificate-CLFfJ4oK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bd-2akXC2pVB7ogVZIAd8+uqTKl/aM\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 445,
		"path": "../public/assets/IconCertificate-CLFfJ4oK.js"
	},
	"/assets/IconChevronDown-IXbWgzyn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-fvW9uREuo7PuR9flUjz5LXTVzXY\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 142,
		"path": "../public/assets/IconChevronDown-IXbWgzyn.js"
	},
	"/assets/IconExternalLink-Dcg3PzaK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-6ZistCY8NVnZSQ/oF2GY+jjf5z8\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 268,
		"path": "../public/assets/IconExternalLink-Dcg3PzaK.js"
	},
	"/assets/IconEye-BqiZ2Aq_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-LmMDs1SIuNg8VSWHU5vtR3MRkdU\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 256,
		"path": "../public/assets/IconEye-BqiZ2Aq_.js"
	},
	"/assets/IconFileText-CNDrYjU7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-4Q265jKi0VSeQEx7S7JS+5ub9Vk\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 353,
		"path": "../public/assets/IconFileText-CNDrYjU7.js"
	},
	"/assets/IconList-DIsA2Ncc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-ZrVJYQBzb2b4yYBb3k9XbJilqQ0\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 315,
		"path": "../public/assets/IconList-DIsA2Ncc.js"
	},
	"/assets/IconFolder-C3GooZuE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-MJRsUIP0Koun8PhT1+lnd1IRBP0\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 200,
		"path": "../public/assets/IconFolder-C3GooZuE.js"
	},
	"/assets/IconPencil-fQWCwf7K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-n79c/7Jpq2ELOCbwu6yB0IqqprM\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 214,
		"path": "../public/assets/IconPencil-fQWCwf7K.js"
	},
	"/assets/IconPlus-BcKOIx6L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-2CDv+PWvEWG6WdloaM0N8R+u7hc\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 162,
		"path": "../public/assets/IconPlus-BcKOIx6L.js"
	},
	"/assets/IconSchool-BPyfp3ph.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-T8du9tIXSSA4Jl8UjHk2BAjR/C0\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 208,
		"path": "../public/assets/IconSchool-BPyfp3ph.js"
	},
	"/assets/IconSearch-C7YHrkGn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-0C4zede6EtWUmba0Vv4MGOw8rr8\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 194,
		"path": "../public/assets/IconSearch-C7YHrkGn.js"
	},
	"/assets/IconSelector-DUVucbnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4-R0F3P1L3BkmtJamqs03sDaUIN34\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 180,
		"path": "../public/assets/IconSelector-DUVucbnW.js"
	},
	"/assets/IconStack2-BFg9ROaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-O/P1kj3DxMmXVQmPor13wWXHqFE\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 228,
		"path": "../public/assets/IconStack2-BFg9ROaO.js"
	},
	"/assets/IconTrash-DKmWF3Vz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-1cXGEMo0nGw535Pzks698Ct0MX4\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 343,
		"path": "../public/assets/IconTrash-DKmWF3Vz.js"
	},
	"/assets/IconTrophy-CvRwwP6N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b-bQbjy5vC/VD0GQS6UWLIqQLxmS8\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 379,
		"path": "../public/assets/IconTrophy-CvRwwP6N.js"
	},
	"/assets/IconUser-CqGfFld3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-HUGyMpoO1tTrHzTd/wubyPA9H/w\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 216,
		"path": "../public/assets/IconUser-CqGfFld3.js"
	},
	"/assets/IconX-ClbYWHJ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-5mNfeH7PcR7MleOKLgAVwm7gIHU\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 158,
		"path": "../public/assets/IconX-ClbYWHJ6.js"
	},
	"/assets/Separator-Z557WhSD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-BqQmGNPwuc2fY5Xtebry1vO7wwM\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 278,
		"path": "../public/assets/Separator-Z557WhSD.js"
	},
	"/assets/ToolbarRootContext-QrKBXocX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1-wMllOET+O8uHMK/mXSe8bXhR3hw\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 193,
		"path": "../public/assets/ToolbarRootContext-QrKBXocX.js"
	},
	"/assets/_achievementId.edit-Yya2QmtU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174d-A1gTGxetudnhP/MD1igrYGOPTqc\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 5965,
		"path": "../public/assets/_achievementId.edit-Yya2QmtU.js"
	},
	"/assets/_certificateId.edit-D5qWLpqC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b66-r0lE0wdFk+6ZYslqb8awXL4zcpA\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 7014,
		"path": "../public/assets/_certificateId.edit-D5qWLpqC.js"
	},
	"/assets/_educationId.edit-Dmp2PIys.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bcb-jXPTH/iuQj089MFnx3ryM/LHlB8\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 7115,
		"path": "../public/assets/_educationId.edit-Dmp2PIys.js"
	},
	"/assets/_experienceId.edit-DrSo2kVZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"210d-ft5FYXzRvJ6X/nGHz2YGhRc0jZY\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 8461,
		"path": "../public/assets/_experienceId.edit-DrSo2kVZ.js"
	},
	"/assets/_projectId.edit-no6grXE1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4286-kJUiy9n+nuh3tzdg8gQvigEKetQ\"",
		"mtime": "2026-06-11T22:17:14.427Z",
		"size": 17030,
		"path": "../public/assets/_projectId.edit-no6grXE1.js"
	},
	"/assets/_slug-CAMvZ79L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-aRFVY+RmYYp4WXSorC5ochuFX3A\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 875,
		"path": "../public/assets/_slug-CAMvZ79L.js"
	},
	"/assets/_slug-UGPfoJuW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28c71-/TUxQ5PTTj6h7k6yaudMJPKea1k\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 167025,
		"path": "../public/assets/_slug-UGPfoJuW.js"
	},
	"/assets/_socialLinkId.edit-DIgNQo-6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109c-ayZWrtgQjcyqWuscj9qqFl8+i54\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 4252,
		"path": "../public/assets/_socialLinkId.edit-DIgNQo-6.js"
	},
	"/assets/_techStackId.edit-0XvW_u98.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c5-hheG2wG3EZIXreCa3AmFIkZX++0\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 5573,
		"path": "../public/assets/_techStackId.edit-0XvW_u98.js"
	},
	"/assets/achievement-BSZsL-9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1170-Vr67gYgCW5vW/HgjCidnHntrPB4\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 4464,
		"path": "../public/assets/achievement-BSZsL-9E.js"
	},
	"/assets/achievement.schema-DrruwM37.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-efUc56REZVKwYEe0n6LSKYkyNK8\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 413,
		"path": "../public/assets/achievement.schema-DrruwM37.js"
	},
	"/assets/auth-client-DeydM-GV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d410-zRQ+HqwzJB8ui5R1LVU6dqG8yWQ\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 54288,
		"path": "../public/assets/auth-client-DeydM-GV.js"
	},
	"/assets/avatar-DkV6T9nm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"604-b05MYF1C5fUo3Trm7G+d627cHXE\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 1540,
		"path": "../public/assets/avatar-DkV6T9nm.js"
	},
	"/assets/badge-7W9NOmnu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83a-DyrkgkRtfTrnAx4MjBxBcykk3bA\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 2106,
		"path": "../public/assets/badge-7W9NOmnu.js"
	},
	"/assets/certifcation.schema-CZQnM9Ze.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20b-IvmEYiUPs6SXA9RRU40Ffl4pCjk\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 523,
		"path": "../public/assets/certifcation.schema-CZQnM9Ze.js"
	},
	"/assets/card-DzURl9QQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c1-Q14Kr8VUSSToNGTBBL6IbhE1BpA\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 1729,
		"path": "../public/assets/card-DzURl9QQ.js"
	},
	"/assets/certificate-card-CvXtRPXl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33d-BmIEBBZcUAcj0ZnpnqvaYyijCZM\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 829,
		"path": "../public/assets/certificate-card-CvXtRPXl.js"
	},
	"/assets/certificate-tH6HI-cn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-CrpUHr9ko7Gjb0ZOq2Aj9UMU2Ng\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 4826,
		"path": "../public/assets/certificate-tH6HI-cn.js"
	},
	"/assets/certificates-02rSvTjM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-qLYVTht7HQz+rVkbw+E5OrO+ba4\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 690,
		"path": "../public/assets/certificates-02rSvTjM.js"
	},
	"/assets/create-8c4Y20Jx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b10-SUIj3FKxSHsbwKQc5kNmzvkfJzA\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 6928,
		"path": "../public/assets/create-8c4Y20Jx.js"
	},
	"/assets/create-BorRDiGi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1028-gtPXVQLsLxEG3mnS+S6jr1Ugqls\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 4136,
		"path": "../public/assets/create-BorRDiGi.js"
	},
	"/assets/create-Cc7jv4IR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3da5-4dwUpY8gnPMkzSgCS0Njc3lDkr8\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 15781,
		"path": "../public/assets/create-Cc7jv4IR.js"
	},
	"/assets/create-CpI0iWN-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a84-AomKdP80Lil7gyZ0gqxF2GDqTzM\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 6788,
		"path": "../public/assets/create-CpI0iWN-.js"
	},
	"/assets/create-DXOnWavl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c4-ONdyWmhRVFzG0caz27SOwIPUOyw\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 5316,
		"path": "../public/assets/create-DXOnWavl.js"
	},
	"/assets/create-FDZnJZxu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16bd-BtEbw93Vn6jvW6FoSwI0jtKJn/w\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 5821,
		"path": "../public/assets/create-FDZnJZxu.js"
	},
	"/assets/create-I2jkpJ_X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"204d-yqwhVjRWlnupOGXQV2VVX6gonlI\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 8269,
		"path": "../public/assets/create-I2jkpJ_X.js"
	},
	"/assets/dashboard-tWCXex48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d35a-1+ZsPQ/jjAjnFnGM8xfd6xCBzlk\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 381786,
		"path": "../public/assets/dashboard-tWCXex48.js"
	},
	"/assets/date-picker-C4zT-HcD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9a0-f4PMxrChQ1Vz43QZPMWlzRU2rHY\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 63904,
		"path": "../public/assets/date-picker-C4zT-HcD.js"
	},
	"/assets/education-mdHz6o1Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119a-i6zKsyFFFcPyXm09bFiv9e0QRiM\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 4506,
		"path": "../public/assets/education-mdHz6o1Q.js"
	},
	"/assets/education.schema-DNIRSg5T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ef-ezHqIIeSQkMr2rD0eOO2m4tZe50\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 495,
		"path": "../public/assets/education.schema-DNIRSg5T.js"
	},
	"/assets/experience-BcXLLzjQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d46-mOSS623mcAVt8+fi+EtUbenCbS4\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 3398,
		"path": "../public/assets/experience-BcXLLzjQ.js"
	},
	"/assets/experience.schema-DWmVEai3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c6-sDtjws2xqjITZyLRr/A/ri+c/wo\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 454,
		"path": "../public/assets/experience.schema-DWmVEai3.js"
	},
	"/assets/form-data-mapper-CNUllXG7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e114-GR0VwpUFYoMG9fWGZAEbKgyGorY\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 450836,
		"path": "../public/assets/form-data-mapper-CNUllXG7.js"
	},
	"/assets/format-DbqPzlzt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bbd-sBbhOfaqu+2Odv4odDFcMZCwp00\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 19389,
		"path": "../public/assets/format-DbqPzlzt.js"
	},
	"/assets/fade-in-BEKTJzET.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe-u/g4RFvufqQ9S0cetbw01O5iSlU\"",
		"mtime": "2026-06-11T22:17:14.428Z",
		"size": 510,
		"path": "../public/assets/fade-in-BEKTJzET.js"
	},
	"/assets/getPseudoElementBounds-CbbYeoGV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22a0-jUPnXEQBJE/AAWQAju3K/UENZNM\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 8864,
		"path": "../public/assets/getPseudoElementBounds-CbbYeoGV.js"
	},
	"/assets/has-tab-error-Bqrr6fXa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b-gmNliM+RxW7EmG1wmX74a17esh8\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 779,
		"path": "../public/assets/has-tab-error-Bqrr6fXa.js"
	},
	"/assets/hero-CN9iLbOx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1215-O4SZGcMEiI3i2GIN/iOLKbvuwq0\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 4629,
		"path": "../public/assets/hero-CN9iLbOx.js"
	},
	"/assets/index-BSZqVN06.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2b664-21GaK6zuGVPwbOw1AE7XyIvKgpg\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 177764,
		"path": "../public/assets/index-BSZqVN06.css"
	},
	"/assets/inertValue-BzzkV6is.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8b-LxqKFI+hBNNMKbB1Sts+obZB6Eg\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 2955,
		"path": "../public/assets/inertValue-BzzkV6is.js"
	},
	"/assets/index-g4cJ9sBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d39a7-/tdMRffoqX76hKDpKz0K4wU2VvQ\"",
		"mtime": "2026-06-11T22:17:14.426Z",
		"size": 866727,
		"path": "../public/assets/index-g4cJ9sBP.js"
	},
	"/assets/input-DL-fUkg1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a6-lV38hH9vIoxYmkpXNHmPSmOgIo8\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 4518,
		"path": "../public/assets/input-DL-fUkg1.js"
	},
	"/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2": {
		"type": "font/woff2",
		"etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 25960,
		"path": "../public/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2"
	},
	"/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2": {
		"type": "font/woff2",
		"etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 18748,
		"path": "../public/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2"
	},
	"/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2": {
		"type": "font/woff2",
		"etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 11232,
		"path": "../public/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2"
	},
	"/assets/inter-greek-wght-normal-CkhJZR-_.woff2": {
		"type": "font/woff2",
		"etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 18996,
		"path": "../public/assets/inter-greek-wght-normal-CkhJZR-_.woff2"
	},
	"/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2": {
		"type": "font/woff2",
		"etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 85068,
		"path": "../public/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2"
	},
	"/assets/inter-latin-wght-normal-Dx4kXJAl.woff2": {
		"type": "font/woff2",
		"etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
		"mtime": "2026-06-11T22:17:14.431Z",
		"size": 48256,
		"path": "../public/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
	},
	"/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2": {
		"type": "font/woff2",
		"etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
		"mtime": "2026-06-11T22:17:14.431Z",
		"size": 10252,
		"path": "../public/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2"
	},
	"/assets/login-CCogpBM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e08-twZdJpQiy8KBxQY6XrL+mNkUxt4\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 3592,
		"path": "../public/assets/login-CCogpBM6.js"
	},
	"/assets/main-header-CLtQcRWD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6f-G86HGO9BzBhjXpY3UF/16HF8vG8\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 3951,
		"path": "../public/assets/main-header-CLtQcRWD.js"
	},
	"/assets/normalizeInterval-_FQuuwKL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d7-DwSdguiN4lTlhhMKwMn7ECcMOTs\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 727,
		"path": "../public/assets/normalizeInterval-_FQuuwKL.js"
	},
	"/assets/number-CX-uUKpa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e1-l9lbxHa5d9rpgwXb7Uf1H+QIqVw\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 1249,
		"path": "../public/assets/number-CX-uUKpa.js"
	},
	"/assets/optimistic-update-DBjkNaYS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"507-csu3rt1s0CdaOUrGWXeH47xzKtA\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 1287,
		"path": "../public/assets/optimistic-update-DBjkNaYS.js"
	},
	"/assets/project-card-tDRaF4oH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b33-5SVRIEGbMZjmkQgnp2H0kLO8fMI\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 2867,
		"path": "../public/assets/project-card-tDRaF4oH.js"
	},
	"/assets/projects-CskXLgit.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa6c-fcYlRruH9G2SRv1v7tRQW9xfPU4\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 64108,
		"path": "../public/assets/projects-CskXLgit.js"
	},
	"/assets/resume-BUB7pL2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"948-OeD/QpQXn+3HNVO1BbfOda56PDs\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 2376,
		"path": "../public/assets/resume-BUB7pL2f.js"
	},
	"/assets/projects-DgsWjQMu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63a-Wp0Os0GXy58jOEz11W7hxUHDBM0\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 1594,
		"path": "../public/assets/projects-DgsWjQMu.js"
	},
	"/assets/resume-BZcK1fMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f6-oPzVwA7v9I2g43hRP76mHReAj0o\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 9974,
		"path": "../public/assets/resume-BZcK1fMH.js"
	},
	"/assets/route-D6M6EWw4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ad2-nrJwBU3BuSYEhGny3gZCJlsKGl0\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 27346,
		"path": "../public/assets/route-D6M6EWw4.js"
	},
	"/assets/route-D9IvuhcL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-fwyIt/ASguia4VFexxCbhu4RVaM\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 117,
		"path": "../public/assets/route-D9IvuhcL.js"
	},
	"/assets/routes-EFzzOwkF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"321d-Z1LNML6kXzpAO/fqQF+KX59/FVM\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 12829,
		"path": "../public/assets/routes-EFzzOwkF.js"
	},
	"/assets/scroll-area-k9C-IoYq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3684-fODkuJxGmXO2nY9ysLORSi7l8eQ\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 13956,
		"path": "../public/assets/scroll-area-k9C-IoYq.js"
	},
	"/assets/scrollEdges-Dbiwdr-4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-4ri9j7MK4DmCmCb3dr6Jikm6F6A\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 624,
		"path": "../public/assets/scrollEdges-Dbiwdr-4.js"
	},
	"/assets/select-BIoyfrlu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74f4-znbE2Nnhi+v6Rz4T552ayGSHusY\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 29940,
		"path": "../public/assets/select-BIoyfrlu.js"
	},
	"/assets/seo-BZLU6kNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bf-VU3ISbItUdkbA5iwLNQ26N5OJPo\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 4287,
		"path": "../public/assets/seo-BZLU6kNV.js"
	},
	"/assets/separator-BYf9UmAw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-yGI7nFQNSgsDlE63wJ0h6iuIQGQ\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 366,
		"path": "../public/assets/separator-BYf9UmAw.js"
	},
	"/assets/shadowDom-BrDGKdYj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53d-RCGj94WJHvL/JUCZjzonI1AAj24\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 1341,
		"path": "../public/assets/shadowDom-BrDGKdYj.js"
	},
	"/assets/sheet-BaeEDQiM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c80-fmC8JfxP88pF4bS+uzXGicLFskQ\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 11392,
		"path": "../public/assets/sheet-BaeEDQiM.js"
	},
	"/assets/social-link.schema-YDzoBhOd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"133-XIM0cCuBqwtNV/X3wZrJuiLFad8\"",
		"mtime": "2026-06-11T22:17:14.429Z",
		"size": 307,
		"path": "../public/assets/social-link.schema-YDzoBhOd.js"
	},
	"/assets/social-links-B6QOsWZk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fee-/MtBx69VYbfEZgO9I3Be1P81gFw\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 4078,
		"path": "../public/assets/social-links-B6QOsWZk.js"
	},
	"/assets/sortable.esm-C3kozHan.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae9b-e/AlnG/gm+uXSsdvrecjm2xFSfA\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 44699,
		"path": "../public/assets/sortable.esm-C3kozHan.js"
	},
	"/assets/switch-CeYFK7uS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b2b-eXsFJ4HmX6+x9GkcQ8B3l8Ps+5M\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 6955,
		"path": "../public/assets/switch-CeYFK7uS.js"
	},
	"/assets/tabs-Cq765ncj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25da-rNZlCqbCMUzG0WpeMzZhfqxe0PQ\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 9690,
		"path": "../public/assets/tabs-Cq765ncj.js"
	},
	"/assets/tech-stack-BnVL_WM-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b6-HQkBgDtzmnsZqacrF4D1KgOnV5w\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 4278,
		"path": "../public/assets/tech-stack-BnVL_WM-.js"
	},
	"/assets/textarea-BRUJ1yJd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a9-E0S9xTF1gGSlB6w0xvhLp+CcfZg\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 681,
		"path": "../public/assets/textarea-BRUJ1yJd.js"
	},
	"/assets/toggle-group-B8zHYmnn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1484-3C9bP6qm9bWZXje+daXqT7EFLQc\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 5252,
		"path": "../public/assets/toggle-group-B8zHYmnn.js"
	},
	"/assets/useCompositeItem-BI_EclOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20b-Ew4S9HwKdJfE8LzuR8TLDOS2oWw\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 523,
		"path": "../public/assets/useCompositeItem-BI_EclOb.js"
	},
	"/assets/useForm-oEAzolUo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab74-AlahddMrCj1zpxLHaRIVccn0EhE\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 43892,
		"path": "../public/assets/useForm-oEAzolUo.js"
	},
	"/assets/use-debounced-BEyh57Ae.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d74-P+S5SqGjp0xRE2ls5ibrCPr6w/Y\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 3444,
		"path": "../public/assets/use-debounced-BEyh57Ae.js"
	},
	"/assets/useMutation-80GPv8Vv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ad-KC98rYftVeD4f8LEojHPIerGZn4\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 2221,
		"path": "../public/assets/useMutation-80GPv8Vv.js"
	},
	"/assets/useOnMount-DL2CZLTJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-z7M2tovHxnK1q7jHqhPrQmB5ev8\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 113,
		"path": "../public/assets/useOnMount-DL2CZLTJ.js"
	},
	"/assets/useOpenInteractionType-D1b_UM-m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f24a-rJuD7thdhEQKMagZN0NK9SAUZ9I\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 62026,
		"path": "../public/assets/useOpenInteractionType-D1b_UM-m.js"
	},
	"/assets/useQuery-CVLraemb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69-nGSMNsBHfRAuAGTowFkFxE1hem0\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 105,
		"path": "../public/assets/useQuery-CVLraemb.js"
	},
	"/assets/useRender-Bl4EbRhr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67-x94XrzO6+3RpE4ClH6tT7Ioet2o\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 103,
		"path": "../public/assets/useRender-Bl4EbRhr.js"
	},
	"/assets/useSuspenseQuery-ENV8iBM5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22a1-worMn66peItKqVpaHWwytxDDZ5U\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 8865,
		"path": "../public/assets/useSuspenseQuery-ENV8iBM5.js"
	},
	"/assets/useTimeout-BJn1FsgF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c9-sOhZ9o5WH3X7oyxVMjDxO85JXOQ\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 457,
		"path": "../public/assets/useTimeout-BJn1FsgF.js"
	},
	"/assets/useTriggerFocusGuards-7rOD4lEi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3de5-9SiVML/6p7WlqthTqzSlqnp22w8\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 15845,
		"path": "../public/assets/useTriggerFocusGuards-7rOD4lEi.js"
	},
	"/assets/useValueAsRef-CdtfytOi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-SXGZ+uvu1bwr7jpLAH0sSNN81X4\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 207,
		"path": "../public/assets/useValueAsRef-CdtfytOi.js"
	},
	"/assets/useValueChanged-Rztewd3j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129-8AHPUDCdpnNHVEroqDbvvWTVpZk\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 297,
		"path": "../public/assets/useValueChanged-Rztewd3j.js"
	},
	"/assets/visuallyHidden-D4WmY7rX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-KzvQXXyFwXZbSJji3C8JZlvKZhA\"",
		"mtime": "2026-06-11T22:17:14.430Z",
		"size": 194,
		"path": "../public/assets/visuallyHidden-D4WmY7rX.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_hBGtvV = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hBGtvV
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function createNitroApp() {
	const hooks = void 0;
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		{
			const routeRules = getRouteRules(method, pathname);
			event.context.routeRules = routeRules?.routeRules;
			if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		}
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_ioredis@5.10.1_jiti@2.7.0_lru-cache@11.3.6_mysql2@3_113c4e771c3798fb4c0c3209f28e9756/node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
