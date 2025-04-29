import { Suspense } from 'react';
import { NewsWidget } from '@/components/dashboard/news/NewsWidget';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsPage() {
  return (
    <div className="p-6 space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">News</h1>
        <p className="text-muted-foreground">
          Latest headlines and updates from around the world.
        </p>
      </div>
      
      <Suspense fallback={<Skeleton className="h-[500px] rounded-xl" />}>
        <NewsWidget />
      </Suspense>
    </div>
  );
}