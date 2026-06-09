'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface Props {
  audioUrl: string;
  isCurrentUser: boolean;
  senderName: string;
  createdAt: string;
}

export default function VoiceMessageBubble({ audioUrl, isCurrentUser, senderName, createdAt }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} mb-4`}>
      {!isCurrentUser && <span className="text-xs text-gray-500 ml-2 mb-1">{senderName}</span>}
      <div className={`flex items-center gap-3 p-2 rounded-2xl max-w-[280px] shadow-sm ${
        isCurrentUser ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none'
      }`}>
        <button 
          onClick={togglePlay}
          className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
            isCurrentUser ? 'bg-white/20 hover:bg-white/30' : 'bg-primary/10 hover:bg-primary/20 text-primary'
          }`}
        >
          {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
        </button>
        
        <div className="flex flex-col flex-1 min-w-[140px]">
          {/* Simple waveform placeholder */}
          <div className="h-6 flex items-center gap-0.5 overflow-hidden">
             {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`w-1 rounded-full ${isCurrentUser ? 'bg-white/50' : 'bg-gray-300'}`} style={{ 
                  height: `${Math.max(10, Math.random() * 100)}%`,
                  opacity: i < (currentTime / duration) * 20 ? 1 : 0.4
                }} />
             ))}
          </div>
          <div className={`text-[10px] mt-1 flex justify-between ${isCurrentUser ? 'text-white/70' : 'text-gray-400'}`}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <span className="text-[10px] text-gray-400 mt-1 mx-2">
        {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
