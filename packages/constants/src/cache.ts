export const CACHE_KEYS = {
  // Achievement
  ACHIEVEMENT_ALL: 'achievement:all',
  ACHIEVEMENT_PREFIX: 'achievement:',

  // Certification
  CERTIFICATION_ALL: 'certification:all',
  CERTIFICATION_LANDING: 'certification:landing',
  CERTIFICATION_PREFIX: 'certification:',

  // Education
  EDUCATION_ALL: 'education:all',
  EDUCATION_PREFIX: 'education:',

  // Experience
  EXPERIENCE_ALL: 'experience:all',
  EXPERIENCE_PREFIX: 'experience:',

  // Profile
  PROFILE_DATA: 'profile:data',
  PROFILE_PREFIX: 'profile:',

  // Project
  PROJECT_ALL: 'project:all',
  PROJECT_LANDING: 'project:landing',
  PROJECT_SLUG_PREFIX: 'project:slug:',
  PROJECT_IMAGES_PREFIX: 'project:images:',
  PROJECT_VIEW_DEDUP_PREFIX: 'project:view-dedup:',
  PROJECT_PREFIX: 'project:',

  // Resume
  RESUME_CV: 'resume:cv',
  RESUME_SETTINGS: 'resume:settings',
  RESUME_PREFIX: 'resume:',

  // SEO
  SEO_ALL: 'seo:all',
  SEO_PAGE_PREFIX: 'seo:page:',
  SEO_PREFIX: 'seo:',

  // Social Link
  SOCIAL_LINK_ALL: 'social-link:all',
  SOCIAL_LINK_PREFIX: 'social-link:',

  // Tech Stack
  TECH_STACK_ALL: 'tech-stack:all',
  TECH_STACK_PREFIX: 'tech-stack:',
} as const

export type CacheKey = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS]

/** Cache TTL values in seconds */
export const CACHE_TTL = {
  /** 24 hours - for daily de-duplication windows and very stable data */
  DAY: 86400,
  /** 1 hour - for rarely changing reference data */
  LONG: 3600,
  /** 30 minutes - for moderately changing data */
  MEDIUM: 1800,
  /** 5 minutes - for frequently changing data */
  SHORT: 300,
} as const

export type CacheTTL = (typeof CACHE_TTL)[keyof typeof CACHE_TTL]
