import type { InferSelectModel } from "@portofolio/db";
import type {
  techStackCategories,
  techStackItems,
} from "@portofolio/db/schema/index";

export type TechStackCategory = InferSelectModel<typeof techStackCategories>;
export type TechStackItem = InferSelectModel<typeof techStackItems>;

export type TechStackCategoryWithItems = TechStackCategory & {
  items: Array<TechStackItem>;
};
