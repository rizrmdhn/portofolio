import { cn } from '@/lib/utils'
import { SOCIAL_ICON_MAP } from '@portofolio/constants'
import type { SocialLink } from '@portofolio/types/social-links.types'
import { IconAt } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { EmptyState } from '../ui/empty-state'

interface SocialLinkClickThroughCardProps {
  className?: string
  socialLinks: Array<SocialLink>
}

export function SocialLinkClickThroughCard({
  className,
  socialLinks,
}: SocialLinkClickThroughCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="border-b">
        <CardTitle>Social Link Click-Through</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {socialLinks.map((link, idx) => {
            const compareLink = socialLinks[idx + 1] ?? socialLinks[idx - 1]
            const compareCount = compareLink?.clickCount ?? 0
            const growth =
              !compareLink || compareCount === 0
                ? null
                : Math.round(((link.clickCount - compareCount) / compareCount) * 100)
            const Icon = SOCIAL_ICON_MAP[link.icon].icon

            return (
              <Card key={link.id}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {<Icon className="text-muted-foreground size-3.5" />}
                    <span className="text-xs font-medium">{link.title}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-xl font-bold tabular-nums">
                      {link.clickCount}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-xs',
                        growth === null
                          ? 'text-muted-foreground'
                          : growth > 0
                            ? 'text-green-500'
                            : 'text-red-500',
                      )}
                    >
                      {growth === null ? '—' : growth > 0 ? `+${growth}%` : `${growth}%`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {socialLinks.length === 0 && (
            <div className="col-span-2">
              <EmptyState
                icon={IconAt}
                title="No social links yet"
                description="Your social link click-through stats will appear here once you add some social links and they start getting clicks."
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
