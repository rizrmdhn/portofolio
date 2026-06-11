import { i as __toESM } from "../_runtime.mjs";
import { a as TooltipTrigger$1, f as useRender, ft as mergeProps, i as TooltipPortal, mt as require_react, n as TooltipPopup, o as TooltipRoot, pt as require_jsx_runtime, r as TooltipPositioner, t as TooltipArrow } from "../_libs/@base-ui/react+[...].mjs";
import { J as IconFileText, Ot as IconAt, R as IconLayoutSidebar, V as IconHome, b as IconSchool, c as IconTrophy, dt as IconCertificate, j as IconLogout, m as IconStack2, o as IconUser, pt as IconBriefcase, q as IconFolder, v as IconSelector, y as IconSearch } from "../_libs/tabler__icons-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { f as Link, i as useLocation, p as useNavigate, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./toasts-8obnNYxS.mjs";
import { t as Separator$1 } from "./separator-BJ-xJ2or.mjs";
import "./input-BEBqmpJz.mjs";
import { a as DropdownMenuLabel, c as ModeToggle, i as DropdownMenuItem, l as authClient, n as DropdownMenuContent, o as DropdownMenuSeparator, r as DropdownMenuGroup, s as DropdownMenuTrigger, t as DropdownMenu } from "./auth-client-BFwDP7Y1.mjs";
import { i as SheetDescription, o as SheetHeader, r as SheetContent, s as SheetTitle, t as Sheet } from "./sheet-D50o4ex7.mjs";
import "./skeleton-BVhepoHH.mjs";
import { n as AvatarFallback, t as Avatar$1 } from "./avatar-CScJCIPX.mjs";
import { t as Route } from "./route-CAYgh4qu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-m9jGr1vx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipRoot, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger$1, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipPopup, {
			"data-slot": "tooltip-content",
			className: cn("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipArrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
		})
	}) });
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			id: "mobile-sidebar",
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: cn(className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLayoutSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarInset({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className),
		...props
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col px-2 py-1", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-px", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-[calc(var(--radius-sm)+2px)] p-2 text-left text-xs ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-xs",
			sm: "h-7 text-xs",
			lg: "h-12 text-xs group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [comp, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function NavMain({ groups }) {
	const { isMobile, setOpenMobile } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, {
		className: "group-data-[collapsible=icon]:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: group.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.url,
				activeProps: { "data-active": true },
				activeOptions: { exact: item.exact ?? false },
				onClick: () => isMobile && setOpenMobile(false)
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name })]
		}) }, item.name)) })]
	}, group.title)) });
}
async function logout() {
	const { error } = await authClient.signOut();
	if (error) {
		globalErrorToast("Failed to log out. Please try again.");
		return;
	}
	globalSuccessToast("Logged out successfully");
	window.location.href = "/login";
}
function NavUser({ user }) {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();
	function onLogout() {
		logout();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
		size: "lg",
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {}),
		className: "data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
				className: "size-8 rounded-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					className: "rounded-lg",
					children: user.name.split(" ").map((part) => part[0]).join("").toUpperCase()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 text-left text-sm leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium",
					children: user.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-xs",
					children: user.email
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSelector, { className: "ml-auto size-5! shrink-0" })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		id: "nav-user-menu",
		className: "w-(--anchor-width) min-w-56 rounded-lg",
		side: isMobile ? "bottom" : "right",
		align: "end",
		sideOffset: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
				className: "p-0 font-normal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
						className: "size-8 rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "rounded-lg",
							children: user.name.split(" ").map((part) => part[0]).join("").toUpperCase()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid flex-1 text-left text-sm leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-medium",
							children: user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-xs",
							children: user.email
						})]
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => navigate({ to: "/" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconHome, {}), "Landing Page"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: onLogout,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLogout, {}), "Log out"]
			})
		]
	})] }) }) });
}
var navGroups = [
	{
		title: "Home",
		items: [{
			name: "Overview",
			icon: IconHome,
			url: "/dashboard",
			exact: true
		}]
	},
	{
		title: "Content",
		items: [
			{
				name: "Projects",
				icon: IconFolder,
				url: "/dashboard/projects"
			},
			{
				name: "Experience",
				icon: IconBriefcase,
				url: "/dashboard/experience"
			},
			{
				name: "Tech Stack",
				icon: IconStack2,
				url: "/dashboard/tech-stack"
			},
			{
				name: "Certificate",
				icon: IconCertificate,
				url: "/dashboard/certificate"
			},
			{
				name: "Education",
				icon: IconSchool,
				url: "/dashboard/education"
			},
			{
				name: "Achievements",
				icon: IconTrophy,
				url: "/dashboard/achievement"
			}
		]
	},
	{
		title: "Settings",
		items: [
			{
				name: "Hero / Bio",
				icon: IconUser,
				url: "/dashboard/hero"
			},
			{
				name: "Social Links",
				icon: IconAt,
				url: "/dashboard/social-links"
			},
			{
				name: "Resume",
				icon: IconFileText,
				url: "/dashboard/resume"
			},
			{
				name: "SEO",
				icon: IconSearch,
				url: "/dashboard/seo"
			}
		]
	}
];
function AppSidebar({ user, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
				className: "h-(--header-height) border-border border-b justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "Acme"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {
						type: "dropdown",
						id: "sidebar-theme-menu"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavMain, { groups: navGroups }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavUser, { user }) })
		]
	});
}
function formatSegment(segment) {
	return segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function getPageTitle(pathname) {
	const segments = (pathname.replace(/\/$/, "") || "/").split("/").filter(Boolean);
	if (segments.length === 0) return "Home";
	const lastSegment = segments[segments.length - 1];
	if (!lastSegment) return "Home";
	if (segments.length > 2 && [
		"create",
		"edit",
		"new",
		"add",
		"update",
		"delete",
		"detail"
	].includes(lastSegment.toLowerCase())) {
		const secondLast = segments[segments.length - 2];
		if (!secondLast) return formatSegment(lastSegment);
		if (/^[0-9a-f-]{36}$|^\d+$/.test(secondLast)) {
			const parentSegment = segments[segments.length - 3];
			if (!parentSegment) return formatSegment(lastSegment);
			return `${formatSegment(parentSegment.endsWith("s") ? parentSegment.slice(0, -1) : parentSegment)} ${formatSegment(lastSegment)}`;
		} else return `${formatSegment(secondLast)} ${formatSegment(lastSegment)}`;
	}
	if (/^[0-9a-f-]{36}$|^\d+$/.test(lastSegment) && segments.length > 1) {
		const parentSegment = segments[segments.length - 2];
		if (!parentSegment) return "Detail";
		return `${formatSegment(parentSegment.endsWith("s") ? parentSegment.slice(0, -1) : parentSegment)} Detail`;
	}
	return formatSegment(lastSegment);
}
function SiteHeader() {
	const location = useLocation();
	const pageTitle = (0, import_react.useMemo)(() => getPageTitle(location.pathname), [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {
					className: "-ml-1",
					size: "icon-lg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
					orientation: "vertical",
					className: "mx-2 "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-base font-medium",
					children: pageTitle
				})
			]
		})
	});
}
function CoreLayout() {
	const { user } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
		style: {
			"--sidebar-width": "calc(var(--spacing) * 72)",
			"--header-height": "calc(var(--spacing) * 12)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
			variant: "sidebar",
			user
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarInset, {
			className: "overflow-hidden contain-inline-size",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-y-auto p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { CoreLayout as component };
