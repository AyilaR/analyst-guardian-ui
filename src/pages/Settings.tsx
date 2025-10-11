import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon, Shield, Bell, Users } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure platform preferences and access controls
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 bg-gradient-card hover:shadow-glow transition-smooth cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Security Policies</h3>
              <p className="text-sm text-muted-foreground">
                Configure MFA requirements, password policies, and access controls
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-glow transition-smooth cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Alert Thresholds</h3>
              <p className="text-sm text-muted-foreground">
                Customize risk scoring rules and alert notification preferences
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-glow transition-smooth cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">User Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage SOC analyst accounts and role-based access controls (RBAC)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-glow transition-smooth cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Integration Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure API endpoints, webhook notifications, and SIEM integrations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
