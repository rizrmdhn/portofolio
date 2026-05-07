import { getUserById } from "@portofolio/queries/users.queries";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const authRouter = createTRPCRouter({
  // register: publicProcedure
  //   .input(registerSchema)
  //   .mutation(async ({ input }) => {
  //     const passwordHash = await hash(input.password);

  //     const [result, err] = await tryCatchAsync(() =>
  //       createUser({
  //         ...input,
  //         passwordHash,
  //       }),
  //     );

  //     if (err) throw toTRPCError(err);

  //     return {
  //       ...result,
  //       password: undefined,
  //     };
  //   }),

  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    const [user, err] = await tryCatchAsync(() => getUserById(ctx.user!.id));

    if (err) throw toTRPCError(err);

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    return {
      ...user,
      password: undefined,
    };
  }),
});
