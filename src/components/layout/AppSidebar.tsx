import { Shield, AlertTriangle, Activity, FileText, Settings, BarChart3, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/components/theme-provider";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Knowledge Graph", url: "/graph", icon: BarChart3 },
  { title: "Compliance", url: "/compliance", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { theme } = useTheme();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-72"} bg-card border-r border-border/30`} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/30 bg-muted/10">
        <div className="flex items-center gap-3 px-4 py-6">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm -z-10"></div>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-display bg-gradient-primary bg-clip-text text-transparent">
                Analyst Guardian
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                AI Security Platform
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success font-mono-tech">v2.1.0</span>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? 'hidden' : 'block'} text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-primary text-primary-foreground shadow-glow font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`relative flex-shrink-0 ${isActive ? 'animate-float' : ''}`}>
                            <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                              isActive ? 'text-primary-foreground' : 'text-foreground opacity-90 group-hover:text-primary group-hover:opacity-100'
                            }`} />
                            {isActive && (
                              <div className="absolute -inset-1 bg-primary/30 rounded blur-sm -z-10"></div>
                            )}
                          </div>
                          {!collapsed && (
                            <span className={`font-medium text-sm ${
                              isActive ? 'text-primary-foreground' : 'text-foreground opacity-90 group-hover:text-primary group-hover:opacity-100'
                            }`}>
                              {item.title}
                            </span>
                          )}
                          {isActive && !collapsed && (
                            <div className="absolute right-3 w-2 h-2 bg-primary-foreground/80 rounded-full animate-pulse"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Status Section */}
        {!collapsed && (
          <div className="mt-8 mx-2">
            <div className="glass rounded-xl p-4 border border-border/30">
              <h3 className="text-sm font-semibold mb-3">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Threat Detection</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success font-mono-tech">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">API Status</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success font-mono-tech">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">ML Models</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-warning font-mono-tech">Training</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Theme</span>
                  <div className="flex items-center gap-1">
                    {theme === 'light' ? (
                      <>
                        <Sun className="w-2 h-2 text-warning" />
                        <span className="text-warning font-mono-tech">Light</span>
                      </>
                    ) : theme === 'dark' ? (
                      <>
                        <Moon className="w-2 h-2 text-info" />
                        <span className="text-info font-mono-tech">Dark</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-primary font-mono-tech">Auto</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {!collapsed && (
                <div className="mt-3 pt-3 border-t border-border/20">
                  <SimpleThemeToggle />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {!collapsed && (
          <div className="mt-4 mx-2">
            <div className="bg-gradient-card rounded-xl p-4 border border-border/30">
              <h3 className="text-sm font-semibold mb-3">Today's Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Alerts Processed</span>
                  <span className="text-sm font-bold font-mono-tech">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Threats Blocked</span>
                  <span className="text-sm font-bold font-mono-tech text-success">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">False Positives</span>
                  <span className="text-sm font-bold font-mono-tech text-muted-foreground">3</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
