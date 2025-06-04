'use client';

import DashboardLayout from '@/components/dashboard/layout';
import NewsCard from '@/components/dashboard/news/news-card';

export default function NewsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">News Feed</h1>
      <div className="grid gap-6 h-[calc(100vh-12rem)]">
        <NewsCard />
      </div>
    </DashboardLayout>
  );
}