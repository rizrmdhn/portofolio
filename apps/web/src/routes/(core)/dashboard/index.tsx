import { AllTimeProjectsCard } from "@/components/dashboard/all-time-projects-card";
import { trpc } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/dashboard/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.project.getAllTimeViewsProjects.queryOptions(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: allTimeViewsProjects } = useSuspenseQuery(
    trpc.project.getAllTimeViewsProjects.queryOptions(),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl font-bold">First section</div>
      <div className="text-2xl font-bold">Second section</div>
      <div className="flex flex-row gap-4">
        <AllTimeProjectsCard projects={allTimeViewsProjects} />
        <div className="text-2xl font-bold">Third section</div>
      </div>
      <div className="text-2xl font-bold">Fourth section</div>
    </div>
  );
}
