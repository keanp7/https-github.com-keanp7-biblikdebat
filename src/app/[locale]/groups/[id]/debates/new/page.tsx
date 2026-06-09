import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreateDebatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  async function createDebate(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const verse_reference = formData.get('verse_reference') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const { data, error } = await supabase
      .from('debates')
      .insert([{ group_id: id, verse_reference, title, description, created_by: session!.user.id }])
      .select()
      .single();

    if (!error && data) {
      redirect(`/debates/${data.id}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Start a Verse-Based Debate</h1>
      <form action={createDebate} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="verse_reference" className="block text-sm font-medium text-gray-700">Bible Verse Reference (e.g. John 3:16)</label>
          <input type="text" name="verse_reference" id="verse_reference" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Debate Title</label>
          <input type="text" name="title" id="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description / Initial Thoughts</label>
          <textarea name="description" id="description" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"></textarea>
        </div>
        <button type="submit" className="w-full bg-secondary text-white py-3 px-4 rounded-md font-bold hover:bg-yellow-600 transition shadow-sm">
          Publish Debate
        </button>
      </form>
    </div>
  );
}
