import type { users } from "@portofolio/db/schema/index";

import type { InferInsertModel } from "@portofolio/db";
import type { InferQueryModel } from "./utils.types";

export type Users = InferQueryModel<
  "users",
  {
    columns: {
      password: false;
    };
  }
>;

export type InsertUser = InferInsertModel<typeof users>;
