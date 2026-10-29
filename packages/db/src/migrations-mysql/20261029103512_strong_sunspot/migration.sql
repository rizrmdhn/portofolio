CREATE TABLE `experience_groups` (
	`id` varchar(36) PRIMARY KEY,
	`company` varchar(256) NOT NULL,
	`label` varchar(256) NOT NULL,
	`created_at` datetime(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `experiences` ADD `group_id` varchar(36);--> statement-breakpoint
CREATE INDEX `experiences_group_id_idx` ON `experiences` (`group_id`);--> statement-breakpoint
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_group_id_experience_groups_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `experience_groups`(`id`) ON DELETE SET NULL;
