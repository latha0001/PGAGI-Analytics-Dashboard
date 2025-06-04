'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BarChart, Cloud, LayoutDashboard, Newspaper, TrendingUp, X,} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Overview',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/',
  },
  {
    title: 'Weather',
    icon: <Cloud className="h-5 w-5" />,
    href: '/weather',
  },
  {
    title: 'News',
    icon: <Newspaper className="h-5 w-5" />,
    href: '/news',
  },
  {
    title: 'Finance',
    icon: <TrendingUp className="h-5 w-5" />,
    href: '/finance',
  },
  {
    title: 'Analytics',
    icon: <BarChart className="h-5 w-5" />,
    href: '/analytics',
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose}/>
      )}

    
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 border-r bg-background p-6 shadow-lg transition-transform duration-300 lg:static lg:z-0 lg:shadow-none',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <BarChart className="h-6 w-6" />
            <span className="text-xl font-bold">PGAGI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-10 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}