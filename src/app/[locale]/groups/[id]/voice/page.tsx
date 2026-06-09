import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import VoiceChatRoom from '@/components/voice/VoiceChatRoom';
import { getTranslations } from 'next-intl/server';

export default async function VoiceChatPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'Voice' });
  
  const { data: group } = await supabase.from('groups').select('*').eq('id', id).single();
  if (!group) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={`/groups/${id}`} className="text-primary hover:underline font-medium inline-block">
          &larr; Back to {group.name}
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('group_chat')}</h1>
        <p className="text-gray-600 mt-2">{t('desc', { name: group.name })}</p>
      </div>

      <VoiceChatRoom groupId={group.id} />
    </div>
  );
}
