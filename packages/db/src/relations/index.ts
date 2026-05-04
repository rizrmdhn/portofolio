import { relations } from "drizzle-orm";
import { projectViews, projects, sessions, users } from "../schema";

export const sessionRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const projectRelations = relations(projects, ({ one }) => ({
  projectView: one(projectViews, {
    fields: [projects.id],
    references: [projectViews.projectId],
  }),
}));
