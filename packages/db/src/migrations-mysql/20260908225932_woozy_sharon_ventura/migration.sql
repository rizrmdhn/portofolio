CREATE TABLE `referral_visits` (
	`id` varchar(36) PRIMARY KEY,
	`referral` enum('cv','linkedin','github','twitter') NOT NULL,
	`visited_at` datetime(3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `referral_visits_referral_idx` ON `referral_visits` (`referral`);--> statement-breakpoint
CREATE INDEX `referral_visits_visited_at_idx` ON `referral_visits` (`visited_at`);