import { cn } from "@/lib/utils";
import { AllTimeProject } from "@portofolio/types/project.types";
import { IconArrowRight, IconFolder } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EmptyState } from "../ui/empty-state";
import { Progress } from "../ui/progress";

interface AllTimeProjectsCardProps {
  className?: string;
  projects: AllTimeProject[];
}

export function AllTimeProjectsCard({
  projects,
  className,
}: AllTimeProjectsCardProps) {
  const navigate = useNavigate();

  return (
    <Card className={cn("w-1/2", className)}>
      <CardHeader className="border-b">
        <CardTitle>Top Projects</CardTitle>
        <CardDescription>By views, last 30 days</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="font-mono text-[11px] text-muted-foreground group"
            onClick={() => navigate({ to: "/dashboard/projects" })}
          >
            View all
            <IconArrowRight data-icon="inline-end" className="group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col">
        {projects.map((project, idx) => {
          const maxViews = Math.max(...projects.map((p) => p.views), 1);
          const percentage = Math.round((project.views / maxViews) * 100);
          const neighbor = projects[idx + 1] ?? projects[idx - 1];
          const growth =
            neighbor && neighbor.views > 0
              ? Math.round(
                  ((project.views - neighbor.views) / neighbor.views) * 100,
                )
              : null;
          return (
            <div
              key={project.id}
              className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
            >
              <span className="text-[11px] font-mono text-muted-foreground w-4 text-right shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-foreground flex-1">
                {project.title}
              </span>
              <Progress
                value={percentage}
                className="h-1.5 flex-1 align-middle max-w-64"
              />
              <span className="text-sm font-semibold text-foreground font-mono shrink-0 w-14 text-right">
                {project.views.toLocaleString()}
              </span>
              {growth !== null && (
                <span
                  className={cn(
                    "text-[11px] font-mono shrink-0 w-10 text-right",
                    growth >= 0 ? "text-green-500" : "text-red-500",
                  )}
                >
                  {`${growth > 0 ? "+" : ""}${growth}%`}
                </span>
              )}
            </div>
          );
        })}
        {projects.length === 0 && (
          <EmptyState
            icon={IconFolder}
            title="No projects yet"
            description="Your top projects will appear here once they start getting views."
          />
        )}
      </CardContent>
    </Card>
  );
}
