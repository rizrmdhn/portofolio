import { cn } from "@/lib/utils";
import type {Experience} from "@portofolio/types/experience.types";
import { format } from "date-fns";
import { Separator } from "./ui/separator";

interface ExperienceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  experience: Experience;
}

export function ExperienceCard({
  experience,
  className,
  ...props
}: ExperienceCardProps) {
  const isCurrent = experience.currentlyWorking
    ? "Present"
    : format(experience.endDate ?? new Date(), "MMM yyyy");

  return (
    <div
      className={cn("flex flex-col gap-6  rounded-lg py-10", className)}
      {...props}
    >
      <div className="flex items-center gap-4">
        {/* Years And Company */}
        <div className="flex flex-col items-start gap-2 w-36 shrink-0 self-start">
          <span className="text-xs text-subtle font-mono font-semibold whitespace-nowrap">
            {format(experience.startDate, "MMM yyyy")} - {isCurrent}
          </span>
          <span className="text-[13px] text-muted-foreground wrap-break-word">
            {experience.company}
          </span>
        </div>

        {/* Role, Description And Skills */}
        <div className="flex flex-col items-start gap-2 max-w-lg">
          <span className="text-[15px] font-semibold text-foreground">
            {experience.title}
          </span>
          <p className="text-[13px] text-muted-foreground">
            {experience.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="text-[10px] bg-tag text-tag-foreground border border-tag-border px-2 py-1 rounded font-mono font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
}
