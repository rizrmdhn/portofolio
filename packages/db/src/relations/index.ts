import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  projects: {
    images: r.many.projectImages({
      from: r.projects.id,
      to: r.projectImages.projectId,
    }),
    translations: r.many.projectTranslations({
      from: r.projects.id,
      to: r.projectTranslations.projectId,
    }),
  },
  projectImages: {
    project: r.one.projects({
      from: r.projectImages.projectId,
      to: r.projects.id,
    }),
  },
  projectTranslations: {
    project: r.one.projects({
      from: r.projectTranslations.projectId,
      to: r.projects.id,
    }),
  },
  experiences: {
    translations: r.many.experienceTranslations({
      from: r.experiences.id,
      to: r.experienceTranslations.experienceId,
    }),
  },
  experienceTranslations: {
    experience: r.one.experiences({
      from: r.experienceTranslations.experienceId,
      to: r.experiences.id,
    }),
  },
  profile: {
    translations: r.many.profileTranslations({
      from: r.profile.id,
      to: r.profileTranslations.profileId,
    }),
  },
  profileTranslations: {
    profile: r.one.profile({
      from: r.profileTranslations.profileId,
      to: r.profile.id,
    }),
  },
  achievements: {
    translations: r.many.achievementTranslations({
      from: r.achievements.id,
      to: r.achievementTranslations.achievementId,
    }),
  },
  achievementTranslations: {
    achievement: r.one.achievements({
      from: r.achievementTranslations.achievementId,
      to: r.achievements.id,
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
