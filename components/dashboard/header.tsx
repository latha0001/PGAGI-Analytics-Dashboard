'use client';

import { Bell, Menu, Search, Settings, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/theme-toggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function DashboardHeader({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden" aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold md:text-2xl">Analytics Dashboard</h1>
        </div>
      </div>

      <div
        className={cn(
          'absolute left-0 top-full flex w-full flex-col gap-2 border-b border-border bg-background p-4 shadow-md transition-all md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none',
          isSearchOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'
        )}
      >
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="w-full pl-9" placeholder="Search anything..." type="search"/>
        </div>
        <Button variant="ghost" size="icon" className="absolute right-4 top-4 md:hidden" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label={isSearchOpen ? 'Close search' : 'Open search'}>
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="User profile">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}