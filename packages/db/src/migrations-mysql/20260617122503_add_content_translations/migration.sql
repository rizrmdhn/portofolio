CREATE TABLE `achievement_translations` (
	`id` varchar(36) PRIMARY KEY,
	`achievement_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	CONSTRAINT `achievement_translations_achievement_locale_uq` UNIQUE INDEX(`achievement_id`,`locale`)
);
--> statement-breakpoint
CREATE TABLE `experience_translations` (
	`id` varchar(36) PRIMARY KEY,
	`experience_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	CONSTRAINT `experience_translations_experience_locale_uq` UNIQUE INDEX(`experience_id`,`locale`)
);
--> statement-breakpoint
CREATE TABLE `profile_translations` (
	`id` varchar(36) PRIMARY KEY,
	`profile_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`title` varchar(256) NOT NULL,
	`bio` text NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	CONSTRAINT `profile_translations_profile_locale_uq` UNIQUE INDEX(`profile_id`,`locale`)
);
--> statement-breakpoint
CREATE TABLE `project_translations` (
	`id` varchar(36) PRIMARY KEY,
	`project_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	CONSTRAINT `project_translations_project_locale_uq` UNIQUE INDEX(`project_id`,`locale`)
);
--> statement-breakpoint
CREATE INDEX `achievement_translations_achievement_id_idx` ON `achievement_translations` (`achievement_id`);--> statement-breakpoint
CREATE INDEX `experience_translations_experience_id_idx` ON `experience_translations` (`experience_id`);--> statement-breakpoint
CREATE INDEX `profile_translations_profile_id_idx` ON `profile_translations` (`profile_id`);--> statement-breakpoint
CREATE INDEX `project_translations_project_id_idx` ON `project_translations` (`project_id`);--> statement-breakpoint
ALTER TABLE `achievement_translations` ADD CONSTRAINT `achievement_translations_achievement_id_achievements_id_fkey` FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `experience_translations` ADD CONSTRAINT `experience_translations_experience_id_experiences_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `profile_translations` ADD CONSTRAINT `profile_translations_profile_id_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `project_translations` ADD CONSTRAINT `project_translations_project_id_projects_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE;