import { Card } from '@/components/ui/card';
import { NewsResponse } from '@/lib/api-utils';

interface NewsArticleProps {
  article: NewsResponse['articles'][0];
}

export default function NewsArticle({ article }: NewsArticleProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric',});

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col sm:flex-row gap-4 p-4"
      >
        {article.urlToImage && (
          <div className="flex-shrink-0">
            <img src={article.urlToImage} alt={article.title} className="h-32 w-full sm:w-32 object-cover rounded-md"/>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {article.description || 'No description available'}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.source.name}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </a>
    </Card>
  );
}