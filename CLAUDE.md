# Navigate NZ

Free nonprofit platform helping first-gen NZ students navigate NZ's education system.
Next.js 14, Tailwind CSS, Supabase (auth + Postgres), deployed on Vercel from main.

## Commands

```bash
npm run dev          # local dev
npm run build        # production build — MUST pass before any push
npm run lint         # eslint
git push origin main # auto-deploys to navigatenz.org in ~90s
```

## Supabase

- All tables use RLS. Never create a table without RLS policies.
- Client lives in `lib/supabase.ts` — use it, don't create another.
- Never expose service_role key client-side. Anon key only.

## Brand — IMPORTANT

- Colors defined in `tailwind.config.ts`: cream, navy, teal, gold, coral. Use tokens, never raw hex.
- Font: Plus Jakarta Sans only. Never Inter, Roboto, Arial, system-ui.
- Cards: `bg-white rounded-2xl shadow-sm` with hover lift.
- For full design system guidance, use /frontend-design skill.

## Skill triggers — IMPORTANT

Apply these skills automatically based on context:

**Any UI or component work →** Use /frontend-design. No purple gradients, no generic AI aesthetic. Match the warm EdTech feel (Khan Academy, not Bloomberg). Cream backgrounds, white cards, teal accents.

**After any implementation →** Run /simplify before presenting code. The user should receive second-draft quality.

**Creating or modifying pages →** Use @lint-and-validate before finishing. Check for existing components in `/components/` before creating new ones.

**Touching auth, user data, assessments, or Supabase queries →** Use @security-auditor and include findings.

**Preparing a commit →** Use @create-pr to package changes cleanly.

**Debugging failures →** Use @debugging-strategies for systematic troubleshooting, not random fixes.

**Building new features from scratch →** Use @brainstorming to scope before coding.

**Any accessibility work →** Use fixing-accessibility skill for WCAG 2.1 AA compliance checks.

## Images

- Never reuse an Unsplash photo across pages. Grep for the photo ID before adding.
- Always `next/image` with width, height, meaningful alt text. Never raw `<img>`.
- NZ-specific imagery over generic stock. NZ school uniforms exist. NZ campuses are recognizable.

## Content rules

- Audience: Year 10-13 NZ students, their parents. English may be second language.
- Year 9 reading level. Short sentences. Active voice.
- NZ English: organise, colour, programme.
- First mention of NCEA, UE, StudyLink, ERO must include full name.
- Never hardcode annually-changing data (fees, thresholds, deadlines). Use data files.
- NCEA is being replaced 2028-2030 — flag in all NCEA content.

## Architecture

- React Server Components by default. `"use client"` only for state/interactivity.
- Pages in `/app/`. Components in `/components/` by domain (`/ui`, `/guides`, `/tools`, `/dashboard`, `/layout`).
- Translations in `/messages/` as JSON. i18n is partially broken — don't make it worse.

## Do NOT build

- Paid features or subscriptions — free forever.
- International pathways (UK, US, AU) — NZ only.
- AI chatbot for advice — safety risk with minors.
- Dark mode — not in scope.

## Before pushing — IMPORTANT

- `npm run build` passes with zero errors.
- No `console.log` in production except analytics.
- No placeholder text, fake testimonials, or stats showing "0" publicly.
- New pages need unique `<title>`, meta description, OG tags, breadcrumbs.
- Footer says "student-led nonprofit project" — not "registered nonprofit" (not registered yet).
- All images have alt text. All interactive elements have focus states.

## On compact

Preserve: modified files list, current task status, brand decisions made this session, which skills were invoked.