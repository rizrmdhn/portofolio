import { i as __toESM } from "../_runtime.mjs";
import { mt as require_react } from "./@base-ui/react+[...].mjs";
//#region ../../node_modules/.pnpm/@dnd-kit+accessibility@3.1.1_react@19.2.6/node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var hiddenStyles = { display: "none" };
function HiddenText(_ref) {
	let { id, value } = _ref;
	return import_react.createElement("div", {
		id,
		style: hiddenStyles
	}, value);
}
function LiveRegion(_ref) {
	let { id, announcement, ariaLiveType = "assertive" } = _ref;
	return import_react.createElement("div", {
		id,
		style: {
			position: "fixed",
			top: 0,
			left: 0,
			width: 1,
			height: 1,
			margin: -1,
			border: 0,
			padding: 0,
			overflow: "hidden",
			clip: "rect(0 0 0 0)",
			clipPath: "inset(100%)",
			whiteSpace: "nowrap"
		},
		role: "status",
		"aria-live": ariaLiveType,
		"aria-atomic": true
	}, announcement);
}
function useAnnouncement() {
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	return {
		announce: (0, import_react.useCallback)((value) => {
			if (value != null) setAnnouncement(value);
		}, []),
		announcement
	};
}
//#endregion
export { LiveRegion as n, useAnnouncement as r, HiddenText as t };
