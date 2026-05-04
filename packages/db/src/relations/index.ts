import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  sessions: {
    users: r.one.users({
      from: r.sessions.userId,
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
