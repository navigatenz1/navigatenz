export interface Scholarship {
  id: number;
  name: string;
  org: string;
  type: "Academic" | "Equity" | "Leadership" | "Subject" | "Community";
  value: string;
  eligibility: string;
  uni: string;
  url: string;
}

export const scholarships: Scholarship[] = [
  { id: 1, name: "Top Achiever Scholarship", org: "University of Auckland", type: "Academic", value: "$20,000/year", eligibility: "All students — based on results", uni: "Auckland", url: "https://www.auckland.ac.nz/en/study/scholarships-and-awards.html" },
  { id: 2, name: "Māori & Pacific Admission Scheme", org: "University of Auckland", type: "Equity", value: "Varies", eligibility: "Māori and Pacific students", uni: "Auckland", url: "https://www.auckland.ac.nz/en/study/scholarships-and-awards.html" },
  { id: 3, name: "Leaders of Tomorrow Entrance", org: "University of Otago", type: "Leadership", value: "$10,000/year", eligibility: "Leadership + strong academics", uni: "Otago", url: "https://www.otago.ac.nz/scholarships" },
  { id: 4, name: "Māori Entrance Scholarship", org: "University of Otago", type: "Equity", value: "$13,000", eligibility: "Māori students", uni: "Otago", url: "https://www.otago.ac.nz/scholarships" },
  { id: 5, name: "Tangiwai Scholarship", org: "Victoria University of Wellington", type: "Equity", value: "Up to $10,000", eligibility: "First-generation students", uni: "Victoria", url: "https://www.wgtn.ac.nz/scholarships" },
  { id: 6, name: "School Leaver Scholarship", org: "Victoria University of Wellington", type: "Academic", value: "$5,000", eligibility: "All students — based on results", uni: "Victoria", url: "https://www.wgtn.ac.nz/scholarships" },
  { id: 7, name: "UC Scholarship", org: "University of Canterbury", type: "Academic", value: "$6,000/year", eligibility: "All students — based on results", uni: "Canterbury", url: "https://www.canterbury.ac.nz/scholarships" },
  { id: 8, name: "Sir Edmund Hillary Scholarship", org: "University of Waikato", type: "Leadership", value: "Up to $10,000", eligibility: "Leadership, sport, or creative arts", uni: "Waikato", url: "https://www.waikato.ac.nz/scholarships" },
  { id: 9, name: "Ko Te Tangata Scholarship", org: "University of Waikato", type: "Equity", value: "$5,000", eligibility: "Māori and Pacific students", uni: "Waikato", url: "https://www.waikato.ac.nz/scholarships" },
  { id: 10, name: "Vice-Chancellor's Excellence", org: "Massey University", type: "Academic", value: "$5,000–15,000", eligibility: "All students — based on results", uni: "Massey", url: "https://www.massey.ac.nz/scholarships" },
  { id: 11, name: "Vice Chancellor's Scholarship", org: "AUT", type: "Academic", value: "$5,000/year", eligibility: "All students — based on results", uni: "AUT", url: "https://www.aut.ac.nz/scholarships" },
  { id: 12, name: "Lincoln Scholarship", org: "Lincoln University", type: "Academic", value: "$3,000–5,000", eligibility: "All students — based on results", uni: "Lincoln", url: "https://www.lincoln.ac.nz/scholarships" },
  { id: 13, name: "Community Scholarship", org: "Foundation North", type: "Community", value: "$5,000", eligibility: "Auckland region students", uni: "External", url: "https://www.foundationnorth.org.nz" },
  { id: 14, name: "Rotary Club NZ Scholarship", org: "Rotary NZ", type: "Community", value: "Varies", eligibility: "Community service involvement", uni: "External", url: "https://www.rotary.org.nz" },
  { id: 15, name: "Graduate Women Scholarship", org: "NZ Federation of Graduate Women", type: "Equity", value: "Varies", eligibility: "Women in education", uni: "External", url: "https://www.gwnz.org.nz" },
  { id: 16, name: "First Foundation Scholarship", org: "First Foundation", type: "Equity", value: "Multi-year support", eligibility: "First-gen, low income students", uni: "External", url: "https://www.firstfoundation.org.nz" },
  { id: 17, name: "Robertson Scholars NZ", org: "Robertson Foundation", type: "Academic", value: "Full support", eligibility: "High achieving students", uni: "External", url: "https://www.robertsonscholars.org" },
  { id: 18, name: "Google NZ Scholarship", org: "Google", type: "Subject", value: "Varies", eligibility: "Computer science students", uni: "External", url: "https://buildyourfuture.withgoogle.com/scholarships" },
  { id: 19, name: "Engineering NZ Scholarship", org: "Engineering NZ", type: "Subject", value: "Varies", eligibility: "Engineering students", uni: "External", url: "https://www.engineeringnz.org" },
  { id: 20, name: "TeachNZ Scholarship", org: "Ministry of Education", type: "Subject", value: "Bonded", eligibility: "Education/teaching students", uni: "External", url: "https://www.teachnz.govt.nz/scholarships" },
];
