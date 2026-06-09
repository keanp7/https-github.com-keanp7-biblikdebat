-- Add RBAC roles to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'member' 
CHECK (role IN ('member', 'moderator', 'admin', 'owner'));

-- Add preferred language to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'ht'
CHECK (preferred_language IN ('ht', 'en', 'fr', 'es'));
