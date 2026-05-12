import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
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
