# Logical data dumps

Run `pnpm --filter @portofolio/db db:dump` for a strict export using the current
mapped schema. It fails if a table or column is missing.

To inspect/export an older configured database without changing it:

```sh
pnpm --filter @portofolio/db db:dump --legacy-schema
```

Legacy mode reads `information_schema` in PostgreSQL's `current_schema()` or
MySQL's `DATABASE()`. It exports existing known application tables using only
available mapped columns, keeping the normal camelCase JSON keys and Drizzle
value codecs. It checks catalog visibility with zero-row SELECTs: permission,
connection, catalog and unexpected query failures stop the dump. An existing
table with no mapped columns also fails. No migrations or writes run.

Each new `packages/db/dump_*` directory contains:

- `<exportKey>.json`: rows for an exported table; absent tables have no row file.
- `_metadata.json`: provider, active schema, missing tables/columns, unmapped
  tables/columns and consistency limitations. It contains no row data or credentials.
- `_manifest.json`: unchanged per-table counts and hashes, written **last**, only
  after every planned export succeeds. Its presence marks completion of this
  export, including the omissions explicitly recorded in metadata. A directory
  without it is partial and must not be used as a completed backup. Prior-dump
  comparisons consider only directories with a manifest.

These are sequential reads, **not a point-in-time snapshot**. Pause application
writes and schema changes externally if consistency across tables is required.
The metadata/zero-row checks and exports can race concurrent DDL; query failures
remain fatal. Catalog access and SELECT privileges are required. Dumps contain
sensitive application data even though progress logs contain only structural
names and counts; keep dump directories private (they are gitignored).

This is a known-table data backup, not a native DDL or migration-history backup.
Unmapped structures are reported but not exported; take a native backup separately
when needed. Existing data types must still be compatible with current codecs.
Baseline/upgrade decisions still require inspecting metadata and the actual old
schema; this command neither establishes a baseline nor upgrades the database.

For restore, inspect `_metadata.json` and import into a compatible, prepared
schema. Missing optional columns are omitted from JSON so inserts can use target
DB defaults (or NULL where allowed); required columns without suitable defaults
need a restoration plan. `db:import` has an explicit table allowlist: check its
coverage before restoring, particularly translation tables. This export does not
change that importer or guarantee compatibility with every target schema.
