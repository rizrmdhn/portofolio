CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"bio" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "profile_id_idx" ON "profile" ("id");