import { cn } from '@/lib/utils'
import type { ReferralSource } from '@portofolio/constants'
import { IconLink } from '@tabler/icons-react'
import { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import type { ChartConfig } from '../ui/chart'
import { EmptyState } from '../ui/empty-state'

interface ReferralBreakdownCardProps {
  className?: string
  data: Array<{ referral: ReferralSource; visits: number }>
}

// Pie slice palette — reuses the shared chart CSS variables.
const SLICE_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const REFERRAL_LABELS: Record<ReferralSource, string> = {
  cv: 'CV',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'Twitter',
}

export function ReferralBreakdownCard({ className, data }: ReferralBreakdownCardProps) {
  const total = data.reduce((sum, d) => sum + d.visits, 0)

  const { chartData, chartConfig } = useMemo(() => {
    const config: ChartConfig = {}
    const rows = data.map((d, idx) => {
      const color = SLICE_COLORS[idx % SLICE_COLORS.length]
      config[d.referral] = { label: REFERRAL_LABELS[d.referral], color }
      return { ...d, label: REFERRAL_LABELS[d.referral], fill: color }
    })
    return { chartData: rows, chartConfig: config }
  }, [data])

  return (
    <Card className={cn(className)}>
      <CardHeader className="border-b">
        <CardTitle>Referral Sources</CardTitle>
        <CardDescription>Where visitors came from</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {total === 0 ? (
          <EmptyState
            icon={IconLink}
            title="No referral data yet"
            description="Once visitors arrive via a tagged link (e.g. ?referral=cv), a breakdown of sources will appear here."
          />
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="referral" hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visits"
                nameKey="referral"
                innerRadius={55}
                strokeWidth={2}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.referral} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="referral" />}
                className="flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
