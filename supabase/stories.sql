-- Navigate NZ: stories submission queue
-- Run this in the Supabase SQL Editor.
-- Anyone can INSERT (anonymous is fine).
-- Only service_role can SELECT / UPDATE — stories are a moderation queue.

CREATE TABLE IF NOT EXISTS public.stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'parent', 'teacher', 'other')),
  region TEXT,
  year_level TEXT,
  story TEXT NOT NULL,
  permission BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  -- Safety: enforce length server-side
  CONSTRAINT story_length CHECK (char_length(story) BETWEEN 20 AND 600),
  CONSTRAINT first_name_length CHECK (char_length(first_name) BETWEEN 1 AND 60)
);

CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON public.stories(created_at DESC);

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit a story, but the insert is gated by:
--   - permission must be TRUE (user consented)
--   - status must be 'pending' (can't self-approve)
CREATE POLICY "Anyone can submit stories"
  ON public.stories FOR INSERT
  WITH CHECK (permission = TRUE AND status = 'pending');

-- Only service_role can read, update, or delete. No SELECT policy for anon.
CREATE POLICY "Service role manages stories"
  ON public.stories FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
