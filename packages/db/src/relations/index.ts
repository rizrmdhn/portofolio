import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  projects: {
    projectView: r.one.projectViews({
      from: r.projects.id,
      to: r.projectViews.projectId,
    }),
  },
  techStackCategories: {
    items: r.many.techStackItems({
      from: r.techStackCategories.id,
      to: r.techStackItems.categoryId,
    }),
  },
  techStackItems: {
    category: r.one.techStackCategories({
      from: r.techStackItems.categoryId,
      to: r.techStackCategories.id,
    }),
  },
}));
