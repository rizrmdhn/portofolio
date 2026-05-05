import type { InferSelectModel } from "@portofolio/db";
import type { techStack } from "@portofolio/db/schema/index";

export type TechStack = InferSelectModel<typeof techStack>;
