import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CommentSection from '@/components/comments/CommentSection';

export default async function DebateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: debate, error } = await supabase
    .from('debates')
    .select('*, groups(name)')
    .eq('id', id)
    .single();

  if (error || !debate) {
    notFound();
  }

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('debate_id', id)
    .order('created_at', { ascending: true });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href={`/groups/${debate.group_id}`} className="text-primary hover:underline font-medium mb-6 inline-block">
        &larr; Back to {debate.groups?.name}
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="inline-block px-4 py-2 bg-blue-50 text-primary font-bold text-lg rounded-full mb-6">
          {debate.verse_reference}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{debate.title}</h1>
        <div className="prose max-w-none text-gray-700 text-lg">
          {debate.description}
        </div>
      </div>

      <CommentSection debateId={debate.id} comments={comments || []} />
    </div>
  );
}
