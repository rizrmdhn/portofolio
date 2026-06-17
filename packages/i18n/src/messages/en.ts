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
export const en = {
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    certs: 'Certs',
    contact: 'Contact',
    resume: 'Resume ↗',
    menu: 'Menu',
    openMenu: 'Open menu',
    theme: 'Theme',
    language: 'Language',
  },

  availability: {
    unavailable: 'Not available',
    available: 'Open to work',
    freelance: 'Open to freelance',
    limited: 'Limited availability',
  },

  experienceType: {
    internship: 'Internship',
    'full-time': 'Full-Time',
    freelance: 'Freelance',
    'part-time': 'Part-Time',
    contract: 'Contract',
    temporary: 'Temporary',
    volunteer: 'Volunteer',
  },

  experienceCard: {
    present: 'Present',
    yearShort: 'yr',
    yearShortPlural: 'yrs',
    monthShort: 'mo',
    monthShortPlural: 'mos',
    lessThanMonth: '< 1 mo',
  },

  home: {
    email: 'Email',
    viewProjects: 'View Projects',
    contact: 'Contact',
    experienceHeading: 'WORK EXPERIENCE',
    projectsHeading: 'PROJECTS',
    viewAllProjects: 'View all projects',
    stackHeading: 'TECH STACK',
    certificatesHeading: 'CERTIFICATES',
    viewAllCertificates: 'View all certificates',
    contactHeading: 'CONTACT',
    contactTitle: "Let's work together.",
    contactBody:
      "I'm open to freelance work, full-time roles, and interesting side projects. If you have something in mind, reach out.",
    sendEmail: 'Send me an email',
    empty: {
      experienceTitle: 'No experience yet',
      experienceDesc: 'It seems there are no experiences to show at the moment.',
      projectsTitle: 'No projects yet',
      projectsDesc: 'It seems there are no projects to show at the moment.',
      stackTitle: 'No tech stack yet',
      stackDesc: 'It seems there are no tech stacks to show at the moment.',
      certificatesTitle: 'No certificates yet',
      certificatesDesc: 'It seems there are no certificates to show at the moment.',
    },
    seoTitleFallback: 'Portfolio',
  },

  footer: {
    github: 'Github',
    linkedin: 'LinkedIn',
    email: 'Email',
  },

  projects: {
    allHeading: 'ALL PROJECTS',
    showLess: 'Show less',
    showMore: '+{count} more',
    seoTitle: 'Projects',
    seoDescription: "A collection of projects I've built.",
  },

  projectDetail: {
    allProjects: 'All Projects',
    about: 'About',
    gallery: 'Gallery',
    notFoundTitle: 'Project not found',
    notFoundBody: "The project you're looking for doesn't exist or may have been removed.",
    viewsLabel: '{count} views',
    seoTitleFallback: 'Project',
    linkGithub: 'GitHub',
    linkLive: 'Live',
    linkPlayStore: 'Play Store',
    linkAppStore: 'App Store',
  },

  certificateCard: {
    viewCertificate: 'View Certificate',
  },

  certificates: {
    allHeading: 'ALL CERTIFICATIONS',
    seoTitle: 'Certificates',
    seoDescription: "Certifications and credentials I've earned.",
  },

  resume: {
    heading: 'RESUME',
    lastUpdated: 'Last updated',
    downloadPdf: 'Download PDF',
    openPdf: 'Open PDF',
    pdfNotOnMobile: 'PDF preview is not available on mobile browsers.',
    noResume: 'No resume available yet.',
    pdfTitle: 'Resume PDF',
    seoTitle: 'Resume',
    seoDescription: 'View and download my resume / CV.',
  },
} as const

/**
 * Widen string-literal leaves back to `string` while preserving the nested key
 * structure. `en` is `as const` (so consumers get exact key autocompletion), but
 * other locales only need to match the *shape*, not the English text.
 */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> }

export type Messages = Widen<typeof en>
