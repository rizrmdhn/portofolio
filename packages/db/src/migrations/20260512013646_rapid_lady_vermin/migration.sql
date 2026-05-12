CREATE TYPE "activity_log_action_enum" AS ENUM('created', 'updated', 'deleted');--> statement-breakpoint
CREATE TYPE "activity_log_entity_enum" AS ENUM('project', 'experience', 'certification', 'techStackCategory', 'techStackItem', 'socialLink', 'profile');--> statement-breakpoint
CREATE TABLE "activity_log" (
	"id" uuid PRIMARY KEY,
	"action" "activity_log_action_enum" NOT NULL,
	"entity" "activity_log_entity_enum" NOT NULL,
	"entity_id" uuid NOT NULL,
	"entity_title" varchar(256) NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "view_events" (
	"id" uuid PRIMARY KEY,
	"project_id" uuid NOT NULL,
	"viewed_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "activity_log_id_idx" ON "activity_log" ("id");--> statement-breakpoint
CREATE INDEX "activity_log_created_at_idx" ON "activity_log" ("created_at");--> statement-breakpoint
CREATE INDEX "view_events_project_id_idx" ON "view_events" ("project_id");--> statement-breakpoint
CREATE INDEX "view_events_viewed_at_idx" ON "view_events" ("viewed_at");--> statement-breakpoint
ALTER TABLE "view_events" ADD CONSTRAINT "view_events_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;