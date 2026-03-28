export interface Milestone {
  step: number;
  title: string;
  status: "current" | "upcoming" | "future" | "urgent";
  guideSlug?: string;
}

export function getPathwayMilestones(yearLevel: string): Milestone[] {
  switch (yearLevel) {
    case "year-9":
    case "year-10":
      return [
        { step: 1, title: "Explore your options", status: "current", guideSlug: "ncea-vs-cambridge-vs-ib" },
        { step: 2, title: "Choose your qualification pathway", status: "upcoming" },
        { step: 3, title: "Select Year 11 subjects", status: "upcoming" },
        { step: 4, title: "Build your academic profile", status: "future" },
        { step: 5, title: "Apply to university", status: "future", guideSlug: "how-to-get-into-university" },
      ];
    case "year-11":
      return [
        { step: 1, title: "Understand your qualification", status: "current", guideSlug: "ncea-vs-cambridge-vs-ib" },
        { step: 2, title: "Track your credits/grades", status: "current" },
        { step: 3, title: "Start thinking about university", status: "upcoming", guideSlug: "how-to-get-into-university" },
        { step: 4, title: "Research programmes and scholarships", status: "upcoming", guideSlug: "scholarship-guide" },
        { step: 5, title: "Apply to university", status: "future" },
      ];
    case "year-12":
      return [
        { step: 1, title: "Check University Entrance requirements", status: "current", guideSlug: "how-to-get-into-university" },
        { step: 2, title: "Research scholarships — deadlines are Aug/Sep!", status: "urgent", guideSlug: "scholarship-guide" },
        { step: 3, title: "Attend university open days", status: "current" },
        { step: 4, title: "Prepare your application", status: "upcoming" },
        { step: 5, title: "Apply (Aug–Dec)", status: "upcoming" },
      ];
    case "year-13":
      return [
        { step: 1, title: "Confirm you meet University Entrance", status: "urgent", guideSlug: "how-to-get-into-university" },
        { step: 2, title: "Apply for scholarships NOW", status: "urgent", guideSlug: "scholarship-guide" },
        { step: 3, title: "Submit university applications", status: "current" },
        { step: 4, title: "Apply for StudyLink (student loan/allowance)", status: "current" },
        { step: 5, title: "Accept your offer and enrol", status: "upcoming" },
      ];
    case "finished":
    default:
      return [
        { step: 1, title: "Check if you have University Entrance", status: "current", guideSlug: "how-to-get-into-university" },
        { step: 2, title: "Explore bridging/foundation programmes if needed", status: "current" },
        { step: 3, title: "Apply to university", status: "upcoming" },
        { step: 4, title: "Apply for StudyLink", status: "upcoming" },
      ];
  }
}

export function getRecommendedGuides(
  yearLevel: string,
  firstGen: boolean
): string[] {
  const slugs: string[] = [];

  if (firstGen) {
    slugs.push("understanding-nz-schools");
  }

  if (yearLevel === "year-9" || yearLevel === "year-10") {
    slugs.push("understanding-nz-schools", "ncea-vs-cambridge-vs-ib");
  } else if (yearLevel === "year-11") {
    slugs.push("ncea-vs-cambridge-vs-ib", "your-rights-and-support");
  } else {
    slugs.push("how-to-get-into-university", "scholarship-guide");
  }

  if (!slugs.includes("your-rights-and-support") && firstGen) {
    slugs.push("your-rights-and-support");
  }

  // Deduplicate and limit to 4
  return Array.from(new Set(slugs)).slice(0, 4);
}

export function getPathwayProgress(milestones: Milestone[]): number {
  const completed = milestones.filter(
    (m) => m.status === "current" || m.status === "urgent"
  ).length;
  // Weight current/urgent as partially done
  const total = milestones.length;
  return Math.round((completed / total) * 60); // Max 60% until actual tracking
}

const yearLabels: Record<string, string> = {
  "year-9": "Year 9",
  "year-10": "Year 10",
  "year-11": "Year 11",
  "year-12": "Year 12",
  "year-13": "Year 13",
  finished: "Finished School",
};

const qualLabels: Record<string, string> = {
  ncea: "NCEA",
  cambridge: "Cambridge",
  ib: "IB",
  "not-sure": "Undecided",
  "not-started": "Not started",
};

export function getYearLabel(v: string) {
  return yearLabels[v] || v;
}
export function getQualLabel(v: string) {
  return qualLabels[v] || v;
}
