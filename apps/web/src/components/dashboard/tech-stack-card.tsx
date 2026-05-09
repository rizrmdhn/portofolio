import { TechStack } from "@portofolio/types/tech-stack.types";
import { IconGripVertical, IconPencil } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface TechStackCardProps {
  techStack: TechStack;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export function TechStackCard({
  techStack,
  dragHandleProps,
}: TechStackCardProps) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 py-3 px-4">
        {/* Drag handle */}
        <button
          className="flex items-center text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground"
          {...dragHandleProps}
        >
          <IconGripVertical className="size-4 shrink-0" />
        </button>
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold leading-tight truncate">
              {techStack.name}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {techStack.list.join(", ")}
          </div>
        </div>

        {/* Action buttons */}
        <Button variant="ghost" size="icon" className="size-7 shrink-0">
          <IconPencil className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
