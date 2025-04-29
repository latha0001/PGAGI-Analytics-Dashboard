import { Suspense } from 'react';
import { FinanceWidget } from '@/components/dashboard/finance/FinanceWidget';
import { Skeleton } from '@/components/ui/skeleton';

export default function FinancePage() {
  return (
    <div className="p-6 space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
        <p className="text-muted-foreground">
          Stock market data and financial insights.
        </p>
      </div>
      
      <Suspense fallback={<Skeleton className="h-[500px] rounded-xl" />}>
        <FinanceWidget />
      </Suspense>
    </div>
  );
}