import { useState } from "react";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AlertDetailDialog } from "@/components/alerts/AlertDetailDialog";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { Alert } from "@/types/alerts";
import { mockAlerts } from "@/data/mockAlerts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Alerts() {
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const pendingAlerts = alerts.filter(a => a.status === 'pending');
  const investigatingAlerts = alerts.filter(a => a.status === 'investigating');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alert Triage</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and respond to security alerts
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({pendingAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="investigating">
                Investigating ({investigatingAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({resolvedAlerts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3">
              {pendingAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onView={setSelectedAlert}
                />
              ))}
            </TabsContent>

            <TabsContent value="investigating" className="space-y-3">
              {investigatingAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onView={setSelectedAlert}
                />
              ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-3">
              {resolvedAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onView={setSelectedAlert}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Feedback Panel */}
        <div>
          {selectedAlert && (
            <FeedbackForm alertId={selectedAlert.id} />
          )}
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
