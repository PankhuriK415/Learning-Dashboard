-- Supabase Database Initialization Script for Neural Learning OS

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy allowing anyone to read course records
CREATE POLICY "Allow public read access" ON public.courses
    FOR SELECT USING (true);

-- 4. Seed the initial courses data
INSERT INTO public.courses (id, title, progress, icon_name, created_at)
VALUES
    ('27e46ab6-35b8-468e-9080-1a742cb65860', 'Advanced React Patterns', 68, 'Atom', now() - INTERVAL '5 days'),
    ('bc727931-15a0-43b9-bb83-34e8c187bf5d', 'AI Engineering', 85, 'Cpu', now() - INTERVAL '10 days'),
    ('f8b7fca1-1de2-4c4b-b0b2-132d0c242a41', 'System Design Mastery', 42, 'Network', now() - INTERVAL '15 days'),
    ('6a9ce020-f5e2-4ea5-a226-4ee3fde69d7b', 'Next.js Performance', 92, 'Zap', now() - INTERVAL '2 days')
ON CONFLICT (id) DO UPDATE 
SET 
    title = EXCLUDED.title,
    progress = EXCLUDED.progress,
    icon_name = EXCLUDED.icon_name;
