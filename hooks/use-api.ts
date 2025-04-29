'use client';

import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Finance data types
interface HistoricalDataPoint {
  date: string;
  close: number;
}

interface RelatedStock {
  symbol: string;
  change: number;
  changePercent: number;
}

interface FinanceData {
  symbol: string;
  companyName: string;
  latestPrice: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  week52High: number;
  week52Low: number;
  historicalData: HistoricalDataPoint[];
  relatedStocks: RelatedStock[];
}

export function useApi<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          isLoading: false, 
          error: error instanceof Error ? error : new Error('Unknown error occurred') 
        });
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return state;
}

// Mock API functions for development
export function useMockWeatherApi(location: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(mockWeatherData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return { data, isLoading, error };
}

export function useMockNewsApi(category: string = 'general') {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(mockNewsData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [category]);

  return { data, isLoading, error };
}

export function useMockFinanceApi(symbol: string = 'AAPL') {
  const [data, setData] = useState<FinanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(mockFinanceData);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [symbol]);

  return { data, isLoading, error };
}

// Mock data for development
const mockWeatherData = {
  location: {
    name: "San Francisco",
    country: "United States",
    lat: 37.77,
    lon: -122.42
  },
  current: {
    temp_c: 18,
    temp_f: 64.4,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
    },
    wind_kph: 14.4,
    humidity: 72,
    feelslike_c: 17.5,
    uv: 4
  },
  forecast: {
    forecastday: [
      {
        date: "2025-05-01",
        day: {
          maxtemp_c: 20.5,
          mintemp_c: 14.3,
          avgtemp_c: 17.4,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
          },
          daily_chance_of_rain: 0
        },
        hour: []
      },
      {
        date: "2025-05-02",
        day: {
          maxtemp_c: 19.2,
          mintemp_c: 13.8,
          avgtemp_c: 16.5,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          daily_chance_of_rain: 10
        },
        hour: []
      },
      {
        date: "2025-05-03",
        day: {
          maxtemp_c: 17.9,
          mintemp_c: 13.1,
          avgtemp_c: 15.5,
          condition: {
            text: "Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/119.png"
          },
          daily_chance_of_rain: 25
        },
        hour: []
      },
      {
        date: "2025-05-04",
        day: {
          maxtemp_c: 16.7,
          mintemp_c: 12.6,
          avgtemp_c: 14.6,
          condition: {
            text: "Light rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
          },
          daily_chance_of_rain: 70
        },
        hour: []
      },
      {
        date: "2025-05-05",
        day: {
          maxtemp_c: 16.2,
          mintemp_c: 12.0,
          avgtemp_c: 14.1,
          condition: {
            text: "Moderate rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/302.png"
          },
          daily_chance_of_rain: 80
        },
        hour: []
      },
      {
        date: "2025-05-06",
        day: {
          maxtemp_c: 17.1,
          mintemp_c: 12.8,
          avgtemp_c: 15.0,
          condition: {
            text: "Light rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
          },
          daily_chance_of_rain: 60
        },
        hour: []
      },
      {
        date: "2025-05-07",
        day: {
          maxtemp_c: 18.6,
          mintemp_c: 13.5,
          avgtemp_c: 16.0,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          daily_chance_of_rain: 20
        },
        hour: []
      }
    ]
  }
};

const mockNewsData = {
  status: "ok",
  totalResults: 5,
  articles: [
    {
      source: { id: "techcrunch", name: "TechCrunch" },
      author: "Jane Smith",
      title: "AI Breakthroughs Transform Healthcare Industry",
      description: "New AI developments are revolutionizing healthcare diagnostics and treatment planning.",
      url: "https://example.com/ai-healthcare",
      urlToImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      publishedAt: "2025-05-01T09:30:00Z",
      content: "Artificial intelligence continues to make significant strides in healthcare..."
    },
    {
      source: { id: "wired", name: "Wired" },
      author: "John Doe",
      title: "Quantum Computing Reaches New Milestone",
      description: "Scientists achieve quantum advantage with new 500-qubit processor.",
      url: "https://example.com/quantum-milestone",
      urlToImage: "https://images.pexels.com/photos/8566700/pexels-photo-8566700.jpeg",
      publishedAt: "2025-05-01T08:15:00Z",
      content: "In a breakthrough announcement, researchers have demonstrated quantum supremacy..."
    },
    {
      source: { id: "bbc", name: "BBC News" },
      author: "Alice Johnson",
      title: "Climate Summit Ends with Historic Agreement",
      description: "World leaders commit to aggressive carbon reduction targets by 2030.",
      url: "https://example.com/climate-summit",
      urlToImage: "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg",
      publishedAt: "2025-04-30T18:45:00Z",
      content: "After two weeks of intense negotiations, the Global Climate Summit concluded..."
    },
    {
      source: { id: "forbes", name: "Forbes" },
      author: "Robert Green",
      title: "Tech Giants Face New Regulatory Challenges",
      description: "Lawmakers propose comprehensive reforms for technology sector oversight.",
      url: "https://example.com/tech-regulation",
      urlToImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      publishedAt: "2025-04-30T14:20:00Z",
      content: "Silicon Valley's largest companies are bracing for a new wave of regulations..."
    },
    {
      source: { id: "economist", name: "The Economist" },
      author: "Sandra Miller",
      title: "Global Economy Shows Signs of Robust Recovery",
      description: "International Monetary Fund raises growth forecasts for coming year.",
      url: "https://example.com/economic-recovery",
      urlToImage: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg",
      publishedAt: "2025-04-29T11:10:00Z",
      content: "The world economy is bouncing back faster than expected according to latest figures..."
    }
  ]
};

const mockFinanceData: FinanceData = {
  symbol: "AAPL",
  companyName: "Apple Inc.",
  latestPrice: 187.36,
  change: 1.25,
  changePercent: 0.67,
  marketCap: 2950000000000,
  peRatio: 28.5,
  week52High: 198.23,
  week52Low: 139.71,
  historicalData: [
    { date: "2025-04-24", close: 183.44 },
    { date: "2025-04-25", close: 185.21 },
    { date: "2025-04-26", close: 183.89 },
    { date: "2025-04-27", close: 184.67 },
    { date: "2025-04-28", close: 186.11 },
    { date: "2025-04-29", close: 184.89 },
    { date: "2025-04-30", close: 186.22 },
    { date: "2025-05-01", close: 187.36 }
  ],
  relatedStocks: [
    { symbol: "MSFT", change: 1.2, changePercent: 0.32 },
    { symbol: "GOOGL", change: -0.8, changePercent: -0.21 },
    { symbol: "AMZN", change: 2.1, changePercent: 0.75 },
    { symbol: "META", change: -1.1, changePercent: -0.47 }
  ]
};