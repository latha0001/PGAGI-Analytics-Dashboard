'use client';

import { useState, useEffect, useRef } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import { BarChart, Cloud, Newspaper, Search, TrendingUp } from 'lucide-react';

interface SearchItem {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  url: string;
}

const searchItems: SearchItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Go to dashboard overview',
    icon: <BarChart className="mr-2 h-4 w-4" />,
    url: '/',
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Check weather forecasts',
    icon: <Cloud className="mr-2 h-4 w-4" />,
    url: '/weather',
  },
  {
    id: 'news',
    name: 'News',
    description: 'Browse latest news',
    icon: <Newspaper className="mr-2 h-4 w-4" />,
    url: '/news',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Check stock market data',
    icon: <TrendingUp className="mr-2 h-4 w-4" />,
    url: '/finance',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'View detailed analytics',
    icon: <BarChart className="mr-2 h-4 w-4" />,
    url: '/analytics',
  },
];

export function DashboardSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-full border border-input bg-background px-4 py-2 text-sm text-muted-foreground ring-offset-background transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-4 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across dashboard..." ref={inputRef}/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {searchItems.map((item) => (
              <CommandItem key={item.id} onSelect={() => { setOpen(false); router.push(item.url); }}>
                {item.icon}
                <span>{item.name}</span>
                <span className="ml-2 text-xs text-muted-foreground"> {item.description} </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}