-- Navigate NZ: Assessment table setup
-- Run this in the Supabase SQL Editor after running setup.sql

CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  year_level TEXT NOT NULL,
  qualification_pathway TEXT NOT NULL,
  first_gen BOOLEAN NOT NULL,
  current_grades TEXT,
  subjects_of_interest TEXT[] DEFAULT '{}',
  preferred_universities TEXT[] DEFAULT '{}',
  home_language TEXT,
  goals TEXT,
  completed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments"
  ON public.assessments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON public.assessments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON public.assessments
  FOR UPDATE
  USING (auth.uid() = user_id);
