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
  {
    slug: "plan-your-subject-choices",
    title: "Plan Your Subject Choices",
    category: "Getting Started",
    description: "Make informed subject decisions that keep your university options open",
    timeEstimate: "10 min",
    guideSlug: "subject-selection-strategy",
    intro: "The subjects you choose now affect what you can study later. Take the time to research before you decide.",
    checklist: [
      { id: "subj-1", text: "Check what subjects your preferred university programme requires" },
      { id: "subj-2", text: "Talk to your careers advisor about subject options" },
      { id: "subj-3", text: "Talk to a student currently taking the subjects you're considering" },
      { id: "subj-4", text: "Discuss your choices with your family" },
      { id: "subj-5", text: "Submit your subject selection form by the deadline" },
    ],
  },
  {
    slug: "track-your-ncea-credits",
    title: "Track Your NCEA Credits",
    category: "Getting Started",
    description: "Check your credits and make sure you're on track for UE",
    timeEstimate: "8 min",
    guideSlug: "understanding-ncea-credits",
    intro: "Your NZQA Learner Login shows exactly where you stand. Check it regularly — don't wait until the end of the year.",
    checklist: [
      { id: "credits-1", text: "Log into NZQA Learner Login and check your current credits" },
      { id: "credits-2", text: "Count how many credits you have at each level" },
      { id: "credits-3", text: "Check if you're on track for University Entrance" },
      { id: "credits-4", text: "Identify any gaps in literacy or numeracy credits" },
      { id: "credits-5", text: "Talk to your dean if you're behind on anything" },
    ],
  },
  {
    slug: "prepare-for-exam-season",
    title: "Prepare for Exam Season",
    category: "Getting Started",
    description: "Get organised for externals with a study plan and past papers",
    timeEstimate: "10 min",
    guideSlug: "preparing-for-exams",
    intro: "Exam season doesn't have to be stressful if you start preparing early. These are the practical steps to get ready.",
    checklist: [
      { id: "exam-1", text: "Create a study timetable at least 4 weeks before exams" },
      { id: "exam-2", text: "Download past papers from NZQA for each exam subject" },
      { id: "exam-3", text: "Complete at least 2 past papers per subject under timed conditions" },
      { id: "exam-4", text: "Identify your weakest topics and spend extra time on them" },
      { id: "exam-5", text: "Organise your exam schedule — know the date, time, and location" },
    ],
  },
  {
    slug: "attend-a-university-open-day",
    title: "Attend a University Open Day",
    category: "Preparing for University",
    description: "Visit campuses and talk to real students before you decide",
    timeEstimate: "8 min",
    guideSlug: "university-open-days",
    intro: "Open days happen May-August. They're free and they're the best way to figure out where you want to study.",
    checklist: [
      { id: "openday-1", text: "Check open day dates for your shortlisted universities" },
      { id: "openday-2", text: "Register for at least one open day" },
      { id: "openday-3", text: "Prepare a list of questions to ask" },
      { id: "openday-4", text: "Attend the open day and talk to at least 2 current students" },
      { id: "openday-5", text: "Write down your impressions afterward while they're fresh" },
    ],
  },
  {
    slug: "set-up-studylink",
    title: "Set Up StudyLink",
    category: "Preparing for University",
    description: "Get your student loan and allowance sorted before uni starts",
    timeEstimate: "10 min",
    guideSlug: "studylink-complete-guide",
    intro: "Apply in November or December — processing takes weeks. Don't wait until February when everyone else is scrambling.",
    checklist: [
      { id: "studylink-1", text: "Create a MyMSD account at studylink.govt.nz" },
      { id: "studylink-2", text: "Make sure you have your IRD number" },
      { id: "studylink-3", text: "Gather your parents' income details" },
      { id: "studylink-4", text: "Apply for the Student Allowance" },
      { id: "studylink-5", text: "Apply for the Student Loan (tuition fees + optionally living costs)" },
      { id: "studylink-6", text: "Set calendar reminder to check application status in 2 weeks" },
    ],
  },
  {
    slug: "write-your-personal-statement",
    title: "Write Your Personal Statement",
    category: "Preparing for University",
    description: "Craft a personal statement that tells your story authentically",
    timeEstimate: "15 min",
    guideSlug: "how-to-get-into-university",
    intro: "Some programmes require a personal statement. This is your chance to show who you are beyond your grades.",
    checklist: [
      { id: "statement-1", text: "Read the personal statement requirements for your programme" },
      { id: "statement-2", text: "Brainstorm 3-5 experiences that shaped your interest in this field" },
      { id: "statement-3", text: "Write a first draft (500-800 words)" },
      { id: "statement-4", text: "Get feedback from a teacher or careers advisor" },
      { id: "statement-5", text: "Revise and submit your final version" },
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
