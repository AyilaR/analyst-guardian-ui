import { useTheme } from "@/components/theme-provider";
import { Card as BaseCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThemeAwareCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "elevated";
  children: React.ReactNode;
}

export function ThemeAwareCard({ 
  variant = "default", 
  className, 
  children, 
  ...props 
}: ThemeAwareCardProps) {
  const { theme } = useTheme();
  
  const getVariantClasses = () => {
    const isLight = theme === 'light' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);
    
    switch (variant) {
      case "glass":
        return isLight 
          ? "glass border border-border/20 bg-white/80 backdrop-blur-xl" 
          : "glass border border-border/30";
      case "gradient":
        return isLight
          ? "bg-gradient-to-br from-white to-slate-50 border border-border/20 shadow-sm"
          : "bg-gradient-card border border-border/30";
      case "elevated":
        return isLight
          ? "bg-white shadow-lg border border-border/10"
          : "bg-card shadow-elevated border border-border/20";
      default:
        return isLight
          ? "bg-white border border-border/20"
          : "bg-card border border-border/30";
    }
  };

  return (
    <BaseCard 
      className={cn(getVariantClasses(), className)} 
      {...props}
    >
      {children}
    </BaseCard>
  );
}