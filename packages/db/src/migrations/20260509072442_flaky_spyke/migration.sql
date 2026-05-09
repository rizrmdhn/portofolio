CREATE TYPE "social_icon_enum" AS ENUM('facebook', 'x', 'instagram', 'linkedin', 'github', 'youtube', 'tiktok', 'discord', 'telegram', 'whatsapp');--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY,
	"title" varchar(256) NOT NULL,
	"url" text NOT NULL,
	"icon" "social_icon_enum" NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "github_url";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "linkedin_url";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "twitter_url";--> statement-breakpoint
CREATE INDEX "social_links_id_idx" ON "social_links" ("id");