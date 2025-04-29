import { Header } from '@/components/dashboard/Header';
import { DashboardNav } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:flex w-60 shrink-0 border-r bg-background flex-col">
          <div className="flex-1 flex flex-col p-4">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}