'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import { StatCard } from '@/components/dashboard/stat-card';
import WeatherCard from '@/components/dashboard/weather/weather-card';
import NewsCard from '@/components/dashboard/news/news-card';
import FinanceCard from '@/components/dashboard/finance/finance-card';
import { Cloud, Newspaper, TrendingUp, UserCheck } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Users" value="2,420" description="23% increase from last week" trend={23} icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}/>
        <StatCard title="Weather Updates" value="15 Locations" description="5 new locations added" trend={12} icon={<Cloud className="h-4 w-4 text-muted-foreground" />}/>
        <StatCard title="News Articles" value="143" description="12% increase from yesterday" trend={12} icon={<Newspaper className="h-4 w-4 text-muted-foreground" />}/>
        <StatCard title="Stock Alerts" value="8" description="3 critical price changes" trend={-5} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-6">
          <WeatherCard />
          <FinanceCard />
        </div>
        <NewsCard />
      </div>
    </DashboardLayout>
  );
}