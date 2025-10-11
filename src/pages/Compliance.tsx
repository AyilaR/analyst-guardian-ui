import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAuditLogs } from "@/data/mockAlerts";
import { FileText, Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Compliance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance & Audit</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review security actions and audit logs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Actions</p>
              <p className="text-2xl font-bold font-mono-tech mt-1">{mockAuditLogs.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold font-mono-tech mt-1">100%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed Actions</p>
              <p className="text-2xl font-bold font-mono-tech mt-1">0</p>
            </div>
            <XCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card className="p-6 bg-gradient-card">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Audit Logs
        </h2>
        <div className="space-y-3">
          {mockAuditLogs.map((log) => (
            <div
              key={log.id}
              className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-mono-tech text-xs">
                      {log.id}
                    </Badge>
                    <Badge variant="secondary">{log.action}</Badge>
                    <Badge variant={log.result === 'success' ? 'default' : 'destructive'}>
                      {log.result}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {log.user}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
