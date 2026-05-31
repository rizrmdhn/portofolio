CREATE TABLE "project_images" (
	"id" uuid PRIMARY KEY,
	"project_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "project_images_id_idx" ON "project_images" ("id");--> statement-breakpoint
CREATE INDEX "project_images_project_id_idx" ON "project_images" ("project_id");--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;