import { cn } from "@/lib/utils";
import { AllTimeProject } from "@portofolio/types/project.types";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
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
      <CardContent className="flex flex-col gap-3">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Top Projects</p>
            <span className="text-xs text-muted-foreground">
              By views, last 30 days
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="font-mono text-[11px] text-muted-foreground gap-2 flex flex-row items-center justify-center group"
            onClick={() =>
              navigate({
                to: "/dashboard/projects",
              })
            }
          >
            <span className="self-center">View all</span>
            <IconArrowRight className="size-3 self-center group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {(() => {
            const maxViews = Math.max(...projects.map((p) => p.views), 1);
            return projects.map((project, idx) => {
              const percentage = Math.round((project.views / maxViews) * 100);
              const nextViews = (projects[idx + 1] ?? projects[idx - 1])!.views;
              const growth = Math.round(
                ((project.views - nextViews) / nextViews) * 100,
              );
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
                  <span
                    className={cn(
                      "text-[11px] font-mono shrink-0 w-10 text-right",
                      growth >= 0 ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {`${growth > 0 ? "+" : ""}${growth}%`}
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </CardContent>
    </Card>
  );
}
