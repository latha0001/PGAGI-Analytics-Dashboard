'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchMockStockData, StockQuote } from '@/lib/api-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import StockChart from './stock-chart';
import { Skeleton } from '@/components/ui/skeleton';
import StockInfo from './stock-info';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];

export default function FinanceCard() {
  const [symbol, setSymbol] = useState('AAPL');
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stockData, setStockData] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStock() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMockStockData(symbol);
        setStockData(data);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStock();
  }, [symbol]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
      setSymbol(searchSymbol.toUpperCase());
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Stock Market</CardTitle>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input type="text" placeholder="Search symbol..." value={searchSymbol} onChange={(e) => setSearchSymbol(e.target.value)} className="w-36 md:w-48 bg-white/20 border-white/30 placeholder:text-white/70 text-white"/>
            <Button type="submit" size="icon" variant="secondary">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {DEFAULT_SYMBOLS.map((sym) => (
            <Button key={sym} variant={sym === symbol ? "default" : "outline"} size="sm" onClick={() => setSymbol(sym)}> {sym} </Button>
          ))}
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-64 w-full mt-4" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-4">
            <p>{error}</p>
            <Button  variant="outline" className="mt-2" onClick={() => setSymbol('AAPL')}> Try again</Button>
          </div>
        ) : stockData && (
          <>
            <StockInfo stock={stockData} />
            <div className="mt-6 h-72">
              <StockChart symbol={symbol} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}