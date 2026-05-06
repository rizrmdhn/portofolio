import { cn } from "@/lib/utils";
import { Experience } from "@portofolio/types/experience.types";
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
        <div className="flex flex-col items-start gap-2 flex-1 self-start">
          <span className="text-sm text-accent font-mono font-semibold">
            {format(experience.startDate, "MMM yyyy")} - {isCurrent}
          </span>
          <span className="text-sm font-medium text-subtle">
            {experience.company}
          </span>
        </div>

        {/* Role, Description And Skills */}
        <div className="flex flex-col items-start gap-2 max-w-lg">
          <span className="text-md font-medium">{experience.title}</span>
          <p className="text-sm text-subtle">{experience.description}</p>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-available text-available-foreground px-2 py-1 rounded font-mono font-semibold"
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
