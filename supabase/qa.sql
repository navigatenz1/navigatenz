-- Navigate NZ — Anonymous Q&A board
-- Run this ENTIRE file in the Supabase SQL Editor.
-- Idempotent: safe to re-run.

--------------------------------------------------------------
-- TABLE: questions
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.questions (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  body           TEXT NOT NULL CHECK (char_length(body) BETWEEN 10 AND 500),
  category       TEXT NOT NULL CHECK (category IN (
                   'ncea', 'university', 'scholarships', 'studylink',
                   'subject-selection', 'careers', 'school-life',
                   'parents', 'other'
                 )),
  display_name   TEXT DEFAULT 'Anonymous Student' CHECK (char_length(display_name) BETWEEN 1 AND 30),
  upvotes        INTEGER DEFAULT 0,
  answer_count   INTEGER DEFAULT 0,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
                   'pending', 'approved', 'answered', 'pinned', 'hidden'
                 )),
  is_featured    BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_status     ON public.questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_category   ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON public.questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_upvotes    ON public.questions(upvotes DESC);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit questions" ON public.questions;
CREATE POLICY "Anyone can submit questions"
  ON public.questions FOR INSERT
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Public sees approved questions" ON public.questions;
CREATE POLICY "Public sees approved questions"
  ON public.questions FOR SELECT
  USING (status IN ('approved', 'answered', 'pinned'));

DROP POLICY IF EXISTS "Admin full access questions" ON public.questions;
CREATE POLICY "Admin full access questions"
  ON public.questions FOR ALL
  USING (auth.jwt() ->> 'email' = 'admin@navigatenz.org')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@navigatenz.org');

--------------------------------------------------------------
-- TABLE: answers
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.answers (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id   UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  body          TEXT NOT NULL CHECK (char_length(body) BETWEEN 10 AND 2000),
  author_type   TEXT NOT NULL DEFAULT 'volunteer' CHECK (author_type IN ('volunteer', 'team', 'community')),
  author_name   TEXT NOT NULL DEFAULT 'Navigate NZ Team' CHECK (char_length(author_name) BETWEEN 1 AND 60),
  is_accepted   BOOLEAN DEFAULT FALSE,
  upvotes       INTEGER DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_answers_question_id ON public.answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_status      ON public.answers(status);

ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public sees approved answers" ON public.answers;
CREATE POLICY "Public sees approved answers"
  ON public.answers FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Authenticated users can answer" ON public.answers;
CREATE POLICY "Authenticated users can answer"
  ON public.answers FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND status = 'pending');

DROP POLICY IF EXISTS "Admin full access answers" ON public.answers;
CREATE POLICY "Admin full access answers"
  ON public.answers FOR ALL
  USING (auth.jwt() ->> 'email' = 'admin@navigatenz.org')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@navigatenz.org');

--------------------------------------------------------------
-- TABLE: question_upvotes
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.question_upvotes (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id  UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  visitor_id   TEXT NOT NULL CHECK (char_length(visitor_id) BETWEEN 8 AND 64),
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(question_id, visitor_id)
);

CREATE INDEX IF NOT EXISTS idx_upvotes_question_id ON public.question_upvotes(question_id);

ALTER TABLE public.question_upvotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can upvote" ON public.question_upvotes;
CREATE POLICY "Anyone can upvote"
  ON public.question_upvotes FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read upvotes" ON public.question_upvotes;
CREATE POLICY "Public can read upvotes"
  ON public.question_upvotes FOR SELECT
  USING (true);

--------------------------------------------------------------
-- TRIGGER: recompute answer_count when answers change
--------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_answer_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  qid UUID;
  c   INTEGER;
BEGIN
  qid := COALESCE(NEW.question_id, OLD.question_id);
  SELECT COUNT(*) INTO c FROM public.answers
    WHERE question_id = qid AND status = 'approved';
  UPDATE public.questions
    SET answer_count = c,
        status = CASE
          WHEN c > 0 AND status NOT IN ('pinned', 'hidden') THEN 'answered'
          ELSE status
        END,
        updated_at = now()
    WHERE id = qid;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_answer_change ON public.answers;
CREATE TRIGGER on_answer_change
AFTER INSERT OR UPDATE OR DELETE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.update_answer_count();

--------------------------------------------------------------
-- TRIGGER: recompute upvote count
--------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_upvote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  qid UUID;
  c   INTEGER;
BEGIN
  qid := COALESCE(NEW.question_id, OLD.question_id);
  SELECT COUNT(*) INTO c FROM public.question_upvotes
    WHERE question_id = qid;
  UPDATE public.questions SET upvotes = c WHERE id = qid;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_upvote_change ON public.question_upvotes;
