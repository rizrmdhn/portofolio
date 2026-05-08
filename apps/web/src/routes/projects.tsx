import { MainHeader } from "@/components/main-header";
import { ProjectCard } from "@/components/project-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(
      context.trpc.project.getAll.queryOptions(),
    );

    return { projects };
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();

  return (
    <div className="flex flex-col bg-background text-foreground">
      <MainHeader />
      <main className="w-full md:max-w-175 mx-auto px-4 md:px-0 py-12 flex flex-col gap-8">
        <h1 className="text-sm text-subtle tracking-[0.15em] font-mono">
          ALL PROJECTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
