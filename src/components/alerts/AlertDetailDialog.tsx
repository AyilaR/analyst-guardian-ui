import { Alert } from "@/types/alerts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";

interface AlertDetailDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertDetailDialog({ alert, open, onOpenChange }: AlertDetailDialogProps) {
  if (!alert) return null;

  const handleApprove = (actionId: string, actionText: string) => {
    toast.success(`Action approved: ${actionText}`);
    // In real app: call API to approve action
  };

  const handleReject = (actionId: string) => {
    toast.info("Action rejected");
    // In real app: call API to reject action
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {alert.title}
          </DialogTitle>
          <DialogDescription>
            Alert ID: <span className="font-mono-tech">{alert.id}</span> • 
            Risk Level: <Badge variant={alert.riskLevel as any} className="ml-1">{alert.riskLevel}</Badge>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 p-1">
            {/* Narrative */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Threat Narrative
              </h3>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                {alert.narrative}
              </p>
            </div>

            <Separator />

            {/* User Details */}
            <div>
              <h3 className="font-semibold mb-3">User & Context</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 font-medium">{alert.user.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 font-mono-tech text-xs">{alert.user.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <span className="ml-2">{alert.user.role}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <span className="ml-2">{alert.user.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Source IP:</span>
                  <span className="ml-2 font-mono-tech">{alert.sourceIp}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2">{alert.location}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Indicators */}
            <div>
              <h3 className="font-semibold mb-3">Key Indicators</h3>
              <div className="grid gap-2">
                {alert.indicators.map((indicator, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-muted/20 p-2 rounded">
                    <span className="text-sm text-muted-foreground">{indicator.key}</span>
                    <span className="text-sm font-medium font-mono-tech">{indicator.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recommended Actions */}
            <div>
              <h3 className="font-semibold mb-3">Recommended Actions (Explainability)</h3>
              <div className="space-y-3">
                {alert.recommendedActions.map((action) => (
                  <div key={action.id} className="border border-border rounded-lg p-3 bg-card/50">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{action.action}</h4>
                        <p className="text-xs text-muted-foreground italic">
                          Rationale: {action.rationale}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="default"
                        className="bg-success hover:bg-success/90"
                        onClick={() => handleApprove(action.id, action.action)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReject(action.id)}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
