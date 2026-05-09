import type { InferSelectModel } from "@portofolio/db";
import type { projects } from "@portofolio/db/schema/index";
import type { InferQueryModel } from "./utils.types";

export type Project = InferSelectModel<typeof projects>;

export type ProjectWithView = InferQueryModel<
  "projects",
  {
    with: { projectView: true };
  }
>;

export type AllTimeProject = Project & {
  views: number;
};

export type PaginatedProjects = Project & {
  views: number;
};
