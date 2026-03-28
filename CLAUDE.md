# Navigate NZ

## Project Overview
Navigate NZ is a free nonprofit platform helping first-generation students and families pathway to university in New Zealand. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database/Auth:** Supabase (credentials in .env.local, integration in later sessions)
- **Font:** Plus Jakarta Sans (Google Fonts)

## Brand Colors
- Primary (Teal): #2A9D8F
- Secondary (Deep Navy): #1B2A4A
- Accent (Warm Gold): #E9C46A
- Accent 2 (Coral Red): #E85D4A
- Background: #FFFFFF
- Soft Background: #FAF8F5

## Project Structure
```
app/              — Next.js App Router pages
components/       — Reusable UI components
lib/              — Utilities, helpers, data
content/guides/   — Future markdown guide content
public/           — Static assets
```

## Development
```bash
npm run dev       # Start dev server on localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Session Plan
- Session 1: Site scaffold, pages, components (current)
- Session 2: Real guide content
- Session 3: Supabase auth
- Session 4: Assessment quiz
- Session 5: Dashboard
- Session 10+: i18n/multilingual
