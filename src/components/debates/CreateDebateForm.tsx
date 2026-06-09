'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function CreateDebateForm({ groupId, userId }: { groupId: string, userId: string }) {
  const [verseRef, setVerseRef] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      group_id: groupId,
      verse_reference: verseRef,
      title,
      description,
      created_by: userId
    };

    if (!navigator.onLine) {
      const { db } = await import('@/lib/db/offline');
      await db.pending_actions.add({
        type: 'CREATE_DEBATE',
        payload,
        status: 'pending',
        created_at: Date.now()
      });
      alert('You are offline. Your debate has been queued and will sync when reconnected.');
      router.push(`/groups/${groupId}`);
      return;
    }

    const { data, error } = await supabase
      .from('debates')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      router.push(`/debates/${data.id}`);
    } else {
      setIsSubmitting(false);
      alert('Failed to create debate');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div>
        <label htmlFor="verse_reference" className="block text-sm font-medium text-gray-700">Bible Verse Reference (e.g. John 3:16)</label>
        <input 
          type="text" 
          value={verseRef}
          onChange={e => setVerseRef(e.target.value)}
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Debate Title</label>
        <input 
          type="text" 
          value={title}
          onChange={e => setTitle(e.target.value)}
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description / Initial Thoughts</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-secondary text-white py-3 px-4 rounded-md font-bold hover:bg-yellow-600 transition shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Publishing...' : 'Publish Debate'}
      </button>
    </form>
  );
}
