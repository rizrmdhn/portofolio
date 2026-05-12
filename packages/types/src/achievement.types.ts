import type { InferSelectModel } from "@portofolio/db";
import type { achievements } from "@portofolio/db/schema/index";

export type Achievement = InferSelectModel<typeof achievements>;
