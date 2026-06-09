import { createClient } from '@/lib/supabase/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Verify Admin or Moderator
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
  if (!profile || !['admin', 'moderator', 'owner'].includes(profile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { reportId } = await req.json();

  // Fetch report details
  const { data: report, error } = await supabase.from('reports').select('*').eq('id', reportId).single();
  if (error || !report) return Response.json({ error: 'Report not found' }, { status: 404 });

  let textToModerate = '';

  if (report.target_type === 'comment') {
    const { data: comment } = await supabase.from('comments').select('content').eq('id', report.target_id).single();
    if (comment) textToModerate = comment.content;
  } else if (report.target_type === 'debate') {
    const { data: debate } = await supabase.from('debates').select('title, description').eq('id', report.target_id).single();
    if (debate) textToModerate = `Title: ${debate.title}\nDescription: ${debate.description}`;
  }

  if (!textToModerate) {
    return Response.json({ error: 'Target content not found' }, { status: 404 });
  }

  // Ask AI to moderate
  const result = await generateText({
    model: google('gemini-1.5-pro'),
    system: "You are a content moderator for a Christian community. Given the following user-submitted text, determine if it contains hate speech, extreme profanity, or spam. Respond ONLY with 'Safe', 'Violates community guidelines: [Reason]', or 'Spam'. Do not explain further.",
    prompt: `Text to moderate:\n"${textToModerate}"`
  });

  const verdict = result.text.trim();

  // Update report
  const { data: updatedReport, error: updateError } = await supabase
    .from('reports')
    .update({ ai_verdict: verdict })
    .eq('id', reportId)
    .select()
    .single();

  if (updateError) return Response.json({ error: updateError.message }, { status: 500 });

  return Response.json({ success: true, verdict });
}
