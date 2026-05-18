import { o as __toESM } from "../_runtime.mjs";
import { ft as require_jsx_runtime, pt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { I as IconFileCv, L as IconEye, M as IconHistory, P as IconFolder, Q as IconBriefcase, X as IconCertificate, a as IconUser, d as IconStack2, ft as IconAt, h as IconSchool, ht as IconArrowRight, i as IconWorldWww, s as IconTrophy } from "../_libs/tabler__icons-react.mjs";
import { b as SOCIAL_ICON_MAP, t as ACTIVITY_LOG_ENTITY_LABELS } from "./auth-BOIJqjd1.mjs";
import { r as cn, t as Button$1 } from "./button-DXBrv0gs.mjs";
import { p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQuery, i as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as trpc } from "./trpc-DhZOnnjr.mjs";
import { i as CardDescription, n as CardAction, o as CardHeader, r as CardContent, s as CardTitle, t as Card } from "./card-DbtAMaAG.mjs";
import { t as Progress$1 } from "./progress-DANJmD_5.mjs";
import { t as EmptyState } from "./empty-state-CvqlupIY.mjs";
import { a as Tooltip, i as CartesianGrid, n as XAxis, o as ResponsiveContainer, r as Area, t as AreaChart } from "../_libs/recharts+victory-vendor.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-YsqiY5CN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AllTimeProjectsCard({ projects, className }) {
	const navigate = useNavigate();
	const viewCounts = projects.map((project) => Number.isFinite(project.views) && project.views > 0 ? project.views : 0);
	const maxViews = Math.max(...viewCounts, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn(className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "border-b",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Top Projects" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "By views, last 30 days" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "ghost",
					size: "sm",
					className: "text-muted-foreground group font-mono text-[11px]",
					onClick: () => navigate({ to: "/dashboard/projects" }),
					children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, {
						"data-icon": "inline-end",
						className: "transition-transform duration-200 group-hover:translate-x-1"
					})]
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col",
			children: [projects.map((project, idx) => {
				const views = viewCounts[idx] ?? 0;
				const percentage = Math.round(views / maxViews * 100);
				const neighborViews = projects[idx + 1] ?? projects[idx - 1] ? viewCounts[idx + 1] ?? viewCounts[idx - 1] ?? 0 : null;
				const growth = neighborViews && neighborViews > 0 ? Math.round((views - neighborViews) / neighborViews * 100) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-border flex items-center gap-3 border-b py-2.5 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground w-4 shrink-0 text-right font-mono text-[11px]",
							children: String(idx + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground flex-1 text-sm font-semibold",
							children: project.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
							value: percentage,
							className: "h-1.5 max-w-64 flex-1 align-middle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground w-14 shrink-0 text-right font-mono text-sm font-semibold",
							children: views.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("w-10 shrink-0 whitespace-nowrap text-right font-mono text-[11px]", growth > 0 && "text-green-500", growth < 0 && "text-red-500", growth === 0 && "text-muted-foreground"),
							children: `${growth > 0 ? "+" : ""}${growth}%`
						})
					]
				}, project.id);
			}), projects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: IconFolder,
				title: "No projects yet",
				description: "Your top projects will appear here once they start getting views."
			})]
		})]
	});
}
var THEMES = {
	light: "",
	dark: ".dark"
};
var INITIAL_DIMENSION = {
	width: 320,
	height: 200
};
var ChartContext = import_react.createContext(null);
function useChart() {
	const context = import_react.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
function ChartContainer({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }) {
	const uniqueId = import_react.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": chartId,
			className: cn("[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				initialDimension,
				children
			})]
		})
	});
}
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } });
};
var ChartTooltip = Tooltip;
function ChartTooltipContent({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }) {
	const { config } = useChart();
	const tooltipLabel = import_react.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs/relaxed shadow-xl", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey ?? item.name ?? item.dataKey ?? "value"}`);
				const indicatorColor = color ?? item.payload?.fill ?? item.color;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("shrink-0 rounded-xs border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": indicator === "dot",
							"w-1": indicator === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
							"my-0.5": nestLabel && indicator === "dashed"
						}),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label ?? item.name
							})]
						}), item.value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-mono font-medium tabular-nums",
							children: typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)
						})]
					})] })
				}, index);
			})
		})]
	});
}
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
var chartConfig = { views: {
	label: "Views",
	color: "hsl(var(--chart-1))"
} };
var RANGE_LABELS = {
	"7d": "Last 7 days",
	"30d": "Last 30 days",
	"90d": "Last 90 days"
};
function PageViewsChart({ className, data, range, onRangeChange }) {
	const totalViews = data.reduce((sum, d) => sum + d.views, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("w-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "border-b",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Page Views" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: RANGE_LABELS[range] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 rounded-md border p-1",
					children: [
						"7d",
						"30d",
						"90d"
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onRangeChange(r),
						className: cn("rounded px-2.5 py-1 text-[11px] font-mono transition-colors", range === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"),
						children: r
					}, r))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl font-bold font-mono tabular-nums",
					children: totalViews.toLocaleString()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1.5 text-xs text-muted-foreground",
					children: "total views"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
				config: chartConfig,
				className: "h-48 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data,
					margin: {
						left: 0,
						right: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "fillViews",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "5%",
								stopColor: "var(--color-views)",
								stopOpacity: .3
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "95%",
								stopColor: "var(--color-views)",
								stopOpacity: 0
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							vertical: false,
							strokeDasharray: "3 3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "date",
							tickLine: false,
							axisLine: false,
							tickMargin: 8,
							tickFormatter: (value) => {
								return new Date(value).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric"
								});
							},
							interval: range === "7d" ? 0 : range === "30d" ? 4 : 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { labelFormatter: (value) => {
							return new Date(value).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric"
							});
						} }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "views",
							stroke: "var(--color-views)",
							strokeWidth: 2,
							fill: "url(#fillViews)",
							dot: false
						})
					]
				})
			})
		})]
	});
}
var ENTITY_ICONS = {
	project: IconFolder,
	experience: IconBriefcase,
	certification: IconCertificate,
	techStackCategory: IconStack2,
	techStackItem: IconStack2,
	socialLink: IconWorldWww,
	profile: IconUser,
	education: IconSchool,
	achievement: IconTrophy
};
var ACTION_LABELS = {
	created: "Created",
	updated: "Updated",
	deleted: "Deleted"
};
var ACTION_COLORS = {
	created: "text-green-500",
	updated: "text-blue-500",
	deleted: "text-red-500"
};
function timeAgo(dateStr) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const minutes = Math.floor(diff / 6e4);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}
function RecentActivityCard({ className, activity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("w-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "border-b",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recent Activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
				"Your last ",
				activity.length > 0 ? activity.length : "",
				" actions"
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col",
			children: [activity.map((entry) => {
				const Icon = ENTITY_ICONS[entry.entity];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 py-2.5 border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-7 shrink-0 items-center justify-center rounded-md bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 text-muted-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium truncate",
								children: entry.entityTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: ACTIVITY_LOG_ENTITY_LABELS[entry.entity]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end shrink-0 gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-xs font-medium", ACTION_COLORS[entry.action]),
								children: ACTION_LABELS[entry.action]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono text-muted-foreground",
								children: timeAgo(entry.createdAt)
							})]
						})
					]
				}, entry.id);
			}), activity.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: IconHistory,
				title: "No activity yet",
				description: "Your recent actions — creating, updating, or deleting content — will appear here."
			})]
		})]
	});
}
function SocialLinkClickThroughCard({ className, socialLinks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn(className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "border-b",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Social Link Click-Through" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Last 30 days" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
			children: [socialLinks.map((link, idx) => {
				const compareLink = socialLinks[idx + 1] ?? socialLinks[idx - 1];
				const compareCount = compareLink?.clickCount ?? 0;
				const growth = !compareLink || compareCount === 0 ? null : Math.round((link.clickCount - compareCount) / compareCount * 100);
				const Icon = SOCIAL_ICON_MAP[link.icon].icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-muted-foreground size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							children: link.title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xl font-bold tabular-nums",
							children: link.clickCount
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-mono text-xs", growth === null ? "text-muted-foreground" : growth > 0 ? "text-green-500" : "text-red-500"),
							children: growth === null ? "—" : growth > 0 ? `+${growth}%` : `${growth}%`
						})]
					})]
				}) }, link.id);
			}), socialLinks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: IconAt,
					title: "No social links yet",
					description: "Your social link click-through stats will appear here once you add some social links and they start getting clicks."
				})
			})]
		}) })]
	});
}
function StatCard({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-muted-foreground size-4" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-2xl font-bold tabular-nums",
		children: typeof value === "number" ? value.toLocaleString() : value
	}) })] });
}
function StatsCards({ totalProjectViews, counts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total Project Views",
				value: totalProjectViews,
				icon: IconEye
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Projects",
				value: counts.projects,
				icon: IconFolder
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Experiences",
				value: counts.experiences,
				icon: IconBriefcase
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Certifications",
				value: counts.certifications,
				icon: IconCertificate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Tech Stack Items",
				value: counts.techStackItems,
				icon: IconStack2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Resume Downloads",
				value: counts.resumeDownloads,
				icon: IconFileCv
			})
		]
	});
}
function RouteComponent() {
	const [range, setRange] = (0, import_react.useState)("30d");
	const { data: allTimeViewsProjects } = useSuspenseQuery(trpc.project.getAllTimeViewsProjects.queryOptions());
	const { data: socialLinks } = useSuspenseQuery(trpc.socialLink.getSocialLinkClickThroughForDashboard.queryOptions());
	const { data: stats } = useSuspenseQuery(trpc.dashboard.getStats.queryOptions());
	const { data: viewEvents = [] } = useQuery(trpc.dashboard.getViewEvents.queryOptions({ range }));
	const { data: recentActivity } = useSuspenseQuery(trpc.dashboard.getRecentActivity.queryOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCards, {
				totalProjectViews: stats.totalProjectViews,
				counts: stats.counts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageViewsChart, {
				data: viewEvents,
				range,
				onRangeChange: setRange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllTimeProjectsCard, { projects: allTimeViewsProjects }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLinkClickThroughCard, { socialLinks })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentActivityCard, { activity: recentActivity })
		]
	});
}
//#endregion
export { RouteComponent as component };
