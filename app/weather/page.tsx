'use client';

import DashboardLayout from '@/components/dashboard/layout';
import WeatherCard from '@/components/dashboard/weather/weather-card';

export default function WeatherPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
      <div className="grid gap-6">
        <WeatherCard />
      </div>
    </DashboardLayout>
  );
}