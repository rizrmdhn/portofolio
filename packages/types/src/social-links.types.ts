import type { InferSelectModel } from "@portofolio/db";
import type { socialLinks } from "@portofolio/db/schema/index";

export type SocialLink = InferSelectModel<typeof socialLinks>;
