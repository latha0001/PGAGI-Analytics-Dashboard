'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchMockWeatherData, type WeatherResponse } from '@/lib/api-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import WeatherForecast from './weather-forecast';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeatherCard() {
  const [city, setCity] = useState('New York');
  const [searchCity, setSearchCity] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMockWeatherData(city);
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription className="text-blue-100">
              {weather ? `${weather.location.name}, ${weather.location.country}` : 'Loading location...'}
            </CardDescription>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input type="text" placeholder="Search city..." value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className="w-36 md:w-48 bg-white/20 border-white/30 placeholder:text-white/70 text-white"/>
            <Button type="submit" size="icon" variant="secondary">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">
            <p>{error}</p>
            <Button variant="outline" className="mt-2" onClick={() => setCity('New York')}> Try again</Button>
          </div>
        ) : weather && (
          <>
            <div className="flex flex-col md:flex-row items-center p-6 gap-6">
              <div className="flex items-center gap-4">
                <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} className="h-16 w-16"/>
                <div>
                  <div className="text-3xl font-bold">{weather.current.temp_c}°C</div>
                  <div className="text-muted-foreground">{weather.current.condition.text}</div>
                </div>
              </div>
              <div className="border-t border-border md:border-t-0 md:border-l h-16 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0 w-full md:w-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Wind</div>
                    <div>{weather.current.wind_kph} km/h</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div>{weather.current.humidity}%</div>
                  </div>
                </div>
              </div>
            </div>
            <WeatherForecast forecast={weather.forecast} />
          </>
        )}
      </CardContent>
    </Card>
  );
}