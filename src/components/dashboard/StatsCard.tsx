import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) {
  return (
    <Card className="p-6 bg-gradient-card hover:shadow-glow transition-smooth">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-mono-tech">{value}</p>
          {trend && (
            <p className={`text-xs ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
      </div>
    </Card>
  );
}
