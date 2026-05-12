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
- [ ] Resume download counter — track PDF download count (generated, not uploaded)

### Medium effort

- [x] Tech stack categories — group by category (Languages, Frameworks, Tools), needs `category` field
- [x] Featured projects — pin flag to surface 2–3 projects at the top regardless of order
- [ ] SEO metadata — editable page title, description, and OG image per page

### Bigger lift

- [ ] Section order — drag-to-reorder landing page sections
- [ ] Custom sections — freeform blocks with title + markdown body (e.g. Writing, Speaking)

## Resume / CV Generator

- [ ] ATS template — single column, plain text, no icons/colors, passes resume scanners
- [ ] Creative template — two-column, accent colors, icons, profile photo
- [ ] Font picker — store `resumeFont` in profile, applied to both templates
- [ ] Accent color picker — store `resumeAccentColor` in profile, applied to both templates
- [ ] Server-side PDF generation via tRPC endpoint (streams downloadable file)
- [ ] Track resume download count (feeds into dashboard stats)

## Dashboard Overview Page

### Ready to build (data already exists)

- [x] Top projects by views (all-time)
- [x] Content summary — total counts of projects, experiences, certifications, tech stack
- [x] Total project views — aggregated sum query
- [ ] Profile completeness indicator
- [ ] Top projects last 30 days — date-filtered view query

### Needs new DB tables + API

- [ ] Page view chart over time — `viewEvents(projectId, timestamp)` table
- [ ] Resume download counter — download event tracking
- [x] Social link click-through — click event tracking
- [ ] Recent activity log — activity log table

### Use external tool instead (Plausible / Umami / Vercel Analytics)

- [ ] Unique visitors
- [ ] Avg time on page
