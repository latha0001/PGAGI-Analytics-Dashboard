'use client';

import { useMockWeatherApi } from '@/hooks/use-api';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Thermometer, Droplets, Wind } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export function WeatherWidget() {
  const [location, setLocation] = useState('San Francisco');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading, error } = useMockWeatherApi(location);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setLocation(searchInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) {
    return (
      <DashboardCard title="Weather" description="Current conditions and forecast">
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading weather data. Please try again.</p>
        </div>
      </DashboardCard>
    );
  }

  const forecastData = data?.forecast?.forecastday?.map((day: any) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: day.day.avgtemp_c,
    min: day.day.mintemp_c,
    max: day.day.maxtemp_c,
    condition: day.day.condition.text,
    icon: day.day.condition.icon,
    rainChance: day.day.daily_chance_of_rain
  })) || [];

  return (
    <DashboardCard 
      title="Weather" 
      description="Current conditions and forecast"
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center p-4 rounded-lg bg-card/40">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg font-medium">{data?.location?.name}, {data?.location?.country}</span>
              </div>

              <div className="flex items-center justify-center py-4">
                {data?.current?.condition?.icon && (
                  <img 
                    src={`https:${data.current.condition.icon}`} 
                    alt={data.current.condition.text} 
                    className="w-16 h-16"
                  />
                )}
                <div className="text-4xl font-bold ml-2">{data?.current?.temp_c}°C</div>
              </div>

              <div className="text-sm text-muted-foreground">{data?.current?.condition?.text}</div>

              <div className="flex items-center justify-between w-full mt-4">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-1 text-orange-500" />
                  <span className="text-sm">Feels: {data?.current?.feelslike_c}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                  <span className="text-sm">Humidity: {data?.current?.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-4 w-4 mr-1 text-teal-500" />
                  <span className="text-sm">Wind: {data?.current?.wind_kph} km/h</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">7-Day Forecast</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={forecastData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                  />
                  <YAxis 
                    className="text-xs"
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="max"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Max Temp (°C)"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Avg Temp (°C)"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="min"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Min Temp (°C)"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {forecastData.map((day: any, index: number) => (
                <div key={index} className="p-2 rounded-md bg-muted/30">
                  <div className="text-xs font-medium">{day.date}</div>
                  <img 
                    src={`https:${day.icon}`} 
                    alt={day.condition} 
                    className="w-8 h-8 mx-auto"
                  />
                  <div className="text-xs font-medium">{day.max}°</div>
                  <div className="text-xs text-muted-foreground">{day.min}°</div>
                  <div className="text-xs text-blue-500">{day.rainChance}%</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardCard>
  );
}