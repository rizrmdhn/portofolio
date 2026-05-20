import { createActivityLog } from "@portofolio/queries/activity-log.queries";
import {
  createCertification,
  deleteCertification,
  getAllCertifications,
  getCertificatesForLandingPage,
  getCertificationById,
  getCertificationsForDashboard,
  reorderCertifications,
  updateCertification,
} from "@portofolio/queries/certification.queries";
import {
  createCertificationSchema,
  reorderCertificationsSchema,
  updateCertificationSchema,
} from "@portofolio/schema/certifcation.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import z from "zod";
import { CACHE_KEYS, CACHE_TTL } from '@portofolio/constants'
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

const CACHE_PREFIX = CACHE_KEYS.CERTIFICATION_PREFIX

export const certificationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [certifications, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.CERTIFICATION_ALL, CACHE_TTL.SHORT, () => getAllCertifications(), () => ctx.headers.set('X-Data-Source', 'cache')),
    );
    if (err) throw toTRPCError(err);
    return certifications;
  }),

  getForDashboard: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search } }) => {
      const [certifications, err] = await tryCatchAsync(() =>
        getCertificationsForDashboard(search),
      );
      if (err) throw toTRPCError(err);
      return certifications;
    }),

  getForLandingPage: publicProcedure.query(async ({ ctx }) => {
    const [certifications, err] = await tryCatchAsync(() =>
      ctx.cache.withCache(CACHE_KEYS.CERTIFICATION_LANDING, CACHE_TTL.SHORT, () => getCertificatesForLandingPage(), () => ctx.headers.set('X-Data-Source', 'cache')),
    );
    if (err) throw toTRPCError(err);
    return certifications;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const [certification, err] = await tryCatchAsync(() =>
        ctx.cache.withCache(`${CACHE_PREFIX}${id}`, CACHE_TTL.SHORT, () => getCertificationById(id), () => ctx.headers.set('X-Data-Source', 'cache')),
      );
      if (err) throw toTRPCError(err);
      return certification;
    }),

  create: protectedProcedure
    .input(createCertificationSchema)
    .mutation(async ({ ctx, input }) => {
      const [certification, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => createCertification(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "created", entity: "certification", entityId: certification.id, entityTitle: certification.title });
      return certification;
    }),

  update: protectedProcedure
    .input(updateCertificationSchema)
    .mutation(async ({ ctx, input }) => {
      const [certification, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => updateCertification(input)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "updated", entity: "certification", entityId: certification.id, entityTitle: certification.title });
      return certification;
    }),

  reorder: protectedProcedure
    .input(reorderCertificationsSchema)
    .mutation(async ({ ctx, input }) => {
      const [, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => reorderCertifications(input)),
      );
      if (err) throw toTRPCError(err);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const [result, err] = await tryCatchAsync(() =>
        ctx.cache.withCacheInvalidation(CACHE_PREFIX, () => deleteCertification(id)),
      );
      if (err) throw toTRPCError(err);
      void createActivityLog({ action: "deleted", entity: "certification", entityId: result.id, entityTitle: result.title });
      return result;
    }),
});
