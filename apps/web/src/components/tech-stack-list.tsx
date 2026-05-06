import { TechStack } from "@portofolio/types/tech-stack.types";

interface TechStackListProps {
  stack: TechStack;
}

export function TechStackList({ stack }: TechStackListProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[11px] font-mono font-semibold text-subtle uppercase tracking-[0.08em]">
        {stack.name}
      </h3>
      <div className="flex flex-col gap-2">
        {stack.list.map((item) => (
          <span key={item} className="text-[13px] text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
