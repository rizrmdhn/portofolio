CREATE TYPE "color_enum" AS ENUM('#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#64748b', '#6b7280', '#78716c');--> statement-breakpoint
CREATE TYPE "experience_status_enum" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "project_status_enum" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "issue_date" TO "issue_year";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "expiry_date" TO "expiry_year";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "certifications" ADD COLUMN "status" "experience_status_enum" DEFAULT 'draft'::"experience_status_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "location" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "skills" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "status" "experience_status_enum" DEFAULT 'draft'::"experience_status_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "slug" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "long_description" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cover_color" "color_enum" DEFAULT '#ffffff'::"color_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" "project_status_enum" DEFAULT 'draft'::"project_status_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_visible" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "issue_year" SET DATA TYPE integer USING "issue_year"::integer;--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "issue_year" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "expiry_year" SET DATA TYPE integer USING "expiry_year"::integer;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_key" UNIQUE("slug");