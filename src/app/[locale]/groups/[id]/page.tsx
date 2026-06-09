import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageSquare, PlusCircle } from 'lucide-react';

export default async function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !group) {
    notFound();
  }

  const { data: debates } = await supabase
    .from('debates')
    .select('*')
    .eq('group_id', id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{group.name}</h1>
          <p className="text-lg text-gray-600 mt-4">{group.description}</p>
        </div>
        <Link href={`/groups/${id}/donate`} className="mt-4 sm:mt-0 flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
          Donate & Support
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Debates & Discussions
        </h2>
        <div className="flex gap-3">
          <Link href={`/groups/${id}/voice`} className="flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-lg font-bold hover:bg-blue-200 transition">
            🎤 Voice Chat
          </Link>
          <Link href={`/groups/${id}/debates/new`} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition">
            <PlusCircle className="h-5 w-5" />
            Start Debate
          </Link>
        </div>
      </div>

      {debates?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No debates yet</h3>
          <p className="text-gray-500 mt-1">Start a discussion by referencing a Bible verse!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {debates?.map((debate) => (
            <Link key={debate.id} href={`/debates/${debate.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-sm font-bold rounded-full mb-3">
                    {debate.verse_reference}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{debate.title}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{debate.description}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(debate.created_at).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
