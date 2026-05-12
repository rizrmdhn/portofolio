import {
  getDashboardStats,
  getRecentActivity,
  getViewEventsByRange,
  type ViewRange,
} from "@portofolio/queries/dashboard.queries";
import { tryCatchAsync } from "@portofolio/utils/try-catch";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "..";
import { toTRPCError } from "../utils/to-trpc-error";

export const dashboardRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async () => {
    const [stats, err] = await tryCatchAsync(() => getDashboardStats());

    if (err) throw toTRPCError(err);

    return stats;
  }),

  getViewEvents: protectedProcedure
    .input(z.object({ range: z.enum(["7d", "30d", "90d"]).default("30d") }))
    .query(async ({ input: { range } }) => {
      const [events, err] = await tryCatchAsync(() =>
        getViewEventsByRange(range as ViewRange),
      );

      if (err) throw toTRPCError(err);

      return events;
    }),

  getRecentActivity: protectedProcedure.query(async () => {
    const [activity, err] = await tryCatchAsync(() => getRecentActivity(20));

    if (err) throw toTRPCError(err);

    return activity;
  }),
});
