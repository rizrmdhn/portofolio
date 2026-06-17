//#region node_modules/.nitro/vite/services/ssr/assets/src-wHgUA5Hr.js
/**
* Canonical (English) UI string catalog. This object's shape is the source of
* truth: `Messages = typeof en`, and every other locale file must satisfy that
* type, so a missing key in another language is a compile error.
*
* Only public-facing site strings live here — the single-user admin dashboard
* intentionally stays in English.
*
* Enum-keyed maps (availability/experienceType) mirror the label maps in
* `@portofolio/constants` so the public site can render them per-locale.
*/
var en = {
	nav: {
		about: "About",
		experience: "Experience",
		projects: "Projects",
		stack: "Stack",
		certs: "Certs",
		contact: "Contact",
		resume: "Resume ↗",
		menu: "Menu",
		openMenu: "Open menu",
		theme: "Theme",
		language: "Language"
	},
	availability: {
		unavailable: "Not available",
		available: "Open to work",
		freelance: "Open to freelance",
		limited: "Limited availability"
	},
	experienceType: {
		internship: "Internship",
		"full-time": "Full-Time",
		freelance: "Freelance",
		"part-time": "Part-Time",
		contract: "Contract",
		temporary: "Temporary",
		volunteer: "Volunteer"
	},
	experienceCard: {
		present: "Present",
		yearShort: "yr",
		yearShortPlural: "yrs",
		monthShort: "mo",
		monthShortPlural: "mos",
		lessThanMonth: "< 1 mo"
	},
	home: {
		email: "Email",
		viewProjects: "View Projects",
		contact: "Contact",
		experienceHeading: "WORK EXPERIENCE",
		projectsHeading: "PROJECTS",
		viewAllProjects: "View all projects",
		stackHeading: "TECH STACK",
		certificatesHeading: "CERTIFICATES",
		viewAllCertificates: "View all certificates",
		contactHeading: "CONTACT",
		contactTitle: "Let's work together.",
		contactBody: "I'm open to freelance work, full-time roles, and interesting side projects. If you have something in mind, reach out.",
		sendEmail: "Send me an email",
		empty: {
			experienceTitle: "No experience yet",
			experienceDesc: "It seems there are no experiences to show at the moment.",
			projectsTitle: "No projects yet",
			projectsDesc: "It seems there are no projects to show at the moment.",
			stackTitle: "No tech stack yet",
			stackDesc: "It seems there are no tech stacks to show at the moment.",
			certificatesTitle: "No certificates yet",
			certificatesDesc: "It seems there are no certificates to show at the moment."
		},
		seoTitleFallback: "Portfolio"
	},
	footer: {
		github: "Github",
		linkedin: "LinkedIn",
		email: "Email"
	},
	projects: {
		allHeading: "ALL PROJECTS",
		showLess: "Show less",
		showMore: "+{count} more",
		seoTitle: "Projects",
		seoDescription: "A collection of projects I've built."
	},
	projectDetail: {
		allProjects: "All Projects",
		about: "About",
		gallery: "Gallery",
		notFoundTitle: "Project not found",
		notFoundBody: "The project you're looking for doesn't exist or may have been removed.",
		viewsLabel: "{count} views",
		seoTitleFallback: "Project",
		linkGithub: "GitHub",
		linkLive: "Live",
		linkPlayStore: "Play Store",
		linkAppStore: "App Store"
	},
	certificateCard: { viewCertificate: "View Certificate" },
	certificates: {
		allHeading: "ALL CERTIFICATIONS",
		seoTitle: "Certificates",
		seoDescription: "Certifications and credentials I've earned."
	},
	resume: {
		heading: "RESUME",
		lastUpdated: "Last updated",
		downloadPdf: "Download PDF",
		openPdf: "Open PDF",
		pdfNotOnMobile: "PDF preview is not available on mobile browsers.",
		noResume: "No resume available yet.",
		pdfTitle: "Resume PDF",
		seoTitle: "Resume",
		seoDescription: "View and download my resume / CV."
	}
};
/**
* Indonesian UI string catalog. Typed as `Messages` (the English shape), so any
* missing or misspelled key fails typechecking.
*/
var id = {
	nav: {
		about: "Tentang",
		experience: "Pengalaman",
		projects: "Proyek",
		stack: "Teknologi",
		certs: "Sertifikat",
		contact: "Kontak",
		resume: "Resume ↗",
		menu: "Menu",
		openMenu: "Buka menu",
		theme: "Tema",
		language: "Bahasa"
	},
	availability: {
		unavailable: "Tidak tersedia",
		available: "Terbuka untuk bekerja",
		freelance: "Terbuka untuk freelance",
		limited: "Ketersediaan terbatas"
	},
	experienceType: {
		internship: "Magang",
		"full-time": "Penuh Waktu",
		freelance: "Freelance",
		"part-time": "Paruh Waktu",
		contract: "Kontrak",
		temporary: "Sementara",
		volunteer: "Sukarelawan"
	},
	experienceCard: {
		present: "Sekarang",
		yearShort: "thn",
		yearShortPlural: "thn",
		monthShort: "bln",
		monthShortPlural: "bln",
		lessThanMonth: "< 1 bln"
	},
	home: {
		email: "Email",
		viewProjects: "Lihat Proyek",
		contact: "Kontak",
		experienceHeading: "PENGALAMAN KERJA",
		projectsHeading: "PROYEK",
		viewAllProjects: "Lihat semua proyek",
		stackHeading: "TEKNOLOGI",
		certificatesHeading: "SERTIFIKAT",
		viewAllCertificates: "Lihat semua sertifikat",
		contactHeading: "KONTAK",
		contactTitle: "Mari bekerja sama.",
		contactBody: "Saya terbuka untuk pekerjaan freelance, posisi penuh waktu, dan proyek sampingan yang menarik. Jika Anda punya ide, jangan ragu untuk menghubungi saya.",
		sendEmail: "Kirim email ke saya",
		empty: {
			experienceTitle: "Belum ada pengalaman",
			experienceDesc: "Sepertinya belum ada pengalaman untuk ditampilkan saat ini.",
			projectsTitle: "Belum ada proyek",
			projectsDesc: "Sepertinya belum ada proyek untuk ditampilkan saat ini.",
			stackTitle: "Belum ada teknologi",
			stackDesc: "Sepertinya belum ada teknologi untuk ditampilkan saat ini.",
			certificatesTitle: "Belum ada sertifikat",
			certificatesDesc: "Sepertinya belum ada sertifikat untuk ditampilkan saat ini."
		},
		seoTitleFallback: "Portofolio"
	},
	footer: {
		github: "Github",
		linkedin: "LinkedIn",
		email: "Email"
	},
	projects: {
		allHeading: "SEMUA PROYEK",
		showLess: "Tampilkan lebih sedikit",
		showMore: "+{count} lainnya",
		seoTitle: "Proyek",
		seoDescription: "Kumpulan proyek yang telah saya buat."
	},
	projectDetail: {
		allProjects: "Semua Proyek",
		about: "Tentang",
		gallery: "Galeri",
		notFoundTitle: "Proyek tidak ditemukan",
		notFoundBody: "Proyek yang Anda cari tidak ada atau mungkin telah dihapus.",
		viewsLabel: "{count} tayangan",
		seoTitleFallback: "Proyek",
		linkGithub: "GitHub",
		linkLive: "Live",
		linkPlayStore: "Play Store",
		linkAppStore: "App Store"
	},
	certificateCard: { viewCertificate: "Lihat Sertifikat" },
	certificates: {
		allHeading: "SEMUA SERTIFIKAT",
		seoTitle: "Sertifikat",
		seoDescription: "Sertifikasi dan kredensial yang telah saya peroleh."
	},
	resume: {
		heading: "RESUME",
		lastUpdated: "Terakhir diperbarui",
		downloadPdf: "Unduh PDF",
		openPdf: "Buka PDF",
		pdfNotOnMobile: "Pratinjau PDF tidak tersedia di peramban seluler.",
		noResume: "Belum ada resume yang tersedia.",
		pdfTitle: "Resume PDF",
		seoTitle: "Resume",
		seoDescription: "Lihat dan unduh resume / CV saya."
	}
};
/**
* Supported content/UI locales. `en` is the canonical default and the fallback
* used whenever a translation is missing. The list drives both the URL `$locale`
* route segment validation and the content-translation query layer.
*/
var LOCALES = ["en", "id"];
/** Human-readable names for the language switcher. */
var LOCALE_LABELS = {
	en: "English",
	id: "Bahasa Indonesia"
};
/** Short codes shown in compact switchers. */
var LOCALE_SHORT_LABELS = {
	en: "EN",
	id: "ID"
};
/** Type guard — narrows an unknown URL segment to a supported `Locale`. */
function isLocale(value) {
	return typeof value === "string" && LOCALES.includes(value);
}
/** Name of the cookie that remembers the visitor's chosen locale. */
var LOCALE_COOKIE = "locale";
/**
* Extract a supported locale from a raw `Cookie` header value. Returns
* `undefined` when the cookie is absent or holds an unsupported value, so the
* caller can distinguish "no preference" from a real choice.
*/
function parseLocaleCookie(cookieHeader) {
	if (!cookieHeader) return void 0;
	const raw = cookieHeader.match(/(?:^|;\s*)locale=([^;]+)/)?.[1];
	const value = raw ? decodeURIComponent(raw) : void 0;
	return isLocale(value) ? value : void 0;
}
/** First supported locale referenced by an `Accept-Language` header, if any. */
function matchAcceptLanguage(header) {
	if (!header) return void 0;
	for (const part of header.toLowerCase().split(",")) {
		const code = part.trim().split(";")[0]?.split("-")[0];
		if (isLocale(code)) return code;
	}
}
/** Open Graph `og:locale` value (e.g. `en_US`, `id_ID`) for a locale. */
var OG_LOCALES = {
	en: "en_US",
	id: "id_ID"
};
function ogLocale(locale) {
	return OG_LOCALES[locale];
}
/** BCP 47 tag for `Intl` APIs (e.g. `Date#toLocaleDateString`, `Intl.NumberFormat`). */
var INTL_LOCALES = {
	en: "en-US",
	id: "id-ID"
};
function intlLocale(locale) {
	return INTL_LOCALES[locale];
}
var MESSAGES = {
	en,
	id
};
/** Returns the message catalog for a locale. */
function getMessages(locale) {
	return MESSAGES[locale];
}
/**
* Minimal `{name}` placeholder interpolation. Keeps the catalog dependency-free
* — unknown placeholders are left intact so missing vars are visible, not silent.
*/
function interpolate(template, vars) {
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (match, key) => key in vars ? String(vars[key]) : match);
}
//#endregion
export { getMessages as a, isLocale as c, parseLocaleCookie as d, LOCALE_SHORT_LABELS as i, matchAcceptLanguage as l, LOCALE_COOKIE as n, interpolate as o, LOCALE_LABELS as r, intlLocale as s, LOCALES as t, ogLocale as u };
