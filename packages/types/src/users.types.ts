import type { user } from "@portofolio/db/schema/index";

import type { InferInsertModel, InferSelectModel } from "@portofolio/db";

export type Users = InferSelectModel<typeof user>;

export type InsertUser = InferInsertModel<typeof user>;
