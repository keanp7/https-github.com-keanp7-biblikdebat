import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'Admin' });
  
  // Example initial data fetch to hydrate tabs
  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: groupsCount } = await supabase.from('groups').select('*', { count: 'exact', head: true });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('overview')}</h1>
        <p className="text-gray-600 mt-1 sm:mt-2">{t('welcome')}</p>
      </div>

      <AdminDashboardClient 
        initialUsersCount={usersCount || 0} 
        initialGroupsCount={groupsCount || 0} 
      />
    </div>
  );
}
