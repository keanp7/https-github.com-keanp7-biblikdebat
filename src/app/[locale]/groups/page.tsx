import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/routing';
import { Users, PlusCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function GroupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'Groups' });
  const { data: groups, error } = await supabase.from('groups').select('*').order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('communities')}</h1>
          <p className="text-gray-600 mt-1">{t('communities_desc')}</p>
        </div>
        <Link href="/groups/new" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition">
          <PlusCircle className="h-5 w-5" />
          {t('create_group')}
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">{t('error')}</div>
      ) : groups?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">{t('no_groups')}</h3>
          <p className="text-gray-500 mt-1">{t('no_groups_desc')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups?.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-6 block">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-gray-600 line-clamp-2 text-sm">{group.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                {t('view_community')}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
