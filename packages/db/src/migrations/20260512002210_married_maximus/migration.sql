CREATE TABLE "tech_stack_items" (
	"id" uuid PRIMARY KEY,
	"category_id" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"proficiency" integer DEFAULT 1 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "tech_stack" RENAME TO "tech_stack_categories";--> statement-breakpoint
ALTER INDEX "tech_stack_id_idx" RENAME TO "tech_stack_categories_id_idx";--> statement-breakpoint
ALTER TABLE "tech_stack_categories" DROP COLUMN "list";--> statement-breakpoint
CREATE INDEX "tech_stack_items_id_idx" ON "tech_stack_items" ("id");--> statement-breakpoint
CREATE INDEX "tech_stack_items_category_id_idx" ON "tech_stack_items" ("category_id");--> statement-breakpoint
ALTER TABLE "tech_stack_items" ADD CONSTRAINT "tech_stack_items_category_id_tech_stack_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tech_stack_categories"("id") ON DELETE CASCADE;