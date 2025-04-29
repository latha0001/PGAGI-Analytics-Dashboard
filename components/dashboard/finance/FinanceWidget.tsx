'use client';

import { useMockFinanceApi } from '@/hooks/use-api';
import { useState } from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function FinanceWidget() {
  const [symbol, setSymbol] = useState('AAPL');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading, error } = useMockFinanceApi(symbol);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSymbol(searchInput.toUpperCase());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) {
    return (
      <DashboardCard title="Finance" description="Stock market data">
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading financial data. Please try again.</p>
        </div>
      </DashboardCard>
    );
  }

  const chartData = data?.historicalData || [];
  const relatedStocks = data?.relatedStocks || [];
  const isPositive = (data?.change || 0) >= 0;
  const changePercent = data?.changePercent || 0;

  // Format market cap to show B or T for billions/trillions
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    }
  };

  return (
    <DashboardCard 
      title="Finance" 
      description="Stock market data"
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter stock symbol..."
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">${data?.latestPrice}</span>
                  <span className={cn(
                    "font-medium text-sm pb-1",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}>
                    {isPositive ? "+" : ""}{data?.change.toFixed(2)}
                    {isPositive ? <ChevronUp className="h-4 w-4 inline" /> : <ChevronDown className="h-4 w-4 inline" />}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{data?.companyName}</div>
                <Badge variant={isPositive ? "success" : "destructive"} className="mt-1">
                  {isPositive ? "+" : ""}{changePercent.toFixed(2)}%
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Market Cap</div>
                <div className="font-medium">{formatMarketCap(data?.marketCap || 0)}</div>
                <div className="text-xs text-muted-foreground">P/E Ratio</div>
                <div className="font-medium">{data?.peRatio.toFixed(2)}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">52W High</div>
                <div className="font-medium">${data?.week52High.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">52W Low</div>
                <div className="font-medium">${data?.week52Low.toFixed(2)}</div>
              </div>

              <div className="space-y-2 col-span-1">
                <div className="text-xs font-medium mb-1">Related Stocks</div>
                {relatedStocks.map((stock: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stock.symbol}</span>
                    <span className={cn(
                      "text-xs",
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="area" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="area">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Area Chart
                </TabsTrigger>
                <TabsTrigger value="line">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Line Chart
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="area" className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={chartData}
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
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="close" 
                      stroke="hsl(var(--chart-1))" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      strokeWidth={2}
                      name="Price"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="line" className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartData}
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
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      name="Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardCard>
  );
}