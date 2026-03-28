# Navigate NZ

Free education guidance for first-generation students and families navigating New Zealand's path to university.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **Font:** Plus Jakarta Sans

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project (free tier works)

### Installation

```bash
git clone <repo-url>
cd NavigateNZ
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key

### Database Setup

Run the following SQL scripts in your Supabase SQL Editor (in order):

1. `supabase/setup.sql` — profiles table and auth trigger
2. `supabase/assessment.sql` — assessments table
3. `supabase/modules.sql` — module progress table

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
app/                  Next.js App Router pages
  auth/               Sign in, sign up, password reset
  dashboard/          Personalised user dashboard
  guides/             Guide hub + individual guide pages
  modules/            Action module hub + individual modules
  assessment/         Self-assessment quiz
  about/              About page
components/           Reusable UI components
lib/                  Utilities, Supabase clients, data
content/guides/       Markdown guide content
supabase/             SQL setup scripts
public/               Static assets
```

## License

This project is open source and free to use for educational purposes.
