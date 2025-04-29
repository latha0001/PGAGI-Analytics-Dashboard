import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  cardContentClassName?: string;
}

export function DashboardCard({
  title,
  description,
  children,
  className,
  cardContentClassName,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("p-4 md:p-6 pt-0", cardContentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}