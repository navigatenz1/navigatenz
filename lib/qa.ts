export type QuestionCategory =
  | "ncea"
  | "university"
  | "scholarships"
  | "studylink"
  | "subject-selection"
  | "careers"
  | "school-life"
  | "parents"
  | "other";

export type QuestionStatus = "pending" | "approved" | "answered" | "pinned" | "hidden";
export type AnswerStatus = "pending" | "approved" | "hidden";
export type AnswerAuthorType = "volunteer" | "team" | "community";

export interface Question {
  id: string;
  body: string;
  category: QuestionCategory;
  display_name: string;
  upvotes: number;
  answer_count: number;
  status: QuestionStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Answer {
  id: string;
  question_id: string;
  body: string;
  author_type: AnswerAuthorType;
  author_name: string;
  is_accepted: boolean;
  upvotes: number;
  status: AnswerStatus;
  created_at: string;
}

// Swapped `university → navy` from the spec's "purple" (brand prohibits purple).
// Non-brand scales (blue/emerald/amber/rose/slate) are Tailwind defaults — NOT purple/indigo.
export const CATEGORY_CONFIG: Record<
  QuestionCategory,
  { label: string; badgeClass: string; description: string }
> = {
  "ncea": {
    label: "NCEA",
    badgeClass: "bg-blue-50 text-blue-700",
    description: "Credits, UE, endorsements, internals, externals.",
  },
  "university": {
    label: "University",
    badgeClass: "bg-navy-50 text-navy-600",
    description: "Applications, courses, open days, uni life.",
  },
  "scholarships": {
    label: "Scholarships",
    badgeClass: "bg-gold-50 text-gold-800",
    description: "Finding and winning NZ scholarships.",
  },
  "studylink": {
    label: "StudyLink",
    badgeClass: "bg-emerald-50 text-emerald-700",
    description: "Student loans, allowances, funding.",
  },
  "subject-selection": {
    label: "Subject Selection",
    badgeClass: "bg-teal-50 text-teal-700",
    description: "Choosing NCEA / Cambridge / IB subjects.",
  },
  "careers": {
    label: "Careers",
    badgeClass: "bg-coral-50 text-coral-700",
    description: "What jobs lead where.",
  },
  "school-life": {
    label: "School Life",
    badgeClass: "bg-amber-50 text-amber-800",
    description: "Day-to-day school questions.",
  },
  "parents": {
    label: "Parents & Family",
    badgeClass: "bg-rose-50 text-rose-700",
    description: "Family conversations and support.",
  },
  "other": {
    label: "Other",
    badgeClass: "bg-slate-100 text-slate-700",
    description: "Everything else.",
  },
};

export const ALL_CATEGORIES: QuestionCategory[] = [
  "ncea",
  "university",
  "scholarships",
  "studylink",
  "subject-selection",
  "careers",
  "school-life",
  "parents",
  "other",
];

// Map category → most relevant guide slugs for "Related guides" section.
export const CATEGORY_TO_GUIDES: Record<QuestionCategory, string[]> = {
  "ncea": ["understanding-ncea-credits", "nz-qualification-changes", "ncea-vs-cambridge-vs-ib"],
  "university": ["how-to-get-into-university", "university-open-days", "first-gen-experience"],
  "scholarships": ["scholarship-guide"],
  "studylink": ["studylink-complete-guide"],
  "subject-selection": ["subject-selection-strategy", "ncea-vs-cambridge-vs-ib"],
  "careers": ["subject-selection-strategy", "how-to-get-into-university"],
  "school-life": ["understanding-nz-schools", "your-rights-and-support"],
  "parents": ["guide-for-parents", "first-gen-experience"],
  "other": ["understanding-nz-schools"],
};

// Map guide slug → question category (for RelatedQuestions on guide pages).
export function guideSlugToCategory(slug: string): QuestionCategory {
  if (slug.includes("ncea") || slug.includes("qualification")) return "ncea";
  if (slug.includes("university") || slug.includes("open-days")) return "university";
  if (slug.includes("scholarship")) return "scholarships";
  if (slug.includes("studylink")) return "studylink";
  if (slug.includes("subject")) return "subject-selection";
  if (slug.includes("parent")) return "parents";
  if (slug === "your-rights-and-support" || slug === "understanding-nz-schools") return "school-life";
  if (slug === "first-gen-experience") return "parents";
  if (slug === "what-to-do-if-behind" || slug === "preparing-for-exams") return "ncea";
  return "other";
}

// --- Sanitization ---------------------------------------------------------

const URL_REGEX = /(https?:\/\/|www\.)[^\s]+/i;
const BARE_DOMAIN_REGEX = /\b[a-z0-9-]+\.(com|co|nz|org|net|io|app|gov|edu|ac)(\.[a-z]{2,})?\b/i;
const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

/** Strip any HTML tags and collapse whitespace. */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip tags
    .replace(/[\u200B-\u200F\uFEFF]/g, "") // zero-width chars
    .replace(/\s+/g, " ")
    .trim();
}

export function containsUrl(input: string): boolean {
  return URL_REGEX.test(input) || BARE_DOMAIN_REGEX.test(input);
}

export function containsEmail(input: string): boolean {
  return EMAIL_REGEX.test(input);
}

export type ValidationIssue =
  | "too-short"
  | "too-long"
  | "contains-url"
  | "contains-email"
  | "empty";

export function validateQuestionBody(body: string): ValidationIssue | null {
  const clean = sanitizePlainText(body);
  if (!clean) return "empty";
  if (clean.length < 10) return "too-short";
  if (clean.length > 500) return "too-long";
  if (containsUrl(clean)) return "contains-url";
  if (containsEmail(clean)) return "contains-email";
  return null;
}

export function validationMessage(issue: ValidationIssue): string {
  switch (issue) {
    case "empty":         return "Please type your question.";
    case "too-short":     return "Your question needs to be at least 10 characters.";
    case "too-long":      return "Please keep your question under 500 characters.";
    case "contains-url":  return "Links aren't allowed — describe what you mean in words instead.";
    case "contains-email": return "Please don't include email addresses. This board is anonymous.";
  }
}

// --- Rate limiting (localStorage) ----------------------------------------

const RATE_LIMIT_KEY = "nnz_qa_submissions";
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;

export function getRecentSubmissions(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as number[];
    const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
    return arr.filter((t) => t > cutoff);
  } catch {
    return [];
  }
}

export function isRateLimited(): boolean {
  return getRecentSubmissions().length >= RATE_LIMIT_MAX;
}

export function recordSubmission(): void {
  if (typeof window === "undefined") return;
  const recent = getRecentSubmissions();
  recent.push(Date.now());
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
}

// --- Visitor ID (for upvote dedup) ----------------------------------------

const VISITOR_ID_KEY = "nnz_visitor_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? `v${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

const UPVOTED_KEY = "nnz_upvoted_questions";

export function getUpvotedQuestions(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(UPVOTED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function recordUpvote(questionId: string): void {
  if (typeof window === "undefined") return;
  const set = getUpvotedQuestions();
  set.add(questionId);
  localStorage.setItem(UPVOTED_KEY, JSON.stringify(Array.from(set)));
}

// --- Time ago formatting --------------------------------------------------

export function timeAgo(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
