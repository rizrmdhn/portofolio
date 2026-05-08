import {
  createCertification,
  deleteCertification,
  getAllCertifications,
  getCertificatesForLandingPage,
  getCertificationById,
  updateCertification,
} from "@portofolio/queries/certification.queries";
import {
  createCertificationSchema,
  updateCertificationSchema,
} from "@portofolio/schema/certifcation.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const certificationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const [certifications, err] = await tryCatchAsync(() =>
      getAllCertifications(),
    );

    if (err) throw toTRPCError(err);

    return certifications;
  }),

  getForLandingPage: publicProcedure.query(async () => {
    const [certifications, err] = await tryCatchAsync(() =>
      getCertificatesForLandingPage(),
    );

    if (err) throw toTRPCError(err);

    return certifications;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const [certification, err] = await tryCatchAsync(() =>
        getCertificationById(id),
      );

      if (err) throw toTRPCError(err);

      return certification;
    }),

  create: protectedProcedure
    .input(createCertificationSchema)
    .mutation(async ({ input }) => {
      const [certification, err] = await tryCatchAsync(() =>
        createCertification(input),
      );

      if (err) throw toTRPCError(err);

      return certification;
    }),

  update: protectedProcedure
    .input(updateCertificationSchema)
    .mutation(async ({ input }) => {
      const [certification, err] = await tryCatchAsync(() =>
        updateCertification(input),
      );

      if (err) throw toTRPCError(err);

      return certification;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const [result, err] = await tryCatchAsync(() => deleteCertification(id));

      if (err) throw toTRPCError(err);

      return result;
    }),
});
