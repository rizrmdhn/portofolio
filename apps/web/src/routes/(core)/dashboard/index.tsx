import { AllTimeProjectsCard } from "@/components/dashboard/all-time-projects-card";
import { PageViewsChart } from "@/components/dashboard/page-views-chart";
import { RecentActivityCard } from "@/components/dashboard/recent-activity-card";
import { SocialLinkClickThroughCard } from "@/components/dashboard/social-link-click-through-card";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { trpc } from "@/utils/trpc";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(core)/dashboard/")({
  beforeLoad: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        context.trpc.project.getAllTimeViewsProjects.queryOptions(),
      ),
      context.queryClient.ensureQueryData(
        context.trpc.socialLink.getSocialLinkClickThroughForDashboard.queryOptions(),
      ),
      context.queryClient.ensureQueryData(
        context.trpc.dashboard.getStats.queryOptions(),
      ),
      context.queryClient.ensureQueryData(
        context.trpc.dashboard.getViewEvents.queryOptions({ range: "30d" }),
      ),
      context.queryClient.ensureQueryData(
        context.trpc.dashboard.getRecentActivity.queryOptions(),
      ),
    ]);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  const { data: allTimeViewsProjects } = useSuspenseQuery(
    trpc.project.getAllTimeViewsProjects.queryOptions(),
  );
  const { data: socialLinks } = useSuspenseQuery(
    trpc.socialLink.getSocialLinkClickThroughForDashboard.queryOptions(),
  );
  const { data: stats } = useSuspenseQuery(
    trpc.dashboard.getStats.queryOptions(),
  );
  const { data: viewEvents = [] } = useQuery(
    trpc.dashboard.getViewEvents.queryOptions({ range }),
  );
  const { data: recentActivity } = useSuspenseQuery(
    trpc.dashboard.getRecentActivity.queryOptions(),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Section 1 — Stats overview */}
      <StatsCards
        totalProjectViews={stats.totalProjectViews}
        counts={stats.counts}
      />

      {/* Section 2 — Page views chart */}
      <PageViewsChart
        data={viewEvents}
        range={range}
        onRangeChange={setRange}
      />

      {/* Section 3 — Top projects + social links */}
      <div className="flex flex-row gap-4">
        <AllTimeProjectsCard projects={allTimeViewsProjects} />
        <SocialLinkClickThroughCard socialLinks={socialLinks} />
      </div>

      {/* Section 4 — Recent activity */}
      <RecentActivityCard activity={recentActivity} />
    </div>
  );
}
