'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMockNewsData, NewsResponse } from '@/lib/api-utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import NewsArticle from './news-article';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment' },
];

export default function NewsCard() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const data = await fetchMockNewsData(activeCategory);
        setNewsData(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [activeCategory]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between"> <span>Latest News</span> </CardTitle>
      </CardHeader>
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1 flex flex-col">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <CardContent className="flex-1 pt-6 px-6">
          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value} className="h-full m-0">
              <ScrollArea className="h-[400px] md:h-[500px] pr-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : newsData && (
                  <div className="space-y-4">
                    {newsData.articles.map((article, index) => (
                      <NewsArticle key={index} article={article} />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  );
}