'use client';

import { WeatherWidget } from '@/components/dashboard/weather/WeatherWidget';
import { NewsWidget } from '@/components/dashboard/news/NewsWidget';
import { FinanceWidget } from '@/components/dashboard/finance/FinanceWidget';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your analytics data from multiple sources.
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          <div className="lg:col-span-2">
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="news" className="pt-6">
                <NewsWidget />
              </TabsContent>
              
              <TabsContent value="finance" className="pt-6">
                <FinanceWidget />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <p className="text-xs text-muted-foreground">
          Data is refreshed every 5 minutes. Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}