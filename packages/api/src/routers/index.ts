import { createTRPCRouter, publicProcedure } from "..";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
});
export type AppRouter = typeof appRouter;
