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
  experiencePosition: {
    history: 'Career history',
    context:
      'Add a new role at the saved company. Your current edits and existing roles stay intact.',
    historyError: 'Could not load career history.',
    present: 'Present',
    add: 'Add position',
    dirty: 'Save your company or employment group changes before adding a position.',
    company: 'Saved company',
    employment: 'Employment',
    same: 'Same employment stint',
    newStint: 'New employment stint',
    sameHelp: 'Continue this employment. A shared group is created only when you save, if needed.',
    newHelp:
      'Returning after leaving? Create a separate employment stint. Existing roles stay in their current group.',
    title: 'Role / Title',
    location: 'Location',
    type: 'Employment type',
    start: 'Start date',
    end: 'End date',
    current: 'Currently working in this role',
    description: 'Description',
    achievements: 'Achievements (one per line)',
    skills: 'Skills (one per line)',
    status: 'Status',
    cancel: 'Cancel',
    saving: 'Saving�',
    save: 'Save new position',
  },
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

  experienceGroup: {
    label: 'Employment group (author metadata, optional)',
    help: 'Group positions only when they belong to one continuous employment stint. For a return to the same company, create a separate group. Choose No group to detach without deleting the position.',
    none: 'No group',
    newLabel: 'New group label',
    placeholder: 'e.g. First stint - 2020-2022',
    create: 'Create and select group',
    mismatch:
      'This group belongs to a different company. Change or remove the group before saving.',
    loadError: 'Unable to load employment groups. Please try again.',
    retry: 'Try again',
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
