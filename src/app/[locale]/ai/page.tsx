'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Send, User, BookOpen, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AIPage() {
  const [conversationId] = useState(() => crypto.randomUUID());
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const t = useTranslations('AI');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, [supabase]);

  // Ensure conversation exists in DB before sending messages
  const ensureConversation = async () => {
    if (!userId) return;
    const { data } = await supabase.from('ai_conversations').select('id').eq('id', conversationId).single();
    if (!data) {
      await supabase.from('ai_conversations').insert([{ id: conversationId, user_id: userId, title: 'New Conversation' }]);
    }
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    onFinish: async (message: any) => {
      if (!userId) return;
      await ensureConversation();
      await supabase.from('ai_messages').insert([{
        conversation_id: conversationId,
        role: 'assistant',
        content: message.content
      }]);
    }
  }) as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (userId) {
      await ensureConversation();
      await supabase.from('ai_messages').insert([{
        conversation_id: conversationId,
        role: 'user',
        content: input
      }]);
    }
    handleSubmit(e);
  };

  const generateStudy = async () => {
    const prompt = "Please generate a brief Bible study outline on a random uplifting chapter.";
    if (userId) {
      await ensureConversation();
      await supabase.from('ai_messages').insert([{ conversation_id: conversationId, role: 'user', content: prompt }]);
    }
    append({ role: 'user', content: prompt });
  };

  const explainVerse = async () => {
    const prompt = "Please explain the meaning and context of Romans 8:28.";
    if (userId) {
      await ensureConversation();
      await supabase.from('ai_messages').insert([{ conversation_id: conversationId, role: 'user', content: prompt }]);
    }
    append({ role: 'user', content: prompt });
  };

  const handleQuickQuestion = async (prompt: string) => {
    if (userId) {
      await ensureConversation();
      await supabase.from('ai_messages').insert([{ conversation_id: conversationId, role: 'user', content: prompt }]);
    }
    append({ role: 'user', content: prompt });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 h-[calc(100dvh-5rem)] sm:h-[calc(100vh-10rem)] flex flex-col">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 sm:gap-3">
          <Bot className="h-8 w-8 text-primary" />
          {t('title')}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base px-2">{t('desc')}</p>
        
        {/* AI Tools */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 px-2">
          <button onClick={generateStudy} className="flex items-center gap-2 text-xs sm:text-sm bg-blue-50 text-primary border border-blue-200 px-3 sm:px-4 py-2 rounded-full hover:bg-blue-100 transition">
            <BookOpen className="h-4 w-4" /> Bible Study
          </button>
          <button onClick={explainVerse} className="flex items-center gap-2 text-xs sm:text-sm bg-green-50 text-green-700 border border-green-200 px-3 sm:px-4 py-2 rounded-full hover:bg-green-100 transition">
            <Search className="h-4 w-4" /> Explain Verse
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Bot className="h-16 w-16 mb-4 opacity-50" />
            <p>{t('greeting')}</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center max-w-2xl">
              <button onClick={() => handleQuickQuestion(t('q1'))} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q1')}</button>
              <button onClick={() => handleQuickQuestion(t('q2'))} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q2')}</button>
              <button onClick={() => handleQuickQuestion(t('q3'))} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q3')}</button>
            </div>
          </div>
        ) : (
          messages.map((m: any) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-5 py-2 sm:py-3 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="whitespace-pre-wrap leading-relaxed break-words text-sm sm:text-base">{m.content}</p>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-secondary" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-primary" />
             </div>
             <div className="bg-gray-100 text-gray-800 rounded-2xl px-5 py-3 flex items-center gap-2">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-4 relative">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
          className="w-full bg-white border border-gray-300 rounded-full py-4 pl-6 pr-16 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" disabled={isLoading || !(input || '').trim()} className="absolute right-2 top-2 p-2 bg-primary text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
