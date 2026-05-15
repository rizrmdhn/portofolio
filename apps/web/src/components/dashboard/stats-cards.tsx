import type { TablerIcon } from '@tabler/icons-react'
import {
  IconBriefcase,
  IconCertificate,
  IconEye,
  IconFileCv,
  IconFolder,
  IconStack2,
} from '@tabler/icons-react'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '../ui/card'

interface StatCardProps {
  label: string
  value: string | number
  icon: TablerIcon
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardAction>
          <Icon className="text-muted-foreground size-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <span className="font-mono text-2xl font-bold tabular-nums">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </CardContent>
    </Card>
  )
}

interface StatsCardsProps {
  totalProjectViews: number
  counts: {
    projects: number
    experiences: number
    certifications: number
    techStackItems: number
    resumeDownloads: number
  }
}

export function StatsCards({ totalProjectViews, counts }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
      <StatCard label="Total Project Views" value={totalProjectViews} icon={IconEye} />
      <StatCard label="Projects" value={counts.projects} icon={IconFolder} />
      <StatCard label="Experiences" value={counts.experiences} icon={IconBriefcase} />
      <StatCard label="Certifications" value={counts.certifications} icon={IconCertificate} />
      <StatCard label="Tech Stack Items" value={counts.techStackItems} icon={IconStack2} />
      <StatCard label="Resume Downloads" value={counts.resumeDownloads} icon={IconFileCv} />
    </div>
  )
}
