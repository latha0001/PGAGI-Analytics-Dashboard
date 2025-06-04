import { StockQuote } from '@/lib/api-utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockInfoProps {
  stock: StockQuote;
}

export default function StockInfo({ stock }: StockInfoProps) {
  const isPositive = stock.change >= 0;
  const changeClass = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold">{stock.symbol}</h2>
        <span className="text-xl font-semibold">${stock.price.toFixed(2)}</span>
        <span className={cn("flex items-center text-sm", changeClass)}>
          {isPositive ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Open</div>
          <div className="font-medium">${stock.open.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Previous Close</div>
          <div className="font-medium">${stock.previousClose.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Day High</div>
          <div className="font-medium">${stock.dayHigh.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Day Low</div>
          <div className="font-medium">${stock.dayLow.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}