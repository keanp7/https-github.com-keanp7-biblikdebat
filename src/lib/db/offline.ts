import Dexie, { type EntityTable } from 'dexie';

export interface CachedGroup {
  id: string;
  name: string;
  description: string;
  type: string;
  created_at: string;
  updated_at?: number; // local timestamp of cache
}

export interface CachedDebate {
  id: string;
  group_id: string;
  verse_reference: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: number;
}

export interface CachedComment {
  id: string;
  debate_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at?: number;
}

export interface PendingAction {
  id?: number;
  type: 'CREATE_DEBATE' | 'CREATE_COMMENT';
  payload: any;
  status: 'pending' | 'syncing' | 'failed';
  created_at: number;
}

const db = new Dexie('BiblikDebatDB') as Dexie & {
  cached_groups: EntityTable<CachedGroup, 'id'>;
  cached_debates: EntityTable<CachedDebate, 'id'>;
  cached_comments: EntityTable<CachedComment, 'id'>;
  pending_actions: EntityTable<PendingAction, 'id'>;
};

// Schema declaration
db.version(1).stores({
  cached_groups: 'id, name', // Primary key and indexed props
  cached_debates: 'id, group_id, verse_reference',
  cached_comments: 'id, debate_id, parent_id',
  pending_actions: '++id, type, status' // Auto-increment ID
});

export { db };
