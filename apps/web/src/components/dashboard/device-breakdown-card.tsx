import { cn } from '@/lib/utils'
import { IconDevices } from '@tabler/icons-react'
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

interface DeviceBreakdownCardProps {
  className?: string
  data: Array<{ deviceType: string; views: number }>
}

// Pie slice palette — reuses the shared chart CSS variables.
const SLICE_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

// ua-parser device.type values we expect, plus our 'desktop' fallback.
const DEVICE_LABELS: Record<string, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
  smarttv: 'Smart TV',
  console: 'Console',
  wearable: 'Wearable',
  embedded: 'Embedded',
  xr: 'XR',
}

function labelFor(deviceType: string) {
  return DEVICE_LABELS[deviceType] ?? deviceType.charAt(0).toUpperCase() + deviceType.slice(1)
}

export function DeviceBreakdownCard({ className, data }: DeviceBreakdownCardProps) {
  const total = data.reduce((sum, d) => sum + d.views, 0)

  const { chartData, chartConfig } = useMemo(() => {
    const config: ChartConfig = {}
    const rows = data.map((d, idx) => {
      const color = SLICE_COLORS[idx % SLICE_COLORS.length]
      config[d.deviceType] = { label: labelFor(d.deviceType), color }
      return { ...d, label: labelFor(d.deviceType), fill: color }
    })
    return { chartData: rows, chartConfig: config }
  }, [data])

  return (
    <Card className={cn(className)}>
      <CardHeader className="border-b">
        <CardTitle>Devices</CardTitle>
        <CardDescription>How visitors view your projects</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {total === 0 ? (
          <EmptyState
            icon={IconDevices}
            title="No device data yet"
            description="Once your projects start getting views, a breakdown of the devices visitors use will appear here."
          />
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="deviceType" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="views"
                nameKey="deviceType"
                innerRadius={55}
                strokeWidth={2}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.deviceType} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="deviceType" />}
                className="flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
