import type { InferSelectModel } from "@portofolio/db";
import type { projects } from "@portofolio/db/schema/index";

export type Project = InferSelectModel<typeof projects>;

export type ProjectWithViewCount = Project & { viewCount: number };

export type AllTimeProject = {
  id: string;
  title: string;
  views: number;
};

export type PaginatedProjects = Project & {
  views: number;
};
