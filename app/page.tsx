import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl px-4 py-16 md:py-24 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <BarChart3 className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl md:text-6xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="mx-auto mb-8 max-w-[700px] text-lg text-muted-foreground">
          Access real-time insights with our comprehensive analytics dashboard.
          Monitor weather, news, and financial data in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}