CREATE TYPE "referral_source_enum" AS ENUM('cv', 'linkedin', 'github', 'twitter');--> statement-breakpoint
CREATE TABLE "referral_visits" (
	"id" uuid PRIMARY KEY,
	"referral" "referral_source_enum" NOT NULL,
	"visited_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "referral_visits_referral_idx" ON "referral_visits" ("referral");--> statement-breakpoint
CREATE INDEX "referral_visits_visited_at_idx" ON "referral_visits" ("visited_at");