# Todo

## Content Management (Done)

- [x] Hero / Bio — name, title, email, bio, social URLs (GitHub, LinkedIn, Twitter)
- [x] Projects — CRUD, drag-to-reorder, image upload, search, pagination, view count on link click
- [x] Tech Stack — CRUD, drag-to-reorder, search
- [x] Experience — CRUD, drag-to-reorder, search
- [x] Certifications — CRUD, drag-to-reorder, search

## Dynamic / Forkable Features

- [x] Social links — custom icon + title + url + order, replaces hardcoded githubUrl/linkedinUrl/twitterUrl columns

### High value, low effort

- [x] Availability status — "open to work" toggle with custom label, shown as badge on hero
- [x] Resume download counter — track PDF download count (generated, not uploaded)

### Medium effort

- [x] Tech stack categories — group by category (Languages, Frameworks, Tools), needs `category` field
- [x] Featured projects — pin flag to surface 2–3 projects at the top regardless of order
- [ ] SEO metadata — editable page title, description, and OG image per page

### Bigger lift

- [ ] Section order — drag-to-reorder landing page sections
- [ ] Custom sections — freeform blocks with title + markdown body (e.g. Writing, Speaking)

## Resume / CV Generator (Done)

- [x] ATS template — single-column, plain text, 1-page compact layout, no word hyphenation
- [x] Creative template — two-column, accent colors, sidebar layout
- [x] Font picker — Liberation Sans / Inter / Arimo, applied per render
- [x] Accent color picker — hex color stored in resume settings
- [x] Server-side PDF generation via tRPC `resume.generate` → uploads to Uploadthing
- [x] Server-side preview via tRPC `resume.preview` → returns base64, shown in dashboard iframe
- [x] Track resume download count — `resume.trackDownload` mutation + dashboard stat card
- [x] Featured projects on resume — per-project `featuredAtResume` toggle in dashboard
- [x] Featured certifications on resume — per-certification `featuredAtResume` toggle in dashboard
- [x] Education section — separate `education` table (institution, degree enum, major, GPA)
- [x] Achievements section — separate `achievements` table (title, issuer, description, date)
- [x] Profile location field — shown in resume header as `location · email`

## Resume / CV Generator (Remaining)

- [ ] Education CRUD — dashboard page with create / edit / delete / reorder
- [ ] Achievements CRUD — dashboard page with create / edit / delete / reorder

## Dashboard Overview Page

### Ready to build (data already exists)

- [x] Top projects by views (all-time)
- [x] Content summary — total counts of projects, experiences, certifications, tech stack
- [x] Total project views — aggregated sum query
- [ ] Profile completeness indicator
- [x] Top projects last 30 days — date-filtered view query

### Needs new DB tables + API

- [x] Page view chart over time — `viewEvents(projectId, timestamp)` table
- [x] Resume download counter — download event tracking
- [x] Social link click-through — click event tracking
- [x] Recent activity log — activity log table

### Use external tool instead (Plausible / Umami / Vercel Analytics)

- [ ] Unique visitors
- [ ] Avg time on page
