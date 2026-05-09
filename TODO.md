# Todo

## Content Management (Done)

- [x] Hero / Bio — name, title, email, bio, social URLs (GitHub, LinkedIn, Twitter)
- [x] Projects — CRUD, drag-to-reorder, image upload, search, pagination, view count on link click
- [x] Tech Stack — CRUD, drag-to-reorder, search
- [x] Experience — CRUD, drag-to-reorder, search
- [x] Certifications — CRUD, drag-to-reorder, search

## Dynamic / Forkable Features

- [ ] Social links — custom icon + title + url + order, replaces hardcoded githubUrl/linkedinUrl/twitterUrl columns

### High value, low effort
- [ ] Availability status — "open to work" toggle with custom label, shown as badge on hero
- [ ] Resume upload — upload/replace CV file, track download count
- [ ] Section visibility — toggle which sections appear on the landing page

### Medium effort
- [ ] Tech stack categories — group by category (Languages, Frameworks, Tools), needs `category` field
- [ ] Featured projects — pin flag to surface 2–3 projects at the top regardless of order
- [ ] SEO metadata — editable page title, description, and OG image per page

### Bigger lift
- [ ] Section order — drag-to-reorder landing page sections
- [ ] Custom sections — freeform blocks with title + markdown body (e.g. Writing, Speaking)

## Dashboard Overview Page

### Ready to build (data already exists)
- [ ] Top projects by views (all-time)
- [ ] Content summary — total counts of projects, experiences, certifications, tech stack
- [ ] Profile completeness indicator

### Needs new API endpoints
- [ ] Total project views — aggregated sum query
- [ ] Top projects last 30 days — date-filtered view query

### Needs new DB tables + API
- [ ] Page view chart over time — `viewEvents(projectId, timestamp)` table
- [ ] Device breakdown — store user-agent on view events
- [ ] Resume download counter — download event tracking
- [ ] Social link click-through — click event tracking
- [ ] Recent activity log — activity log table

### Use external tool instead (Plausible / Umami / Vercel Analytics)
- [ ] Unique visitors
- [ ] Avg time on page
