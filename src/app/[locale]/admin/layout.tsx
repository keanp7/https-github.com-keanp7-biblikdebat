import { ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { LayoutDashboard, Users, MessageSquare, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export default async function AdminLayout({ children, params }: { children: ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'Admin' });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'owner'].includes(profile.role)) {
    redirect('/groups');
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">{t('panel_title')}</h2>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium">
            <LayoutDashboard className="h-5 w-5" />
            {t('dashboard')}
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <Users className="h-5 w-5" />
            {t('users')}
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <MessageSquare className="h-5 w-5" />
            {t('groups')}
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition">
            <Settings className="h-5 w-5" />
            {t('settings')}
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
