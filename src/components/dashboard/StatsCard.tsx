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
  const colorConfig = {
    primary: { 
      bg: "bg-primary/10", 
      text: "text-primary", 
      shadow: "shadow-glow",
      gradient: "bg-gradient-primary"
    },
    destructive: { 
      bg: "bg-destructive/10", 
      text: "text-destructive", 
      shadow: "shadow-critical",
      gradient: "bg-gradient-critical"
    },
    warning: { 
      bg: "bg-warning/10", 
      text: "text-warning", 
      shadow: "shadow-glow",
      gradient: "from-warning to-warning/80"
    },
    success: { 
      bg: "bg-success/10", 
      text: "text-success", 
      shadow: "shadow-glow",
      gradient: "from-success to-success/80"
    },
    info: { 
      bg: "bg-info/10", 
      text: "text-info", 
      shadow: "shadow-glow",
      gradient: "from-info to-info/80"
    },
  };

  const config = colorConfig[color as keyof typeof colorConfig] || colorConfig.primary;

  return (
    <Card className={`group relative p-6 bg-gradient-card border border-border/30 hover:${config.shadow} hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden`}>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${config.gradient} bg-gradient-to-br`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-4xl font-bold font-mono-tech ${config.text} transition-colors duration-300`}>
                {value}
              </p>
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.isPositive 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  <span className="text-sm">
                    {trend.isPositive ? '↗' : '↘'}
                  </span>
                  {trend.value}
                </div>
              )}
            </div>
          </div>
          
          <div className={`relative p-4 rounded-2xl ${config.bg} group-hover:scale-110 transition-all duration-300`}>
            <Icon className={`h-8 w-8 ${config.text} transition-all duration-300 group-hover:animate-pulse`} />
            
            {/* Glow effect behind icon */}
            <div className={`absolute inset-0 ${config.bg} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
          </div>
        </div>

        {/* Progress indicator for critical metrics */}
        {(color === 'destructive' || color === 'warning') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Threat Level</span>
              <span className={`font-mono-tech ${config.text}`}>
                {color === 'destructive' ? 'Critical' : 'Elevated'}
              </span>
            </div>
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${config.gradient} bg-gradient-to-r transition-all duration-1000 group-hover:animate-pulse`}
                style={{ 
                  width: color === 'destructive' ? '85%' : '60%' 
                }}
              />
            </div>
          </div>
        )}

        {/* Success metrics get a different treatment */}
        {color === 'success' && (
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">System operational</span>
          </div>
        )}
      </div>

      {/* Subtle border glow on hover */}
      <div className={`absolute inset-0 rounded-lg border border-transparent group-hover:border-${color}/20 transition-colors duration-300`}></div>
    </Card>
  );
}
