import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="h-18 glass border-b border-border/20 sticky top-0 z-50 backdrop-blur-xl">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-6">
                <SidebarTrigger className="hover:shadow-glow transition-all duration-300" />
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-border/30"></div>
                  <div>
                    <h2 className="text-sm font-semibold font-display">
                      Analyst Guardian AI
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                      <p className="text-xs text-muted-foreground">
                        Real-time monitoring active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/20 border border-border/30 min-w-[200px]">
                  <div className="w-4 h-4 text-muted-foreground">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    placeholder="Search alerts, IPs, users..."
                    className="bg-transparent text-xs outline-none flex-1 placeholder:text-muted-foreground"
                  />
                  <kbd className="text-xs text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">
                    ⌘K
                  </kbd>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-card border border-border/30">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono-tech text-success">99.9%</span>
                  </div>
                  <div className="w-px h-4 bg-border/30"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-xs font-mono-tech">2.3ms</span>
                  </div>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notification Bell */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:shadow-glow transition-all duration-300"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </span>
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-ping"></span>
                </Button>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-muted/10 transition-all duration-300 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-semibold">Security Analyst</p>
                    <p className="text-xs text-muted-foreground">admin@company.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-header with breadcrumbs and actions */}
            <div className="px-6 py-2 border-t border-border/10 bg-background/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-foreground font-medium">Overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono-tech text-muted-foreground">
                    Last sync: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content with better spacing */}
          <main className="flex-1 p-8 overflow-auto bg-gradient-mesh">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
