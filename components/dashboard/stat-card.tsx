import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const statCardVariants = cva("transition-all duration-300 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
      },
      size: {
        default: "h-[140px]",
        sm: "h-[120px]",
        lg: "h-[180px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, variant, size, className,}: StatCardProps) {
  const showTrend = trend !== undefined;
  
  return (
    <Card className={cn(statCardVariants({ variant, size }), className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(showTrend || description) && (
          <div className="mt-2 flex items-center text-xs">
            {showTrend && (
              <span 
                className={cn(
                  "mr-2 flex items-center gap-0.5",
                  trend > 0 ? "text-green-500" : "text-red-500"
                )}>
                {trend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(trend).toFixed(1)}%
              </span>
            )}
            {description && (
              <CardDescription className="text-xs">{description}</CardDescription>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}