import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    refreshTokens: r.many.refreshTokens({
      from: r.users.id,
      to: r.refreshTokens.userId,
    }),
  },
  refreshTokens: {
    user: r.one.users({
      from: r.refreshTokens.userId,
      to: r.users.id,
    }),
  },
  projects: {
    projectView: r.one.projectViews({
      from: r.projects.id,
      to: r.projectViews.projectId,
    }),
  },
}));
