-- Navigate NZ: University matcher results table
-- Run this in the Supabase SQL Editor after previous scripts

CREATE TABLE IF NOT EXISTS public.university_matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  study_field TEXT,
  priorities TEXT[],
  preferred_city TEXT,
  budget TEXT,
  learning_style TEXT,
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.university_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own matches"
  ON public.university_matches FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own matches"
  ON public.university_matches FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own matches"
  ON public.university_matches FOR UPDATE USING (auth.uid() = user_id);
