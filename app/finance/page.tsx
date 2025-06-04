'use client';

import DashboardLayout from '@/components/dashboard/layout';
import FinanceCard from '@/components/dashboard/finance/finance-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { BarChart2, TrendingDown, TrendingUp } from 'lucide-react';

export default function FinancePage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Market Index" value="4,263.75" trend={1.24} icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}/>
        <StatCard title="Top Gainers" value="NVDA" description="$345.67 (+5.4%)" trend={5.4} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}/>
        <StatCard title="Top Losers" value="INTC" description="$52.31 (-3.2%)" trend={-3.2} icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}/>
      </div>
      
      <div className="grid gap-6">
        <FinanceCard />
      </div>
    </DashboardLayout>
  );
}