ALTER TABLE "experience_translations" ADD COLUMN "achievements" text[];--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "achievements" text[] DEFAULT '{}'::text[] NOT NULL;
