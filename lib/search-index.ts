export type SearchResultType = "guide" | "tool" | "module" | "page";

export interface SearchItem {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  tags?: string[];
}

// Guide entries — kept in sync with /content/guides/*.md frontmatter via guides.ts at build time.
// We duplicate titles/descriptions here for client-side search (avoiding fs on client).
const guides: SearchItem[] = [
  { type: "guide", title: "NZ Qualification Changes", description: "NCEA is being replaced from 2028-2030. Here's what's changing.", href: "/guides/nz-qualification-changes", tags: ["ncea", "nzce", "nzace", "replacement", "2028", "reform"] },
  { type: "guide", title: "Understanding NZ Schools", description: "How year levels, school types, zoning, and enrolment work.", href: "/guides/understanding-nz-schools", tags: ["zoning", "enrolment", "year levels", "state", "private"] },
  { type: "guide", title: "Understanding NCEA Credits", description: "Credits, endorsements, and UE requirements — plain English.", href: "/guides/understanding-ncea-credits", tags: ["ncea", "credits", "ue", "merit", "excellence", "endorsement"] },
  { type: "guide", title: "NCEA vs Cambridge vs IB", description: "Plain comparison of NZ's three main qualification pathways.", href: "/guides/ncea-vs-cambridge-vs-ib", tags: ["ncea", "cambridge", "cie", "ib", "international baccalaureate", "pathway"] },
  { type: "guide", title: "Subject Selection Strategy", description: "How to choose your subjects wisely — and avoid common mistakes.", href: "/guides/subject-selection-strategy", tags: ["subjects", "options", "course booklet", "year 10"] },
  { type: "guide", title: "Preparing for Exams", description: "What actually works when preparing for NCEA or Cambridge exams.", href: "/guides/preparing-for-exams", tags: ["exam", "revision", "study", "past papers"] },
  { type: "guide", title: "What to Do If You're Behind", description: "Missed credits or low grades? Don't panic — here are your options.", href: "/guides/what-to-do-if-behind", tags: ["behind", "failing", "catching up", "resit", "summer school"] },
  { type: "guide", title: "How to Get Into a NZ University", description: "University Entrance, applications, key dates, and scholarships.", href: "/guides/how-to-get-into-university", tags: ["ue", "university entrance", "applications", "enrol"] },
  { type: "guide", title: "Scholarship Guide", description: "How to find and apply for scholarships in NZ.", href: "/guides/scholarship-guide", tags: ["scholarship", "funding", "award", "grant", "money"] },
  { type: "guide", title: "StudyLink Complete Guide", description: "Student loans, allowances, and how to apply.", href: "/guides/studylink-complete-guide", tags: ["studylink", "student loan", "allowance", "money", "financing"] },
  { type: "guide", title: "University Open Days", description: "How to make open days count — what to ask and what to look for.", href: "/guides/university-open-days", tags: ["open day", "visit", "tour", "campus"] },
  { type: "guide", title: "Your Rights and Support", description: "ESOL support, financial help, and what schools must provide.", href: "/guides/your-rights-and-support", tags: ["rights", "esol", "support", "hardship", "welfare"] },
  { type: "guide", title: "The First-Gen Experience", description: "What it's like being first in your family — and why you belong.", href: "/guides/first-gen-experience", tags: ["first gen", "first generation", "family"] },
  { type: "guide", title: "A Guide for Parents and Families", description: "Everything parents need to know to support their child.", href: "/guides/guide-for-parents", tags: ["parent", "family", "supporting"] },
];

