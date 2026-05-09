import { cn } from "@/lib/utils";
import { SOCIAL_ICON_MAP, SocialIconName } from "@portofolio/constants";
import { SocialLink } from "@portofolio/types/social-links.types";
import { Card, CardContent } from "../ui/card";

interface SocialLinkClickThroughCardProps {
  className?: string;
  socialLinks: SocialLink[];
}

export function SocialLinkClickThroughCard({
  className,
  socialLinks,
}: SocialLinkClickThroughCardProps) {
  return (
    <Card className={cn("w-1/2", className)}>
      <CardContent className="flex flex-col gap-3">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-foreground">
              Social Link Click-Through
            </p>
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((link, idx) => {
            const compareLink = socialLinks[idx + 1] ?? socialLinks[idx - 1];
            const compareCount = compareLink?.clickCount ?? 0;
            const growth =
              !compareLink || compareCount === 0
                ? null
                : Math.round(
                    ((link.clickCount - compareCount) / compareCount) * 100,
                  );
            const Icon = SOCIAL_ICON_MAP[link.icon as SocialIconName]?.icon;

            return (
              <Card
                key={link.id}
                className="flex flex-row items-center gap-3 py-2.5"
              >
                <CardContent className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 flex-row">
                    {Icon && <Icon className="size-3.5" />}
                    <span className="text-xs font-medium text-foreground">
                      {link.title}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <span className="text-xl font-bold text-foreground">
                      {link.clickCount}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        growth === null
                          ? "text-muted-foreground"
                          : growth > 0
                            ? "text-green-500"
                            : "text-red-500",
                      )}
                    >
                      {growth === null
                        ? "—"
                        : growth > 0
                          ? `+${growth}%`
                          : `${growth}%`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
