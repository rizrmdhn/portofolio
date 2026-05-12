import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ViewRange = "7d" | "30d" | "90d";

const RANGE_LABELS: Record<ViewRange, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

interface PageViewsChartProps {
  className?: string;
  data: { date: string; views: number }[];
  range: ViewRange;
  onRangeChange: (range: ViewRange) => void;
}

export function PageViewsChart({
  className,
  data,
  range,
  onRangeChange,
}: PageViewsChartProps) {
  const totalViews = data.reduce((sum, d) => sum + d.views, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Page Views</CardTitle>
            <CardDescription>{RANGE_LABELS[range]}</CardDescription>
          </div>
          <div className="flex items-center gap-1 rounded-md border p-1">
            {(["7d", "30d", "90d"] as ViewRange[]).map((r) => (
              <button
                key={r}
                onClick={() => onRangeChange(r)}
                className={cn(
                  "rounded px-2.5 py-1 text-[11px] font-mono transition-colors",
                  range === r
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold font-mono tabular-nums">
            {totalViews.toLocaleString()}
          </span>
          <span className="ml-1.5 text-xs text-muted-foreground">
            total views
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart data={data} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => {
                const d = new Date(value);
                return d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              interval={range === "7d" ? 0 : range === "30d" ? 4 : 11}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="var(--color-views)"
              strokeWidth={2}
              fill="url(#fillViews)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
