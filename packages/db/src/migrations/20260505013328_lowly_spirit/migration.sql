ALTER TABLE "portofolio-webpage-v5_application_settings" RENAME TO "application_settings";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_certifications" RENAME TO "certifications";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_experiences" RENAME TO "experiences";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_project_views" RENAME TO "project_views";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_projects" RENAME TO "projects";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_refresh_tokens" RENAME TO "refresh_tokens";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_tech_stack" RENAME TO "tech_stack";--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_users" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "application_settings" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "application_settings" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "issueDate" TO "issue_date";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "expiryDate" TO "expiry_date";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "certifications" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "startDate" TO "start_date";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "endDate" TO "end_date";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "currentlyWorking" TO "currently_working";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "project_views" RENAME COLUMN "projectId" TO "project_id";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "tech_stack" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "tech_stack" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "application_settings" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "certifications" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tech_stack" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT;