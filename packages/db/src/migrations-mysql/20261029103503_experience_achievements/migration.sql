ALTER TABLE `experience_translations` ADD `achievements` json;--> statement-breakpoint
ALTER TABLE `experiences` ADD `achievements` json DEFAULT (JSON_ARRAY()) NOT NULL;
