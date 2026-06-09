'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { syncPendingActions } from '@/lib/sync/syncEngine';

export default function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const handleOnline = () => {
      setIsOffline(false);
      // Trigger background sync when connection returns
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial sync check just in case there are pending actions
    if (navigator.onLine) {
      syncPendingActions();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 z-50 relative">
          <WifiOff className="h-4 w-4" />
          You are offline. Changes will sync automatically when internet returns.
        </div>
      )}
      {children}
    </>
  );
}
