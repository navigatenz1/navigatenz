-- Navigate NZ: Analytics events table
-- Run this in the Supabase SQL Editor after previous scripts

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (including anonymous users)
CREATE POLICY "Anyone can insert analytics"
  ON public.analytics_events FOR INSERT WITH CHECK (true);

-- Only service_role can read (server-side queries only)
CREATE POLICY "Service role can read analytics"
  ON public.analytics_events FOR SELECT USING (auth.role() = 'service_role');
