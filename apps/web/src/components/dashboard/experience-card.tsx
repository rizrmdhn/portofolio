import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {Experience} from "@portofolio/types/experience.types";
import { IconPencil } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";

interface ExperienceCardProps {
  experience: Experience;
}

function getInitials(company: string) {
  return company
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function getStatusVariant(status: Experience["status"]): "success" | "draft" {
  if (status === "published") return "success";
  return "draft";
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const navigate = useNavigate();

  const endLabel = experience.currentlyWorking
    ? "Present"
    : experience.endDate
      ? format(experience.endDate, "yyyy")
      : "Present";

  const startLabel = format(experience.startDate, "yyyy");

  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 py-3 px-4">
        {/* Avatar */}
        <Avatar className="size-9 rounded-md shrink-0 after:rounded-md">
          <AvatarFallback className="rounded-md text-xs font-semibold">
            {getInitials(experience.company)}
          </AvatarFallback>
        </Avatar>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold leading-tight truncate">
              {experience.title}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              · {experience.company}
            </span>
          </div>
          {experience.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {experience.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant="outline" className="rounded-sm font-mono">
              {startLabel} – {endLabel}
            </Badge>
            <Badge
              className="rounded-sm font-mono"
              variant={getStatusVariant(experience.status)}
            >
              {experience.status}
            </Badge>
          </div>
        </div>

        {/* Edit action */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0"
          onClick={() =>
            navigate({
              to: `/dashboard/experience/${experience.id}/edit`,
              params: { experienceId: experience.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
