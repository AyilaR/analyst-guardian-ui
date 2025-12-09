import { LucideIcon, Search, AlertTriangle, CheckCircle, FileX, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
  };
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "default",
  className,
  children,
}: EmptyStateProps) {
  const variants = {
    default: {
      iconColor: "text-muted-foreground",
      bgColor: "bg-muted/10",
      titleColor: "text-foreground",
    },
    success: {
      iconColor: "text-success",
      bgColor: "bg-success/10",
      titleColor: "text-success",
    },
    warning: {
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      titleColor: "text-warning",
    },
    error: {
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
      titleColor: "text-destructive",
    },
  };

  const config = variants[variant];
  const DefaultIcon = Icon || (variant === "success" ? CheckCircle : variant === "warning" ? AlertTriangle : variant === "error" ? FileX : Search);

  return (
    <div className={cn("glass rounded-xl p-12 text-center border border-border/30", className)}>
      <div className={cn("mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6", config.bgColor)}>
        <DefaultIcon className={cn("h-10 w-10 animate-float", config.iconColor)} />
      </div>
      
      <h3 className={cn("text-xl font-semibold mb-3", config.titleColor)}>
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>

      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || "default"}
          className="hover:shadow-glow transition-all duration-300"
        >
          {action.label}
        </Button>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}

// Specialized empty state components
export function NoAlertsState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      icon={Shield}
      title="All Clear!"
      description="No active security alerts detected. Your systems are running smoothly and all threats have been mitigated."
      variant="success"
      action={onRefresh ? {
        label: "Refresh",
        onClick: onRefresh,
        variant: "outline"
      } : undefined}
    />
  );
}

export function SearchEmptyState({ query, onClear }: { query: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No Results Found"
      description={`We couldn't find any results matching "${query}". Try adjusting your search terms or filters.`}
      action={onClear ? {
        label: "Clear Search",
        onClick: onClear,
        variant: "outline"
      } : undefined}
    />
  );
}

export function ErrorState({ 
  title = "Something Went Wrong", 
  description = "We encountered an error while loading your data. Please try again.", 
  onRetry 
}: { 
  title?: string; 
  description?: string; 
  onRetry?: () => void; 
}) {
  return (
    <EmptyState
      icon={AlertTriangle}
      title={title}
      description={description}
      variant="error"
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry,
        variant: "outline"
      } : undefined}
    />
  );
}