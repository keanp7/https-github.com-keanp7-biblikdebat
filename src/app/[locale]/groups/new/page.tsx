import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreateGroupPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  async function createGroup(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;

    const { data, error } = await supabase
      .from('groups')
      .insert([{ name, description, type, created_by: session!.user.id }])
      .select()
      .single();

    if (!error && data) {
      redirect(`/groups/${data.id}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Community</h1>
      <form action={createGroup} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Community Name</label>
          <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"></textarea>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Privacy</label>
          <select name="type" id="type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-blue-800 transition">
          Create Community
        </button>
      </form>
    </div>
  );
}
