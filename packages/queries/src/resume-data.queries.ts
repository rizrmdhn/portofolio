import { and, eq } from "@portofolio/db";
import { db } from "@portofolio/db/client";
import { certifications, projects } from "@portofolio/db/schema/index";
import { NotFoundError } from '@portofolio/errors';

export async function getResumeData() {
  const [
    profileRow,
    experienceRows,
    certificationRows,
    educationRows,
    achievementRows,
    featuredProjects,
    techStack,
    socialLinkRows,
  ] = await Promise.all([
    db.query.profile.findFirst(),
    db.query.experiences.findMany({
      where: { status: "published" },
      orderBy: { order: "asc" },
    }),
    db
      .select()
      .from(certifications)
      .where(
        and(
          eq(certifications.status, "published"),
          eq(certifications.featuredAtResume, true),
        ),
      )
      .orderBy(certifications.order),
    db.query.education.findMany({
      where: { status: "published" },
      orderBy: { order: "asc" },
    }),
    db.query.achievements.findMany({
      where: { status: "published" },
      orderBy: { order: "asc" },
    }),
    db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.status, "published"),
          eq(projects.isVisible, true),
          eq(projects.featuredAtResume, true),
        ),
      )
      .orderBy(projects.order),
    db.query.techStackCategories.findMany({
      orderBy: { order: "asc" },
      with: { items: { orderBy: { order: "asc" } } },
    }),
    db.query.socialLinks.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  if (!profileRow) throw new NotFoundError("Profile", "singleton");

  return {
    profile: profileRow,
    experiences: experienceRows,
    certifications: certificationRows,
    education: educationRows,
    achievements: achievementRows,
    featuredProjects,
    techStack,
    socialLinks: socialLinkRows,
  };
}

export type ResumeData = Awaited<ReturnType<typeof getResumeData>>;
