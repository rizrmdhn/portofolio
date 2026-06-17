import { i as __toESM } from "../_runtime.mjs";
import { t as zod_default } from "../_libs/zod.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Q as IconEyeOff, Z as IconEye } from "../_libs/tabler__icons-react.mjs";
import { t as Button$1 } from "./button-Byofh5wQ.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-jr2byFtO.mjs";
import { a as FieldLabel, i as FieldGroup, o as Spinner, r as FieldError, t as Field } from "./spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./input-S9SQN3Mi.mjs";
import { r as CardContent, t as Card } from "./card-DzVnM7at.mjs";
import { c as ModeToggle, l as authClient } from "./mode-toggle-Ce7BY8I2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BBdzZB_r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthHeader() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-14 flex items-center justify-between border-border border-b px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			className: "text-base font-mono text-subtle",
			variant: "link",
			size: "lg",
			onClick: () => navigate({ to: "/" }),
			children: "rizrmdhn.com"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, { id: "auth-theme-menu" })]
	});
}
var loginSchema = zod_default.object({
	email: zod_default.email(),
	password: zod_default.string().min(8)
});
zod_default.object({
	email: zod_default.email(),
	password: zod_default.string().min(8),
	name: zod_default.string().min(2)
});
function RouteComponent() {
	const navigate = useNavigate();
	const [type, setType] = (0, import_react.useState)("password");
	const form = useForm({
		validators: { onSubmit: loginSchema },
		defaultValues: {
			email: "",
			password: ""
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email({
				email: value.email,
				password: value.password
			}, {
				onSuccess: () => {
					navigate({ to: "/dashboard" });
					globalSuccessToast("Logged in successfully");
				},
				onError: (error) => {
					globalErrorToast(error.error.message || "Failed to log in");
				}
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col bg-background h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-6 w-full px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col items-center gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Welcome Back"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "w-full max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					},
					className: "grid gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
						className: "gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
								name: "email",
								children: (field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
										"data-invalid": isInvalid,
										className: "flex flex-col gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												htmlFor: field.name,
												children: "Email"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												id: field.name,
												name: field.name,
												value: field.state.value,
												onBlur: field.handleBlur,
												onChange: (e) => field.handleChange(e.target.value),
												"aria-invalid": isInvalid,
												placeholder: "Enter your email",
												autoComplete: "off"
											}),
											isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
										]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
								name: "password",
								children: (field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
										"data-invalid": isInvalid,
										className: "flex flex-col gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												htmlFor: field.name,
												children: "Password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
													id: field.name,
													name: field.name,
													value: field.state.value,
													onBlur: field.handleBlur,
													onChange: (e) => field.handleChange(e.target.value),
													"aria-invalid": isInvalid,
													placeholder: "Input your password",
													type
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
													type: "button",
													variant: "ghost",
													size: "sm",
													className: "absolute top-0 right-0 h-full px-3 py-2",
													onClick: () => {
														setType((prev) => prev === "password" ? "text" : "password");
													},
													"aria-label": type === "password" ? "Show password" : "Hide password",
													children: type === "password" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, { className: "h-4 w-4" })
												})]
											}),
											isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
										]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
								selector: (state) => state.isSubmitting,
								children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									type: "submit",
									disabled: isSubmitting,
									className: "w-full",
									children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null, "Sign In"]
								})
							})
						]
					})
				}) })
			})]
		})]
	});
}
//#endregion
export { RouteComponent as component };
