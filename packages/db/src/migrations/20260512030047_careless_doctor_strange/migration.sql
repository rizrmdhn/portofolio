DROP TABLE "project_views";--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "issue_year" SET DATA TYPE timestamp with time zone USING make_timestamptz("issue_year", 1, 1, 0, 0, 0);--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "issue_year" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "expiry_year" SET DATA TYPE timestamp with time zone USING make_timestamptz("expiry_year", 1, 1, 0, 0, 0);