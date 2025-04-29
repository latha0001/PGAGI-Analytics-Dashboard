import { Suspense } from 'react';
import { WeatherWidget } from '@/components/dashboard/weather/WeatherWidget';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeatherPage() {
  return (
    <div className="p-6 space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Weather</h1>
        <p className="text-muted-foreground">
          Detailed weather information and forecasts.
        </p>
      </div>
      
      <Suspense fallback={<Skeleton className="h-[500px] rounded-xl" />}>
        <WeatherWidget />
      </Suspense>
    </div>
  );
}