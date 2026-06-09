import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface VoiceMessage {
  id: string;
  group_id: string;
  user_id: string;
  audio_url: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}

export function useVoiceMessagesRealtime(groupId: string) {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('voice_messages')
        .select('*, profiles(full_name, avatar_url)')
        .eq('group_id', groupId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data as any);
      }
      setIsLoading(false);
    };

    fetchMessages();

    // 2. Subscribe to Realtime inserts
    const channel = supabase
      .channel(`voice_group_${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'voice_messages',
          filter: `group_id=eq.${groupId}`,
        },
        async (payload) => {
          const newMessage = payload.new as VoiceMessage;
          // We need to fetch the profile details for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', newMessage.user_id)
            .single();

          if (profile) {
            newMessage.profiles = profile;
          }
          
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, supabase]);

  const uploadVoiceMessage = async (audioBlob: Blob, userId: string) => {
    const fileName = `${groupId}/${userId}-${Date.now()}.webm`;

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('group-voice-messages')
      .upload(fileName, audioBlob, {
        contentType: 'audio/webm',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('group-voice-messages')
      .getPublicUrl(fileName);

    // Insert into Database
    const { error: dbError } = await supabase
      .from('voice_messages')
      .insert([
        {
          group_id: groupId,
          user_id: userId,
          audio_url: publicUrlData.publicUrl
        }
      ]);

    if (dbError) throw dbError;
  };

  return { messages, isLoading, uploadVoiceMessage };
}
