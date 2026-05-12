import type {TechStackCategoryWithItems} from "@portofolio/types/tech-stack.types";
import { IconGripVertical, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface TechStackCardProps {
  techStack: TechStackCategoryWithItems;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export function TechStackCard({
  techStack,
  dragHandleProps,
}: TechStackCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="py-0 h-full">
      <CardContent className="flex items-center gap-3 py-3 px-4 h-full">
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-row">
            {/* Drag handle */}
            <button
              className="flex items-center text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground"
              {...dragHandleProps}
            >
              <IconGripVertical className="size-4 shrink-0" />
            </button>
            <span className="text-sm font-semibold leading-tight truncate">
              {techStack.name}
            </span>
            <span className="text-xs text-muted-foreground bg-transparent border border-border py-0.5 px-1.75 rounded">
              {techStack.items.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {techStack.items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center py-1.25 px-2.5 bg-muted rounded-sm text-xs font-medium"
              >
                {item.name}
              </span>
            ))}
            {techStack.items.length === 0 && (
              <span className="text-xs text-muted-foreground">No items</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0"
          onClick={() =>
            navigate({
              to: "/dashboard/tech-stack/$techStackId/edit",
              params: { techStackId: techStack.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
