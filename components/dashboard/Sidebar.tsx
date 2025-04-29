'use client';

import { cn } from '@/lib/utils';
import {
  Home,
  BarChart3,
  Cloud,
  Newspaper,
  Wallet,
  Settings,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Weather',
    href: '/dashboard/weather',
    icon: <Cloud className="mr-2 h-4 w-4" />,
  },
  {
    title: 'News',
    href: '/dashboard/news',
    icon: <Newspaper className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Finance',
    href: '/dashboard/finance',
    icon: <Wallet className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Help',
    href: '/dashboard/help',
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-accent text-accent-foreground hover:bg-accent/80'
              : 'hover:bg-accent hover:text-accent-foreground',
            'justify-start'
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}