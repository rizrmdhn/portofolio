# Experience employment groups (EXP-04)

Each `experience_groups` row represents one user-declared continuous employment stint:

- `id`: UUIDv7 primary key (Postgres uuid / MySQL varchar(36)).
- `company`: required company identity, up to 256 characters.
- `label`: required author-facing label, up to 256 characters; use years to distinguish return stints.
- `createdAt`: creation timestamp, following the existing application-side default convention.

`experiences.groupId` is a nullable, indexed foreign key to that row. Existing rows remain null; no company-based backfill occurs. The FK uses ON DELETE SET NULL, preserving positions if a group is removed administratively. Dates, title, description, skills, status, order, and content translations remain properties of each position. Date continuity is an author assertion, not inferred or enforced from dates.

## API and dashboard

Existing experience getAll/getById/dashboard responses and the inferred `Experience` type expose `groupId: string | null`. `ExperienceGroup` is exported from the same types module. The public response stays flat and localized as before; no group metadata join or public timeline change is included.

- Existing create/update inputs accept `groupId?: UUID | null`.
- On create, omission/null means ungrouped. On update, omission preserves membership; null detaches, and another UUID moves the position.
- Membership requires an existing group and an exact, case-sensitive company match after trimming outer whitespace. Changing company while grouped requires explicitly changing or removing membership. Validation also covers older clients that omit groupId.
- Protected `experience.getGroups` returns all groups ordered by creation time/id (uncached).
- Protected `experience.createGroup({ company, label })` trims and validates both strings and returns the created row. Company and label are not unique: separate stints can have the same company, and identity is always the UUID. There is no group company edit endpoint.
- Both experience forms let the author select a group for the entered company, create/select a separately labelled group, switch groups, or choose No group. No group removes only membership when the position is saved. Groups are saved immediately and remain reusable if the form is cancelled; positions are never deleted by detachment. Group deletion is not exposed in the forms.
- The existing dashboard convention is English; new catalog entries also have Indonesian equivalents. Groups do not introduce translatable public content; existing title/description translation authoring is unchanged.

Experience writes continue invalidating the server `experience:` prefix (all localized lists and individual records). The forms invalidate affected React Query lists and the edited record. Group creation refreshes the uncached group list; it changes no positions. Clear existing experience caches at deployment or allow the existing five-minute TTL before relying on the new property in old cached responses.

## Backup, migrations, and integration

The generic db:dump exporter automatically includes `experienceGroups.json` and groupId in experience rows. db:import restores groups before positions and deletes in reverse order for --truncate. Before any write it validates the combined dump/target company memberships, including incremental imports that would change a group's company. Older dumps without groups/groupId remain supported. Import remains an offline administrative tool; do not run it concurrently with dashboard writes, and restart/clear application caches after an import as with other existing imports.

Additive migrations and generated snapshots are included for both dialects:

- Postgres: `20261029103512_experience_groups`
- MySQL: `20261029103512_strong_sunspot`

No migrations were applied. Generation discovered existing referral enum drift (instagram in schema but absent from the previous snapshots); that unrelated change was excluded from both migration SQL and snapshots.

EXP-05 should group only records sharing a non-null groupId; all null rows are independent, including matching companies. Use each position's localized text and dates and calculate any group display bounds in the timeline consumer. Labels are dashboard metadata, not public headings. The group relationship is available to queries as `group`, and its inverse is `positions`.

Integration with EXP-03 preserves both achievements and grouping in the schema and forms. Each dialect's group migration follows its achievements migration; the group snapshots include both achievement columns and reference the achievements snapshot as their parent. The Postgres group directory was moved after the achievements migration before deployment to keep timestamp order consistent with that chain. Do not apply migrations to a live database as part of integration verification.

## Verification

Run `pnpm --filter @portofolio/db exec tsx --test tests/experience-group.test.ts` with DATABASE_PROVIDER unset/postgresql, then with DATABASE_PROVIDER=mysql. These are database-free contract/schema tests, covering legacy rows, explicit membership/switching/detachment, UUID/string validation, company consistency, returning employees, and both dialect FK/index metadata. They do not execute SQL against a database.

The existing endDate schema rejects omitted values at runtime (drizzle-zod wraps its undefined union as nonoptional). Dated test fixtures avoid that pre-existing issue; EXP-04 does not change date validation.
