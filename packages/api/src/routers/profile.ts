import {
  getProfile,
  updateProfile,
} from "@portofolio/queries/profile.queries";
import { updateProfileSchema } from "@portofolio/schema/profile.schema";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const profileRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const [result, err] = await tryCatchAsync(() => getProfile());

    if (err) throw toTRPCError(err);

    return result;
  }),

  update: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input }) => {
      const [result, err] = await tryCatchAsync(() => updateProfile(input));

      if (err) throw toTRPCError(err);

      return result;
    }),
});
