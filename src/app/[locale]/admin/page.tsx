import { createClient } from '@/lib/supabase/server';
import { Users, MessageSquare, Activity, AlertCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'Admin' });
  
  // Example data fetch (safely falling back to 0 if tables are empty/missing)
  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: groupsCount } = await supabase.from('groups').select('*', { count: 'exact', head: true });

  const stats = [
    { title: t('total_users'), value: usersCount || 0, icon: Users, color: 'bg-blue-500' },
    { title: t('active_groups'), value: groupsCount || 0, icon: MessageSquare, color: 'bg-green-500' },
    { title: t('server_status'), value: t('healthy'), icon: Activity, color: 'bg-emerald-500' },
    { title: t('reports'), value: '0', icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('overview')}</h1>
        <p className="text-gray-600 mt-1 sm:mt-2">{t('welcome')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className={`p-4 rounded-lg text-white ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">{t('recent_activity')}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">{t('activity_placeholder')}</p>
        </div>
      </div>
    </div>
  );
}
