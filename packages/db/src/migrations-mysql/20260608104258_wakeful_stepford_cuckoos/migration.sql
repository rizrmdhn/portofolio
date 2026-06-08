CREATE TABLE `account` (
	`id` varchar(255) PRIMARY KEY,
	`user_id` varchar(255) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` datetime,
	`refresh_token_expires_at` datetime,
	`scope` text,
	`password` text,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` varchar(36) PRIMARY KEY,
	`title` varchar(256) NOT NULL,
	`issuer` varchar(256) NOT NULL,
	`description` text,
	`date` datetime(3) NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `activity_log` (
	`id` varchar(36) PRIMARY KEY,
	`action` enum('created','updated','deleted') NOT NULL,
	`entity` enum('project','experience','certification','techStackCategory','techStackItem','socialLink','profile','education','achievement') NOT NULL,
	`entity_id` varchar(36) NOT NULL,
	`entity_title` varchar(256) NOT NULL,
	`created_at` datetime(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `application_settings` (
	`id` varchar(36) PRIMARY KEY,
	`key` varchar(256) NOT NULL,
	`data` json NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	CONSTRAINT `key_unique` UNIQUE INDEX(`key`)
);
--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` varchar(36) PRIMARY KEY,
	`title` varchar(256) NOT NULL,
	`issuer` varchar(256) NOT NULL,
	`featured_at_resume` boolean NOT NULL DEFAULT false,
	`certificate_url` text,
	`certificate_id` varchar(256),
	`issue_year` datetime(3) NOT NULL,
	`expiry_year` datetime(3),
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` varchar(36) PRIMARY KEY,
	`institution` varchar(256) NOT NULL,
	`degree_level` enum('bachelor','master','doctorate','diploma','associate','high-school','bootcamp','other') NOT NULL,
	`major` varchar(256) NOT NULL,
	`gpa` varchar(64),
	`start_year` datetime(3) NOT NULL,
	`end_year` datetime(3),
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` varchar(36) PRIMARY KEY,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`company` varchar(256) NOT NULL,
	`location` varchar(256) NOT NULL,
	`type` enum('internship','full-time','freelance','part-time','contract','temporary','volunteer') NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date,
	`currently_working` boolean NOT NULL DEFAULT false,
	`skills` json NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(256) NOT NULL,
	`title` varchar(256) NOT NULL,
	`bio` text NOT NULL,
	`email` text NOT NULL,
	`location` varchar(256),
	`availability_status` enum('unavailable','available','freelance','limited') NOT NULL DEFAULT 'unavailable',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `project_images` (
	`id` varchar(36) PRIMARY KEY,
	`project_id` varchar(36) NOT NULL,
	`image_url` text NOT NULL,
	`is_cover` boolean NOT NULL DEFAULT false,
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` varchar(36) PRIMARY KEY,
	`title` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`tech` json NOT NULL,
	`github_url` text,
	`live_url` text,
	`playstore_url` text,
	`appstore_url` text,
	`image_url` text,
	`cover_color` enum('#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e','#10b981','#14b8a6','#06b6d4','#0ea5e9','#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899','#f43f5e','#64748b','#6b7280','#78716c','#737373','#71717a','#ffffff') NOT NULL DEFAULT '#ef4444',
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`is_visible` boolean NOT NULL DEFAULT false,
	`featured_at_resume` boolean NOT NULL DEFAULT false,
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3),
	`feature_at` datetime(3),
	CONSTRAINT `slug_unique` UNIQUE INDEX(`slug`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) PRIMARY KEY,
	`user_id` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `token_unique` UNIQUE INDEX(`token`)
);
--> statement-breakpoint
CREATE TABLE `social_links` (
	`id` varchar(36) PRIMARY KEY,
	`title` varchar(256) NOT NULL,
	`url` text NOT NULL,
	`icon` enum('portfolio','facebook','x','instagram','linkedin','github','youtube','tiktok','discord','telegram','whatsapp') NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`click_count` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `tech_stack_categories` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `tech_stack_items` (
	`id` varchar(36) PRIMARY KEY,
	`category_id` varchar(36) NOT NULL,
	`name` varchar(256) NOT NULL,
	`proficiency` int NOT NULL DEFAULT 1,
	`order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) PRIMARY KEY,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL,
	`image` text,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(255) PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` datetime NOT NULL,
	`created_at` datetime,
	`updated_at` datetime
);
--> statement-breakpoint
CREATE TABLE `view_events` (
	`id` varchar(36) PRIMARY KEY,
	`project_id` varchar(36) NOT NULL,
	`viewed_at` datetime(3) NOT NULL,
	`device_type` varchar(255),
	`browser` text,
	`os` text
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `achievements_id_idx` ON `achievements` (`id`);--> statement-breakpoint
CREATE INDEX `activity_log_id_idx` ON `activity_log` (`id`);--> statement-breakpoint
CREATE INDEX `activity_log_created_at_idx` ON `activity_log` (`created_at`);--> statement-breakpoint
CREATE INDEX `application_settings_id_idx` ON `application_settings` (`id`);--> statement-breakpoint
CREATE INDEX `application_settings_key_idx` ON `application_settings` (`key`);--> statement-breakpoint
CREATE INDEX `certifications_id_idx` ON `certifications` (`id`);--> statement-breakpoint
CREATE INDEX `education_id_idx` ON `education` (`id`);--> statement-breakpoint
CREATE INDEX `experiences_id_idx` ON `experiences` (`id`);--> statement-breakpoint
CREATE INDEX `profile_id_idx` ON `profile` (`id`);--> statement-breakpoint
CREATE INDEX `project_images_id_idx` ON `project_images` (`id`);--> statement-breakpoint
CREATE INDEX `project_images_project_id_idx` ON `project_images` (`project_id`);--> statement-breakpoint
CREATE INDEX `projects_id_idx` ON `projects` (`id`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `social_links_id_idx` ON `social_links` (`id`);--> statement-breakpoint
CREATE INDEX `tech_stack_categories_id_idx` ON `tech_stack_categories` (`id`);--> statement-breakpoint
CREATE INDEX `tech_stack_items_id_idx` ON `tech_stack_items` (`id`);--> statement-breakpoint
CREATE INDEX `tech_stack_items_category_id_idx` ON `tech_stack_items` (`category_id`);--> statement-breakpoint
CREATE INDEX `view_events_project_id_idx` ON `view_events` (`project_id`);--> statement-breakpoint
CREATE INDEX `view_events_viewed_at_idx` ON `view_events` (`viewed_at`);--> statement-breakpoint
CREATE INDEX `view_events_device_type_idx` ON `view_events` (`device_type`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `project_images` ADD CONSTRAINT `project_images_project_id_projects_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `tech_stack_items` ADD CONSTRAINT `tech_stack_items_category_id_tech_stack_categories_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tech_stack_categories`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `view_events` ADD CONSTRAINT `view_events_project_id_projects_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE;