import { pt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { dt as IconCheck, k as IconMenu2, z as IconLanguage } from "../_libs/tabler__icons-react.mjs";
import { r as cn, t as Button$1 } from "./button-Byofh5wQ.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as LOCALE_SHORT_LABELS, r as LOCALE_LABELS, t as LOCALES } from "./src-wHgUA5Hr.mjs";
import { n as useLocale, r as useTranslations } from "./locale-context-zlvGKbH0.mjs";
import { a as SheetFooter, c as SheetTrigger, n as SheetClose, o as SheetHeader, r as SheetContent, s as SheetTitle, t as Sheet } from "./sheet-DucJBNhp.mjs";
import { c as ModeToggle, i as DropdownMenuItem, l as authClient, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./mode-toggle-Ce7BY8I2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/main-header-DCqjmhRG.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Switches the active locale by replacing only the `$locale` path param on the
* current route — staying on the same page (slug, search, and hash preserved).
*/
function LanguageSwitcher() {
	const navigate = useNavigate();
	const locale = useLocale();
	const { t } = useTranslations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "outline",
			size: "lg"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-subtle flex items-center gap-1.5 font-mono text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLanguage, { className: "size-4" }), LOCALE_SHORT_LABELS[locale]]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t.nav.language
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		children: LOCALES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: () => navigate({
				to: ".",
				params: (prev) => ({
					...prev,
					locale: l
				}),
				search: (prev) => prev
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, { className: l === locale ? "mr-2 size-4" : "mr-2 size-4 opacity-0" }), LOCALE_LABELS[l]]
		}, l))
	})] });
}
function CustomSkeleton({ ref, isLoading = false, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		"data-loading": isLoading ? "" : void 0,
		ref,
		className: cn(isLoading ? [
			"pointer-events-none",
			"[&>*>*>:not(:has(*))]:bg-secondary [&>*>*>:not(:has(*))]:animate-pulse [&>*>*>:not(:has(*))]:rounded-lg [&>*>*>:not(:has(*))]:[box-decoration-break:clone] [&>*>*>:not(:has(*))]:text-transparent [&>*>*>:not(:has(*))]:shadow-none [&>*>*>:not(:has(*))]:select-none [&>*>*>:not(:has(*))]:[-webkit-box-decoration-break:clone]",
			"**:data-[slot=avatar]:bg-secondary [&_img]:bg-secondary **:data-[slot=avatar]:animate-pulse **:data-[slot=avatar]:outline-none [&_[data-slot=avatar]_img]:bg-transparent [&_img]:animate-pulse [&_img]:border-0 [&_img]:text-transparent [&_img]:shadow-none [&_img]:[content-visibility:hidden]",
			"[&>*>*>*_:not(:has(*)):not(:empty)]:bg-secondary [&>*>*>*_:not(:has(*)):not(:empty)]:animate-pulse [&>*>*>*_:not(:has(*)):not(:empty)]:rounded-md [&>*>*>*_:not(:has(*)):not(:empty)]:text-transparent [&>*>*>*_:not(:has(*)):not(:empty)]:shadow-none [&>*>*>*_:not(:has(*)):not(:empty)]:select-none"
		] : "shrink-0", className),
		...props
	});
}
function LoginButton() {
	const { data, isPending } = authClient.useSession();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomSkeleton, {
		isLoading: isPending,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-full rounded md:w-16" }) : data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			onClick: () => navigate({ to: "/dashboard" }),
			variant: "outline",
			size: "lg",
			className: "text-subtle w-full",
			children: "Dashboard"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			onClick: () => navigate({ to: "/login" }),
			variant: "outline",
			size: "lg",
			className: "text-subtle w-full",
			children: "Login"
		}) }) })
	});
}
function MainHeader() {
	const navigate = useNavigate();
	const locale = useLocale();
	const { t } = useTranslations();
	const navigationItems = [
		{
			id: "about",
			label: t.nav.about
		},
		{
			id: "experience",
			label: t.nav.experience
		},
		{
			id: "projects",
			label: t.nav.projects
		},
		{
			id: "stack",
			label: t.nav.stack
		},
		{
			id: "certs",
			label: t.nav.certs
		},
		{
			id: "contact",
			label: t.nav.contact
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-border bg-nav sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				className: "text-subtle font-mono text-base",
				variant: "link",
				size: "lg",
				onClick: () => navigate({
					to: "/$locale",
					params: { locale }
				}),
				children: "rizrmdhn.com"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "hidden space-x-4 md:flex",
				children: navigationItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					className: "text-subtle text-sm",
					variant: "ghost",
					size: "lg",
					onClick: () => navigate({
						to: "/$locale",
						params: { locale },
						hash: item.id
					}),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, { type: "color" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						size: "lg",
						onClick: () => navigate({
							to: "/$locale/resume",
							params: { locale }
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-subtle font-mono text-sm",
							children: t.nav.resume
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginButton, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTrigger, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "md:hidden"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMenu2, { className: "text-subtle size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: t.nav.openMenu
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				id: "main-nav-mobile",
				side: "right",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
						className: "border-border border-b pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "text-subtle font-mono text-base",
							children: t.nav.menu
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 p-4",
						children: navigationItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								variant: "ghost",
								className: "text-subtle w-full justify-start text-sm",
								onClick: () => navigate({
									to: "/$locale",
									params: { locale },
									hash: item.id
								})
							}),
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, {
						className: "border-border flex flex-col gap-3 border-t px-4 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle font-mono text-xs",
									children: t.nav.theme
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, { type: "color" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle font-mono text-xs",
									children: t.nav.language
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								variant: "outline",
								size: "lg",
								className: "w-full",
								onClick: () => navigate({
									to: "/$locale/resume",
									params: { locale }
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-subtle font-mono text-sm",
									children: t.nav.resume
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginButton, {})
						]
					})
				]
			})] })
		]
	});
}
//#endregion
export { MainHeader as t };
