import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SOCIAL_ICON_MAP, type SocialIconName } from "@portofolio/constants";
import { SocialLink } from "@portofolio/types/social-links.types";
import { IconGripVertical, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

interface SocialLinkCardProps {
  socialLink: SocialLink;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export function SocialLinkCard({
  socialLink,
  dragHandleProps,
}: SocialLinkCardProps) {
  const navigate = useNavigate();
  const Icon = SOCIAL_ICON_MAP[socialLink.icon as SocialIconName]?.icon;

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

        {/* Brand icon */}
        <div className="size-9 rounded-md shrink-0 bg-muted flex items-center justify-center">
          {Icon ? (
            <Icon className="size-4 text-foreground" />
          ) : (
            <span className="text-xs font-semibold text-muted-foreground">
              {socialLink.title[0]?.toUpperCase()}
            </span>
          )}
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-semibold leading-tight truncate">
            {socialLink.title}
          </span>
          <a
            href={socialLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground truncate hover:underline cursor-pointer"
          >
            {socialLink.url}
          </a>
        </div>

        {/* Edit action */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0"
          onClick={() =>
            navigate({
              to: "/dashboard/social-links/$socialLinkId/edit",
              params: { socialLinkId: socialLink.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
