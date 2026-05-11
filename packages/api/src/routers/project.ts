import { incrementViews } from "@portofolio/queries/project-views.queries";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getAllTimeViewsProjects,
  getPaginatedProjects,
  getProjectById,
  getProjectsForLandingPage,
  reorderProjects,
  updateProject,
  updateProjectImageUrl,
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
import {
  createTRPCRouter,
  formDataInput,
  formDataProcedure,
  protectedProcedure,
  publicProcedure,
} from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() => getAllProjects());

    if (err) throw toTRPCError(err);

    return projects;
  }),

  getAllTimeViewsProjects: protectedProcedure.query(async () => {
    const [projects, err] = await tryCatchAsync(() =>
      getAllTimeViewsProjects(),
    );

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
    .input(formDataInput)
    .use(formDataProcedure(createProjectSchema))
    .mutation(async ({ ctx }) => {
      const { picture, ...projectData } = ctx.input;

      const [project, createErr] = await tryCatchAsync(() =>
        createProject(projectData),
      );

      if (createErr) throw toTRPCError(createErr);

      if (picture) {
        const [upload, uploadErr] = await tryCatchAsync(() =>
          utapi.uploadFiles(picture),
        );

        if (uploadErr) throw toTRPCError(uploadErr);

        if (!upload.data)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: upload.error?.message ?? "Upload failed",
          });

        const [_, imageErr] = await tryCatchAsync(() =>
          updateProjectImageUrl(project.id, upload.data.ufsUrl),
        );

        if (imageErr) throw toTRPCError(imageErr);
      }

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
    .input(formDataInput)
    .use(formDataProcedure(updateProjectSchema))
    .mutation(async ({ ctx }) => {
      const { picture, ...projectData } = ctx.input;

      const [project, err] = await tryCatchAsync(() =>
        updateProject(projectData),
      );

      if (err) throw toTRPCError(err);

      if (picture) {
        if (project.imageUrl) {
          const fileKey = project.imageUrl.split("/").pop();
          if (fileKey) await utapi.deleteFiles(fileKey);
        }

        const [upload, uploadErr] = await tryCatchAsync(() =>
          utapi.uploadFiles(picture),
        );

        if (uploadErr) throw toTRPCError(uploadErr);

        if (!upload.data)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: upload.error?.message ?? "Upload failed",
          });

        const [_, imageErr] = await tryCatchAsync(() =>
          updateProjectImageUrl(project.id, upload.data.ufsUrl),
        );

        if (imageErr) throw toTRPCError(imageErr);
      }

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

      if (result.imageUrl) {
        const imageFiles = result.imageUrl.split("/").pop();

        if (!imageFiles)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse image file name",
          });

        await utapi.deleteFiles(imageFiles);
      }

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
        updateProjectImageUrl(id, null),
      );

      if (updateErr) throw toTRPCError(updateErr);

      return true;
    }),
});