CREATE TRIGGER on_upvote_change
AFTER INSERT OR DELETE ON public.question_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.update_upvote_count();

--------------------------------------------------------------
-- SEED DATA (10 questions + answers, approved + answered)
--------------------------------------------------------------
INSERT INTO public.questions (id, body, category, display_name, status, is_featured, created_at) VALUES
  ('11111111-1111-1111-1111-111111110001', 'How do I know if I have enough credits for UE? My school hasn''t told me anything and I''m in Year 13.', 'ncea', 'Year 13 student', 'pinned', true, now() - interval '2 days'),
  ('11111111-1111-1111-1111-111111110002', 'Is Auckland Uni really worth it or should I go to AUT? What''s the actual difference for someone doing computer science?', 'university', 'Anonymous Student', 'approved', false, now() - interval '3 days'),
  ('11111111-1111-1111-1111-111111110003', 'Are there any scholarships specifically for Pacific Island students? I''ve looked and can''t find a clear list.', 'scholarships', 'Year 12 student', 'approved', false, now() - interval '5 days'),
  ('11111111-1111-1111-1111-111111110004', 'My parents earn too much for Student Allowance but we''re still struggling financially. Are there any other options?', 'studylink', 'Anonymous Student', 'approved', false, now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111110005', 'I want to do medicine but I didn''t take Chemistry in Year 12. Am I screwed? I''m in Year 13 now.', 'subject-selection', 'Aspiring med student', 'approved', false, now() - interval '6 days'),
  ('11111111-1111-1111-1111-111111110006', 'What happens if I fail an internal? Can I resit it or is it done?', 'ncea', 'Anonymous Student', 'approved', false, now() - interval '4 days'),
  ('11111111-1111-1111-1111-111111110007', 'Do I need to go to uni to get a good job in NZ? Or is there another way I''m not thinking about?', 'careers', 'Year 12 student', 'approved', false, now() - interval '7 days'),
  ('11111111-1111-1111-1111-111111110008', 'How do I explain to my parents that I don''t want to do engineering? They''ll be disappointed but I''m not into it.', 'parents', 'Anonymous Student', 'approved', false, now() - interval '8 days'),
  ('11111111-1111-1111-1111-111111110009', 'I just moved to NZ from the Philippines and I don''t understand how NCEA works at all. Where do I even start?', 'school-life', 'New to NZ', 'approved', false, now() - interval '9 days'),
  ('11111111-1111-1111-1111-11111111000a', 'What''s the difference between a hall and flatting in first year? I keep hearing halls are a rip-off but also that they''re fun.', 'university', 'Year 13 student', 'approved', false, now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.answers (question_id, body, author_type, author_name, is_accepted, status, created_at) VALUES
  ('11111111-1111-1111-1111-111111110001', 'Kia ora — this is the single most common question we get. To meet University Entrance you need: (1) NCEA Level 3, (2) 14 credits each in 3 UE-approved subjects at Level 3, (3) 10 credits in Numeracy at Level 1+, (4) 10 credits in Reading + Writing literacy at Level 2+. Our free Credit Calculator works this out for you in 30 seconds: https://navigatenz.org/tools/credit-calculator. Also worth reading our University Entrance guide. If your school hasn''t given you a breakdown, ask your dean for your current credit summary — they can print it from NZQA.', 'team', 'Navigate NZ Team', true, 'approved', now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111110002', 'Both are excellent for Computer Science. The main differences: Auckland is research-heavy and usually ranks higher globally (top 100 in CS rankings); AUT is more industry-focused with strong links to tech companies and a shorter time-to-graduation path via BCIS. Cost is similar (~$9–11k/year). For a software dev career in NZ, both employers hire from. Read our University Matcher tool to see which fits your other preferences: https://navigatenz.org/tools/university-matcher.', 'team', 'Navigate NZ Team', false, 'approved', now() - interval '2 days'),
  ('11111111-1111-1111-1111-111111110003', 'Yes — plenty. A few to start: Tupu Toa internships, Le Vā Pasifika scholarships, University of Auckland Pacific Undergraduate Scholarship, Victoria University Tautai o te Moana scholarship, Otago Pacific Scholarship. Our Scholarship Finder lets you filter by ethnicity and shows deadlines: https://navigatenz.org/tools/scholarship-finder. Also check your iwi/community churches and local Pacific Trust Boards — many run scholarships that never get advertised publicly.', 'team', 'Navigate NZ Team', true, 'approved', now() - interval '4 days'),
  ('11111111-1111-1111-1111-111111110004', 'This situation is really common and frustrating. Options: (1) Student Loan still covers tuition + weekly living costs even without Allowance. (2) Hardship Assistance from StudyLink — you can apply once you''re studying. (3) Many universities have Equity Scholarships (Auckland, Victoria, Otago all have them) based on financial situation — these consider your actual costs, not just parental income. (4) Apply to 5–10 smaller private scholarships. Our StudyLink guide walks through the full funding mix: https://navigatenz.org/guides/studylink-complete-guide.', 'team', 'Navigate NZ Team', false, 'approved', now() - interval '12 hours'),
  ('11111111-1111-1111-1111-111111110005', 'Not screwed — but you''ll need a plan. Chemistry is usually required for Medicine entry at Otago and Auckland. Options: (1) Pick up Chemistry at Year 13 if your school allows (talk to your dean TODAY). (2) Do Otago''s Health Sciences First Year — they''ll accept you and you can do Chem as a first-year paper. (3) Some bridging programmes (e.g. Auckland''s Certificate in Science) let you catch up over a year. Read our Subject Selection guide and our How to Get Into Uni guide for the full picture.', 'team', 'Navigate NZ Team', true, 'approved', now() - interval '5 days'),
  ('11111111-1111-1111-1111-111111110006', 'Yes, you can usually resit internals — but not always, and not always for full credits. Talk to your subject teacher and dean: (1) Some internals allow one resit attempt, but only if you actually achieved at least "Not Achieved". (2) Resits usually cap at Merit — you can''t get Excellence on a resit in most cases. (3) For failed internals in critical subjects, you might need to take the subject again next year. Our "What to Do if You''re Behind" guide covers this in detail: https://navigatenz.org/guides/what-to-do-if-behind.', 'team', 'Navigate NZ Team', false, 'approved', now() - interval '3 days'),
  ('11111111-1111-1111-1111-111111110007', 'No — university is not the only path, and for plenty of careers it''s not the best one. Apprenticeships (trades, hospitality, IT) pay you while you learn and have strong demand in NZ. Certificate and diploma programmes at polytechnics (Ara, Unitec, Otago Polytech) are 1–2 years and lead directly to jobs. Some industries (tech, design, film) care more about portfolio than degree. Our Career Pathways tool shows what''s required for different careers — some need uni, some don''t: https://navigatenz.org/tools/career-pathways.', 'team', 'Navigate NZ Team', false, 'approved', now() - interval '6 days'),
  ('11111111-1111-1111-1111-111111110008', 'This is a hard conversation but common for first-gen families. A few things that help: (1) Come with research — show them you''ve actually thought about what you want and why (e.g. career outcomes, salary data, career progression). (2) Frame it in terms of what they care about — "I want a stable career" matters more than "I want to do what I love". (3) Use our Career Pathways tool together so they can see it''s structured and legitimate: https://navigatenz.org/tools/career-pathways. (4) Remember you don''t have to decide forever — a first degree opens many doors.', 'team', 'Navigate NZ Team', true, 'approved', now() - interval '7 days'),
  ('11111111-1111-1111-1111-111111110009', 'Welcome to Aotearoa. Start here: read our "Understanding NZ Schools" guide (https://navigatenz.org/guides/understanding-nz-schools) and "Understanding NCEA Credits" (https://navigatenz.org/guides/understanding-ncea-credits) — both are written for families new to the system. Then use our pathway assessment — 5 minutes, tells you exactly what to focus on: https://navigatenz.org/assessment. If your school offers ESOL support, ask your dean about it. You''re not behind — you''re just starting from a different place, and we''ll get you there.', 'team', 'Navigate NZ Team', true, 'approved', now() - interval '8 days'),
  ('11111111-1111-1111-1111-11111111000a', 'Quick version: Halls cost $340–$450/week depending on the city, include meals and utilities, and are mostly for first-years so it''s easy to make friends. Flatting is usually $150–$240/week rent + food + power + internet, and you have more independence but more admin. Our Hall vs Flatting tool has a proper comparison for every NZ uni city: https://navigatenz.org/tools/living-costs. The common advice: hall in first year for the social start, flat from year 2 to save money.', 'team', 'Navigate NZ Team', false, 'approved', now() - interval '9 days');

-- Seed questions now have answers → recompute counts by triggering the function
-- (the INSERT above should have fired the trigger, but force a recompute to be safe)
UPDATE public.questions q
SET answer_count = (SELECT COUNT(*) FROM public.answers a WHERE a.question_id = q.id AND a.status = 'approved'),
    status = CASE
      WHEN q.status = 'pinned' THEN 'pinned'
      WHEN q.status = 'hidden' THEN 'hidden'
      WHEN (SELECT COUNT(*) FROM public.answers a WHERE a.question_id = q.id AND a.status = 'approved') > 0 THEN 'answered'
      ELSE q.status
    END;
