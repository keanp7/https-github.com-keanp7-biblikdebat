'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CommentSection({ debateId, comments }: { debateId: string, comments: any[] }) {
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations('Debates');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const { error } = await supabase.from('comments').insert([
      { debate_id: debateId, user_id: session.user.id, content, parent_id: replyTo }
    ]);

    if (!error) {
      setContent('');
      setReplyTo(null);
      router.refresh();
    }
  }

  // Basic recursive rendering for nested comments
  const renderComments = (parentId: string | null = null, depth = 0) => {
    return comments
      .filter(c => c.parent_id === parentId)
      .map(comment => (
        <div key={comment.id} className={`p-4 ${depth > 0 ? 'ml-8 border-l-2 border-gray-100' : 'bg-white rounded-lg shadow-sm border border-gray-100'}`}>
          <div className="font-bold text-gray-900 text-sm mb-1">User ID: {comment.user_id.substring(0, 8)}</div>
          <p className="text-gray-700">{comment.content}</p>
          <div className="mt-2 flex gap-4 text-sm">
            <button onClick={() => setReplyTo(comment.id)} className="text-primary hover:underline font-medium">{t('reply')}</button>
          </div>
          
          {replyTo === comment.id && (
            <form onSubmit={handleSubmit} className="mt-4 mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                placeholder={t('write_reply')}
                required
              />
              <div className="mt-2 flex gap-2">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm">{t('post_reply')}</button>
                <button type="button" onClick={() => setReplyTo(null)} className="text-gray-500 px-4 py-2 text-sm">{t('cancel')}</button>
              </div>
            </form>
          )}

          <div className="mt-4">
            {renderComments(comment.id, depth + 1)}
          </div>
        </div>
      ));
    };

  return (
    <div className="mt-12 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">{t('discussion')} ({comments.length})</h3>
      
      {!replyTo && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-4 focus:ring-primary focus:border-primary"
            placeholder={t('share_thoughts')}
            rows={4}
            required
          />
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition">
              {t('post_comment')}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6 mt-8">
        {renderComments(null, 0)}
      </div>
    </div>
  );
}
