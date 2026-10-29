import { i as __toESM } from "./_runtime.mjs";
import { _t as require_react, gt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { A as IconMail, J as IconFolder, Mt as IconArrowRight, ft as IconCertificate, m as IconStack2, mt as IconBriefcase } from "./_libs/tabler__icons-react.mjs";
import { C as SOCIAL_ICON_MAP } from "./_ssr/auth-BhV-4kEC.mjs";
import { r as cn, t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-4wm9p9_t.mjs";
import { c as intervalToDuration, d as format, m as enUS, t as id } from "./_libs/date-fns.mjs";
import { n as useLocale, r as useTranslations } from "./_ssr/locale-context-DcXzRisY.mjs";
import { t as Badge } from "./_ssr/badge-CNx_OxWt.mjs";
import { t as EmptyState } from "./_ssr/empty-state-BMP6Jt4s.mjs";
import { t as Route } from "./_locale-CvfVOzxo.mjs";
import { t as CertificateCard } from "./_ssr/certificate-card-DXVcoDwS.mjs";
import { t as MainHeader } from "./_ssr/main-header-D3U9xuMT.mjs";
import { t as FadeIn } from "./_ssr/fade-in-CQ8MPOfS.mjs";
import { t as ProjectCard } from "./_ssr/project-card-BGRh0B6t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_locale-CJLQHnAZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startTime(value) {
	const time = new Date(value).getTime();
	return Number.isFinite(time) ? time : -Infinity;
}
/**
* Anchor each explicit group at its first API occurrence, preserving curated
* order outside groups. Null/missing membership (including old cached rows)
* never merges records. Positions sort newest-start first; ties keep API order.
* Records are retained by reference and the caller's array is never mutated.
*/
function groupExperiences(experiences) {
	const entries = [];
	const groups = /* @__PURE__ */ new Map();
	for (const experience of experiences) {
		if (experience.groupId == null) {
			entries.push({
				key: `experience:${experience.id}`,
				positions: [experience]
			});
			continue;
		}
		let entry = groups.get(experience.groupId);
		if (!entry) {
			entry = {
				key: `group:${experience.groupId}`,
				positions: []
			};
			groups.set(experience.groupId, entry);
			entries.push(entry);
		}
		entry.positions.push(experience);
	}
	for (const entry of groups.values()) entry.positions.sort((a, b) => {
		const aTime = startTime(a.startDate);
		const bTime = startTime(b.startDate);
		return aTime === bTime ? 0 : aTime > bTime ? -1 : 1;
	});
	return entries;
}
/**
* Within one stint a later role supersedes an earlier one still flagged current
* (a promotion), so only the newest current role reads as ongoing. Returns, per
* input index, the start of the superseding role, or null when none applies.
* Equal starts never supersede each other.
*/
function supersededAt(positions) {
	return positions.map((position) => {
		if (!position.currentlyWorking) return null;
		const start = startTime(position.startDate);
		let next;
		for (const other of positions) {
			const otherStart = startTime(other.startDate);
			if (otherStart > start && (!next || otherStart < startTime(next.startDate))) next = other;
		}
		return next ? next.startDate : null;
	});
}
/** Total tenure of one employment stint: earliest start to latest end, or ongoing. */
function summarizeGroup(positions) {
	const starts = positions.map((position) => startTime(position.startDate)).filter(Number.isFinite);
	const current = positions.some((position) => position.currentlyWorking);
	const ends = positions.map((position) => position.endDate == null ? -Infinity : startTime(position.endDate)).filter(Number.isFinite);
	const shared = (key) => {
		const first = positions[0]?.[key];
		return first && positions.every((position) => position[key] === first) ? first : void 0;
	};
	return {
		start: new Date(starts.length ? Math.min(...starts) : Date.now()),
		end: current || !ends.length ? null : new Date(Math.max(...ends)),
		type: shared("type"),
		location: shared("location")
	};
}
function formatDuration(start, end, labels) {
	const { years = 0, months = 0 } = intervalToDuration({
		start: new Date(start),
		end: new Date(end)
	});
	const parts = [];
	if (years) parts.push(`${years} ${years > 1 ? labels.yearShortPlural : labels.yearShort}`);
	if (months) parts.push(`${months} ${months > 1 ? labels.monthShortPlural : labels.monthShort}`);
	return parts.length ? parts.join(" ") : labels.lessThanMonth;
}
function ExperienceCard({ experience, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: cn("border-border bg-card flex min-w-0 flex-col rounded-lg border p-4 wrap-anywhere sm:p-5", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperiencePosition, { experience })
	});
}
function ExperienceEntryCard({ entry }) {
	const { t } = useTranslations();
	const first = entry.positions[0];
	if (!first) return null;
	if (entry.positions.length === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, { experience: first });
	const summary = summarizeGroup(entry.positions);
	const endedAt = supersededAt(entry.positions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-border bg-card flex min-w-0 flex-col gap-4 rounded-lg border p-4 wrap-anywhere sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex min-w-0 flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-foreground text-base leading-6 font-semibold",
				children: first.company
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaLine, { items: [
				summary.type && t.experienceType[summary.type],
				formatDuration(summary.start, summary.end ?? /* @__PURE__ */ new Date(), t.experienceCard),
				summary.location
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			role: "list",
			className: "flex min-w-0 flex-col gap-6",
			children: entry.positions.map((experience, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative min-w-0 pl-5 sm:pl-6",
				children: [
					index < entry.positions.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "bg-border absolute top-3 -bottom-9 left-[3.5px] w-px"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "border-border bg-card absolute top-2 left-0 size-2 rounded-full border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperiencePosition, {
						experience,
						grouped: true,
						endedAt: endedAt[index],
						showType: !summary.type,
						showLocation: !summary.location
					})
				]
			}, experience.id))
		})]
	});
}
function MetaLine({ items, className }) {
	const visible = items.filter(Boolean);
	if (!visible.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6", className),
		children: visible.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "contents",
			children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "·"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0",
				children: item
			})]
		}, index))
	});
}
function ExperiencePosition({ experience, grouped = false, showType = true, showLocation = true, endedAt }) {
	const { t } = useTranslations();
	const dateLocale = useLocale() === "id" ? id : enUS;
	const Heading = grouped ? "h4" : "h3";
	const current = experience.currentlyWorking && !endedAt;
	const endDate = endedAt ?? experience.endDate ?? /* @__PURE__ */ new Date();
	const duration = formatDuration(experience.startDate, current ? /* @__PURE__ */ new Date() : endDate, t.experienceCard);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					className: "text-foreground text-base leading-6 font-semibold",
					children: experience.title
				}), !grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground text-sm leading-6",
					children: experience.company
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1 sm:shrink-0 sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-6 sm:justify-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: format(experience.startDate, "yyyy-MM"),
							children: format(experience.startDate, "MMM yyyy", { locale: dateLocale })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "–"
						}),
						current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: t.experienceCard.present
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: format(endDate, "yyyy-MM"),
							children: format(endDate, "MMM yyyy", { locale: dateLocale })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"(",
							duration,
							")"
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaLine, {
					className: "sm:justify-end",
					items: [showType && t.experienceType[experience.type], showLocation && experience.location]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full min-w-0 flex-col items-start gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-6",
					children: experience.description
				}),
				!!experience.achievements?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "text-muted-foreground flex max-w-full min-w-0 list-disc flex-col gap-1 pl-5 text-sm leading-6",
					children: experience.achievements.map((achievement, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: achievement }, index))
				}),
				!!experience.skills.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-w-full min-w-0 flex-wrap gap-1.5 font-mono",
					children: experience.skills.map((skill, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "h-auto max-w-full min-w-0 whitespace-normal",
						children: skill
					}, index))
				})
			]
		})]
	});
}
function TechStackList({ stack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-[11px] font-mono font-semibold text-subtle uppercase tracking-[0.08em]",
			children: stack.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: stack.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[13px] text-muted-foreground",
				children: item.name
			}, item.id))
		})]
	});
}
function SectionHeading({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-subtle font-mono text-sm tracking-[0.15em]",
		children
	});
}
function HomeComponent() {
	const navigate = Route.useNavigate();
	const locale = useLocale();
	const { t } = useTranslations();
	const { referral } = Route.useSearch();
	const { profile, projects: { data: featured, isMore }, experiences, stack, certifications: { data: certificates, isMore: isMoreCerts }, socialLinks } = Route.useLoaderData();
	const socialByIcon = Object.fromEntries(socialLinks.map((l) => [l.icon, l]));
	const incrementSocialLinkClickCount = useMutation(trpc.socialLink.incrementClickCount.mutationOptions());
	const trackReferralVisit = useMutation(trpc.referral.trackVisit.mutationOptions());
	(0, import_react.useEffect)(() => {
		if (referral) trackReferralVisit.mutate({ referral });
	}, [referral]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "about",
				className: "dot-grid flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
					className: "border-border mx-auto flex w-full flex-col gap-6 self-stretch border-b px-4 pb-24 md:max-w-175 md:px-0",
					children: [
						profile.availabilityStatus !== "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "bg-available text-available-foreground border-available-foreground/20 w-fit border px-3.5 py-3 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 h-2 w-2 rounded-full bg-green-500" }), t.availability[profile.availabilityStatus]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-foreground text-[32px] leading-[1.05] font-extrabold sm:text-[44px] md:text-[54px]",
							children: profile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground max-w-2xl text-start text-[18px]",
							children: profile.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground max-w-2xl text-start text-[15px] leading-[1.75]",
							children: profile.bio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [socialLinks.filter((l) => l.icon !== "portfolio").map((link) => {
								const Icon = SOCIAL_ICON_MAP[link.icon].icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "outline",
									size: "lg",
									onClick: () => {
										incrementSocialLinkClickCount.mutate({ id: link.id });
										window.open(link.url, "_blank");
									},
									title: link.title,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-subtle flex items-center gap-1 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), link.title]
									})
								}, link.id);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								variant: "outline",
								size: "lg",
								onClick: () => window.location.assign(`mailto:${profile.email}`),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle flex items-center gap-1 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMail, { className: "size-4" }), t.home.email]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "lg",
								onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
								className: "group",
								children: [t.home.viewProjects, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "lg",
								variant: "outline",
								onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
								className: "text-subtle",
								children: t.home.contact
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "experience",
				className: "flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
					className: "mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: t.home.experienceHeading }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-8",
							children: groupExperiences(experiences).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceEntryCard, { entry }, entry.key))
						}),
						experiences.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: IconBriefcase,
							title: t.home.empty.experienceTitle,
							description: t.home.empty.experienceDesc
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "projects",
				className: "bg-section-alt flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 border-y py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
					className: "mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: t.home.projectsHeading }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]",
							children: featured.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project }, project.id))
						}),
						featured.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: IconFolder,
							title: t.home.empty.projectsTitle,
							description: t.home.empty.projectsDesc
						}),
						isMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							onClick: () => navigate({
								to: "/$locale/projects",
								params: { locale }
							}),
							variant: "link",
							size: "lg",
							className: "text-subtle group",
							children: [t.home.viewAllProjects, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-24 py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "stack",
						className: "mx-auto flex w-full scroll-mt-26 flex-col gap-8 px-4 md:max-w-175 md:px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
							className: "flex flex-col gap-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: t.home.stackHeading }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5",
									children: stack.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechStackList, { stack: group }, group.id))
								}),
								stack.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									icon: IconStack2,
									title: t.home.empty.stackTitle,
									description: t.home.empty.stackDesc
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "certs",
						className: "bg-section-alt flex w-full scroll-mt-14 flex-col items-center justify-center gap-6 border-y py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
							className: "mx-auto flex w-full flex-col justify-center gap-8 px-4 md:max-w-175 md:px-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: t.home.certificatesHeading }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]",
									children: certificates.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateCard, { certificate: cert }, cert.id))
								}),
								certificates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									icon: IconCertificate,
									title: t.home.empty.certificatesTitle,
									description: t.home.empty.certificatesDesc
								}),
								isMoreCerts && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									onClick: () => navigate({
										to: "/$locale/certificates",
										params: { locale }
									}),
									variant: "link",
									size: "lg",
									className: "text-subtle group",
									children: [t.home.viewAllCertificates, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "contact",
						className: "mx-auto flex w-full scroll-mt-14 flex-col gap-8 px-4 md:max-w-175 md:px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
							className: "flex flex-col gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: t.home.contactHeading }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-border flex flex-col gap-8 rounded-lg border p-8 sm:flex-row sm:items-start sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground text-lg font-semibold",
											children: t.home.contactTitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-subtle max-w-sm leading-relaxed",
											children: t.home.contactBody
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "lg",
											className: "w-fit",
											onClick: () => window.location.assign(`mailto:${profile.email}?subject=Contacting%20You%20from%20Your%20Portfolio&body=Hi%20${encodeURIComponent(profile.name)},%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0A[Write your message here]%0D%0A%0D%0ABest,%0D%0A[Your Name]`),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMail, { className: "size-4" }), t.home.sendEmail]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-3",
									children: socialLinks.filter((l) => l.icon !== "portfolio").map((link) => {
										const Icon = SOCIAL_ICON_MAP[link.icon].icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											variant: "outline",
											size: "sm",
											className: "justify-start",
											onClick: () => {
												incrementSocialLinkClickCount.mutate({ id: link.id });
												window.open(link.url, "_blank");
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), link.title]
										}, link.id);
									})
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-border mx-auto flex w-full flex-col justify-between gap-2 border-t px-4 py-6 sm:flex-row md:max-w-175 md:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle text-center font-mono text-xs",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Noor Rizki Ramadhan"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-center gap-2",
					children: [
						socialByIcon.github && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: socialByIcon.github.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors",
							children: t.footer.github
						}),
						socialByIcon.linkedin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: socialByIcon.linkedin.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors",
							children: t.footer.linkedin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${profile.email}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-subtle hover:text-foreground cursor-pointer text-center text-xs transition-colors",
							children: t.footer.email
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { HomeComponent as component };
