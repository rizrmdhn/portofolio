import { createTRPCRouter, publicProcedure } from "..";

export const healthRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
});
