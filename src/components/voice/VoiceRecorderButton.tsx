'use client';

import { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

interface Props {
  onRecordingComplete: (blob: Blob) => void;
}

export default function VoiceRecorderButton({ onRecordingComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        // Clean up tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access is required to record voice messages.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className={`relative flex items-center justify-center rounded-full p-4 transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 scale-110 shadow-lg shadow-red-500/50' 
            : 'bg-primary hover:bg-blue-800 shadow-md'
        }`}
      >
        {isRecording ? (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"></div>
            <Square className="h-6 w-6 text-white fill-current" />
          </>
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </button>
      {isRecording && (
        <span className="absolute -top-10 bg-black/75 text-white text-xs px-3 py-1 rounded-full animate-pulse">
          Recording... Release to send
        </span>
      )}
    </div>
  );
}
