import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VoiceChatRoom from '@/components/voice/VoiceChatRoom';

export default async function VoiceChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
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
        <h1 className="text-3xl font-bold text-gray-900">Group Voice Chat</h1>
        <p className="text-gray-600 mt-2">Hold the microphone to send a voice message to everyone in {group.name}.</p>
      </div>

      <VoiceChatRoom groupId={group.id} />
    </div>
  );
}
