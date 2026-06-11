import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/toasts-8obnNYxS.js
var SONNER_DEFAULT_TOAST_DURATION = 1500;
var globalSuccessToast = (message) => {
	return toast.success("Success", {
		description: message,
		closeButton: true,
		duration: SONNER_DEFAULT_TOAST_DURATION
	});
};
var globalErrorToast = (message, title) => {
	return toast.error(title ?? "Error", {
		description: message,
		closeButton: true,
		duration: SONNER_DEFAULT_TOAST_DURATION
	});
};
//#endregion
export { globalSuccessToast as n, globalErrorToast as t };
