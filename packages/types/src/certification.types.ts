import type { InferSelectModel } from "@portofolio/db";
import type { certifications } from "@portofolio/db/schema/index";

export type Certification = InferSelectModel<typeof certifications>;
