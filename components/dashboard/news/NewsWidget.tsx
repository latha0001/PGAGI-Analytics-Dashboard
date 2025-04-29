'use client';

import { useMockNewsApi } from '@/hooks/use-api';
import { useState } from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User, ExternalLink } from 'lucide-react';
import { Article } from '@/lib/api-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const NEWS_CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'technology', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'sports', label: 'Sports' },
];

export function NewsWidget() {
  const [category, setCategory] = useState('general');
  const { data, isLoading, error } = useMockNewsApi(category);
  
  if (error) {
    return (
      <DashboardCard title="News" description="Latest headlines and updates">
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading news data. Please try again.</p>
        </div>
      </DashboardCard>
    );
  }

  const articles = data?.articles || [];
  
  return (
    <DashboardCard 
      title="News" 
      description="Latest headlines and updates"
    >
      <Tabs defaultValue="general" onValueChange={setCategory} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-4">
          {NEWS_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs md:text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {NEWS_CATEGORIES.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-4">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-48 md:h-32 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              <div className="space-y-4">
                {articles.map((article: Article, index: number) => (
                  <NewsArticleCard key={index} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardCard>
  );
}

function NewsArticleCard({ article }: { article: Article }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left">
        <div className="group flex flex-col md:flex-row gap-4 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50">
          {article.urlToImage && (
            <div className="overflow-hidden rounded-md aspect-video md:w-1/4 flex-shrink-0">
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold leading-tight line-clamp-2 group-hover:underline">
              {article.title}
            </h3>
            
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {article.description}
            </p>
            
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </time>
              </div>
              
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{article.author.split(',')[0]}</span>
                </div>
              )}
              
              <Badge variant="outline" className="text-xs">
                {article.source.name}
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[600px] pr-4">
          {article.urlToImage && (
            <div className="overflow-hidden rounded-md aspect-video mb-4">
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center gap-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString()}
              </time>
            </div>
            
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author.split(',')[0]}</span>
              </div>
            )}
            
            <Badge variant="outline">
              {article.source.name}
            </Badge>
          </div>
          
          <p className="text-sm md:text-base leading-relaxed mb-4">
            {article.content?.replace(/\[\+\d+ chars\]$/, '') || article.description}
          </p>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Read full article <ExternalLink className="h-3 w-3" />
          </a>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}