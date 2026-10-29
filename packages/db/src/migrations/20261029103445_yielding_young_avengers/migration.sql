CREATE TABLE "experience_groups" (
	"id" uuid PRIMARY KEY,
	"company" varchar(256) NOT NULL,
	"label" varchar(256) NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "group_id" uuid;--> statement-breakpoint
CREATE INDEX "experiences_group_id_idx" ON "experiences" ("group_id");--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_group_id_experience_groups_id_fkey" FOREIGN KEY ("group_id") REFERENCES "experience_groups"("id") ON DELETE SET NULL;
