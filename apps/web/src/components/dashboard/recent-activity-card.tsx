import { cn } from "@/lib/utils";
import {
  ACTIVITY_LOG_ENTITY_LABELS
  
  
} from "@portofolio/constants";
import type {ActivityLogAction, ActivityLogEntity} from "@portofolio/constants";
import {
  IconBriefcase,
  IconCertificate,
  IconFolder,
  IconHistory,
  IconStack2,
  IconUser,
  IconWorldWww,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EmptyState } from "../ui/empty-state";

const ENTITY_ICONS: Record<ActivityLogEntity, TablerIcon> = {
  project: IconFolder,
  experience: IconBriefcase,
  certification: IconCertificate,
  techStackCategory: IconStack2,
  techStackItem: IconStack2,
  socialLink: IconWorldWww,
  profile: IconUser,
};

const ACTION_LABELS: Record<ActivityLogAction, string> = {
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
};

const ACTION_COLORS: Record<ActivityLogAction, string> = {
  created: "text-green-500",
  updated: "text-blue-500",
  deleted: "text-red-500",
};

interface ActivityEntry {
  id: string;
  action: ActivityLogAction;
  entity: ActivityLogEntity;
  entityId: string;
  entityTitle: string;
  createdAt: string;
}

interface RecentActivityCardProps {
  className?: string;
  activity: Array<ActivityEntry>;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentActivityCard({
  className,
  activity,
}: RecentActivityCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="border-b">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your last {activity.length > 0 ? activity.length : ""} actions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {activity.map((entry) => {
          const Icon = ENTITY_ICONS[entry.entity];
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                <Icon className="size-3.5 text-muted-foreground" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">{entry.entityTitle}</span>
                <span className="text-xs text-muted-foreground">
                  {ACTIVITY_LOG_ENTITY_LABELS[entry.entity]}
                </span>
              </div>
              <div className="flex flex-col items-end shrink-0 gap-0.5">
                <span className={cn("text-xs font-medium", ACTION_COLORS[entry.action])}>
                  {ACTION_LABELS[entry.action]}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {timeAgo(entry.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {activity.length === 0 && (
          <EmptyState
            icon={IconHistory}
            title="No activity yet"
            description="Your recent actions — creating, updating, or deleting content — will appear here."
          />
        )}
      </CardContent>
    </Card>
  );
}
