import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react } from "./@base-ui/react+[...].mjs";
//#region ../../node_modules/.pnpm/@tabler+icons-react@3.44.0_react@19.2.6/node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	outline: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	},
	filled: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		stroke: "none"
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@tabler+icons-react@3.44.0_react@19.2.6/node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes[type],
		width: size,
		height: size,
		className: [
			`tabler-icon`,
			`tabler-icon-${iconName}`,
			className
		].join(" "),
		...type === "filled" ? { fill: color } : {
			strokeWidth: stroke,
			stroke: color
		},
		...rest
	}, [
		title && (0, import_react.createElement)("title", { key: "svg-title" }, title),
		...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
		...Array.isArray(children) ? children : [children]
	]));
	Component.displayName = `${iconNamePascal}`;
	return Component;
};
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconAlertOctagon = createReactComponent("outline", "alert-octagon", "AlertOctagon", [
	["path", {
		"d": "M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M12 8v4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 16h.01",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconAlertTriangle = createReactComponent("outline", "alert-triangle", "AlertTriangle", [
	["path", {
		"d": "M12 9v4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 16h.01",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconAlignLeft = createReactComponent("outline", "align-left", "AlignLeft", [
	["path", {
		"d": "M4 6l16 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 12l10 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M4 18l14 0",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowBackUp = createReactComponent("outline", "arrow-back-up", "ArrowBackUp", [["path", {
	"d": "M9 14l-4 -4l4 -4",
	"key": "svg-0"
}], ["path", {
	"d": "M5 10h11a4 4 0 1 1 0 8h-1",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowDown = createReactComponent("outline", "arrow-down", "ArrowDown", [
	["path", {
		"d": "M12 5l0 14",
		"key": "svg-0"
	}],
	["path", {
		"d": "M18 13l-6 6",
		"key": "svg-1"
	}],
	["path", {
		"d": "M6 13l6 6",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowForwardUp = createReactComponent("outline", "arrow-forward-up", "ArrowForwardUp", [["path", {
	"d": "M15 14l4 -4l-4 -4",
	"key": "svg-0"
}], ["path", {
	"d": "M19 10h-11a4 4 0 1 0 0 8h1",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowLeft = createReactComponent("outline", "arrow-left", "ArrowLeft", [
	["path", {
		"d": "M5 12l14 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M5 12l6 6",
		"key": "svg-1"
	}],
	["path", {
		"d": "M5 12l6 -6",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowRight = createReactComponent("outline", "arrow-right", "ArrowRight", [
	["path", {
		"d": "M5 12l14 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M13 18l6 -6",
		"key": "svg-1"
	}],
	["path", {
		"d": "M13 6l6 6",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowUpRight = createReactComponent("outline", "arrow-up-right", "ArrowUpRight", [["path", {
	"d": "M17 7l-10 10",
	"key": "svg-0"
}], ["path", {
	"d": "M8 7l9 0l0 9",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconArrowUp = createReactComponent("outline", "arrow-up", "ArrowUp", [
	["path", {
		"d": "M12 5l0 14",
		"key": "svg-0"
	}],
	["path", {
		"d": "M18 11l-6 -6",
		"key": "svg-1"
	}],
	["path", {
		"d": "M6 11l6 -6",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconAt = createReactComponent("outline", "at", "At", [["path", {
	"d": "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
	"key": "svg-0"
}], ["path", {
	"d": "M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconAward = createReactComponent("outline", "award", "Award", [
	["path", {
		"d": "M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889",
		"key": "svg-1"
	}],
	["path", {
		"d": "M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBold = createReactComponent("outline", "bold", "Bold", [["path", {
	"d": "M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7",
	"key": "svg-0"
}], ["path", {
	"d": "M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandAppstore = createReactComponent("outline", "brand-appstore", "BrandAppstore", [
	["path", {
		"d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488",
		"key": "svg-1"
	}],
	["path", {
		"d": "M7 14h5m2.9 0h2.1",
		"key": "svg-2"
	}],
	["path", {
		"d": "M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandDiscord = createReactComponent("outline", "brand-discord", "BrandDiscord", [
	["path", {
		"d": "M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3",
		"key": "svg-2"
	}],
	["path", {
		"d": "M7 16.5c3.5 1 6.5 1 10 0",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandFacebook = createReactComponent("outline", "brand-facebook", "BrandFacebook", [["path", {
	"d": "M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandGithub = createReactComponent("outline", "brand-github", "BrandGithub", [["path", {
	"d": "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandGooglePlay = createReactComponent("outline", "brand-google-play", "BrandGooglePlay", [
	["path", {
		"d": "M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607l0 -.001",
		"key": "svg-0"
	}],
	["path", {
		"d": "M15 9l-10.5 11.5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M4.5 3.5l10.5 11.5",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandInstagram = createReactComponent("outline", "brand-instagram", "BrandInstagram", [
	["path", {
		"d": "M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8",
		"key": "svg-0"
	}],
	["path", {
		"d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M16.5 7.5v.01",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandLinkedin = createReactComponent("outline", "brand-linkedin", "BrandLinkedin", [
	["path", {
		"d": "M8 11v5",
		"key": "svg-0"
	}],
	["path", {
		"d": "M8 8v.01",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 16v-5",
		"key": "svg-2"
	}],
	["path", {
		"d": "M16 16v-3a2 2 0 1 0 -4 0",
		"key": "svg-3"
	}],
	["path", {
		"d": "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
		"key": "svg-4"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandTelegram = createReactComponent("outline", "brand-telegram", "BrandTelegram", [["path", {
	"d": "M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandTiktok = createReactComponent("outline", "brand-tiktok", "BrandTiktok", [["path", {
	"d": "M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandWhatsapp = createReactComponent("outline", "brand-whatsapp", "BrandWhatsapp", [["path", {
	"d": "M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9",
	"key": "svg-0"
}], ["path", {
	"d": "M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandX = createReactComponent("outline", "brand-x", "BrandX", [["path", {
	"d": "M4 4l11.733 16h4.267l-11.733 -16l-4.267 0",
	"key": "svg-0"
}], ["path", {
	"d": "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBrandYoutube = createReactComponent("outline", "brand-youtube", "BrandYoutube", [["path", {
	"d": "M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8",
	"key": "svg-0"
}], ["path", {
	"d": "M10 9l5 3l-5 3l0 -6",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconBriefcase = createReactComponent("outline", "briefcase", "Briefcase", [
	["path", {
		"d": "M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9",
		"key": "svg-0"
	}],
	["path", {
		"d": "M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 12l0 .01",
		"key": "svg-2"
	}],
	["path", {
		"d": "M3 13a20 20 0 0 0 18 0",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCalendar = createReactComponent("outline", "calendar", "Calendar", [
	["path", {
		"d": "M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12",
		"key": "svg-0"
	}],
	["path", {
		"d": "M16 3v4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M8 3v4",
		"key": "svg-2"
	}],
	["path", {
		"d": "M4 11h16",
		"key": "svg-3"
	}],
	["path", {
		"d": "M11 15h1",
		"key": "svg-4"
	}],
	["path", {
		"d": "M12 15v3",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCertificate = createReactComponent("outline", "certificate", "Certificate", [
	["path", {
		"d": "M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M13 17.5v4.5l2 -1.5l2 1.5v-4.5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73",
		"key": "svg-2"
	}],
	["path", {
		"d": "M6 9l12 0",
		"key": "svg-3"
	}],
	["path", {
		"d": "M6 12l3 0",
		"key": "svg-4"
	}],
	["path", {
		"d": "M6 15l2 0",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCheck = createReactComponent("outline", "check", "Check", [["path", {
	"d": "M5 12l5 5l10 -10",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconChevronDown = createReactComponent("outline", "chevron-down", "ChevronDown", [["path", {
	"d": "M6 9l6 6l6 -6",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconChevronLeft = createReactComponent("outline", "chevron-left", "ChevronLeft", [["path", {
	"d": "M15 6l-6 6l6 6",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconChevronRight = createReactComponent("outline", "chevron-right", "ChevronRight", [["path", {
	"d": "M9 6l6 6l-6 6",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconChevronUp = createReactComponent("outline", "chevron-up", "ChevronUp", [["path", {
	"d": "M6 15l6 -6l6 6",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCircleCheck = createReactComponent("outline", "circle-check", "CircleCheck", [["path", {
	"d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
	"key": "svg-0"
}], ["path", {
	"d": "M9 12l2 2l4 -4",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconClearFormatting = createReactComponent("outline", "clear-formatting", "ClearFormatting", [
	["path", {
		"d": "M17 15l4 4m0 -4l-4 4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M7 6v-1h11v1",
		"key": "svg-1"
	}],
	["path", {
		"d": "M7 19l4 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M13 5l-4 14",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCloudUpload = createReactComponent("outline", "cloud-upload", "CloudUpload", [
	["path", {
		"d": "M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1",
		"key": "svg-0"
	}],
	["path", {
		"d": "M9 15l3 -3l3 3",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 12l0 9",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconCode = createReactComponent("outline", "code", "Code", [
	["path", {
		"d": "M7 8l-4 4l4 4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M17 8l4 4l-4 4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M14 4l-4 16",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconDeviceDesktop = createReactComponent("outline", "device-desktop", "DeviceDesktop", [
	["path", {
		"d": "M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10",
		"key": "svg-0"
	}],
	["path", {
		"d": "M7 20h10",
		"key": "svg-1"
	}],
	["path", {
		"d": "M9 16v4",
		"key": "svg-2"
	}],
	["path", {
		"d": "M15 16v4",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconDevices = createReactComponent("outline", "devices", "Devices", [
	["path", {
		"d": "M13 9a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-10",
		"key": "svg-0"
	}],
	["path", {
		"d": "M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9",
		"key": "svg-1"
	}],
	["path", {
		"d": "M16 9h2",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconDownload = createReactComponent("outline", "download", "Download", [
	["path", {
		"d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M7 11l5 5l5 -5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 4l0 12",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconExternalLink = createReactComponent("outline", "external-link", "ExternalLink", [
	["path", {
		"d": "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",
		"key": "svg-0"
	}],
	["path", {
		"d": "M11 13l9 -9",
		"key": "svg-1"
	}],
	["path", {
		"d": "M15 4h5v5",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconEyeOff = createReactComponent("outline", "eye-off", "EyeOff", [
	["path", {
		"d": "M10.585 10.587a2 2 0 0 0 2.829 2.828",
		"key": "svg-0"
	}],
	["path", {
		"d": "M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87",
		"key": "svg-1"
	}],
	["path", {
		"d": "M3 3l18 18",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconEye = createReactComponent("outline", "eye", "Eye", [["path", {
	"d": "M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",
	"key": "svg-0"
}], ["path", {
	"d": "M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconFileCv = createReactComponent("outline", "file-cv", "FileCv", [
	["path", {
		"d": "M14 3v4a1 1 0 0 0 1 1h4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M13 11l1.5 6l1.5 -6",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconFileText = createReactComponent("outline", "file-text", "FileText", [
	["path", {
		"d": "M14 3v4a1 1 0 0 0 1 1h4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M9 9l1 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M9 13l6 0",
		"key": "svg-3"
	}],
	["path", {
		"d": "M9 17l6 0",
		"key": "svg-4"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconFolder = createReactComponent("outline", "folder", "Folder", [["path", {
	"d": "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconGripVertical = createReactComponent("outline", "grip-vertical", "GripVertical", [
	["path", {
		"d": "M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M8 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M8 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M14 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-3"
	}],
	["path", {
		"d": "M14 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-4"
	}],
	["path", {
		"d": "M14 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconH1 = createReactComponent("outline", "h-1", "H1", [
	["path", {
		"d": "M19 18v-8l-2 2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 6v12",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 6v12",
		"key": "svg-2"
	}],
	["path", {
		"d": "M11 18h2",
		"key": "svg-3"
	}],
	["path", {
		"d": "M3 18h2",
		"key": "svg-4"
	}],
	["path", {
		"d": "M4 12h8",
		"key": "svg-5"
	}],
	["path", {
		"d": "M3 6h2",
		"key": "svg-6"
	}],
	["path", {
		"d": "M11 6h2",
		"key": "svg-7"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconH2 = createReactComponent("outline", "h-2", "H2", [
	["path", {
		"d": "M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 6v12",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 6v12",
		"key": "svg-2"
	}],
	["path", {
		"d": "M11 18h2",
		"key": "svg-3"
	}],
	["path", {
		"d": "M3 18h2",
		"key": "svg-4"
	}],
	["path", {
		"d": "M4 12h8",
		"key": "svg-5"
	}],
	["path", {
		"d": "M3 6h2",
		"key": "svg-6"
	}],
	["path", {
		"d": "M11 6h2",
		"key": "svg-7"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconH3 = createReactComponent("outline", "h-3", "H3", [
	["path", {
		"d": "M19 14a2 2 0 1 0 -2 -2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M17 16a2 2 0 1 0 2 -2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M4 6v12",
		"key": "svg-2"
	}],
	["path", {
		"d": "M12 6v12",
		"key": "svg-3"
	}],
	["path", {
		"d": "M11 18h2",
		"key": "svg-4"
	}],
	["path", {
		"d": "M3 18h2",
		"key": "svg-5"
	}],
	["path", {
		"d": "M4 12h8",
		"key": "svg-6"
	}],
	["path", {
		"d": "M3 6h2",
		"key": "svg-7"
	}],
	["path", {
		"d": "M11 6h2",
		"key": "svg-8"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconHistory = createReactComponent("outline", "history", "History", [["path", {
	"d": "M12 8l0 4l2 2",
	"key": "svg-0"
}], ["path", {
	"d": "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconHome = createReactComponent("outline", "home", "Home", [
	["path", {
		"d": "M5 12l-2 0l9 -9l9 9l-2 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",
		"key": "svg-1"
	}],
	["path", {
		"d": "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconInfoCircle = createReactComponent("outline", "info-circle", "InfoCircle", [
	["path", {
		"d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M12 9h.01",
		"key": "svg-1"
	}],
	["path", {
		"d": "M11 12h1v4h1",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconItalic = createReactComponent("outline", "italic", "Italic", [
	["path", {
		"d": "M11 5l6 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M7 19l6 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M14 5l-4 14",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLanguage = createReactComponent("outline", "language", "Language", [
	["path", {
		"d": "M9 6.371c0 4.418 -2.239 6.629 -5 6.629",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 6.371h7",
		"key": "svg-1"
	}],
	["path", {
		"d": "M5 9c0 2.144 2.252 3.908 6 4",
		"key": "svg-2"
	}],
	["path", {
		"d": "M12 20l4 -9l4 9",
		"key": "svg-3"
	}],
	["path", {
		"d": "M19.1 18h-6.2",
		"key": "svg-4"
	}],
	["path", {
		"d": "M6.694 3l.793 .582",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLayoutSidebar = createReactComponent("outline", "layout-sidebar", "LayoutSidebar", [["path", {
	"d": "M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12",
	"key": "svg-0"
}], ["path", {
	"d": "M9 4l0 16",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLineDashed = createReactComponent("outline", "line-dashed", "LineDashed", [
	["path", {
		"d": "M5 12h2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M17 12h2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M11 12h2",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLink = createReactComponent("outline", "link", "Link", [
	["path", {
		"d": "M9 15l6 -6",
		"key": "svg-0"
	}],
	["path", {
		"d": "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
		"key": "svg-1"
	}],
	["path", {
		"d": "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconListCheck = createReactComponent("outline", "list-check", "ListCheck", [
	["path", {
		"d": "M3.5 5.5l1.5 1.5l2.5 -2.5",
		"key": "svg-0"
	}],
	["path", {
		"d": "M3.5 11.5l1.5 1.5l2.5 -2.5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M3.5 17.5l1.5 1.5l2.5 -2.5",
		"key": "svg-2"
	}],
	["path", {
		"d": "M11 6l9 0",
		"key": "svg-3"
	}],
	["path", {
		"d": "M11 12l9 0",
		"key": "svg-4"
	}],
	["path", {
		"d": "M11 18l9 0",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconListNumbers = createReactComponent("outline", "list-numbers", "ListNumbers", [
	["path", {
		"d": "M11 6h9",
		"key": "svg-0"
	}],
	["path", {
		"d": "M11 12h9",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 18h8",
		"key": "svg-2"
	}],
	["path", {
		"d": "M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4",
		"key": "svg-3"
	}],
	["path", {
		"d": "M6 10v-6l-2 2",
		"key": "svg-4"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconList = createReactComponent("outline", "list", "List", [
	["path", {
		"d": "M9 6l11 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M9 12l11 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M9 18l11 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M5 6l0 .01",
		"key": "svg-3"
	}],
	["path", {
		"d": "M5 12l0 .01",
		"key": "svg-4"
	}],
	["path", {
		"d": "M5 18l0 .01",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLoader = createReactComponent("outline", "loader", "Loader", [
	["path", {
		"d": "M12 6l0 -3",
		"key": "svg-0"
	}],
	["path", {
		"d": "M16.25 7.75l2.15 -2.15",
		"key": "svg-1"
	}],
	["path", {
		"d": "M18 12l3 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M16.25 16.25l2.15 2.15",
		"key": "svg-3"
	}],
	["path", {
		"d": "M12 18l0 3",
		"key": "svg-4"
	}],
	["path", {
		"d": "M7.75 16.25l-2.15 2.15",
		"key": "svg-5"
	}],
	["path", {
		"d": "M6 12l-3 0",
		"key": "svg-6"
	}],
	["path", {
		"d": "M7.75 7.75l-2.15 -2.15",
		"key": "svg-7"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconLogout = createReactComponent("outline", "logout", "Logout", [
	["path", {
		"d": "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M9 12h12l-3 -3",
		"key": "svg-1"
	}],
	["path", {
		"d": "M18 15l3 -3",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconMail = createReactComponent("outline", "mail", "Mail", [["path", {
	"d": "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10",
	"key": "svg-0"
}], ["path", {
	"d": "M3 7l9 6l9 -6",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconMenu2 = createReactComponent("outline", "menu-2", "Menu2", [
	["path", {
		"d": "M4 6l16 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 12l16 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M4 18l16 0",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconMoodPuzzled = createReactComponent("outline", "mood-puzzled", "MoodPuzzled", [
	["path", {
		"d": "M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794",
		"key": "svg-0"
	}],
	["path", {
		"d": "M10 10h.01",
		"key": "svg-1"
	}],
	["path", {
		"d": "M14 8h.01",
		"key": "svg-2"
	}],
	["path", {
		"d": "M12 15c1 -1.333 2 -2 3 -2",
		"key": "svg-3"
	}],
	["path", {
		"d": "M20 9v.01",
		"key": "svg-4"
	}],
	["path", {
		"d": "M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconMoon = createReactComponent("outline", "moon", "Moon", [["path", {
	"d": "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconPencil = createReactComponent("outline", "pencil", "Pencil", [["path", {
	"d": "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
	"key": "svg-0"
}], ["path", {
	"d": "M13.5 6.5l4 4",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconPhoto = createReactComponent("outline", "photo", "Photo", [
	["path", {
		"d": "M15 8h.01",
		"key": "svg-0"
	}],
	["path", {
		"d": "M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12",
		"key": "svg-1"
	}],
	["path", {
		"d": "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5",
		"key": "svg-2"
	}],
	["path", {
		"d": "M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3",
		"key": "svg-3"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconPin = createReactComponent("outline", "pin", "Pin", [
	["path", {
		"d": "M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M9 15l-4.5 4.5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M14.5 4l5.5 5.5",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconPlus = createReactComponent("outline", "plus", "Plus", [["path", {
	"d": "M12 5l0 14",
	"key": "svg-0"
}], ["path", {
	"d": "M5 12l14 0",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconQuote = createReactComponent("outline", "quote", "Quote", [["path", {
	"d": "M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5",
	"key": "svg-0"
}], ["path", {
	"d": "M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconRefresh = createReactComponent("outline", "refresh", "Refresh", [["path", {
	"d": "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",
	"key": "svg-0"
}], ["path", {
	"d": "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSchool = createReactComponent("outline", "school", "School", [["path", {
	"d": "M22 9l-10 -4l-10 4l10 4l10 -4v6",
	"key": "svg-0"
}], ["path", {
	"d": "M6 10.6v5.4a6 3 0 0 0 12 0v-5.4",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSearch = createReactComponent("outline", "search", "Search", [["path", {
	"d": "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
	"key": "svg-0"
}], ["path", {
	"d": "M21 21l-6 -6",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSelector = createReactComponent("outline", "selector", "Selector", [["path", {
	"d": "M8 9l4 -4l4 4",
	"key": "svg-0"
}], ["path", {
	"d": "M16 15l-4 4l-4 -4",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSettings = createReactComponent("outline", "settings", "Settings", [["path", {
	"d": "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065",
	"key": "svg-0"
}], ["path", {
	"d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSourceCode = createReactComponent("outline", "source-code", "SourceCode", [
	["path", {
		"d": "M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5",
		"key": "svg-0"
	}],
	["path", {
		"d": "M6 5l-2 2l2 2",
		"key": "svg-1"
	}],
	["path", {
		"d": "M10 9l2 -2l-2 -2",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSparkles = createReactComponent("outline", "sparkles", "Sparkles", [["path", {
	"d": "M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconStack2 = createReactComponent("outline", "stack-2", "Stack2", [
	["path", {
		"d": "M12 4l-8 4l8 4l8 -4l-8 -4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M4 12l8 4l8 -4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M4 16l8 4l8 -4",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconStar = createReactComponent("outline", "star", "Star", [["path", {
	"d": "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconStrikethrough = createReactComponent("outline", "strikethrough", "Strikethrough", [["path", {
	"d": "M5 12l14 0",
	"key": "svg-0"
}], ["path", {
	"d": "M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSun = createReactComponent("outline", "sun", "Sun", [["path", {
	"d": "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
	"key": "svg-0"
}], ["path", {
	"d": "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconSunset = createReactComponent("outline", "sunset", "Sunset", [
	["path", {
		"d": "M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M3 21l18 0",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 3v6l3 -3m-6 0l3 3",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconTrash = createReactComponent("outline", "trash", "Trash", [
	["path", {
		"d": "M4 7l16 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M10 11l0 6",
		"key": "svg-1"
	}],
	["path", {
		"d": "M14 11l0 6",
		"key": "svg-2"
	}],
	["path", {
		"d": "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
		"key": "svg-3"
	}],
	["path", {
		"d": "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",
		"key": "svg-4"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconTrophy = createReactComponent("outline", "trophy", "Trophy", [
	["path", {
		"d": "M8 21l8 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M12 17l0 4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M7 4l10 0",
		"key": "svg-2"
	}],
	["path", {
		"d": "M17 4v8a5 5 0 0 1 -10 0v-8",
		"key": "svg-3"
	}],
	["path", {
		"d": "M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
		"key": "svg-4"
	}],
	["path", {
		"d": "M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
		"key": "svg-5"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconUpload = createReactComponent("outline", "upload", "Upload", [
	["path", {
		"d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",
		"key": "svg-0"
	}],
	["path", {
		"d": "M7 9l5 -5l5 5",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12 4l0 12",
		"key": "svg-2"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconUser = createReactComponent("outline", "user", "User", [["path", {
	"d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",
	"key": "svg-0"
}], ["path", {
	"d": "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconWorldWww = createReactComponent("outline", "world-www", "WorldWww", [
	["path", {
		"d": "M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4",
		"key": "svg-0"
	}],
	["path", {
		"d": "M11.5 3a16.989 16.989 0 0 0 -1.826 4",
		"key": "svg-1"
	}],
	["path", {
		"d": "M12.5 3a16.989 16.989 0 0 1 1.828 4",
		"key": "svg-2"
	}],
	["path", {
		"d": "M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4",
		"key": "svg-3"
	}],
	["path", {
		"d": "M11.5 21a16.989 16.989 0 0 1 -1.826 -4",
		"key": "svg-4"
	}],
	["path", {
		"d": "M12.5 21a16.989 16.989 0 0 0 1.828 -4",
		"key": "svg-5"
	}],
	["path", {
		"d": "M2 10l1 4l1.5 -4l1.5 4l1 -4",
		"key": "svg-6"
	}],
	["path", {
		"d": "M17 10l1 4l1.5 -4l1.5 4l1 -4",
		"key": "svg-7"
	}],
	["path", {
		"d": "M9.5 10l1 4l1.5 -4l1.5 4l1 -4",
		"key": "svg-8"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconWorld = createReactComponent("outline", "world", "World", [
	["path", {
		"d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
		"key": "svg-0"
	}],
	["path", {
		"d": "M3.6 9h16.8",
		"key": "svg-1"
	}],
	["path", {
		"d": "M3.6 15h16.8",
		"key": "svg-2"
	}],
	["path", {
		"d": "M11.5 3a17 17 0 0 0 0 18",
		"key": "svg-3"
	}],
	["path", {
		"d": "M12.5 3a17 17 0 0 1 0 18",
		"key": "svg-4"
	}]
]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconX = createReactComponent("outline", "x", "X", [["path", {
	"d": "M18 6l-12 12",
	"key": "svg-0"
}], ["path", {
	"d": "M6 6l12 12",
	"key": "svg-1"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconPointFilled = createReactComponent("filled", "point-filled", "PointFilled", [["path", {
	"d": "M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z",
	"key": "svg-0"
}]]);
/**
* @license @tabler/icons-react v3.44.0 - MIT
*
* This source code is licensed under the MIT license.
* See the LICENSE file in the root directory of this source tree.
*/
var IconStarFilled = createReactComponent("filled", "star-filled", "StarFilled", [["path", {
	"d": "M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z",
	"key": "svg-0"
}]]);
//#endregion
export { IconExternalLink as $, IconMail as A, IconArrowUp as At, IconItalic as B, IconPlus as C, IconBrandGithub as Ct, IconMoon as D, IconBold as Dt, IconPencil as E, IconBrandAppstore as Et, IconListCheck as F, IconArrowDown as Ft, IconH2 as G, IconHome as H, IconLink as I, IconArrowBackUp as It, IconFolder as J, IconH1 as K, IconLineDashed as L, IconAlignLeft as Lt, IconLoader as M, IconArrowRight as Mt, IconList as N, IconArrowLeft as Nt, IconMoodPuzzled as O, IconAward as Ot, IconListNumbers as P, IconArrowForwardUp as Pt, IconEyeOff as Q, IconLayoutSidebar as R, IconAlertTriangle as Rt, IconQuote as S, IconBrandGooglePlay as St, IconPhoto as T, IconBrandDiscord as Tt, IconHistory as U, IconInfoCircle as V, IconH3 as W, IconFileCv as X, IconFileText as Y, IconEye as Z, IconSettings as _, IconBrandWhatsapp as _t, IconWorldWww as a, IconClearFormatting as at, IconSchool as b, IconBrandLinkedin as bt, IconTrophy as c, IconChevronRight as ct, IconSun as d, IconCheck as dt, IconDownload as et, IconStrikethrough as f, IconCertificate as ft, IconSourceCode as g, IconBrandX as gt, IconSparkles as h, IconBrandYoutube as ht, IconWorld as i, IconCloudUpload as it, IconLogout as j, IconArrowUpRight as jt, IconMenu2 as k, IconAt as kt, IconTrash as l, IconChevronLeft as lt, IconStack2 as m, IconBriefcase as mt, IconPointFilled as n, IconDeviceDesktop as nt, IconUser as o, IconCircleCheck as ot, IconStar as p, IconCalendar as pt, IconGripVertical as q, IconX as r, IconCode as rt, IconUpload as s, IconChevronUp as st, IconStarFilled as t, IconDevices as tt, IconSunset as u, IconChevronDown as ut, IconSelector as v, IconBrandTiktok as vt, IconPin as w, IconBrandFacebook as wt, IconRefresh as x, IconBrandInstagram as xt, IconSearch as y, IconBrandTelegram as yt, IconLanguage as z, IconAlertOctagon as zt };
