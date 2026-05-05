import type { InferSelectModel } from "@portofolio/db";
import type { experiences } from "@portofolio/db/schema/index";

export type Experience = InferSelectModel<typeof experiences>;
