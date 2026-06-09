'use server';
import { createClient } from '@/lib/supabase/server';

export async function updateUserLanguage(locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from('profiles').update({ preferred_language: locale }).eq('id', user.id);
  }
}
