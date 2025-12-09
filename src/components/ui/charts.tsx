import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  type?: "bar" | "line" | "donut";
  className?: string;
  showTrend?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricChart({ 
  title, 
  data, 
  type = "bar", 
  className, 
  showTrend = false,
  trend 
}: MetricChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === "bar") {
    return (
      <Card className={cn("p-6 bg-gradient-card border border-border/30 hover:shadow-glow transition-all duration-300", className)}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {showTrend && trend && (
              <div className={cn("flex items-center gap-1 mt-1", trend.isPositive ? "text-success" : "text-destructive")}>
                {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-xs font-medium">{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <Badge variant="outline" className="font-mono-tech">
                  {item.value}
                </Badge>
              </div>
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-1000 relative",
                    item.color || "bg-primary"
                  )}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (type === "donut") {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <Card className={cn("p-6 bg-gradient-card border border-border/30 hover:shadow-glow transition-all duration-300", className)}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Activity className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex items-center justify-center space-x-8">
          {/* Donut Chart */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 2.51} ${(100 - percentage) * 2.51}`;
                const strokeDashoffset = -cumulativePercentage * 2.51;
                cumulativePercentage += percentage;

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color || "hsl(var(--primary))"}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono-tech">{total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || "hsl(var(--primary))" }}
                />
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.value} ({Math.round((item.value / total) * 100)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // Line chart (simplified version)
  return (
    <Card className={cn("p-6 bg-gradient-card border border-border/30 hover:shadow-glow transition-all duration-300", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Activity className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="h-40 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div
              className={cn("w-full rounded-t-lg transition-all duration-1000", item.color || "bg-primary")}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <div className="text-xs text-center">
              <div className="font-medium">{item.value}</div>
              <div className="text-muted-foreground">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Real-time activity feed component
interface ActivityFeedProps {
  activities: Array<{
    id: string;
    type: "alert" | "resolved" | "investigation" | "update";
    message: string;
    timestamp: Date;
    user?: string;
  }>;
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert": return "🚨";
      case "resolved": return "✅";
      case "investigation": return "🔍";
      case "update": return "📝";
      default: return "ℹ️";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "alert": return "border-l-destructive bg-destructive/5";
      case "resolved": return "border-l-success bg-success/5";
      case "investigation": return "border-l-warning bg-warning/5";
      case "update": return "border-l-info bg-info/5";
      default: return "border-l-muted bg-muted/5";
    }
  };

  return (
    <Card className={cn("p-6 bg-gradient-card border border-border/30", className)}>
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-auto"></div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "p-3 rounded-lg border-l-4 transition-all duration-300 hover:scale-[1.02]",
              getActivityColor(activity.type)
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{getActivityIcon(activity.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp.toLocaleTimeString()}
                  </span>
                  {activity.user && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}