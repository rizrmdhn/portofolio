import type { InferSelectModel } from "@portofolio/db";
import type { education } from "@portofolio/db/schema/index";

export type Education = InferSelectModel<typeof education>;
