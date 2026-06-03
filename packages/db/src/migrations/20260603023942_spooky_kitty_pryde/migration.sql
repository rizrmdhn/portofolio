ALTER TABLE "view_events" ADD COLUMN "device_type" text;--> statement-breakpoint
ALTER TABLE "view_events" ADD COLUMN "browser" text;--> statement-breakpoint
ALTER TABLE "view_events" ADD COLUMN "os" text;--> statement-breakpoint
CREATE INDEX "view_events_device_type_idx" ON "view_events" ("device_type");