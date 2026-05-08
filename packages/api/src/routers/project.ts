import { incrementViews } from "@portofolio/queries/project-views.queries";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getPaginatedProjects,
  getProjectById,
  getProjectsForLandingPage,
  insertImageToProject,
  reorderProjects,
  updateProject,
} from "@portofolio/queries/project.queries";
import {
  createProjectSchema,
  getProjectsSchema,
  reorderProjectsSchema,
  updateProjectSchema,
} from "@portofolio/schema/project.schema";
import utapi from "@portofolio/uploadthing";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() => getAllProjects());

    if (err) throw toTRPCError(err);

    return projects;
  }),

  getForLandingPage: publicProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() =>
      getProjectsForLandingPage(),
    );

    if (err) throw toTRPCError(err);

    return projects;
  }),

  getPaginatedProjects: protectedProcedure
    .input(getProjectsSchema)
    .query(async ({ input }) => {
      const [projects, err] = await tryCatchAsync(() =>
        getPaginatedProjects(input),
      );

      if (err) throw toTRPCError(err);

      return projects;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const [project, err] = await tryCatchAsync(() => getProjectById(id));

      if (err) throw toTRPCError(err);

      return project;
    }),

  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input }) => {
      const [project, err] = await tryCatchAsync(() => createProject(input));

      if (err) throw toTRPCError(err);

      return project;
    }),

  updateView: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input: { projectId } }) => {
      const [views, err] = await tryCatchAsync(() => incrementViews(projectId));

      if (err) throw toTRPCError(err);

      return views;
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input }) => {
      const [project, err] = await tryCatchAsync(() => updateProject(input));

      if (err) throw toTRPCError(err);

      return project;
    }),

  reorder: protectedProcedure
    .input(reorderProjectsSchema)
    .mutation(async ({ input }) => {
      const [, err] = await tryCatchAsync(() => reorderProjects(input));

      if (err) throw toTRPCError(err);

      return true;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() => deleteProject(id));

      if (err) throw toTRPCError(err);

      return result;
    }),

  deleteImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [project, err] = await tryCatchAsync(() => getProjectById(id));

      if (!project) throw toTRPCError(err);

      if (!project.imageUrl)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project does not have an image",
        });

      const imageFiles = project.imageUrl.split("/").pop();

      if (!imageFiles)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse image file name",
        });

      await utapi.deleteFiles(imageFiles);

      const [_, updateErr] = await tryCatchAsync(() =>
        insertImageToProject(id, null),
      );

      if (updateErr) throw toTRPCError(updateErr);

      return true;
    }),
});
