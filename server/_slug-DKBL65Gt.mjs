import { i as __toESM } from "./_runtime.mjs";
import { _t as require_react, gt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { m as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { $ as IconExternalLink, Ct as IconBrandGithub, Et as IconBrandAppstore, Nt as IconArrowLeft, St as IconBrandGooglePlay, Z as IconEye, jt as IconArrowUpRight } from "./_libs/tabler__icons-react.mjs";
import { n as buttonVariants, r as cn, t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { a as useQuery, i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-4wm9p9_t.mjs";
import { n as useLocale, r as useTranslations } from "./_ssr/locale-context-DcXzRisY.mjs";
import { t as Badge } from "./_ssr/badge-CNx_OxWt.mjs";
import { n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog$1 } from "./_ssr/dialog-Djqg5NLE.mjs";
import { t as MainHeader } from "./_ssr/main-header-D3U9xuMT.mjs";
import { t as FadeIn } from "./_ssr/fade-in-CQ8MPOfS.mjs";
import { t as toCompactNumber } from "./_ssr/number-CyuDXsVg.mjs";
import { t as Route } from "./_slug-mVwRPf3y.mjs";
import { t as Markdown$1 } from "./_libs/react-markdown+[...].mjs";
import { t as rehypeSanitize } from "./_libs/rehype-sanitize.mjs";
import { t as remarkGfm } from "./_libs/remark-gfm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DKBL65Gt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const locale = useLocale();
	const { t, format } = useTranslations();
	const navigate = useNavigate();
	const { data: project } = useSuspenseQuery(trpc.project.getBySlug.queryOptions({
		slug,
		locale
	}));
	const { data: images } = useQuery(trpc.project.getImages.queryOptions({ projectId: project.id }));
	const galleryImages = (images ?? []).filter((img) => !img.isCover);
	const incrementViews = useMutation({
		...trpc.project.updateView.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries(trpc.project.getBySlug.queryOptions({
				slug,
				locale
			}));
			queryClient.invalidateQueries(trpc.project.getAll.queryOptions({ locale }));
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
			label: t.projectDetail.linkGithub
		},
		{
			url: project.liveUrl,
			icon: IconExternalLink,
			label: t.projectDetail.linkLive
		},
		{
			url: project.playstoreUrl,
			icon: IconBrandGooglePlay,
			label: t.projectDetail.linkPlayStore
		},
		{
			url: project.appstoreUrl,
			icon: IconBrandAppstore,
			label: t.projectDetail.linkAppStore
		}
	].filter((l) => !!l.url);
	const viewCount = Number(project.viewCount);
	const viewsLabel = format(t.projectDetail.viewsLabel, { count: viewCount.toLocaleString() });
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
							onClick: () => navigate({
								to: "/$locale/projects",
								params: { locale }
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowLeft, { className: "size-4" }), t.projectDetail.allProjects]
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
									title: viewsLabel,
									"aria-label": viewsLabel,
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
								children: t.projectDetail.about
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: project.longDescription })]
						}),
						galleryImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-border flex flex-col gap-4 border-t pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-foreground text-sm font-semibold tracking-wide uppercase",
								children: t.projectDetail.gallery
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
