-- 1. Create the voice_messages table
CREATE TABLE IF NOT EXISTS voice_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    audio_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE voice_messages ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for voice_messages
-- Allow everyone to read voice messages for now (or restrict by group membership)
CREATE POLICY "Voice messages are viewable by everyone" ON voice_messages
    FOR SELECT USING (true);

-- Allow authenticated users to insert voice messages
CREATE POLICY "Authenticated users can insert voice messages" ON voice_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Enable Realtime on voice_messages
-- In Supabase, we must explicitly enable realtime for specific tables.
alter publication supabase_realtime add table voice_messages;

-- 5. Create Storage Bucket for Voice Messages
INSERT INTO storage.buckets (id, name, public) 
VALUES ('group-voice-messages', 'group-voice-messages', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Create Storage Policies
-- Allow public read access to voice messages
CREATE POLICY "Public Read Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'group-voice-messages');

-- Allow authenticated users to upload voice messages
CREATE POLICY "Authenticated Insert Access" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'group-voice-messages' AND 
        auth.role() = 'authenticated'
    );
