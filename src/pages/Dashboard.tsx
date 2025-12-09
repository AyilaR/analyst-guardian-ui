import { useState, useEffect } from "react";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AlertDetailDialog } from "@/components/alerts/AlertDetailDialog";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Alert } from "@/types/alerts";
import { mockAlerts } from "@/data/mockAlerts";
import { AlertTriangle, Activity, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { NoAlertsState } from "@/components/ui/empty-state";
import { MetricChart, ActivityFeed } from "@/components/ui/charts";
import { LoadingOverlay } from "@/components/ui/loading";

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app: fetch new alerts from API
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const criticalCount = alerts.filter(a => a.riskLevel === 'critical').length;
  const highCount = alerts.filter(a => a.riskLevel === 'high').length;
  const pendingCount = alerts.filter(a => a.status === 'pending').length;
  const resolvedToday = alerts.filter(a => a.status === 'resolved').length;

  const activeAlerts = alerts.filter(a => a.status !== 'resolved');

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Status Indicator */}
      <div className="animate-slide-in-up">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-display bg-gradient-primary bg-clip-text text-transparent">
                Security Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <p className="text-sm text-muted-foreground">
                    System operational • Last updated: {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-gradient-card border text-xs font-mono-tech">
              {activeAlerts.length} Active Threats
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="hover:shadow-glow transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Threat Level Indicator Bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-critical transition-all duration-1000"
            style={{ width: `${Math.min((criticalCount / activeAlerts.length) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Enhanced Stats Grid with Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-slide-in-up animate-delay-100">
          <StatsCard
            title="Critical Alerts"
            value={criticalCount}
            icon={AlertTriangle}
            color="destructive"
            trend={{ value: "12% from yesterday", isPositive: false }}
          />
        </div>
        <div className="animate-slide-in-up animate-delay-200">
          <StatsCard
            title="High Priority"
            value={highCount}
            icon={Activity}
            color="warning"
            trend={{ value: "5% from yesterday", isPositive: false }}
          />
        </div>
        <div className="animate-slide-in-up animate-delay-300">
          <StatsCard
            title="Pending Review"
            value={pendingCount}
            icon={Clock}
            color="info"
          />
        </div>
        <div className="animate-slide-in-up animate-delay-400">
          <StatsCard
            title="Resolved Today"
            value={resolvedToday}
            icon={CheckCircle}
            color="success"
            trend={{ value: "8% improvement", isPositive: true }}
          />
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="animate-slide-in-up animate-delay-200">
        <div className="glass rounded-xl p-4 border border-border/30 bg-card/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm mb-1">Quick Actions</h3>
              <p className="text-xs text-muted-foreground">Manage your security operations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs hover:shadow-glow transition-all">
                Generate Report
              </Button>
              <Button size="sm" variant="outline" className="text-xs hover:shadow-glow transition-all">
                Export Data
              </Button>
              <Button size="sm" className="text-xs bg-gradient-primary hover:shadow-glow transition-all">
                New Investigation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Active Alerts Section */}
      <div className="animate-slide-in-up animate-delay-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Active Threats</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {activeAlerts.length} alerts requiring attention
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Sort by Risk
            </Button>
          </div>
        </div>
        
        <LoadingOverlay isVisible={isLoading} message="Refreshing threat data...">
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.map((alert, index) => (
                <div 
                  key={alert.id}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <AlertCard
                    alert={alert}
                    onView={setSelectedAlert}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoAlertsState onRefresh={handleRefresh} />
          )}
        </LoadingOverlay>
      </div>

      {/* Analytics and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-up animate-delay-400">
        {/* Threat Analysis Chart */}
        <MetricChart
          title="Threat Categories (Last 7 Days)"
          type="donut"
          data={[
            { label: "Malware", value: 23, color: "hsl(var(--destructive))" },
            { label: "Phishing", value: 18, color: "hsl(var(--warning))" },
            { label: "Suspicious Login", value: 12, color: "hsl(var(--info))" },
            { label: "Data Exfiltration", value: 8, color: "hsl(var(--accent))" },
            { label: "Other", value: 5, color: "hsl(var(--muted))" },
          ]}
        />

        {/* Response Time Metrics */}
        <MetricChart
          title="Response Time Analysis"
          type="bar"
          showTrend={true}
          trend={{ value: 15, isPositive: true }}
          data={[
            { label: "Detection", value: 45, color: "bg-success" },
            { label: "Investigation", value: 120, color: "bg-warning" },
            { label: "Containment", value: 85, color: "bg-info" },
            { label: "Resolution", value: 200, color: "bg-primary" },
          ]}
        />

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed
            activities={[
              {
                id: "1",
                type: "alert",
                message: "Critical malware detected on server-prod-01",
                timestamp: new Date(Date.now() - 5 * 60 * 1000),
                user: "Security Team"
              },
              {
                id: "2",
                type: "investigation",
                message: "Investigating suspicious login attempts from IP 192.168.1.100",
                timestamp: new Date(Date.now() - 15 * 60 * 1000),
                user: "John Doe"
              },
              {
                id: "3",
                type: "resolved",
                message: "Phishing campaign blocked, 247 emails quarantined",
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                user: "AI Guardian"
              },
              {
                id: "4",
                type: "update",
                message: "Threat intelligence feeds updated with 1,247 new IoCs",
                timestamp: new Date(Date.now() - 45 * 60 * 1000),
                user: "System"
              },
              {
                id: "5",
                type: "alert",
                message: "Unusual data transfer detected from database server",
                timestamp: new Date(Date.now() - 60 * 60 * 1000),
                user: "Security Team"
              },
            ]}
          />
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
