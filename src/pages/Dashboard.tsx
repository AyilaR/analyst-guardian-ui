import { useState, useEffect } from "react";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AlertDetailDialog } from "@/components/alerts/AlertDetailDialog";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Alert } from "@/types/alerts";
import { mockAlerts } from "@/data/mockAlerts";
import { AlertTriangle, Activity, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate real-time updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app: fetch new alerts from API
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const criticalCount = alerts.filter(a => a.riskLevel === 'critical').length;
  const highCount = alerts.filter(a => a.riskLevel === 'high').length;
  const pendingCount = alerts.filter(a => a.status === 'pending').length;
  const resolvedToday = alerts.filter(a => a.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Critical Alerts"
          value={criticalCount}
          icon={AlertTriangle}
          color="destructive"
          trend={{ value: "12% from yesterday", isPositive: false }}
        />
        <StatsCard
          title="High Priority"
          value={highCount}
          icon={Activity}
          color="warning"
          trend={{ value: "5% from yesterday", isPositive: false }}
        />
        <StatsCard
          title="Pending Review"
          value={pendingCount}
          icon={Clock}
          color="info"
        />
        <StatsCard
          title="Resolved Today"
          value={resolvedToday}
          icon={CheckCircle}
          color="success"
          trend={{ value: "8% improvement", isPositive: true }}
        />
      </div>

      {/* Active Alerts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
        <div className="space-y-3">
          {alerts
            .filter(a => a.status !== 'resolved')
            .map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onView={setSelectedAlert}
              />
            ))}
        </div>
      </div>

      {/* Alert Detail Dialog */}
      <AlertDetailDialog
        alert={selectedAlert}
        open={!!selectedAlert}
        onOpenChange={(open) => !open && setSelectedAlert(null)}
      />
    </div>
  );
}
