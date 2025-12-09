import { Alert, RiskLevel } from "@/types/alerts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, User, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertCardProps {
  alert: Alert;
  onView: (alert: Alert) => void;
}

const riskLevelConfig: Record<RiskLevel, { color: string; badge: string }> = {
  critical: { color: "bg-destructive", badge: "destructive" },
  high: { color: "bg-warning", badge: "warning" },
  medium: { color: "bg-info", badge: "info" },
  low: { color: "bg-muted", badge: "secondary" },
};

export function AlertCard({ alert, onView }: AlertCardProps) {
  const config = riskLevelConfig[alert.riskLevel];

  return (
    <Card className={`group relative p-6 glass border border-border/30 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden ${
      alert.riskLevel === 'critical' ? 'hover:shadow-critical' : ''
    }`}
      onClick={() => onView(alert)}
    >
      {/* Animated border gradient */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
        alert.riskLevel === 'critical' ? 'from-destructive via-warning to-destructive' :
        alert.riskLevel === 'high' ? 'from-warning via-info to-warning' :
        'from-primary via-accent to-primary'
      }`}></div>

      {/* Left accent border */}
      <div className={`absolute left-0 top-0 w-1 h-full ${config.color} rounded-l-lg`}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            {/* Enhanced Header */}
            <div className="flex items-start gap-4">
              <div className={`relative p-3 rounded-xl ${config.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <AlertTriangle className={`h-6 w-6 text-${config.badge} transition-all duration-300 ${
                  alert.riskLevel === 'critical' ? 'animate-pulse' : ''
                }`} />
                {/* Glow effect */}
                <div className={`absolute inset-0 ${config.color} bg-opacity-20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {alert.title}
                  </h3>
                  <Badge variant={config.badge as any} className={`text-xs font-bold px-2 py-1 ${
                    alert.riskLevel === 'critical' ? 'animate-pulse' : ''
                  }`}>
                    {alert.riskLevel.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono-tech bg-muted/20">
                    #{alert.id}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {alert.description}
                </p>
              </div>
            </div>

            {/* Enhanced Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{alert.user.name}</p>
                  <p className="text-xs text-muted-foreground">{alert.user.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-mono-tech text-sm">{alert.sourceIp}</p>
                  <p className="text-xs text-muted-foreground">Source IP</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</p>
                  <p className="text-xs text-muted-foreground">Detected</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-info"></div>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    {alert.assetSensitivity}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Asset Level</p>
                </div>
              </div>
            </div>

            {/* Enhanced Risk Score with Animation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Risk Assessment</span>
                <span className={`text-lg font-bold font-mono-tech ${config.badge === 'destructive' ? 'text-destructive' : config.badge === 'warning' ? 'text-warning' : 'text-info'}`}>
                  {alert.riskScore}/100
                </span>
              </div>
              <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full ${config.color} transition-all duration-1000 group-hover:animate-pulse relative`}
                  style={{ width: `${alert.riskScore}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-2000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Section */}
          <div className="flex flex-col gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={(e) => { e.stopPropagation(); onView(alert); }}
              className="hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Eye className="h-4 w-4 mr-2" />
              Investigate
            </Button>
            
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 px-2 py-1 rounded-lg bg-muted/20">
              <div className={`w-2 h-2 rounded-full ${
                alert.status === 'pending' ? 'bg-warning animate-pulse' :
                alert.status === 'investigating' ? 'bg-info animate-pulse' :
                alert.status === 'resolved' ? 'bg-success' : 'bg-muted'
              }`}></div>
              <span className="text-xs font-medium capitalize">{alert.status}</span>
            </div>
          </div>
        </div>

        {/* Threat category tags */}
        <div className="mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Categories:</span>
            {alert.category && (
              <Badge variant="secondary" className="text-xs">
                {alert.category}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              Network Security
            </Badge>
            {alert.riskLevel === 'critical' && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                Immediate Action Required
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
