export interface Programme {
  name: string;
  rankScore?: number;
  subjectsRequired?: string[];
  extras?: string[];
  notes?: string;
}

export interface UniProgrammes {
  uni: string;
  programmes: Programme[];
}

export const allProgrammes: UniProgrammes[] = [
  {
    uni: "University of Auckland",
    programmes: [
      { name: "Bachelor of Arts", rankScore: 150 },
      { name: "Bachelor of Commerce", rankScore: 180 },
      { name: "Bachelor of Engineering (Honours)", rankScore: 230, subjectsRequired: ["Calculus", "Physics"] },
      { name: "Bachelor of Health Sciences", rankScore: 250 },
      { name: "Bachelor of Law (Part I)", rankScore: 220 },
      { name: "Bachelor of Medicine (MBChB)", rankScore: 250, extras: ["UCAT required", "Interview required"] },
      { name: "Bachelor of Science", rankScore: 165 },
      { name: "Bachelor of Design", rankScore: 150, extras: ["Portfolio required"] },
      { name: "Bachelor of Education", rankScore: 150 },
    ],
  },
  {
    uni: "University of Otago",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Commerce", notes: "UE + strong results recommended" },
      { name: "Bachelor of Health Sciences", notes: "UE + competitive entry" },
      { name: "Bachelor of Dental Surgery", extras: ["Health Sciences First Year required", "Interview required"] },
      { name: "Bachelor of Medicine (MBChB)", extras: ["Health Sciences First Year required", "UCAT required", "Interview required"] },
      { name: "Bachelor of Laws", notes: "UE + first year papers required" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Pharmacy", notes: "UE + competitive entry" },
    ],
  },
  {
    uni: "Victoria University of Wellington",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Commerce", notes: "UE required" },
      { name: "Bachelor of Laws", notes: "UE + first year GPA requirement" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Design Innovation", extras: ["Portfolio required"] },
      { name: "Bachelor of Engineering (Honours)", subjectsRequired: ["Maths", "Physics"], notes: "Recommended" },
    ],
  },
  {
    uni: "University of Canterbury",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Commerce", notes: "UE required" },
      { name: "Bachelor of Engineering (Honours)", subjectsRequired: ["Maths (Calculus or Statistics)", "Physics"], notes: "Recommended" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Criminal Justice", notes: "UE required" },
      { name: "Bachelor of Forestry Science", notes: "UE required" },
    ],
  },
  {
    uni: "University of Waikato",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Business", notes: "UE required" },
      { name: "Bachelor of Engineering (Honours)", subjectsRequired: ["Maths", "Physics"], notes: "Recommended" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Laws", notes: "UE + B average in first year" },
      { name: "Bachelor of Social Sciences", notes: "UE required" },
    ],
  },
  {
    uni: "Massey University",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Business", notes: "UE required" },
      { name: "Bachelor of Veterinary Science", subjectsRequired: ["Chemistry", "Biology"], notes: "Competitive entry" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Design", extras: ["Portfolio required"] },
      { name: "Bachelor of Aviation", subjectsRequired: ["Maths", "Physics"], extras: ["Medical required"] },
    ],
  },
  {
    uni: "AUT",
    programmes: [
      { name: "Bachelor of Arts", notes: "UE required" },
      { name: "Bachelor of Business", notes: "UE required" },
      { name: "Bachelor of Health Sciences", notes: "UE + competitive" },
      { name: "Bachelor of Engineering (Honours)", subjectsRequired: ["Maths"], notes: "Recommended" },
      { name: "Bachelor of Design", extras: ["Portfolio required"] },
      { name: "Bachelor of Computer and Information Sciences", notes: "UE required" },
      { name: "Bachelor of Communication Studies", notes: "UE required" },
    ],
  },
  {
    uni: "Lincoln University",
    programmes: [
      { name: "Bachelor of Commerce (Agriculture)", notes: "UE required" },
      { name: "Bachelor of Science", notes: "UE required" },
      { name: "Bachelor of Landscape Architecture", extras: ["Portfolio required"] },
      { name: "Bachelor of Viticulture and Oenology", notes: "UE required" },
      { name: "Bachelor of Environment and Society", notes: "UE required" },
    ],
  },
];

export function calcRankScore(achieved: number, merit: number, excellence: number): number {
  // Best 80 credits: prioritise Excellence > Merit > Achieved
  let remaining = 80;
  let score = 0;

  const exCred = Math.min(excellence, remaining);
  score += exCred * 4;
  remaining -= exCred;

  const mCred = Math.min(merit, remaining);
  score += mCred * 3;
  remaining -= mCred;

  const aCred = Math.min(achieved, remaining);
  score += aCred * 2;

  return score;
}
