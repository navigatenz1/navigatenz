export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Module {
  slug: string;
  title: string;
  category: string;
  description: string;
  timeEstimate: string;
  intro: string;
  checklist: ChecklistItem[];
  guideSlug?: string;
}

export const moduleCategories = [
  "Getting Started",
  "Preparing for University",
] as const;

export const modules: Module[] = [
  {
    slug: "get-set-up-at-school",
    title: "Get Set Up at Your School",
    category: "Getting Started",
    description: "Practical steps to make sure you're enrolled and oriented at your school",
    timeEstimate: "5 min",
    guideSlug: "understanding-nz-schools",
    intro: "Before anything else, make sure you know how your school works and who to talk to. These are the first things to sort out.",
    checklist: [
      { id: "setup-1", text: "Confirm which zone your school is in" },
      { id: "setup-2", text: "Check if your school offers NCEA, Cambridge, or IB" },
      { id: "setup-3", text: "Ask your school about ESOL support if needed" },
      { id: "setup-4", text: "Get a copy of your school's key dates calendar" },
      { id: "setup-5", text: "Find out who your dean or year-level coordinator is" },
    ],
  },
  {
    slug: "choose-your-pathway",
    title: "Choose Your Pathway",
    category: "Getting Started",
    description: "Decide which qualification pathway is right for you",
    timeEstimate: "5 min",
    guideSlug: "ncea-vs-cambridge-vs-ib",
    intro: "NCEA, Cambridge, or IB — this is one of the most important decisions you'll make at school. Don't rush it, but don't avoid it either.",
    checklist: [
      { id: "pathway-1", text: "Find out which pathways your school offers" },
      { id: "pathway-2", text: "Talk to a student in the year above about their experience" },
      { id: "pathway-3", text: "Discuss pathway options with your family" },
      { id: "pathway-4", text: "Make your decision and tell your school" },
    ],
  },
  {
    slug: "check-your-ue-progress",
    title: "Check Your UE Progress",
    category: "Getting Started",
    description: "Make sure you're on track to meet University Entrance requirements",
    timeEstimate: "5 min",
    guideSlug: "how-to-get-into-university",
    intro: "University Entrance is the minimum you need to be eligible. Don't wait until Year 13 to find out you're missing something — check now.",
    checklist: [
      { id: "ue-1", text: "Look up the UE requirements for your pathway" },
      { id: "ue-2", text: "Check your current credits/grades against UE requirements" },
      { id: "ue-3", text: "Talk to your dean if you're unsure whether you're on track" },
      { id: "ue-4", text: "Identify any gaps you need to fill this year" },
    ],
  },
  {
    slug: "research-your-university-options",
    title: "Research Your University Options",
    category: "Preparing for University",
    description: "Explore NZ's eight universities and find your fit",
    timeEstimate: "10 min",
    guideSlug: "how-to-get-into-university",
    intro: "New Zealand has eight universities, each with different strengths. Take the time to explore what's out there before you decide.",
    checklist: [
      { id: "unis-1", text: "Browse all 8 NZ university websites" },
      { id: "unis-2", text: "Shortlist 2-3 universities that interest you" },
      { id: "unis-3", text: "Check entry requirements for your preferred programme" },
      { id: "unis-4", text: "Register for an open day or virtual tour" },
      { id: "unis-5", text: "Talk to someone who attends your preferred university" },
    ],
  },
  {
    slug: "complete-your-application",
    title: "Complete Your University Application",
    category: "Preparing for University",
    description: "Step-by-step actions to get your application submitted",
    timeEstimate: "10 min",
    guideSlug: "how-to-get-into-university",
    intro: "Applications open around August. Don't wait until the deadline — start early and give yourself time to get it right.",
    checklist: [
      { id: "apply-1", text: "Create an account on your preferred university's application portal" },
      { id: "apply-2", text: "Gather required documents (results, ID, personal statement)" },
      { id: "apply-3", text: "Write your personal statement (if required)" },
      { id: "apply-4", text: "Submit your application before the deadline" },
      { id: "apply-5", text: "Save confirmation emails and application numbers" },
    ],
  },
  {
    slug: "apply-for-funding",
    title: "Apply for Funding",
    category: "Preparing for University",
    description: "Don't leave money on the table — apply for loans, allowances, and scholarships",
    timeEstimate: "10 min",
    guideSlug: "scholarship-guide",
    intro: "There's more financial help available than most students realise. Many scholarships go unclaimed every year because nobody applied.",
    checklist: [
      { id: "fund-1", text: "Create a StudyLink account at studylink.govt.nz" },
      { id: "fund-2", text: "Check if you're eligible for a student allowance" },
      { id: "fund-3", text: "Apply for your student loan" },
      { id: "fund-4", text: "Search for scholarships on your university's website" },
      { id: "fund-5", text: "Search Generosity NZ for external scholarships" },
      { id: "fund-6", text: "Apply for at least 3 scholarships" },
    ],
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getNextModule(currentSlug: string): Module | undefined {
  const idx = modules.findIndex((m) => m.slug === currentSlug);
  if (idx === -1 || idx === modules.length - 1) return undefined;
  return modules[idx + 1];
}
