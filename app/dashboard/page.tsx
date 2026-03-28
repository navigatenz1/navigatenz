"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import UniBadge from "@/components/UniBadge";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import {
  getPathwayMilestones,
  getRecommendedGuides,
  getPathwayProgress,
  getYearLabel,
  getQualLabel,
  type Milestone,
} from "@/lib/pathway";
import { modules as allModules } from "@/lib/modules";
import { universities as allUnis } from "@/lib/universities";

/* Guide metadata for recommendations */
const guideMeta: Record<string, { title: string; description: string; readTime: string; category: string }> = {
  "understanding-nz-schools": { title: "Understanding NZ Schools", description: "How year levels, school types, zoning, and enrolment work", readTime: "8 min read", category: "Understanding the System" },
  "ncea-vs-cambridge-vs-ib": { title: "NCEA vs Cambridge vs IB", description: "A plain-language comparison of NZ's three main qualification pathways", readTime: "10 min read", category: "Choosing Your Path" },
  "how-to-get-into-university": { title: "How to Get Into a NZ University", description: "University Entrance, applications, key dates, and scholarships", readTime: "12 min read", category: "Applying to University" },
  "your-rights-and-support": { title: "Your Rights and Support", description: "ESOL support, financial help, and what schools must provide", readTime: "6 min read", category: "Understanding the System" },
  "scholarship-guide": { title: "Scholarship Guide", description: "How to find and apply for scholarships in NZ", readTime: "7 min read", category: "Applying to University" },
  "nz-qualification-changes": { title: "NZ Qualification Changes", description: "NCEA is being replaced from 2028-2030", readTime: "7 min read", category: "Understanding the System" },
  "understanding-ncea-credits": { title: "Understanding NCEA Credits", description: "Credits, endorsements, and UE requirements explained", readTime: "10 min read", category: "Understanding the System" },
  "subject-selection-strategy": { title: "Subject Selection Strategy", description: "How to choose your subjects wisely", readTime: "8 min read", category: "Choosing Your Path" },
  "preparing-for-exams": { title: "Preparing for Exams", description: "What actually works for exam prep", readTime: "9 min read", category: "Choosing Your Path" },
  "what-to-do-if-behind": { title: "What to Do If You're Behind", description: "Options when credits or grades aren't where they need to be", readTime: "7 min read", category: "Understanding the System" },
  "first-gen-experience": { title: "The First-Gen Experience", description: "What it's like and why you belong", readTime: "6 min read", category: "For Parents & Families" },
  "guide-for-parents": { title: "A Guide for Parents and Families", description: "Everything parents need to know", readTime: "8 min read", category: "For Parents & Families" },
  "studylink-complete-guide": { title: "StudyLink Complete Guide", description: "Student loans, allowances, and how to apply", readTime: "9 min read", category: "Applying to University" },
  "university-open-days": { title: "Making the Most of Open Days", description: "How to make open days count", readTime: "5 min read", category: "Applying to University" },
};

interface AssessmentRow {
  year_level: string;
  qualification_pathway: string;
  first_gen: boolean;
  current_grades: string | null;
  subjects_of_interest: string[];
  preferred_universities: string[];
  goals: string | null;
}

