import type { InferSelectModel } from "@portofolio/db";
import type { applicationSettings } from "@portofolio/db/schema/index";

export type ApplicationSettings = InferSelectModel<typeof applicationSettings>;
