import type { TablerIcon } from "@tabler/icons-react";
import {
  IconBriefcase,
  IconCertificate,
  IconEye,
  IconFolder,
  IconStack2,
} from "@tabler/icons-react";
import { Card, CardContent } from "../ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: TablerIcon;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex-1 min-w-0">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <Icon className="size-3.5 text-muted-foreground" />
        </div>
        <span className="text-2xl font-bold font-mono tabular-nums truncate">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  totalProjectViews: number;
  counts: {
    projects: number;
    experiences: number;
    certifications: number;
    techStackItems: number;
  };
}

export function StatsCards({ totalProjectViews, counts }: StatsCardsProps) {
  return (
    <div className="flex flex-row gap-4">
      <StatCard
        label="Total Project Views"
        value={totalProjectViews}
        icon={IconEye}
      />
      <StatCard label="Projects" value={counts.projects} icon={IconFolder} />
      <StatCard
        label="Experiences"
        value={counts.experiences}
        icon={IconBriefcase}
      />
      <StatCard
        label="Certifications"
        value={counts.certifications}
        icon={IconCertificate}
      />
      <StatCard
        label="Tech Stack Items"
        value={counts.techStackItems}
        icon={IconStack2}
      />
    </div>
  );
}
