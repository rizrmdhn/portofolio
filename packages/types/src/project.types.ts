import type { InferSelectModel } from "@portofolio/db";
import type { projects } from "@portofolio/db/schema/index";

export type Project = InferSelectModel<typeof projects>;
