import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SOCIAL_ICON_MAP } from '@portofolio/constants'
import type { SocialLink } from '@portofolio/types/social-links.types'
import { IconGripVertical, IconPencil } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'

interface SocialLinkCardProps {
  socialLink: SocialLink
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>
}

export function SocialLinkCard({ socialLink, dragHandleProps }: SocialLinkCardProps) {
  const navigate = useNavigate()
  const Icon = SOCIAL_ICON_MAP[socialLink.icon].icon

  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 px-4 py-3">
        {/* Drag handle */}
        <button
          className="text-muted-foreground/40 hover:text-muted-foreground flex cursor-grab items-center active:cursor-grabbing"
          {...dragHandleProps}
        >
          <IconGripVertical className="size-4 shrink-0" />
        </button>

        {/* Brand icon */}
        <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
          <Icon className="text-foreground size-4" />
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm leading-tight font-semibold">{socialLink.title}</span>
          <a
            href={socialLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground cursor-pointer truncate text-xs hover:underline"
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
              to: '/dashboard/social-links/$socialLinkId/edit',
              params: { socialLinkId: socialLink.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
