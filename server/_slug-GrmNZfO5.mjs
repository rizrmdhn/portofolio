import { i as __toESM } from "./_runtime.mjs";
import { _ as DialogPopup, b as DialogBackdrop, g as DialogPortal$1, h as DialogRoot, m as DialogTitle$1, mt as require_react, p as DialogTrigger$1, pt as require_jsx_runtime, y as DialogClose } from "./_libs/@base-ui/react+[...].mjs";
import { At as IconArrowUpRight, Mt as IconArrowLeft, Q as IconExternalLink, St as IconBrandGithub, Tt as IconBrandAppstore, X as IconEye, r as IconX, xt as IconBrandGooglePlay } from "./_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn, t as Button$1 } from "./_ssr/button-DXBrv0gs.mjs";
import { p as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useQuery, i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-DhZOnnjr.mjs";
import { t as MainHeader } from "./_ssr/main-header-CwoxlNeR.mjs";
import { t as Route } from "./_slug-BLV_e7P9.mjs";
import { t as Badge } from "./_ssr/badge-zKr0p2xx.mjs";
import { t as FadeIn } from "./_ssr/fade-in-Bl28mE8s.mjs";
import { t as toCompactNumber } from "./_ssr/number-4YRicyqf.mjs";
import { t as Markdown$1 } from "./_libs/react-markdown+[...].mjs";
import { t as rehypeSanitize } from "./_libs/rehype-sanitize.mjs";
import { t as remarkGfm } from "./_libs/remark-gfm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-GrmNZfO5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "dialog",
		...props
	});
}
function DialogTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, {
		"data-slot": "dialog-trigger",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "dialog-content",
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-xs/relaxed text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("font-heading text-sm font-medium", className),
		...props
	});
}
/**
* Renders user-authored markdown safely.
*
* `rehype-sanitize` strips any raw HTML / dangerous attributes, so this is safe
* to render on public pages. `remark-gfm` adds tables, task lists, strikethrough
* and autolinks. Element styling is matched to the muted prose used across the
* project pages rather than pulling in the typography plugin.
*/
function Markdown({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("text-muted-foreground text-[15px] leading-[1.8] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown$1, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSanitize],
			components: {
				h1: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: cn("text-foreground mt-8 mb-3 text-xl font-semibold tracking-tight", className),
					...props
				}),
				h2: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: cn("text-foreground mt-7 mb-3 text-lg font-semibold tracking-tight", className),
					...props
				}),
				h3: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("text-foreground mt-6 mb-2 text-base font-semibold", className),
					...props
				}),
				p: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mb-4", className),
					...props
				}),
				a: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: cn("text-foreground font-medium underline underline-offset-4", className),
					target: "_blank",
					rel: "noopener noreferrer",
					...props
				}),
				ul: ({ className, ...props }) => {
					const isTaskList = className?.includes("contains-task-list");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: cn("mb-4 space-y-1.5", isTaskList ? "ml-0 list-none" : "ml-5 list-disc", className),
						...props
					});
				},
				ol: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: cn("mb-4 ml-5 list-decimal space-y-1.5", className),
					...props
				}),
				li: ({ className, ...props }) => {
					const isTaskItem = className?.includes("task-list-item");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: cn(isTaskItem ? "flex items-start gap-2" : "pl-1", className),
						...props
					});
				},
				input: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: cn("border-border mt-1.5 size-3.5 shrink-0 rounded", className),
					...props,
					disabled: true
				}),
				img: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					loading: "lazy",
					className: cn("border-border my-4 max-w-full rounded-lg border", className),
					...props
				}),
				blockquote: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: cn("border-border my-4 border-l-2 pl-4 italic", className),
					...props
				}),
				code: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: cn("bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]", className),
					...props
				}),
				pre: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: cn("bg-muted my-4 overflow-x-auto rounded-lg p-4 font-mono text-[13px] [&>code]:bg-transparent [&>code]:p-0", className),
					...props
				}),
				hr: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
					className: cn("border-border my-6", className),
					...props
				}),
				strong: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: cn("text-foreground font-semibold", className),
					...props
				}),
				table: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: cn("w-full text-sm", className),
						...props
					})
				}),
				th: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: cn("border-border border px-3 py-1.5 text-left font-semibold", className),
					...props
				}),
				td: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cn("border-border border px-3 py-1.5", className),
					...props
				})
			},
			children
		})
	});
}
/**
* Click-to-zoom image. The thumbnail keeps its cropped framing; the dialog shows
* the full, uncropped image so screenshots stay legible. A `bg-muted` placeholder
* reserves space while the image loads to avoid layout shift / white flashes.
*/
function ImageLightbox({ src, alt, triggerClassName, imgClassName, eager = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		className: cn("border-border bg-muted group block w-full cursor-zoom-in overflow-hidden rounded-lg border", triggerClassName),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: eager ? "eager" : "lazy",
			className: cn("w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]", imgClassName)
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "w-fit max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 ring-0 sm:max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
			className: "sr-only",
			children: alt
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "max-h-[85vh] w-auto rounded-lg object-contain"
		})]
	})] });
}
function ProjectDetailPage() {
	const queryClient = useQueryClient();
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { data: project } = useSuspenseQuery(trpc.project.getBySlug.queryOptions({ slug }));
	const { data: images } = useQuery(trpc.project.getImages.queryOptions({ projectId: project.id }));
	const galleryImages = (images ?? []).filter((img) => !img.isCover);
	const incrementViews = useMutation({
		...trpc.project.updateView.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries(trpc.project.getBySlug.queryOptions({ slug }));
			queryClient.invalidateQueries(trpc.project.getAll.queryOptions());
		}
	});
	(0, import_react.useEffect)(() => {
		const key = `project-viewed:${project.slug}`;
		if (sessionStorage.getItem(key)) return;
		sessionStorage.setItem(key, "1");
		incrementViews.mutate({
			projectId: project.id,
			slug: project.slug
		});
	}, [project.id, project.slug]);
	const links = [
		{
			url: project.githubUrl,
			icon: IconBrandGithub,
			label: "GitHub"
		},
		{
			url: project.liveUrl,
			icon: IconExternalLink,
			label: "Live"
		},
		{
			url: project.playstoreUrl,
			icon: IconBrandGooglePlay,
			label: "Play Store"
		},
		{
			url: project.appstoreUrl,
			icon: IconBrandAppstore,
			label: "App Store"
		}
	].filter((l) => !!l.url);
	const viewCount = Number(project.viewCount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full px-4 py-12 md:max-w-175 md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
					className: "flex flex-col gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "ghost",
							size: "sm",
							className: "text-subtle -ml-2 w-fit",
							onClick: () => navigate({ to: "/projects" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "size-4" }), "All Projects"]
						}),
						project.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageLightbox, {
							src: project.imageUrl,
							alt: project.title,
							imgClassName: "h-72",
							eager: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl leading-tight font-bold sm:text-3xl",
									children: project.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle inline-flex shrink-0 items-center gap-1.5 pt-1 font-mono text-xs",
									title: `${viewCount.toLocaleString()} views`,
									"aria-label": `${viewCount.toLocaleString()} views`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEye, {
										className: "size-3.5",
										"aria-hidden": true
									}), toCompactNumber(viewCount)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-foreground/80 text-lg leading-relaxed",
								children: project.description
							})]
						}),
						project.tech.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: project.tech.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "bg-tag text-tag-foreground border-tag-border font-mono text-xs",
								children: tech
							}, tech))
						}),
						links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3",
							children: links.map(({ url, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: url ?? "",
								target: "_blank",
								rel: "noopener noreferrer",
								className: cn(buttonVariants({
									variant: "outline",
									size: "sm"
								}), "group"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
									label,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowUpRight, { className: "size-3.5 opacity-40 transition-opacity group-hover:opacity-70" })
								]
							}, label))
						}),
						project.longDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-border flex flex-col gap-4 border-t pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-foreground text-sm font-semibold tracking-wide uppercase",
								children: "About"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: project.longDescription })]
						}),
						galleryImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-border flex flex-col gap-4 border-t pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-foreground text-sm font-semibold tracking-wide uppercase",
								children: "Gallery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: galleryImages.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageLightbox, {
									src: image.imageUrl,
									alt: `${project.title} screenshot`,
									imgClassName: "aspect-video"
								}, image.id))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-border mx-auto mt-auto flex w-full justify-center border-t px-4 py-6 md:max-w-175 md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle font-mono text-xs",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Noor Rizki Ramadhan"
					]
				})
			})
		]
	});
}
//#endregion
export { ProjectDetailPage as component };
