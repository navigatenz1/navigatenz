"use client";

import { useState } from "react";
import Container from "@/components/Container";

interface DateEvent {
  month: string;
  monthNum: number;
  title: string;
  desc: string;
  category: "school" | "scholarships" | "applications" | "exams";
}

const events: DateEvent[] = [
  { month: "March", monthNum: 3, title: "School year underway", desc: "Mid-term assessments begin at many schools", category: "school" },
  { month: "April", monthNum: 4, title: "Term 1 ends", desc: "School holidays begin — good time to plan ahead", category: "school" },
  { month: "May", monthNum: 5, title: "Term 2 starts", desc: "University open days begin — register early", category: "school" },
  { month: "May", monthNum: 5, title: "Open days begin", desc: "Universities start hosting campus visit days (May–August)", category: "applications" },
  { month: "June", monthNum: 6, title: "Mid-year exams", desc: "Some schools hold mid-year exams or practice exams", category: "exams" },
  { month: "July", monthNum: 7, title: "School holidays", desc: "Open days continue — attend if you can", category: "school" },
  { month: "July", monthNum: 7, title: "Start scholarship search", desc: "Many scholarship deadlines are Aug–Sep. Start searching NOW", category: "scholarships" },
  { month: "August", monthNum: 8, title: "Scholarship applications open", desc: "Major university scholarships open — don't miss deadlines", category: "scholarships" },
  { month: "August", monthNum: 8, title: "University applications open", desc: "Apply early for your preferred programmes", category: "applications" },
  { month: "August", monthNum: 8, title: "Term 3 starts", desc: "Final push before exams", category: "school" },
  { month: "September", monthNum: 9, title: "Scholarship deadlines", desc: "Many scholarships close this month — submit on time", category: "scholarships" },
  { month: "October", monthNum: 10, title: "NCEA exam entries close", desc: "Make sure you're entered for all your external exams", category: "exams" },
  { month: "October", monthNum: 10, title: "Term 3 ends", desc: "Study leave begins for Year 12–13 students", category: "school" },
  { month: "November", monthNum: 11, title: "NCEA external exams begin", desc: "Exams run through November into early December", category: "exams" },
  { month: "November", monthNum: 11, title: "Submit StudyLink applications", desc: "Apply for student loan and allowance now — processing takes weeks", category: "applications" },
  { month: "December", monthNum: 12, title: "NCEA exams end", desc: "External exam period concludes", category: "exams" },
  { month: "December", monthNum: 12, title: "University application deadlines", desc: "Most programmes close for applications", category: "applications" },
  { month: "January", monthNum: 1, title: "University offers sent", desc: "Check your email! Accept your offer promptly", category: "applications" },
  { month: "February", monthNum: 2, title: "Orientation & enrolment", desc: "Attend orientation week — university officially starts late Feb/early March", category: "applications" },
];

const categories = ["all", "school", "scholarships", "applications", "exams"] as const;
const catLabels: Record<string, string> = { all: "All", school: "School", scholarships: "Scholarships", applications: "Applications", exams: "Exams" };
const catColors: Record<string, string> = { school: "bg-navy", scholarships: "bg-gold", applications: "bg-teal", exams: "bg-coral" };

export default function KeyDatesPage() {
  const [filter, setFilter] = useState("all");
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-12 sm:py-16 overflow-hidden">
        <Container className="relative">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Key Dates 2026</h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base">Never miss a deadline. All important education dates in one place.</p>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setFilter(c)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${filter === c ? "bg-teal text-white" : "bg-gray-100 text-navy/60 hover:bg-gray-200"}`}>{catLabels[c]}</button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {filtered.map((ev, i) => {
                  const isPast = ev.monthNum < currentMonth;
                  const isCurrent = ev.monthNum === currentMonth;
                  const isUrgent = !isPast && ev.monthNum <= currentMonth + 1;
                  const dotColor = isPast ? "bg-gray-300" : isCurrent ? "bg-teal ring-4 ring-teal/20" : isUrgent ? "bg-coral" : catColors[ev.category] || "bg-navy";

                  return (
                    <div key={`${ev.month}-${i}`} className={`relative flex gap-4 sm:gap-6 ${isPast ? "opacity-50" : ""}`}>
                      <div className="flex flex-col items-center flex-shrink-0 w-8 sm:w-10">
                        <div className={`w-3 h-3 rounded-full ${dotColor} z-10`} />
                      </div>
                      <div className={`flex-1 pb-4 ${isCurrent ? "" : ""}`}>
                        <div className={`p-4 rounded-xl border ${isCurrent ? "border-teal bg-teal-50/30" : isUrgent ? "border-coral/20 bg-coral-50/20" : "border-gray-100 bg-white"}`}>
                          {isCurrent && <span className="text-[10px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded-full mb-2 inline-block">YOU ARE HERE</span>}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-navy text-sm">{ev.title}</p>
                              <p className="text-xs text-navy/50 mt-0.5">{ev.desc}</p>
                            </div>
                            <span className="text-xs text-navy/40 whitespace-nowrap flex-shrink-0">{ev.month}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
