import { db } from '@/lib/db/offline';
import { createClient } from '@/lib/supabase/client';

export async function syncPendingActions() {
  const supabase = createClient();
  const pendingActions = await db.pending_actions.where('status').equals('pending').toArray();

  if (pendingActions.length === 0) return;

  for (const action of pendingActions) {
    try {
      // Mark as syncing
      await db.pending_actions.update(action.id!, { status: 'syncing' });

      if (action.type === 'CREATE_DEBATE') {
        const { error } = await supabase.from('debates').insert([action.payload]);
        if (error) throw error;
      } else if (action.type === 'CREATE_COMMENT') {
        const { error } = await supabase.from('comments').insert([action.payload]);
        if (error) throw error;
      }

      // Success, remove from pending queue
      await db.pending_actions.delete(action.id!);
    } catch (error) {
      console.error('Failed to sync action:', action, error);
      // Revert to pending for next try
      await db.pending_actions.update(action.id!, { status: 'pending' });
    }
  }
}
