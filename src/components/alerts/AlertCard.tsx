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
    <Card className="p-4 hover:shadow-glow transition-smooth cursor-pointer bg-gradient-card border-l-4"
      style={{ borderLeftColor: `hsl(var(--${config.badge}))` }}
      onClick={() => onView(alert)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded ${config.color} bg-opacity-10`}>
              <AlertTriangle className={`h-5 w-5 text-${config.badge}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{alert.title}</h3>
                <Badge variant={config.badge as any} className="text-xs">
                  {alert.riskLevel.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs font-mono-tech">
                  {alert.id}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{alert.user.name}</span>
              <span className="text-muted-foreground">({alert.user.role})</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono-tech">{alert.sourceIp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Asset:</span>
              <Badge variant="outline" className="text-xs">
                {alert.assetSensitivity}
              </Badge>
            </div>
          </div>

          {/* Risk Score */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Risk Score:</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${config.color} transition-all`}
                style={{ width: `${alert.riskScore}%` }}
              />
            </div>
            <span className="text-xs font-bold font-mono-tech">{alert.riskScore}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onView(alert); }}>
          <Eye className="h-4 w-4 mr-1" />
          Review
        </Button>
      </div>
    </Card>
  );
}
