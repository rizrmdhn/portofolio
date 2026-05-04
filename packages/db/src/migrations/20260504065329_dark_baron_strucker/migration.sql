CREATE TYPE "experience_type" AS ENUM('internship', 'full-time', 'freelance', 'part-time', 'contract', 'temporary', 'volunteer');--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_application_settings" (
	"id" uuid PRIMARY KEY,
	"key" varchar(256) NOT NULL UNIQUE,
	"data" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_certifications" (
	"id" uuid PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	"issuer" varchar(256) NOT NULL,
	"certificate_url" text,
	"certificate_id" varchar(256),
	"issueDate" date NOT NULL,
	"expiryDate" date,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_experiences" (
	"id" uuid PRIMARY KEY,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"company" varchar(256) NOT NULL,
	"type" "experience_type" NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date,
	"currentlyWorking" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_project_views" (
	"id" uuid PRIMARY KEY,
	"projectId" uuid NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_projects" (
	"id" uuid PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"tech" text[] NOT NULL,
	"github_url" text,
	"live_url" text,
	"playstore_url" text,
	"appstore_url" text,
	"image_url" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_sessions" (
	"id" uuid PRIMARY KEY,
	"userId" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_tech_stack" (
	"id" uuid PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	"list" text[] NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portofolio-webpage-v5_users" (
	"id" uuid PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "application_settings_id_idx" ON "portofolio-webpage-v5_application_settings" ("id");--> statement-breakpoint
CREATE INDEX "application_settings_key_idx" ON "portofolio-webpage-v5_application_settings" ("key");--> statement-breakpoint
CREATE INDEX "certifications_id_idx" ON "portofolio-webpage-v5_certifications" ("id");--> statement-breakpoint
CREATE INDEX "experiences_id_idx" ON "portofolio-webpage-v5_experiences" ("id");--> statement-breakpoint
CREATE INDEX "project_views_id_idx" ON "portofolio-webpage-v5_project_views" ("id");--> statement-breakpoint
CREATE INDEX "projects_id_idx" ON "portofolio-webpage-v5_projects" ("id");--> statement-breakpoint
CREATE INDEX "session_id_idx" ON "portofolio-webpage-v5_sessions" ("id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "portofolio-webpage-v5_sessions" ("userId");--> statement-breakpoint
CREATE INDEX "tech_stack_id_idx" ON "portofolio-webpage-v5_tech_stack" ("id");--> statement-breakpoint
CREATE INDEX "users_id_idx" ON "portofolio-webpage-v5_users" ("id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "portofolio-webpage-v5_users" ("email");--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_project_views" ADD CONSTRAINT "portofolio-webpage-v5_project_views_OKHu9x47q1e2_fkey" FOREIGN KEY ("projectId") REFERENCES "portofolio-webpage-v5_projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_sessions" ADD CONSTRAINT "portofolio-webpage-v5_sessions_jgvpqnexK0v7_fkey" FOREIGN KEY ("userId") REFERENCES "portofolio-webpage-v5_users"("id") ON DELETE CASCADE;