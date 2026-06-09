'use client';

import { useEffect, useRef, useState } from 'react';
import { useVoiceMessagesRealtime } from '@/hooks/useVoiceMessagesRealtime';
import VoiceRecorderButton from './VoiceRecorderButton';
import VoiceMessageBubble from './VoiceMessageBubble';
import { createClient } from '@/lib/supabase/client';
import { Mic, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  groupId: string;
}

export default function VoiceChatRoom({ groupId }: Props) {
  const { messages, isLoading, uploadVoiceMessage } = useVoiceMessagesRealtime(groupId);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Voice');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUserId(data.user.id);
      }
    });
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    if (!currentUserId) {
      alert("You must be logged in to send a voice message.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadVoiceMessage(audioBlob, currentUserId);
    } catch (error) {
      console.error("Failed to send voice message:", error);
      alert("Failed to send voice message. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          {t('title')}
        </h2>
        <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {t('realtime')}
        </span>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#efeae2]" // WhatsApp-like background color
        style={{ backgroundImage: 'radial-gradient(#d1cbbd 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm">
              {t('no_messages')}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <VoiceMessageBubble
              key={msg.id}
              audioUrl={msg.audio_url}
              isCurrentUser={msg.user_id === currentUserId}
              senderName={msg.profiles?.full_name || 'Unknown User'}
              createdAt={msg.created_at}
            />
          ))
        )}
      </div>

      {/* Recording Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex justify-center items-center relative z-10">
        {isUploading ? (
          <div className="flex items-center gap-3 text-primary font-medium">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t('sending')}
          </div>
        ) : (
          <VoiceRecorderButton onRecordingComplete={handleRecordingComplete} />
        )}
      </div>
    </div>
  );
}
