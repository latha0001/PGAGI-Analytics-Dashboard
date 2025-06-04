import { z } from 'zod';

export const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo';
export const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo';
export const financeApiKey = process.env.NEXT_PUBLIC_FINANCE_API_KEY || 'demo';
export const weatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  }),
  current: z.object({
    temp_c: z.number(),
    temp_f: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
    wind_kph: z.number(),
    humidity: z.number(),
  }),
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        day: z.object({
          maxtemp_c: z.number(),
          mintemp_c: z.number(),
          condition: z.object({
            text: z.string(),
            icon: z.string(),
          }),
        }),
        hour: z.array(
          z.object({
            time: z.string(),
            temp_c: z.number(),
            condition: z.object({
              text: z.string(),
              icon: z.string(),
            }),
          })
        ),
      })
    ),
  }),
});

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
export const newsResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(
    z.object({
      source: z.object({
        id: z.string().nullable(),
        name: z.string(),
      }),
      author: z.string().nullable(),
      title: z.string(),
      description: z.string().nullable(),
      url: z.string(),
      urlToImage: z.string().nullable(),
      publishedAt: z.string(),
      content: z.string().nullable(),
    })
  ),
});

export type NewsResponse = z.infer<typeof newsResponseSchema>;
export const stockQuoteSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  change: z.number(),
  changePercent: z.number(),
  previousClose: z.number(),
  open: z.number(),
  dayHigh: z.number(),
  dayLow: z.number(),
  volume: z.number(),
});

export type StockQuote = z.infer<typeof stockQuoteSchema>;
export async function fetchMockWeatherData(city: string): Promise<WeatherResponse> {
  return {
    location: {
      name: city,
      country: 'United States',
      lat: 40.7128,
      lon: -74.006,
    },
    current: {
      temp_c: 22.5,
      temp_f: 72.5,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      wind_kph: 15.1,
      humidity: 65,
    },
    forecast: {
      forecastday: Array(7)
        .fill(null)
        .map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          return {
            date: date.toISOString().split('T')[0],
            day: {
              maxtemp_c: 24 + Math.random() * 5,
              mintemp_c: 18 + Math.random() * 4,
              condition: {
                text: index % 2 ? 'Sunny' : 'Partly cloudy',
                icon: index % 2 
                  ? '//cdn.weatherapi.com/weather/64x64/day/113.png' 
                  : '//cdn.weatherapi.com/weather/64x64/day/116.png',
              },
            },
            hour: Array(24)
              .fill(null)
              .map((_, hourIndex) => ({
                time: `${date.toISOString().split('T')[0]} ${hourIndex.toString().padStart(2, '0')}:00`,
                temp_c: 20 + Math.sin(hourIndex / 3) * 5,
                condition: {
                  text: hourIndex < 7 || hourIndex > 18 ? 'Clear' : 'Sunny',
                  icon: hourIndex < 7 || hourIndex > 18 
                    ? '//cdn.weatherapi.com/weather/64x64/night/113.png'
                    : '//cdn.weatherapi.com/weather/64x64/day/113.png',
                },
              })),
          };
        }),
    },
  };
}

export async function fetchMockNewsData(category = 'general'): Promise<NewsResponse> {
  const categories = ['business', 'technology', 'health', 'sports', 'entertainment', 'general'];
  const generateArticles = (count: number, category: string) => {
    return Array(count).fill(null).map((_, i) => ({
      source: {
        id: `source-${i}`,
        name: `News Source ${i + 1}`,
      },
      author: `Author ${i + 1}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} News Article ${i + 1}`,
      description: `This is a description for a mock news article in the ${category} category.`,
      url: 'https://example.com',
      urlToImage: `https://picsum.photos/seed/${category}${i}/800/400`,
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, 
        aliquam nunc id, tincidunt nisl. Sed euismod, nisl id tincidunt aliquam, 
        nunc nisl aliquam nunc, id euismod nisl nisl id nisl.`,
    }));
  };
  
  return {
    status: 'ok',
    totalResults: 20,
    articles: generateArticles(20, categories.includes(category) ? category : 'general'),
  };
}

export async function fetchMockStockData(symbol: string): Promise<StockQuote> {
  const basePrice = 150 + Math.random() * 200;
  const change = (Math.random() * 10) - 5; // Between -5 and +5
  const changePercent = (change / basePrice) * 100;
  
  return {
    symbol: symbol.toUpperCase(),
    price: basePrice,
    change: change,
    changePercent: changePercent,
    previousClose: basePrice - change,
    open: basePrice - (change / 2),
    dayHigh: basePrice + Math.abs(change) + (Math.random() * 2),
    dayLow: basePrice - Math.abs(change) - (Math.random() * 2),
    volume: Math.floor(1000000 + Math.random() * 10000000),
  };
}