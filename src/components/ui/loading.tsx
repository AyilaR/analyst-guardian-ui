import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "pulse" | "bars" | "dots";
  className?: string;
}

export function Loading({ size = "md", variant = "spinner", className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("animate-spin", sizeClasses[size], className)}>
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex space-x-2", className)}>
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])} />
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])} style={{ animationDelay: "0.2s" }} />
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])} style={{ animationDelay: "0.4s" }} />
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-end space-x-1", className)}>
        <div className={cn("bg-primary animate-pulse", size === "sm" ? "w-1 h-2" : size === "md" ? "w-2 h-4" : "w-3 h-6")} />
        <div className={cn("bg-primary animate-pulse", size === "sm" ? "w-1 h-3" : size === "md" ? "w-2 h-6" : "w-3 h-9")} style={{ animationDelay: "0.1s" }} />
        <div className={cn("bg-primary animate-pulse", size === "sm" ? "w-1 h-4" : size === "md" ? "w-2 h-8" : "w-3 h-12")} style={{ animationDelay: "0.2s" }} />
        <div className={cn("bg-primary animate-pulse", size === "sm" ? "w-1 h-3" : size === "md" ? "w-2 h-6" : "w-3 h-9")} style={{ animationDelay: "0.3s" }} />
        <div className={cn("bg-primary animate-pulse", size === "sm" ? "w-1 h-2" : size === "md" ? "w-2 h-4" : "w-3 h-6")} style={{ animationDelay: "0.4s" }} />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        <div className={cn("bg-primary rounded-full animate-bounce", sizeClasses[size])} />
        <div className={cn("bg-primary rounded-full animate-bounce", sizeClasses[size])} style={{ animationDelay: "0.1s" }} />
        <div className={cn("bg-primary rounded-full animate-bounce", sizeClasses[size])} style={{ animationDelay: "0.2s" }} />
      </div>
    );
  }

  return null;
}

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  children?: React.ReactNode;
}

export function LoadingOverlay({ isVisible, message = "Loading...", children }: LoadingOverlayProps) {
  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 glass rounded-lg flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <Loading size="lg" variant="spinner" />
          <p className="text-sm text-muted-foreground font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}