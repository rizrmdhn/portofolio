CREATE TABLE "portofolio-webpage-v5_refresh_tokens" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL UNIQUE,
	"device_info" text,
	"os" text,
	"version" varchar(100),
	"ip_address" varchar(45),
	"user_agent" text,
	"last_used_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked" boolean DEFAULT false NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DROP TABLE "portofolio-webpage-v5_sessions";--> statement-breakpoint
CREATE INDEX "refresh_token_user_id_idx" ON "portofolio-webpage-v5_refresh_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX "refresh_token_token_idx" ON "portofolio-webpage-v5_refresh_tokens" ("token");--> statement-breakpoint
CREATE INDEX "refresh_token_expires_at_idx" ON "portofolio-webpage-v5_refresh_tokens" ("expires_at");--> statement-breakpoint
ALTER TABLE "portofolio-webpage-v5_refresh_tokens" ADD CONSTRAINT "portofolio-webpage-v5_refresh_tokens_F5WAf0PRZdG7_fkey" FOREIGN KEY ("user_id") REFERENCES "portofolio-webpage-v5_users"("id") ON DELETE CASCADE;