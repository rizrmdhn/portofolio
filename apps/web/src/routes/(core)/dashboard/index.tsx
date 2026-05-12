import { AllTimeProjectsCard } from "@/components/dashboard/all-time-projects-card";
import { SocialLinkClickThroughCard } from "@/components/dashboard/social-link-click-through-card";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { trpc } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/dashboard/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.project.getAllTimeViewsProjects.queryOptions(),
    );
    await context.queryClient.ensureQueryData(
      context.trpc.socialLink.getSocialLinkClickThroughForDashboard.queryOptions(),
    );
    await context.queryClient.ensureQueryData(
      context.trpc.dashboard.getStats.queryOptions(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: allTimeViewsProjects } = useSuspenseQuery(
    trpc.project.getAllTimeViewsProjects.queryOptions(),
  );
  const { data: socialLinks } = useSuspenseQuery(
    trpc.socialLink.getSocialLinkClickThroughForDashboard.queryOptions(),
  );
  const { data: stats } = useSuspenseQuery(
    trpc.dashboard.getStats.queryOptions(),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Section 1 — Stats overview */}
      <StatsCards
        totalProjectViews={stats.totalProjectViews}
        counts={stats.counts}
      />

      {/* Section 2 — Page views chart (coming soon) */}

      {/* Section 3 — Top projects + social links */}
      <div className="flex flex-row gap-4">
        <AllTimeProjectsCard projects={allTimeViewsProjects} />
        <SocialLinkClickThroughCard socialLinks={socialLinks} />
      </div>

      {/* Section 4 — Recent activity (coming soon) */}
    </div>
  );
}
