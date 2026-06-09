import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CreateDebateForm from '@/components/debates/CreateDebateForm';

export default async function CreateDebatePage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Start a Verse-Based Debate</h1>
      <CreateDebateForm groupId={id} userId={session.user.id} />
    </div>
  );
}
