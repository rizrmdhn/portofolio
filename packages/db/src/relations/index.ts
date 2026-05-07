import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  projects: {
    projectView: r.one.projectViews({
      from: r.projects.id,
      to: r.projectViews.projectId,
    }),
  },
}));
