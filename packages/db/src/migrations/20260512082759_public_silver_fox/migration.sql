CREATE TYPE "degree_enum" AS ENUM('bachelor', 'master', 'doctorate', 'diploma', 'associate', 'high-school', 'bootcamp', 'other');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY,
	"title" varchar(256) NOT NULL,
	"issuer" varchar(256) NOT NULL,
	"description" text,
	"date" timestamp with time zone NOT NULL,
	"status" "experience_status_enum" DEFAULT 'draft'::"experience_status_enum" NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY,
	"institution" varchar(256) NOT NULL,
	"degree_level" "degree_enum" NOT NULL,
	"major" varchar(256) NOT NULL,
	"gpa" varchar(64),
	"start_year" timestamp with time zone NOT NULL,
	"end_year" timestamp with time zone,
	"status" "experience_status_enum" DEFAULT 'draft'::"experience_status_enum" NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "location" varchar(256);--> statement-breakpoint
CREATE INDEX "achievements_id_idx" ON "achievements" ("id");--> statement-breakpoint
CREATE INDEX "education_id_idx" ON "education" ("id");