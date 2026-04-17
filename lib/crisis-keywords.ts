// Crisis keyword detection for the Q&A board.
// If any of these phrases appear in a question body or display name, we BLOCK the
// submission and show a crisis response screen with NZ helpline numbers.
//
// IMPORTANT:
//   - Check is case-insensitive.
//   - We match on whole words / phrases using regex boundaries so "cycle" doesn't
//     trigger on the "suicide" fragment.
//   - If matched, we do NOT submit to the database. We don't log the content —
//     only a telemetry event that a crisis screen was shown.
//   - This is a safety net, NOT a primary intervention. The escalation UI is
//     responsible for surfacing real helplines.

const PHRASES: string[] = [
  // explicit self-harm / suicidal ideation
  "suicide",
  "suicidal",
  "kill myself",
  "killing myself",
  "end my life",
  "end it all",
  "want to die",
  "wanna die",
  "gonna die",
  "no reason to live",
  "no point living",
  "nothing to live for",
  "better off dead",
  "can't go on",
  "cant go on",
  // self-harm
  "self harm",
  "self-harm",
  "hurting myself",
  "hurt myself",
  "cutting myself",
  "cut myself",
  // abuse
  "being abused",
  "someone is abusing me",
  "abused at home",
  "hit me",
  "hits me",
];

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Compile once: word-boundary-bounded, case-insensitive.
// Word boundary works for phrases starting/ending with letters. For multi-word
// phrases with spaces, we still anchor on word boundaries at each end.
const CRISIS_REGEX = new RegExp(
  `\\b(${PHRASES.map(escapeRegex).join("|")})\\b`,
  "i"
);

export function detectCrisis(text: string): boolean {
  if (!text) return false;
  return CRISIS_REGEX.test(text);
}

export interface CrisisResource {
  label: string;
  href: string;
  urgent?: boolean;
}

export const CRISIS_RESOURCES: CrisisResource[] = [
  { label: "1737 — free, 24/7, confidential (call or text)", href: "tel:1737", urgent: true },
  { label: "Youthline: 0800 376 633 (call) / 234 (text)", href: "tel:0800376633" },
  { label: "If you're in immediate danger: 111", href: "tel:111", urgent: true },
  { label: "What's Up (5-18yrs): 0800 942 8787", href: "tel:08009428787" },
];