const tools: SearchItem[] = [
  { type: "tool", title: "University Cost Calculator", description: "Estimate the total cost of studying at any NZ university.", href: "/tools/cost-calculator", tags: ["cost", "fees", "tuition", "money", "budget", "loan"] },
  { type: "tool", title: "Career Pathways", description: "Match school subjects to real NZ careers — either direction.", href: "/tools/career-pathways", tags: ["career", "job", "subjects", "pathway"] },
  { type: "tool", title: "NCEA Credit Calculator", description: "Check if you're on track for NCEA and University Entrance.", href: "/tools/credit-calculator", tags: ["ncea", "credits", "ue", "calculator", "rank score"] },
  { type: "tool", title: "University Matcher", description: "Find your best-fit NZ university in 5 questions.", href: "/tools/university-matcher", tags: ["matcher", "university", "uni", "fit"] },
  { type: "tool", title: "Scholarship Finder", description: "Search 20+ NZ scholarships with smart filters.", href: "/tools/scholarship-finder", tags: ["scholarship", "funding", "award", "finder"] },
  { type: "tool", title: "Hall vs Flatting", description: "Compare accommodation costs in every NZ uni city.", href: "/tools/living-costs", tags: ["hall", "flat", "flatting", "accommodation", "living"] },
  { type: "tool", title: "Key Dates Timeline", description: "Never miss a deadline — all 2026 education dates.", href: "/tools/key-dates", tags: ["dates", "deadline", "calendar"] },
  { type: "tool", title: "Personal Statement Helper", description: "Write a university personal statement step by step.", href: "/tools/personal-statement", tags: ["personal statement", "application", "writing"] },
  { type: "tool", title: "Pathway Finder", description: "Which qualification pathway is right for you?", href: "/tools/pathway-finder", tags: ["pathway", "ncea", "cambridge", "ib", "decide"] },
];

const modules: SearchItem[] = [
  { type: "module", title: "Get Set Up at Your School", description: "Practical steps to make sure you're enrolled and oriented.", href: "/modules/get-set-up-at-school" },
  { type: "module", title: "Choose Your Pathway", description: "Decide which qualification pathway is right for you.", href: "/modules/choose-your-pathway" },
  { type: "module", title: "Check Your UE Progress", description: "Make sure you're on track for University Entrance.", href: "/modules/check-your-ue-progress" },
  { type: "module", title: "Research Your University Options", description: "Compare the 8 NZ universities for your goals.", href: "/modules/research-your-university-options" },
  { type: "module", title: "Complete Your Application", description: "Step-by-step university application walk-through.", href: "/modules/complete-your-application" },
  { type: "module", title: "Apply for Funding", description: "Scholarships, StudyLink, Fees Free.", href: "/modules/apply-for-funding" },
  { type: "module", title: "Plan Your Subject Choices", description: "Choose subjects that match your goals.", href: "/modules/plan-your-subject-choices" },
  { type: "module", title: "Track Your NCEA Credits", description: "Stay on top of your credits and endorsements.", href: "/modules/track-your-ncea-credits" },
  { type: "module", title: "Prepare for Exam Season", description: "Build your revision plan and survive exams.", href: "/modules/prepare-for-exam-season" },
  { type: "module", title: "Attend a University Open Day", description: "Get the most out of your visit.", href: "/modules/attend-a-university-open-day" },
  { type: "module", title: "Set Up StudyLink", description: "Apply for student loans and allowances.", href: "/modules/set-up-studylink" },
  { type: "module", title: "Write Your Personal Statement", description: "Draft a strong university personal statement.", href: "/modules/write-your-personal-statement" },
];

const pages: SearchItem[] = [
  { type: "page", title: "Take the Pathway Assessment", description: "5-minute quiz → personalised roadmap.", href: "/assessment", tags: ["assessment", "quiz", "pathway"] },
  { type: "page", title: "Volunteer — Join Our Team", description: "Help us build the guide every first-gen family deserves.", href: "/volunteer", tags: ["volunteer", "help", "join", "work"] },
  { type: "page", title: "About Navigate NZ", description: "Why we exist and what we stand for.", href: "/about", tags: ["about", "mission", "founder"] },
  { type: "page", title: "Our Impact", description: "What we've built and where we're going.", href: "/impact", tags: ["impact", "metrics", "timeline"] },
  { type: "page", title: "Share Your Story", description: "Tell us how Navigate NZ helped you.", href: "/share-your-story", tags: ["story", "testimonial", "feedback", "share"] },
  { type: "page", title: "Ask the Community", description: "Anonymous Q&A board — ask anything about NCEA, university, or NZ education.", href: "/ask", tags: ["ask", "question", "qa", "q&a", "community", "anonymous", "forum"] },
  { type: "page", title: "Privacy Policy", description: "How we protect your data.", href: "/privacy" },
  { type: "page", title: "Accessibility", description: "Our WCAG 2.1 AA commitment.", href: "/accessibility" },
];

export const searchIndex: SearchItem[] = [...guides, ...tools, ...modules, ...pages];
