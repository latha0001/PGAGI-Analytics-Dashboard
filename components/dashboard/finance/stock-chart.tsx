'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StockChartProps {
  symbol: string;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y';

export default function StockChart({ symbol }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generateMockStockData = () => {
      const today = new Date();
      const data = [];
      const basePrice = 150;
      let dataPoints;
      
      switch (timeRange) {
        case '1D':
          dataPoints = 24; 
          for (let i = 0; i < dataPoints; i++) {
            const hour = i.toString().padStart(2, '0') + ':00';
            data.push({
              time: hour,
              price: basePrice + Math.sin(i / 3) * 5 + Math.random() * 2,
              volume: Math.floor(Math.random() * 10000 + 5000),
            });
          }
          break;
          
        case '1W':
          dataPoints = 7; 
          for (let i = 0; i < dataPoints; i++) {
            const date = new Date();
            date.setDate(today.getDate() - (dataPoints - i - 1));
            data.push({
              time: date.toLocaleDateString('en-US', { weekday: 'short' }),
              price: basePrice + (i * 2) + Math.random() * 10 - 5,
              volume: Math.floor(Math.random() * 100000 + 50000),
            });
          }
          break;
          
        case '1M':
          dataPoints = 30;
          for (let i = 0; i < dataPoints; i++) {
            const date = new Date();
            date.setDate(today.getDate() - (dataPoints - i - 1));
            data.push({
              time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              price: basePrice + (i * 0.7) + Math.sin(i / 5) * 15 + Math.random() * 5 - 2.5,
              volume: Math.floor(Math.random() * 200000 + 100000),
            });
          }
          break;
          
        case '3M':
          dataPoints = 12;
          for (let i = 0; i < dataPoints; i++) {
            const date = new Date();
            date.setDate(today.getDate() - (dataPoints - i - 1) * 7);
            data.push({
              time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              price: basePrice + (i * 1.5) + Math.sin(i / 2) * 10 + Math.random() * 5 - 2.5,
              volume: Math.floor(Math.random() * 500000 + 200000),
            });
          }
          break;
          
        case '1Y':
          dataPoints = 12;
          for (let i = 0; i < dataPoints; i++) {
            const date = new Date();
            date.setMonth(today.getMonth() - (dataPoints - i - 1));
            data.push({
              time: date.toLocaleDateString('en-US', { month: 'short' }),
              price: basePrice + (i * 3) + Math.sin(i / 2) * 20 + Math.random() * 10 - 5,
              volume: Math.floor(Math.random() * 1000000 + 500000),
            });
          }
          break;
      }
      
      return data;
    };
    
    setChartData(generateMockStockData());
  }, [timeRange, symbol]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded shadow-sm">
          <p className="font-medium">{`$${payload[0].value.toFixed(2)}`}</p>
          <p className="text-xs text-muted-foreground">{payload[0].payload.time}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-sm font-medium">Price History</h3>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList>
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[90%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`}/>
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="price" stroke="#10b981" fill="#10b981" fillOpacity={0.2} animationDuration={1000}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}