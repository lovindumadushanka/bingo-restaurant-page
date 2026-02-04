import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/10 border-primary/20",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
  };

  return (
    <div className={`stat-card ${variantStyles[variant]} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-sm mt-2 font-medium ${
              trend.isPositive ? "text-success" : "text-destructive"
            }`}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
