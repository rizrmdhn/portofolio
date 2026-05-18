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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/error/prod.mjs
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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/android-chrome-192x192.png": {
		"type": "image/png",
		"etag": "\"1508-kf4tHbs4buG2IxA20ELPiUtLciw\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 5384,
		"path": "../public/android-chrome-192x192.png"
	},
	"/android-chrome-512x512.png": {
		"type": "image/png",
		"etag": "\"835a-EO4LDv+eJk3lCJH6XUKxWaHJIZk\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 33626,
		"path": "../public/android-chrome-512x512.png"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"13e9-L8uNYhsx2o7cqaGy4FgYENKQOF0\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 5097,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon-16x16.png": {
		"type": "image/png",
		"etag": "\"fd-ENXEorhsSWrIx4BNw9eemZFk+4M\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 253,
		"path": "../public/favicon-16x16.png"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"1f0-OE1Q/5tTq+lcl3E2gwCeCkQDk8U\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 496,
		"path": "../public/favicon-32x32.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3c2e-4KdSqoxK3fCPnINyL+mxklfhPDY\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 15406,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"43-BEzmj4PuhUNHX+oW9uOnPSihxtU\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 67,
		"path": "../public/robots.txt"
	},
	"/site.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"107-vzG6+RvdL83iSkXj8qG+M3M8b2k\"",
		"mtime": "2026-05-18T11:10:11.539Z",
		"size": 263,
		"path": "../public/site.webmanifest"
	},
	"/assets/CompositeItem-Dx5nd2I-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-E3u4Jn6LnUa0x2XTX5JYx4buTT0\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 384,
		"path": "../public/assets/CompositeItem-Dx5nd2I-.js"
	},
	"/assets/CompositeList-DhdLUEG_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa5-yORnEDLFWKTLPpcdeeQ5miVd89Q\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 12197,
		"path": "../public/assets/CompositeList-DhdLUEG_.js"
	},
	"/assets/CompositeRoot-rzF2QD5K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe4-DSD9Z1rCJrRdawfznw/x7Vrpk80\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 4068,
		"path": "../public/assets/CompositeRoot-rzF2QD5K.js"
	},
	"/assets/FormContext-35Qlibtq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-6mBd7UOKXOJOQD5mzcQQoSVKrIo\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 259,
		"path": "../public/assets/FormContext-35Qlibtq.js"
	},
	"/assets/IconArrowRight-CVRehp6t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-0jrNVWjEY+BOyvKkEANVVjbQfWA\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 213,
		"path": "../public/assets/IconArrowRight-CVRehp6t.js"
	},
	"/assets/IconAt-BIwyMidC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-wzX047ouzllGzxjHJnNLD05etmo\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 225,
		"path": "../public/assets/IconAt-BIwyMidC.js"
	},
	"/assets/IconBriefcase-B4w4sItM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-G3mo0YOFvRogUoRBb7M0A70XBXk\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 360,
		"path": "../public/assets/IconBriefcase-B4w4sItM.js"
	},
	"/assets/IconCertificate-Dv6y1swd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bd-bE6MV8ky8RCq01pR4kcY57IYQaU\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 445,
		"path": "../public/assets/IconCertificate-Dv6y1swd.js"
	},
	"/assets/IconChevronDown-BMY4z21r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-vNRQlIysDF3YexIT0q/wBi4dznQ\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 142,
		"path": "../public/assets/IconChevronDown-BMY4z21r.js"
	},
	"/assets/IconExternalLink-BzLzmQDp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-tbCiuhsDkKK0gBHfCU2QLXs2888\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 268,
		"path": "../public/assets/IconExternalLink-BzLzmQDp.js"
	},
	"/assets/IconEye-ROxQRJOF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-qN+auy0Tx3Ow7EoQUijoQLCetKU\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 256,
		"path": "../public/assets/IconEye-ROxQRJOF.js"
	},
	"/assets/IconFileText-DcW2-Yil.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-c5FkFspHRK+BqrWP5Qb1mG7W6Ms\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 353,
		"path": "../public/assets/IconFileText-DcW2-Yil.js"
	},
	"/assets/IconFolder-DEok08c0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-Quhv9yTCbnB7SdryijYuqz2EdNI\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 200,
		"path": "../public/assets/IconFolder-DEok08c0.js"
	},
	"/assets/IconPencil-BFtUWt1b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-1eezfGrmfXmzFDQKdreBM4XjPwk\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 214,
		"path": "../public/assets/IconPencil-BFtUWt1b.js"
	},
	"/assets/IconSchool-DkcdqAqh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-FVbMJBc/R9aXDji4KGQnvNoFtGg\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 208,
		"path": "../public/assets/IconSchool-DkcdqAqh.js"
	},
	"/assets/IconSearch-D4t0RtNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-pqgju1wnh7sgBTKOunYib8CpiNo\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 194,
		"path": "../public/assets/IconSearch-D4t0RtNW.js"
	},
	"/assets/IconSelector-BEnVJqUX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4-CjZFHHzyRVzeldR5WfzwjEdIAcQ\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 180,
		"path": "../public/assets/IconSelector-BEnVJqUX.js"
	},
	"/assets/IconStack2-DzZV7mVY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-LMqmpp9MMsUuMNEYNFGT5mcVbL4\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 228,
		"path": "../public/assets/IconStack2-DzZV7mVY.js"
	},
	"/assets/IconTrash-Dqp6AqjI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-peVGyfWSgVW7gAfakkVYAMdtIgM\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 343,
		"path": "../public/assets/IconTrash-Dqp6AqjI.js"
	},
	"/assets/IconTrophy-BoC93xer.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b-9YtolGhpt8tle3yW6mfi8iWzlB8\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 379,
		"path": "../public/assets/IconTrophy-BoC93xer.js"
	},
	"/assets/IconUser-DDGRrRPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-/h5lV5CKD45m001RKcByDsct7U8\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 216,
		"path": "../public/assets/IconUser-DDGRrRPm.js"
	},
	"/assets/IconX-B2WKtHju.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-/IuICZD58S7AYsyeMgt2LcPdS1c\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 158,
		"path": "../public/assets/IconX-B2WKtHju.js"
	},
	"/assets/Separator-CjtM_O6D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-VxIjyXuRSbRg2oqUkfFJCnyJCIA\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 278,
		"path": "../public/assets/Separator-CjtM_O6D.js"
	},
	"/assets/ToolbarRootContext-BTg27E8_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1-W61orjSMHlk/KX//3P/8rhfZijA\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 193,
		"path": "../public/assets/ToolbarRootContext-BTg27E8_.js"
	},
	"/assets/_achievementId.edit-BHUnqjrm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174d-jNBtXfmyVZhlMn7XME2eXZrMs+s\"",
		"mtime": "2026-05-18T11:10:08.501Z",
		"size": 5965,
		"path": "../public/assets/_achievementId.edit-BHUnqjrm.js"
	},
	"/assets/_certificateId.edit-D_5G36O0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b66-xQ+6SgoOgFgwMH9oPjxe/e+3msQ\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 7014,
		"path": "../public/assets/_certificateId.edit-D_5G36O0.js"
	},
	"/assets/_educationId.edit-iXGfsuMN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bcb-ZmE/Fme0MGc95atgrp+E/sy8PaA\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 7115,
		"path": "../public/assets/_educationId.edit-iXGfsuMN.js"
	},
	"/assets/_experienceId.edit-Wk9OSMoT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22df-tWw4VttEq1NYi4D9K9BPW3K8PBg\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 8927,
		"path": "../public/assets/_experienceId.edit-Wk9OSMoT.js"
	},
	"/assets/_projectId.edit-BhmA1RuT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a75-21TCw1/ln2fJO/lbp1QyA5xxhcA\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 10869,
		"path": "../public/assets/_projectId.edit-BhmA1RuT.js"
	},
	"/assets/_slug-BLDydQnd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c61-ubbJ5cW3x6HPcaBTsRVJZ2ObH0A\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 3169,
		"path": "../public/assets/_slug-BLDydQnd.js"
	},
	"/assets/_socialLinkId.edit-DblbFhqC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109c-YMmi6olTZ50gztjFedIgD8B/uvE\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4252,
		"path": "../public/assets/_socialLinkId.edit-DblbFhqC.js"
	},
	"/assets/_techStackId.edit-LDP2RiH7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159c-Jbhj0+4jnZnkMwlUS95iYzz+PeI\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 5532,
		"path": "../public/assets/_techStackId.edit-LDP2RiH7.js"
	},
	"/assets/achievement-C1MwGKvm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114c-7CbUbf2wiUwv9CmDojBsQxcYJeY\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4428,
		"path": "../public/assets/achievement-C1MwGKvm.js"
	},
	"/assets/achievement.schema-BlC9EnDi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-eeRKSxAsrK6PNVhylohSNAEccb0\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 413,
		"path": "../public/assets/achievement.schema-BlC9EnDi.js"
	},
	"/assets/auth-client-BcrLzscL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d410-rFWX46xhuiLQy8KrUqc59CLdxhg\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 54288,
		"path": "../public/assets/auth-client-BcrLzscL.js"
	},
	"/assets/avatar-hpIh2e3C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"604-goS/4kW2sQzZZsusLmqGWq8vf68\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 1540,
		"path": "../public/assets/avatar-hpIh2e3C.js"
	},
	"/assets/badge-Bdui_h3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83a-vJgYG+qJOKwSPTJ7jebwwFZ9qBE\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 2106,
		"path": "../public/assets/badge-Bdui_h3R.js"
	},
	"/assets/card-DHztANhB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c1-Mcw3bMT1Fcr/W2DZgILlPOZr+5U\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 1729,
		"path": "../public/assets/card-DHztANhB.js"
	},
	"/assets/certifcation.schema-DdLJOooh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20b-/m18MIOfqqwjws212eVGCkDqq2s\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 523,
		"path": "../public/assets/certifcation.schema-DdLJOooh.js"
	},
	"/assets/certificate-B6d_SR5o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b1-lKk7ShfYqsQgJJYaJQHfo8t9054\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4785,
		"path": "../public/assets/certificate-B6d_SR5o.js"
	},
	"/assets/certificate-card-BoPkmqXn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33d-AJ38S+HyiP/RUk54Fy7tmvrWkAM\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 829,
		"path": "../public/assets/certificate-card-BoPkmqXn.js"
	},
	"/assets/certificates-Cd9SEW_T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-sOyDXE03BVZuGR1zGua/8ZksBCk\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 690,
		"path": "../public/assets/certificates-Cd9SEW_T.js"
	},
	"/assets/create-AVEEEg2y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"221f-N3tUpFXZ8UxTG/3uUVWBZ61OMAg\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 8735,
		"path": "../public/assets/create-AVEEEg2y.js"
	},
	"/assets/create-B4XZeD9t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a0-3XItymkrce26M7aiXuP5J4WuPgE\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 5280,
		"path": "../public/assets/create-B4XZeD9t.js"
	},
	"/assets/create-Bcwqm4X2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28d3-eNOrfNiq0vOZYBVbBjZ0f67xT8Y\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 10451,
		"path": "../public/assets/create-Bcwqm4X2.js"
	},
	"/assets/create-Bpopb2LS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a84-lkqQyWdJXN+KUU3ELIF1Hb6DJsc\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 6788,
		"path": "../public/assets/create-Bpopb2LS.js"
	},
	"/assets/create-BrWKOnG7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102d-AJ4MVl8rNRTWXNfN3BS8dZLXrho\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4141,
		"path": "../public/assets/create-BrWKOnG7.js"
	},
	"/assets/create-Cn9P0rOH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b10-eGhD7FP0S6GV9rVjKJNQ7XcD4kg\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 6928,
		"path": "../public/assets/create-Cn9P0rOH.js"
	},
	"/assets/create-XhYUOfKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16bd-yMN4OODuoIMcEp8QIUCNh3pikAU\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 5821,
		"path": "../public/assets/create-XhYUOfKE.js"
	},
	"/assets/dashboard-CRrYpNCS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"532b1-pHn3Q98BxwDPRFufZm1lmciH+iI\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 340657,
		"path": "../public/assets/dashboard-CRrYpNCS.js"
	},
	"/assets/date-picker-gtv5JD5X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fbcc-lCMfwXpLPV2UzwIjmcSUICCyjfI\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 64460,
		"path": "../public/assets/date-picker-gtv5JD5X.js"
	},
	"/assets/education-CrNqqc--.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1176-qwDE25aB2V8AkJLxxVK+nbiMLFs\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4470,
		"path": "../public/assets/education-CrNqqc--.js"
	},
	"/assets/education.schema-DnVTAAGr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ef-34FaXoCcteOgHCo5BtowPhfei3I\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 495,
		"path": "../public/assets/education.schema-DnVTAAGr.js"
	},
	"/assets/experience-DOhmrHBl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1259-ebscRRnNjwNX5NIlZx9Quo/D4Ak\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 4697,
		"path": "../public/assets/experience-DOhmrHBl.js"
	},
	"/assets/experience.schema-pUErIc71.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e-ubhIbjMm+MkWj/KKk5JD0ujWdek\"",
		"mtime": "2026-05-18T11:10:08.502Z",
		"size": 526,
		"path": "../public/assets/experience.schema-pUErIc71.js"
	},
	"/assets/fade-in-BQ9aucIG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7b7-wabbrdaTAaIpkax2zK9o27hnJvs\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 120759,
		"path": "../public/assets/fade-in-BQ9aucIG.js"
	},
	"/assets/form-data-mapper-CaxkE4WJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27172-unCKYwIeMJPlJ89T4X8VWfzNthA\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 160114,
		"path": "../public/assets/form-data-mapper-CaxkE4WJ.js"
	},
	"/assets/format-CWQHD77F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b9e-aMukBG1EMf3jmxRsZBV/CgskEps\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 19358,
		"path": "../public/assets/format-CWQHD77F.js"
	},
	"/assets/getPseudoElementBounds-BCZqFIrx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22a1-v9s755RToxPi1ZyUlRgoMFBKuMk\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 8865,
		"path": "../public/assets/getPseudoElementBounds-BCZqFIrx.js"
	},
	"/assets/has-tab-error-D7Dwq-bp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b-79ZKdanbr74P+/t7uaq18vrEmjc\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 779,
		"path": "../public/assets/has-tab-error-D7Dwq-bp.js"
	},
	"/assets/hero-BhCAwqdO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1215-advzNfsFhi34l79nRc4s3MfEMwA\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 4629,
		"path": "../public/assets/hero-BhCAwqdO.js"
	},
	"/assets/index-B_mhT1d-.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"296ac-aZWV9Wshbw0PkKFHLBE0rc1x01E\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 169644,
		"path": "../public/assets/index-B_mhT1d-.css"
	},
	"/assets/inertValue-C0CR6TSK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8b-HKVrqfia7edPuJoCkzxPTkOWl80\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 2955,
		"path": "../public/assets/inertValue-C0CR6TSK.js"
	},
	"/assets/input-BQhZtvUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a6-xMp8WKtEOzPzS9BfWTsm5twNTyU\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 4518,
		"path": "../public/assets/input-BQhZtvUz.js"
	},
	"/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2": {
		"type": "font/woff2",
		"etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 25960,
		"path": "../public/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2"
	},
	"/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2": {
		"type": "font/woff2",
		"etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 18748,
		"path": "../public/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2"
	},
	"/assets/index-8yYnRp_6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cdc40-eVNrcKz1I2ZneCoOVXdsI0EhFd8\"",
		"mtime": "2026-05-18T11:10:08.500Z",
		"size": 842816,
		"path": "../public/assets/index-8yYnRp_6.js"
	},
	"/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2": {
		"type": "font/woff2",
		"etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 11232,
		"path": "../public/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2"
	},
	"/assets/inter-greek-wght-normal-CkhJZR-_.woff2": {
		"type": "font/woff2",
		"etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 18996,
		"path": "../public/assets/inter-greek-wght-normal-CkhJZR-_.woff2"
	},
	"/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2": {
		"type": "font/woff2",
		"etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 85068,
		"path": "../public/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2"
	},
	"/assets/inter-latin-wght-normal-Dx4kXJAl.woff2": {
		"type": "font/woff2",
		"etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 48256,
		"path": "../public/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
	},
	"/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2": {
		"type": "font/woff2",
		"etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 10252,
		"path": "../public/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2"
	},
	"/assets/login-CAjKvsZy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e02-OcLtCmSvY4tkTkW5FGLhEYV2qw4\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 3586,
		"path": "../public/assets/login-CAjKvsZy.js"
	},
	"/assets/main-header-Co2JGx6B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-ca5GxT488Q+peUssdK2y7brIL0g\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 2730,
		"path": "../public/assets/main-header-Co2JGx6B.js"
	},
	"/assets/number-BFLtH8lN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e1-Rq342K2C5dMrMktp1hI3DUmDYvk\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 1249,
		"path": "../public/assets/number-BFLtH8lN.js"
	},
	"/assets/optimistic-update-DsNr0pce.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"507-i+kcnVQMP91dp8Ghc3DWNg1Lod0\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 1287,
		"path": "../public/assets/optimistic-update-DsNr0pce.js"
	},
	"/assets/progress-DMOH2_G7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7f-gRI+h29x6pYC7nGEmfBPoFuoItE\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 2687,
		"path": "../public/assets/progress-DMOH2_G7.js"
	},
	"/assets/project-card-BhDV2tVV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b03-HyaMa2OmuzgJKqWajrF2F8sMs+c\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 2819,
		"path": "../public/assets/project-card-BhDV2tVV.js"
	},
	"/assets/projects-DUpepLvf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29d-+r5o+Dw1CMi1+IxrYXeFA5Iy9Oc\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 669,
		"path": "../public/assets/projects-DUpepLvf.js"
	},
	"/assets/projects-l9VhPetj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa42-C5SPPXxK7deoiHvlI2/XjhIoUNc\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 64066,
		"path": "../public/assets/projects-l9VhPetj.js"
	},
	"/assets/resume-BZa8XHuE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2615-tu+tQf/2MsG1ScFWt/MBT1+xfmE\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 9749,
		"path": "../public/assets/resume-BZa8XHuE.js"
	},
	"/assets/resume-DeSsHP49.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"737-4yOcW1DkW/qMXDgPD9dnvQKHEpo\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 1847,
		"path": "../public/assets/resume-DeSsHP49.js"
	},
	"/assets/route-DJASaFrr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-XhVjrOSGQl3E4EQhGXsMSOzMDZg\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 117,
		"path": "../public/assets/route-DJASaFrr.js"
	},
	"/assets/route-Dugu3QSs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ad1-Dkhl+rZOGu28024s17pz9dsg52k\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 27345,
		"path": "../public/assets/route-Dugu3QSs.js"
	},
	"/assets/routes-CLHM8Huk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279b-UaWV0J88748GSRmDRbHTiQ3Qk2M\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 10139,
		"path": "../public/assets/routes-CLHM8Huk.js"
	},
	"/assets/scroll-area-BK2FX_1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3684-GjyaqgMxudUI59EmhGWmMJFtx54\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 13956,
		"path": "../public/assets/scroll-area-BK2FX_1K.js"
	},
	"/assets/scrollEdges-BaRfiOdk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-eNsCvg/dgzJn3Bwtwx6twtBna6o\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 624,
		"path": "../public/assets/scrollEdges-BaRfiOdk.js"
	},
	"/assets/select-CizydUdH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74cb-kiT3eEHsd7Qyu9UOSJtya2z7yTA\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 29899,
		"path": "../public/assets/select-CizydUdH.js"
	},
	"/assets/seo-DZm_pjxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bf-rIUzM+D5eVPJ78kGRfFn+OiSMto\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 4287,
		"path": "../public/assets/seo-DZm_pjxY.js"
	},
	"/assets/separator-CcHNh8lg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-jwJYjdKkaIcAyHuAp4k+wlMscgw\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 366,
		"path": "../public/assets/separator-CcHNh8lg.js"
	},
	"/assets/shadowDom-mH374qF_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53d-PELiuzIYc/9ByzFq2NZ7YcrMKag\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 1341,
		"path": "../public/assets/shadowDom-mH374qF_.js"
	},
	"/assets/sheet-C-ouM-bJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c4f-Fnjz6VY4X4Yw3uVbgOIvlrndIyc\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 11343,
		"path": "../public/assets/sheet-C-ouM-bJ.js"
	},
	"/assets/social-link.schema-CLH0x836.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"133-C0ZLluO8GcUUolM4SH5l7URgBc0\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 307,
		"path": "../public/assets/social-link.schema-CLH0x836.js"
	},
	"/assets/social-links-C2J5oENf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fca-7Mh6ZCAfEOxTe4CY441V/P0saTo\"",
		"mtime": "2026-05-18T11:10:08.503Z",
		"size": 4042,
		"path": "../public/assets/social-links-C2J5oENf.js"
	},
	"/assets/sortable.esm-CzmlZorz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af16-DkFMdr6jWxP0YRnnrxOLm3IV3UA\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 44822,
		"path": "../public/assets/sortable.esm-CzmlZorz.js"
	},
	"/assets/switch-CfBbHLsF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aa6-oOJBZFoX8o8sMXfb+dtkf8+m9UU\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 6822,
		"path": "../public/assets/switch-CfBbHLsF.js"
	},
	"/assets/tabs-Bf6dD-f2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25db-tDMVVcZFjqMMq73n03QkqddW+Ec\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 9691,
		"path": "../public/assets/tabs-Bf6dD-f2.js"
	},
	"/assets/tech-stack-D-EvW-IT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1173-GhY1IuSbEKWP+T3t02TVRrgXVKE\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 4467,
		"path": "../public/assets/tech-stack-D-EvW-IT.js"
	},
	"/assets/textarea-BSwFR51w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a9-nQ/HlU8ZvRnz28SQiAgjtJ7frVo\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 681,
		"path": "../public/assets/textarea-BSwFR51w.js"
	},
	"/assets/toggle-group-D0AhgHFe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1484-N4tXYqan9FibQl8Wtm/rv7bVDSs\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 5252,
		"path": "../public/assets/toggle-group-D0AhgHFe.js"
	},
	"/assets/use-debounced-FK-UiW8H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d74-w6Hbeih2kuXTLxU4TSq/HKxavNg\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 3444,
		"path": "../public/assets/use-debounced-FK-UiW8H.js"
	},
	"/assets/useCompositeItem-BWcDDpD7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20b-/OrD87W6fUu2MBxn+Gl8SlmG2OM\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 523,
		"path": "../public/assets/useCompositeItem-BWcDDpD7.js"
	},
	"/assets/useForm-BlrF3JUs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab74-GE511Ej7JaJSBttN80n5PUKJ/3w\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 43892,
		"path": "../public/assets/useForm-BlrF3JUs.js"
	},
	"/assets/useMutation-DFIJs2yC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ad-WCyGxNaZc6bF7/hcUxGSIj5og/Y\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 2221,
		"path": "../public/assets/useMutation-DFIJs2yC.js"
	},
	"/assets/useOnMount-D2r4F0oK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-MN6gxEbqfF6Fcm41myhT4uFVZYw\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 113,
		"path": "../public/assets/useOnMount-D2r4F0oK.js"
	},
	"/assets/useOpenInteractionType-iar9NhQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f224-lEboLHAKmYrMkNtDx7b4XUM6gwg\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 61988,
		"path": "../public/assets/useOpenInteractionType-iar9NhQk.js"
	},
	"/assets/useRender-vv1UAhYb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67-xI3payMgWsLL3LISRCP9xPdT0I8\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 103,
		"path": "../public/assets/useRender-vv1UAhYb.js"
	},
	"/assets/useSuspenseQuery-DRGXWxPz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22a1-7xyKcg19QIgsokK+rALrxSzrZto\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 8865,
		"path": "../public/assets/useSuspenseQuery-DRGXWxPz.js"
	},
	"/assets/useTimeout-C2EGtMON.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c9-ZJ7EPTSaDOEJT7rUBTrDx0EGrTU\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 457,
		"path": "../public/assets/useTimeout-C2EGtMON.js"
	},
	"/assets/useTriggerFocusGuards-C1T-8wTw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3de6-xDmL6qtr1/HrEhH1/ZfHOdbmiGY\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 15846,
		"path": "../public/assets/useTriggerFocusGuards-C1T-8wTw.js"
	},
	"/assets/useValueChanged-Dl8DH6TK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129-o/Pip/U7FMPsNDnmjp0FQj+hiVU\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 297,
		"path": "../public/assets/useValueChanged-Dl8DH6TK.js"
	},
	"/assets/visuallyHidden-Bxjqrbsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-ViTQidc7/iTH6jl4iyQKSTp2O2s\"",
		"mtime": "2026-05-18T11:10:08.504Z",
		"size": 403,
		"path": "../public/assets/visuallyHidden-Bxjqrbsr.js"
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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/static.mjs
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
var _lazy_BHrqLf = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_BHrqLf
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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/app.mjs
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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
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
//#region ../../node_modules/.pnpm/nitro@3.0.260429-beta_dotenv@17.4.2_jiti@2.7.0_lru-cache@11.3.6_uploadthing@7.7.4_expre_b2d37f89900f786efeb9d8774dcc5653/node_modules/nitro/dist/presets/node/runtime/node-server.mjs
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
