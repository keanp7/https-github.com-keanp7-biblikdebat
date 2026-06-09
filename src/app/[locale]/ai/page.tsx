'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Send, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AIPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any;
  const t = useTranslations('AI');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-10rem)] flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          {t('title')}
        </h1>
        <p className="text-gray-600 mt-2">{t('desc')}</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Bot className="h-16 w-16 mb-4 opacity-50" />
            <p>{t('greeting')}</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center max-w-2xl">
              <button onClick={() => handleInputChange({ target: { value: t('q1') } } as any)} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q1')}</button>
              <button onClick={() => handleInputChange({ target: { value: t('q2') } } as any)} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q2')}</button>
              <button onClick={() => handleInputChange({ target: { value: t('q3') } } as any)} className="bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 border">{t('q3')}</button>
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
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
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

      <form onSubmit={handleSubmit} className="mt-4 relative">
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
