import { getDashboardStats } from "@portofolio/queries/dashboard.queries";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { createTRPCRouter, protectedProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const dashboardRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async () => {
    const [stats, err] = await tryCatchAsync(() => getDashboardStats());

    if (err) throw toTRPCError(err);

    return stats;
  }),
});
