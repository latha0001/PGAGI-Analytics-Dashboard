'use client';

import { WeatherResponse } from '@/lib/api-utils';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface WeatherForecastProps {
  forecast: WeatherResponse['forecast'];
}

export default function WeatherForecast({ forecast }: WeatherForecastProps) {
  const dailyData = forecast.forecastday.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    min: Math.round(day.day.mintemp_c),
    max: Math.round(day.day.maxtemp_c),
    icon: day.day.condition.icon,
    condition: day.day.condition.text,
  }));

  const hourlyData = forecast.forecastday[0].hour.map(hour => ({
    time: new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit' }),
    temp: Math.round(hour.temp_c),
    icon: hour.condition.icon,
    condition: hour.condition.text,
  }));

  return (
    <div className="p-4">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {dailyData.map((day, i) => (
              <Card key={i} className="flex flex-col items-center p-3 min-w-[100px] text-center">
                <span className="font-medium">{day.date}</span>
                <img src={`https:${day.icon}`} alt={day.condition} className="w-12 h-12 my-2" />
                <div className="flex gap-2 text-sm">
                  <span className="font-medium">{day.max}°</span>
                  <span className="text-muted-foreground">{day.min}°</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <Area type="monotone" dataKey="max" name="Max Temp °C" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} animationDuration={1000}/>
                <Area type="monotone" dataKey="min" name="Min Temp °C" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.4} animationDuration={1000} animationBegin={300}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="hourly" className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {hourlyData.filter((_, i) => i % 3 === 0).map((hour, i) => (
              <Card key={i} className="flex flex-col items-center p-3 min-w-[80px] text-center">
                <span className="text-sm">{hour.time}</span>
                <img src={`https:${hour.icon}`} alt={hour.condition} className="w-10 h-10 my-2" />
                <span className="font-medium text-sm">{hour.temp}°</span>
              </Card>
            ))}
          </div>
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <Area type="monotone" dataKey="temp" name="Temperature °C" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} animationDuration={1000}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}