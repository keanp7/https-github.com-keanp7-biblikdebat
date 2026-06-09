import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, MessageSquare, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <MessageSquare className="h-5 w-5" />
            Groups & Debates
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
