import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  projects: {
    images: r.many.projectImages({
      from: r.projects.id,
      to: r.projectImages.projectId,
    }),
  },
  projectImages: {
    project: r.one.projects({
      from: r.projectImages.projectId,
      to: r.projects.id,
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