const tabs = [
  { id: "overview", label: "Overview", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { id: "pathway", label: "My Pathway", icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" },
  { id: "modules", label: "Modules", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "universities", label: "Universities", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" },
  { id: "tools", label: "Tools", icon: "M11.42 15.17l-5.658-5.66a2.25 2.25 0 010-3.182l.44-.439a2.25 2.25 0 013.182 0l5.657 5.657a2.25 2.25 0 010 3.182l-.44.44a2.25 2.25 0 01-3.181 0z M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z" },
  { id: "guides", label: "Guides for You", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
  { id: "settings", label: "Settings", icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [assessment, setAssessment] = useState<AssessmentRow | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileType, setProfileType] = useState("");
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) router.push("/auth/signin");
  }, [user, authLoading, router]);

  // Fetch assessment + profile
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    Promise.all([
      supabase
        .from("assessments")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(1),
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("module_progress")
        .select("module_slug")
        .eq("user_id", user.id)
        .eq("completed", true),
      supabase
        .from("bookmarks")
        .select("guide_slug")
        .eq("user_id", user.id),
    ]).then(([assessRes, profileRes, modRes, bookRes]) => {
      if (assessRes.data && assessRes.data.length > 0) {
        setAssessment(assessRes.data[0] as AssessmentRow);
      }
      if (profileRes.data) {
        setProfileName(profileRes.data.full_name || user.user_metadata?.full_name || "");
        setProfileEmail(profileRes.data.email || user.email || "");
        setProfileType(profileRes.data.user_type || "student");
      } else {
        setProfileName(user.user_metadata?.full_name || "");
        setProfileEmail(user.email || "");
        setProfileType(user.user_metadata?.user_type || "student");
      }
      if (modRes.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCompletedModules(modRes.data.map((r: any) => r.module_slug).filter((s: string) => !s.includes(":")));
      }
      if (bookRes.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setBookmarkedSlugs(bookRes.data.map((r: any) => r.guide_slug));
      }
      setDataLoading(false);
    });
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const firstName = (profileName || user.email?.split("@")[0] || "there").split(" ")[0];

  const milestones = assessment ? getPathwayMilestones(assessment.year_level) : [];
  const progress = getPathwayProgress(milestones);
  const recommendedSlugs = assessment
    ? getRecommendedGuides(assessment.year_level, assessment.first_gen)
    : [];
  const nextActions = milestones
    .filter((m) => m.status === "current" || m.status === "urgent")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/80 overflow-x-hidden">
      {/* Mobile tabs */}
      <div className="lg:hidden border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id
                  ? "border-teal text-teal"
                  : "border-transparent text-navy/50 hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 sidebar-gradient min-h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white text-sm font-bold">
                {firstName[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{profileName || firstName}</p>
                <p className="text-white/40 text-xs truncate">{profileEmail}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                </svg>
                {t.label}
                {tab === t.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal" />}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-full lg:max-w-[calc(100vw-16rem)]">
          {dataLoading ? (
            <LoadingSkeleton />
          ) : !assessment ? (
            <NoAssessment />
          ) : (
            <>
              {tab === "overview" && (
                <OverviewTab
                  firstName={firstName}
                  assessment={assessment}
                  milestones={milestones}
                  nextActions={nextActions}
                  recommendedSlugs={recommendedSlugs}
                  progress={progress}
                  completedModules={completedModules}
                  bookmarkedSlugs={bookmarkedSlugs}
                />
              )}
              {tab === "pathway" && (
                <PathwayTab milestones={milestones} progress={progress} assessment={assessment} />
              )}
              {tab === "guides" && (
                <GuidesTab slugs={recommendedSlugs} assessment={assessment} />
              )}
              {tab === "modules" && (
                <ModulesTab completedModules={completedModules} />
              )}
              {tab === "universities" && (
                <UniversitiesTab preferredUnis={assessment?.preferred_universities || []} />
              )}
              {tab === "tools" && <ToolsTab />}
              {tab === "settings" && (
                <SettingsTab
                  name={profileName}
                  email={profileEmail}
                  userType={profileType}
                  signOut={async () => { await signOut(); router.push("/"); }}
                  showDeleteConfirm={showDeleteConfirm}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* ── Loading Skeleton ── */
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded-lg" />
      <div className="h-4 w-48 bg-gray-100 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-gray-100 rounded-2xl mt-6" />
    </div>
  );
}

/* ── No Assessment CTA ── */
function NoAssessment() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-3">You haven&apos;t taken the assessment yet</h2>
        <p className="text-navy/60 mb-8">Take our quick assessment so we can personalise your pathway to university.</p>
        <Button href="/assessment" size="lg">Take the Assessment</Button>
      </div>
    </div>
  );
}

/* ── Status Badge ── */
function StatusBadge({ status }: { status: Milestone["status"] }) {
  const styles = {
    current: "bg-teal-50 text-teal-700",
    urgent: "bg-coral-50 text-coral-700",
    upcoming: "bg-gold-50 text-gold-800",
    future: "bg-gray-100 text-navy/40",
  };
  const labels = { current: "Current", urgent: "Urgent", upcoming: "Upcoming", future: "Future" };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

/* ── Milestone Row ── */
function MilestoneRow({ m, isLast, expanded }: { m: Milestone; isLast: boolean; expanded?: boolean }) {
  const borderColor = m.status === "urgent" ? "border-coral" : m.status === "current" ? "border-teal" : "border-gray-200";
  const dotColor = m.status === "urgent" ? "bg-coral" : m.status === "current" ? "bg-teal" : m.status === "upcoming" ? "bg-gold" : "bg-gray-200";
  const textOpacity = m.status === "future" ? "opacity-50" : "";

  return (
    <div className={`relative flex gap-4 ${textOpacity}`}>
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-4 h-4 rounded-full ${dotColor} ring-4 ring-white z-10`} />
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200 -mt-0" />}
      </div>
      {/* Content */}
      <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
        <div className={`p-4 rounded-xl border-l-4 ${borderColor} bg-white shadow-sm`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-navy text-sm">{m.title}</p>
              {expanded && m.guideSlug && (
                <Link href={`/guides/${m.guideSlug}`} className="text-teal text-xs font-medium mt-1 inline-flex items-center gap-1 hover:text-teal-600 transition-colors">
                  Read guide <span>&rarr;</span>
                </Link>
              )}
            </div>
            <StatusBadge status={m.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Overview Tab ── */
function getKeyDates(yearLevel: string) {
  const now = new Date();
  const year = now.getFullYear();
  const dates: { label: string; date: Date; urgent?: boolean }[] = [];

  if (["year-12", "year-13", "finished"].includes(yearLevel)) {
    dates.push({ label: "Scholarship applications open", date: new Date(year, 7, 1) });
    dates.push({ label: "University applications open", date: new Date(year, 7, 15) });
  }
  if (["year-13"].includes(yearLevel)) {
    dates.push({ label: "NCEA external exams begin", date: new Date(year, 10, 1) });
    dates.push({ label: "University application deadline", date: new Date(year, 11, 1) });
  }

  return dates
    .map((d) => {
      const diff = Math.ceil((d.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { ...d, daysAway: diff, urgent: diff <= 30 && diff > 0 };
    })
    .filter((d) => d.daysAway > -7)
    .sort((a, b) => a.daysAway - b.daysAway);
}

function OverviewTab({
  firstName,
  assessment,
  milestones,
  nextActions,
  recommendedSlugs,
  progress,
  completedModules,
  bookmarkedSlugs,
}: {
  firstName: string;
  assessment: AssessmentRow;
  milestones: Milestone[];
  nextActions: Milestone[];
  recommendedSlugs: string[];
  progress: number;
  completedModules: string[];
  bookmarkedSlugs: string[];
}) {
  const totalModules = allModules.length;
  const doneCount = completedModules.length;
  const nextModules = allModules.filter((m) => !completedModules.includes(m.slug)).slice(0, 3);
  const keyDates = getKeyDates(assessment.year_level);
  const weeklyFocus = nextModules[0];
  const overallProgress = Math.round(((doneCount / totalModules) * 50 + (progress / 100) * 50));

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">Welcome back, {firstName}!</h1>
          <p className="text-xs text-navy/30 mb-1">Your personal overview — free forever, no strings attached</p>
          <p className="text-navy/50 flex items-center gap-2 flex-wrap text-sm">
            <span>{getYearLabel(assessment.year_level)}</span>
            <span className="text-navy/20">·</span>
            <span>{getQualLabel(assessment.qualification_pathway)}</span>
            {assessment.first_gen && (
              <>
                <span className="text-navy/20">·</span>
                <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  First in Family ⭐
                </span>
              </>
            )}
          </p>
        </div>
        <Link href="/assessment" className="text-xs text-navy/40 hover:text-teal transition-colors whitespace-nowrap">
          Retake Assessment
        </Link>
      </div>

      {/* Weekly Focus + Progress Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {weeklyFocus && (
          <Card hover={false} className="p-5 border-l-4 border-l-gold">
            <h3 className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">This Week&apos;s Focus</h3>
            <Link href={`/modules/${weeklyFocus.slug}`} className="group">
              <p className="font-semibold text-navy group-hover:text-teal transition-colors text-sm">{weeklyFocus.title}</p>
              <p className="text-navy/50 text-xs mt-1">{weeklyFocus.description}</p>
              <span className="text-teal text-xs font-medium mt-2 inline-flex items-center gap-1">Start module <span>&rarr;</span></span>
            </Link>
          </Card>
        )}
        <Card hover={false} className="p-5">
          <h3 className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">Overall Progress</h3>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-teal">{overallProgress}%</p>
            <div className="flex-1 pb-1.5">
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-navy/40">
            <span>Modules: {doneCount}/{totalModules}</span>
            <span>Assessment: ✓</span>
          </div>
        </Card>
      </div>

      {/* Key Dates */}
      {keyDates.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">Key Dates</h2>
          <div className="space-y-2">
            {keyDates.map((d) => (
              <div key={d.label} className={`flex items-center justify-between p-3 rounded-xl border ${d.urgent ? "border-coral/20 bg-coral-50/30" : "border-gray-100 bg-white"}`}>
                <span className={`text-sm font-medium ${d.urgent ? "text-coral" : "text-navy"}`}>{d.label}</span>
                <span className={`text-xs font-medium ${d.urgent ? "text-coral" : "text-navy/40"}`}>
                  {d.daysAway <= 0 ? "Now" : `in ${d.daysAway} days`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Guides */}
      {bookmarkedSlugs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">Your Saved Guides</h2>
          <div className="space-y-2">
            {bookmarkedSlugs.map((slug) => {
              const g = guideMeta[slug];
              if (!g) return null;
              return (
                <Link key={slug} href={`/guides/${slug}`} className="group flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-teal/30 transition-all">
                  <span className="text-sm font-medium text-navy group-hover:text-teal transition-colors">{g.title}</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/20 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Position Card */}
      <Card accent hover={false} className="p-6">
        <h3 className="text-sm font-semibold text-navy/40 uppercase tracking-wider mb-4">Your Position</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-navy/40 mb-1">Year Level</p>
            <p className="font-semibold text-navy">{getYearLabel(assessment.year_level)}</p>
          </div>
          <div>
            <p className="text-xs text-navy/40 mb-1">Pathway</p>
            <p className="font-semibold text-navy">{getQualLabel(assessment.qualification_pathway)}</p>
          </div>
          <div>
            <p className="text-xs text-navy/40 mb-1">First Generation</p>
            <p className="font-semibold text-navy">{assessment.first_gen ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-xs text-navy/40 mb-1">Universities</p>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {assessment.preferred_universities.length > 0
                ? assessment.preferred_universities.map((u) => (
                    <UniBadge key={u} uni={u} showName />
                  ))
                : <span className="text-sm text-navy/40">—</span>}
            </div>
          </div>
        </div>
        {assessment.qualification_pathway === "ncea" && (
          <p className="mt-4 pt-3 border-t border-gray-100 text-xs text-amber-700 bg-amber-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl">
            ℹ️ Your pathway is based on current NCEA requirements, which apply to students graduating by 2029.
          </p>
        )}
      </Card>

      {/* Pathway Roadmap (compact) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Your Pathway</h2>
          <span className="text-sm text-teal font-semibold">{progress}% complete</span>
        </div>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <MilestoneRow key={m.step} m={m} isLast={i === milestones.length - 1} />
          ))}
        </div>
      </div>

      {/* Next Steps */}
      {nextActions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">Your next actions</h2>
          <div className="space-y-3">
            {nextActions.map((a) => (
              <Link
                key={a.step}
                href={a.guideSlug ? `/guides/${a.guideSlug}` : "/guides"}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.status === "urgent" ? "bg-coral" : "bg-teal"}`} />
                  <span className="text-sm font-medium text-navy group-hover:text-teal transition-colors truncate">{a.title}</span>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/20 group-hover:text-teal group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Your Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Your Modules</h2>
          <Link href="/modules" className="text-xs text-teal font-medium hover:text-teal-600 transition-colors">View all</Link>
        </div>
        <Card hover={false} className="p-5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-navy/60">{doneCount} of {totalModules} modules completed</span>
            <span className="text-sm font-semibold text-teal">{Math.round((doneCount / totalModules) * 100)}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-500" style={{ width: `${(doneCount / totalModules) * 100}%` }} />
          </div>
        </Card>
        {nextModules.length > 0 && (
          <div className="space-y-2">
            {nextModules.map((m) => (
              <Link key={m.slug} href={`/modules/${m.slug}`} className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-teal/40 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-navy group-hover:text-teal transition-colors block truncate">{m.title}</span>
                    <span className="text-xs text-navy/40">{m.timeEstimate} · {m.checklist.length} items</span>
                  </div>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/20 group-hover:text-teal flex-shrink-0 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Your Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Your Tools</h2>
          <Link href="/tools" className="text-xs text-teal font-medium hover:text-teal-600 transition-colors">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dashboardTools.slice(0, 4).map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all">
              <span className="text-lg flex-shrink-0">{tool.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy group-hover:text-teal transition-colors truncate">{tool.title}</p>
                <p className="text-xs text-navy/40 truncate">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/tools/university-matcher" className="group">
          <Card hover={true} className="p-5 h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#E9C46A" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" /></svg>
              </div>
              <div>
                <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">Find Your University Match</p>
                <p className="text-navy/40 text-xs">5 questions, personalised results</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/impact" className="group">
          <Card hover={true} className="p-5 h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">See Our Impact</p>
                <p className="text-navy/40 text-xs">Real numbers, real students</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recommended Guides */}
      <div>
        <h2 className="text-lg font-bold text-navy mb-4">Recommended guides</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {recommendedSlugs.map((slug) => {
            const g = guideMeta[slug];
            if (!g) return null;
            return (
              <Link key={slug} href={`/guides/${slug}`} className="group flex-shrink-0 w-[260px]">
                <Card className="h-full p-5 overflow-hidden">
                  <div className="h-1 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-teal to-teal-400" />
                  <p className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-2">{g.category}</p>
                  <h3 className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">{g.title}</h3>
                  <p className="text-navy/50 text-xs mt-1 line-clamp-2">{g.description}</p>
                  <p className="text-navy/30 text-xs mt-2">{g.readTime}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Pathway Tab ── */
function PathwayTab({ milestones, progress, assessment }: { milestones: Milestone[]; progress: number; assessment: AssessmentRow }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">My Pathway</h1>
        <p className="text-navy/50 mt-1 text-sm">
          Your personalised roadmap based on being a {getYearLabel(assessment.year_level)} student studying {getQualLabel(assessment.qualification_pathway)}
        </p>
      </div>

      {/* Progress bar */}
      <Card hover={false} className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-navy">Overall progress</span>
          <span className="text-sm font-bold text-teal">{progress}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-navy/40 mt-2">Progress updates as you complete steps and track milestones</p>
      </Card>

      {/* Full timeline */}
      <div className="space-y-0">
        {milestones.map((m, i) => (
          <MilestoneRow key={m.step} m={m} isLast={i === milestones.length - 1} expanded />
        ))}
      </div>
    </div>
  );
}

/* ── Guides Tab ── */
/* ── Modules Tab ── */
/* ── Tools Tab ── */
const dashboardTools = [
  { href: "/tools/credit-calculator", icon: "🧮", title: "NCEA Credit Calculator", desc: "Check if you're on track for NCEA and UE" },
  { href: "/tools/university-matcher", icon: "🧭", title: "University Matcher", desc: "Find your best-fit NZ university" },
  { href: "/tools/scholarship-finder", icon: "🔍", title: "Scholarship Finder", desc: "Search 20+ NZ scholarships" },
  { href: "/tools/key-dates", icon: "📅", title: "Key Dates", desc: "Never miss a deadline" },
  { href: "/tools/personal-statement", icon: "✍️", title: "Personal Statement", desc: "Write your statement step by step" },
];

/* ── Universities Tab ── */
function UniversitiesTab({ preferredUnis }: { preferredUnis: string[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">NZ Universities</h1>
        <p className="text-navy/50 mt-1 text-sm">All 8 NZ universities at a glance</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {allUnis.map((uni) => {
          const isPref = preferredUnis.includes(uni.name);
          return (
            <Card key={uni.name} hover={false} className={`p-0 overflow-hidden ${isPref ? "border-l-4 border-l-gold" : ""}`}>
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={uni.image} alt={`${uni.city} cityscape`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: uni.color }}>{uni.abbr.slice(0,3)}</span>
                  <span className="text-white font-bold text-sm drop-shadow">{uni.name}</span>
                </div>
                {isPref && <span className="absolute top-3 right-3 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Your pick</span>}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-navy/50">
                  <span>{uni.city}</span>
                  <span>·</span>
                  <span>{uni.students} students</span>
                  <span>·</span>
                  <span>{uni.livingCost}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {uni.knownFor.map((tag) => (
                    <span key={tag} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-[10px] text-navy/40">{uni.ranking}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-teal text-xs font-medium hover:text-teal-600 transition-colors">Visit website &rarr;</a>
                  <Link href={`/tools/credit-calculator`} className="text-xs text-navy/40 hover:text-navy transition-colors">Check requirements &rarr;</Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="text-center pt-4">
        <Button href="/tools/university-matcher" variant="outline" size="sm">Not sure which? Try the University Matcher</Button>
      </div>
    </div>
  );
}

function ToolsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Your Tools</h1>
        <p className="text-navy/50 mt-1 text-sm">Free interactive tools to help you plan and prepare</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dashboardTools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card accent className="p-5 h-full">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                <div>
                  <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">{tool.title}</p>
                  <p className="text-xs text-navy/50 mt-0.5">{tool.desc}</p>
                  <span className="text-teal text-xs font-medium mt-2 inline-flex items-center gap-1">Try it <span>&rarr;</span></span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Modules Tab ── */
function ModulesTab({ completedModules }: { completedModules: string[] }) {
  const doneCount = completedModules.length;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Modules</h1>
        <p className="text-navy/50 mt-1 text-sm">
          {doneCount}/{allModules.length} completed · Check off actions as you go
        </p>
      </div>
      <div className="space-y-3">
        {allModules.map((m) => {
          const done = completedModules.includes(m.slug);
          return (
            <Link key={m.slug} href={`/modules/${m.slug}`} className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-teal/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${done ? "bg-teal" : "border-2 border-gray-200"}`}>
                  {done && <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${done ? "text-navy/50 line-through" : "text-navy group-hover:text-teal"} transition-colors`}>{m.title}</p>
                  <p className="text-xs text-navy/40">{m.category} · {m.timeEstimate} · {m.checklist.length} actions</p>
                </div>
              </div>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/20 group-hover:text-teal flex-shrink-0 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Guides Tab ── */
function GuidesTab({ slugs, assessment }: { slugs: string[]; assessment: AssessmentRow }) {
  const whyRecommended: Record<string, string> = {
    "understanding-nz-schools": assessment.first_gen
      ? "Recommended because you're first in your family to navigate the NZ school system"
      : "Covers the fundamentals of how NZ schools work",
    "ncea-vs-cambridge-vs-ib": "Helps you understand the qualification pathway you're on",
    "how-to-get-into-university": "Key guide for getting into a NZ university",
    "scholarship-guide": "Don't miss out on funding — many scholarships go unclaimed",
    "your-rights-and-support": "Know what support you're entitled to",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Guides for You</h1>
        <p className="text-navy/50 mt-1 text-sm">Personalised recommendations based on your assessment</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {slugs.map((slug) => {
          const g = guideMeta[slug];
          if (!g) return null;
          return (
            <Link key={slug} href={`/guides/${slug}`} className="group">
              <Card className="h-full p-6 overflow-hidden">
                <div className="h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r from-teal to-teal-400" />
                <p className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-3">{g.category}</p>
                <h3 className="font-semibold text-navy group-hover:text-teal transition-colors mb-1">{g.title}</h3>
                <p className="text-navy/60 text-sm">{g.description}</p>
                {whyRecommended[slug] && (
                  <p className="text-xs text-gold-700 bg-gold-50 px-3 py-1.5 rounded-lg mt-3 italic">
                    {whyRecommended[slug]}
                  </p>
                )}
                <p className="text-navy/30 text-xs mt-3">{g.readTime}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Settings Tab ── */
function SettingsTab({
  name,
  email,
  userType,
  signOut,
  showDeleteConfirm,
  setShowDeleteConfirm,
}: {
  name: string;
  email: string;
  userType: string;
  signOut: () => Promise<void>;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (v: boolean) => void;
}) {
  const typeLabels: Record<string, string> = { student: "Student", parent: "Parent", family: "Family Member" };

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Settings</h1>
        <p className="text-navy/50 mt-1 text-sm">Manage your account</p>
      </div>

      <Card hover={false} className="p-6">
        <h3 className="text-sm font-semibold text-navy/40 uppercase tracking-wider mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-navy/40 mb-1">Full Name</label>
            <p className="font-medium text-navy">{name || "—"}</p>
          </div>
          <div>
            <label className="block text-xs text-navy/40 mb-1">Email</label>
            <p className="font-medium text-navy">{email}</p>
          </div>
          <div>
            <label className="block text-xs text-navy/40 mb-1">Account Type</label>
            <p className="font-medium text-navy">{typeLabels[userType] || userType}</p>
          </div>
        </div>
      </Card>

      <Card hover={false} className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-navy/40 uppercase tracking-wider">Actions</h3>
        <div className="space-y-3">
          <Link
            href="/assessment"
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal-50/30 transition-all text-sm font-medium text-navy"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
            Retake Assessment
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-coral/30 hover:bg-coral-50/30 transition-all text-sm font-medium text-coral"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Sign Out
          </button>
        </div>
      </Card>

      <div className="pt-4 border-t border-gray-100">
        {showDeleteConfirm ? (
          <Card hover={false} className="p-6 border-coral/20 bg-coral-50/30">
            <p className="text-sm font-semibold text-coral mb-2">Are you sure?</p>
            <p className="text-xs text-navy/60 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-xl bg-coral text-white text-sm font-medium hover:bg-coral-600 transition-colors">
                Delete My Account
              </button>
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs text-navy/30 hover:text-coral transition-colors"
          >
            Delete my account
          </button>
        )}
      </div>
    </div>
  );
}
