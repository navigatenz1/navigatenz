"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Compass,
  Rocket,
  Target,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  LogOut,
  Pencil,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import WeeklyFocusCard from "@/components/dashboard/WeeklyFocusCard";
import KeyDateItem from "@/components/dashboard/KeyDateItem";
import PathwayTimeline from "@/components/dashboard/PathwayTimeline";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileTabBar from "@/components/dashboard/MobileTabBar";
import OnTrackChecker from "@/components/dashboard/OnTrackChecker";
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

function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return "You're up late";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function moduleIcon(category: string) {
  return category === "Preparing for University" ? Rocket : Compass;
}

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

  useEffect(() => {
    if (!authLoading && !user) router.push("/auth/signin");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    Promise.all([
      supabase.from("assessments").select("*").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(1),
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("module_progress").select("module_slug").eq("user_id", user.id).eq("completed", true),
      supabase.from("bookmarks").select("guide_slug").eq("user_id", user.id),
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
      <div className="min-h-screen flex items-center justify-center bg-soft">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const firstName = (profileName || user.email?.split("@")[0] || "there").split(" ")[0];
  const milestones = assessment ? getPathwayMilestones(assessment.year_level) : [];
  const progress = getPathwayProgress(milestones);
  const recommendedSlugs = assessment ? getRecommendedGuides(assessment.year_level, assessment.first_gen) : [];

  return (
    <div className="min-h-screen bg-soft overflow-x-hidden">
      <div className="flex">
        <Sidebar
          active={tab}
          onSelect={setTab}
          profileName={profileName}
          profileEmail={profileEmail}
          modulesDone={completedModules.length}
          modulesTotal={allModules.length}
          onSignOut={signOut}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 pb-28 lg:pb-10 max-w-full lg:max-w-[calc(100vw-16rem)]">
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
                  recommendedSlugs={recommendedSlugs}
                  progress={progress}
                  completedModules={completedModules}
                  bookmarkedSlugs={bookmarkedSlugs}
                />
              )}
              {tab === "pathway" && <PathwayTab milestones={milestones} progress={progress} assessment={assessment} />}
              {tab === "guides" && <GuidesTab slugs={recommendedSlugs} assessment={assessment} />}
              {tab === "modules" && <ModulesTab completedModules={completedModules} />}
              {tab === "universities" && <UniversitiesTab preferredUnis={assessment?.preferred_universities || []} />}
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

      <MobileTabBar active={tab} onSelect={setTab} />

      {assessment && (
        <OnTrackChecker
          milestones={milestones}
          modulesDone={completedModules.length}
          hasUrgentDate={false}
        />
      )}
    </div>
  );
}

/* ── Loading + empty states ── */

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true">
      <div className="h-40 bg-navy/10 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 h-32 bg-white rounded-2xl" />
        <div className="h-40 bg-white rounded-2xl" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-white rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function NoAssessment() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <Target size={40} strokeWidth={1.5} className="text-teal" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-navy mb-3">You haven&apos;t taken the assessment yet</h2>
        <p className="text-navy/60 mb-8">Take our quick assessment so we can personalise your pathway to university.</p>
        <Button href="/assessment" size="lg">Take the Assessment</Button>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function getKeyDates(yearLevel: string) {
  const now = new Date();
  const year = now.getFullYear();
  const dates: { label: string; date: Date }[] = [];

  if (["year-12", "year-13", "finished"].includes(yearLevel)) {
    dates.push({ label: "Scholarship applications open", date: new Date(year, 7, 1) });
    dates.push({ label: "University applications open", date: new Date(year, 7, 15) });
  }
  if (["year-13"].includes(yearLevel)) {
    dates.push({ label: "NCEA external exams begin", date: new Date(year, 10, 1) });
    dates.push({ label: "University application deadline", date: new Date(year, 11, 1) });
  }

  return dates
    .map((d) => ({
      ...d,
      daysAway: Math.ceil((d.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .filter((d) => d.daysAway > -7)
    .sort((a, b) => a.daysAway - b.daysAway);
}

/* ── Overview Tab ── */

function OverviewTab({
  firstName,
  assessment,
  milestones,
  recommendedSlugs,
  progress,
  completedModules,
  bookmarkedSlugs,
}: {
  firstName: string;
  assessment: AssessmentRow;
  milestones: Milestone[];
  recommendedSlugs: string[];
  progress: number;
  completedModules: string[];
  bookmarkedSlugs: string[];
}) {
  const totalModules = allModules.length;
  const doneCount = completedModules.length;
  const nextModules = allModules.filter((m) => !completedModules.includes(m.slug));
  const weeklyFocus = nextModules[0];
  const hasUrgent = milestones.some((m) => m.status === "urgent");
  const overallProgress = Math.round(((doneCount / totalModules) * 50 + (progress / 100) * 50));
  const keyDates = getKeyDates(assessment.year_level);

  return (
    <div className="space-y-8">
      {/* 1. Profile / Your Position — top */}
      <ProfileCard
        firstName={firstName}
        yearLabel={getYearLabel(assessment.year_level)}
        qualLabel={getQualLabel(assessment.qualification_pathway)}
        firstGen={assessment.first_gen}
        preferredUniversities={assessment.preferred_universities}
        qualificationPathway={assessment.qualification_pathway}
        greeting={getGreeting()}
      />

      {/* 2. Focus + Progress ring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {weeklyFocus ? (
            <WeeklyFocusCard
              title={weeklyFocus.title}
              description={weeklyFocus.description}
              href={`/modules/${weeklyFocus.slug}`}
              icon={moduleIcon(weeklyFocus.category)}
              timeEstimate={weeklyFocus.timeEstimate}
              urgency={hasUrgent ? "urgent" : "suggestion"}
              meta={`${weeklyFocus.checklist.length} actions`}
            />
          ) : (
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} strokeWidth={1.75} className="text-teal" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-navy">All modules complete — ka pai!</p>
                <p className="text-sm text-navy/60 mt-0.5">Check the guides or tools for what&apos;s next.</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-3">
            Overall progress
          </p>
          <ProgressRing percent={overallProgress} size={140} stroke={12} subLabel="complete" />
          <p className="text-xs text-navy/50 mt-4">
            {doneCount}/{totalModules} modules
            {" · "}
            <span className="text-teal font-medium">Assessment <span aria-hidden="true">✓</span></span>
          </p>
        </div>
      </div>

      {/* 3. Key dates */}
      {keyDates.length > 0 && (
        <section aria-labelledby="key-dates-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="key-dates-heading" className="text-lg font-bold text-navy">Key dates</h2>
            <Link
              href="/tools/key-dates"
              className="text-xs text-teal font-medium hover:text-teal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
            >
              Full timeline
            </Link>
          </div>
          <div className="space-y-2.5">
            {keyDates.map((d) => (
              <KeyDateItem key={d.label} label={d.label} date={d.date} daysAway={d.daysAway} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Your pathway */}
      <section aria-labelledby="pathway-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="pathway-heading" className="text-lg font-bold text-navy">Your pathway</h2>
          <span className="text-sm font-semibold text-teal tabular-nums">{progress}% complete</span>
        </div>
        <PathwayTimeline milestones={milestones} />
      </section>

      {/* 5. Saved guides */}
      {bookmarkedSlugs.length > 0 && (
        <section aria-labelledby="saved-heading">
          <h2 id="saved-heading" className="text-lg font-bold text-navy mb-4">Your saved guides</h2>
          <div className="space-y-2">
            {bookmarkedSlugs.map((slug) => {
              const g = guideMeta[slug];
              if (!g) return null;
              return (
                <Link
                  key={slug}
                  href={`/guides/${slug}`}
                  className="group flex items-center justify-between rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  <span className="text-sm font-medium text-navy group-hover:text-teal transition-colors truncate">
                    {g.title}
                  </span>
                  <ArrowRight size={14} className="text-navy/20 group-hover:text-teal flex-shrink-0 ml-3 transition-all group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Got a question? */}
      <section aria-labelledby="qa-cta-heading">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-gold-50 border border-teal-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 id="qa-cta-heading" className="text-lg font-bold text-navy">Got a question?</h2>
              <p className="mt-1 text-sm text-navy/70 leading-relaxed">
                Ask anonymously on our community board. No real name, no email — our team and volunteers answer.
              </p>
            </div>
            <Link
              href="/ask"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-teal text-white px-5 py-2.5 text-sm font-semibold hover:bg-teal-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              Ask a question
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Quick tools */}
      <section aria-labelledby="quick-tools-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="quick-tools-heading" className="text-lg font-bold text-navy">Quick tools</h2>
          <Link href="/tools" className="text-xs text-teal font-medium hover:text-teal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dashboardTools.slice(0, 4).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 rounded-2xl bg-white border border-gray-100 shadow-sm p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <span className="text-xl flex-shrink-0" aria-hidden="true">{tool.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy group-hover:text-teal transition-colors truncate">{tool.title}</p>
                <p className="text-xs text-navy/40 truncate">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Recommended guides */}
      {recommendedSlugs.length > 0 && (
        <section aria-labelledby="recommended-heading">
          <h2 id="recommended-heading" className="text-lg font-bold text-navy mb-4">Recommended guides</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {recommendedSlugs.map((slug) => {
              const g = guideMeta[slug];
              if (!g) return null;
              return (
                <Link
                  key={slug}
                  href={`/guides/${slug}`}
                  className="group flex-shrink-0 w-[260px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-2xl"
                >
                  <Card className="h-full p-5 overflow-hidden">
                    <div className="h-1 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-teal to-teal-400" aria-hidden="true" />
                    <p className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-2">
                      {g.category}
                    </p>
                    <h3 className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-navy/50 text-xs mt-1 line-clamp-2">{g.description}</p>
                    <p className="text-navy/30 text-xs mt-2">{g.readTime}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

/* ── Pathway Tab ── */

function PathwayTab({ milestones, progress, assessment }: { milestones: Milestone[]; progress: number; assessment: AssessmentRow }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">My pathway</h1>
        <p className="text-navy/50 mt-1 text-sm">
          Your roadmap as a {getYearLabel(assessment.year_level)} student studying {getQualLabel(assessment.qualification_pathway)}
        </p>
      </header>

      <Card hover={false} className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-navy">Overall progress</span>
          <span className="text-sm font-bold text-teal tabular-nums">{progress}%</span>
        </div>
        <div
          className="h-3 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Pathway progress"
        >
          <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-navy/40 mt-2">Progress updates as you complete steps and track milestones</p>
      </Card>

      <PathwayTimeline milestones={milestones} />
    </div>
  );
}

/* ── Tools, Modules, Universities, Guides, Settings ── */

const dashboardTools = [
  { href: "/tools/cost-calculator", icon: "💰", title: "Cost Calculator", desc: "Estimate total uni cost" },
  { href: "/tools/career-pathways", icon: "🧭", title: "Career Pathways", desc: "Subjects → NZ careers" },
  { href: "/tools/credit-calculator", icon: "🧮", title: "Credit Calculator", desc: "Check if you're on track" },
  { href: "/tools/university-matcher", icon: "🎓", title: "University Matcher", desc: "Find your best-fit NZ uni" },
  { href: "/tools/living-costs", icon: "🏠", title: "Hall vs Flatting", desc: "Compare living costs" },
  { href: "/tools/scholarship-finder", icon: "🔍", title: "Scholarship Finder", desc: "Search NZ scholarships" },
  { href: "/tools/key-dates", icon: "📅", title: "Key Dates", desc: "Never miss a deadline" },
  { href: "/tools/personal-statement", icon: "✍️", title: "Personal Statement", desc: "Write yours step by step" },
];

function ToolsTab() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Your tools</h1>
        <p className="text-navy/50 mt-1 text-sm">Free interactive tools to help you plan and prepare</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dashboardTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-2xl"
          >
            <Card accent className="p-5 h-full">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{tool.icon}</span>
                <div>
                  <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">{tool.title}</p>
                  <p className="text-xs text-navy/50 mt-0.5">{tool.desc}</p>
                  <span className="text-teal text-xs font-medium mt-2 inline-flex items-center gap-1">
                    Try it <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ModulesTab({ completedModules }: { completedModules: string[] }) {
  const doneCount = completedModules.length;
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Modules</h1>
        <p className="text-navy/50 mt-1 text-sm">
          {doneCount}/{allModules.length} completed · Check off actions as you go
        </p>
      </header>
      <ul className="space-y-3">
        {allModules.map((m) => {
          const done = completedModules.includes(m.slug);
          return (
            <li key={m.slug}>
              <Link
                href={`/modules/${m.slug}`}
                className="group flex items-center justify-between rounded-2xl bg-white border border-gray-100 shadow-sm p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {done ? (
                    <CheckCircle2 size={22} className="text-teal flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <Circle size={22} strokeWidth={1.5} className="text-navy/20 flex-shrink-0" aria-hidden="true" />
                  )}
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${done ? "text-navy/50 line-through" : "text-navy group-hover:text-teal"} transition-colors`}>
                      {m.title}
                    </p>
                    <p className="text-xs text-navy/40">{m.category} · {m.timeEstimate} · {m.checklist.length} actions</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-navy/20 group-hover:text-teal flex-shrink-0 ml-2 transition-all group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UniversitiesTab({ preferredUnis }: { preferredUnis: string[] }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">NZ Universities</h1>
        <p className="text-navy/50 mt-1 text-sm">All 8 NZ universities at a glance</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {allUnis.map((uni) => {
          const isPref = preferredUnis.includes(uni.name);
          return (
            <Card key={uni.name} hover={false} className={`p-0 overflow-hidden ${isPref ? "border-l-4 border-l-gold" : ""}`}>
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                <Image src={uni.image} alt={`${uni.city} cityscape`} width={400} height={128} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: uni.color }}
                    aria-hidden="true"
                  >
                    {uni.abbr.slice(0, 3)}
                  </span>
                  <span className="text-white font-bold text-sm drop-shadow">{uni.name}</span>
                </div>
                {isPref && (
                  <span className="absolute top-3 right-3 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Your pick
                  </span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-navy/50 flex-wrap">
                  <span>{uni.city}</span>
                  <span aria-hidden="true">·</span>
                  <span>{uni.students} students</span>
                  <span aria-hidden="true">·</span>
                  <span>{uni.livingCost}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {uni.knownFor.map((tag) => (
                    <span key={tag} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-navy/40">{uni.ranking}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal text-xs font-medium hover:text-teal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
                  >
                    Visit website &rarr;
                  </a>
                  <Link href="/tools/credit-calculator" className="text-xs text-navy/40 hover:text-navy transition-colors">
                    Check requirements &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="text-center pt-4">
        <Button href="/tools/university-matcher" variant="outline" size="sm">
          Not sure which? Try the University Matcher
        </Button>
      </div>
    </div>
  );
}

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
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Guides for you</h1>
        <p className="text-navy/50 mt-1 text-sm">Personalised recommendations based on your assessment</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {slugs.map((slug) => {
          const g = guideMeta[slug];
          if (!g) return null;
          return (
            <Link
              key={slug}
              href={`/guides/${slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="h-full p-6 overflow-hidden">
                <div className="h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r from-teal to-teal-400" aria-hidden="true" />
                <p className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-3">
                  {g.category}
                </p>
                <h3 className="font-semibold text-navy group-hover:text-teal transition-colors mb-1">
                  {g.title}
                </h3>
                <p className="text-navy/60 text-sm">{g.description}</p>
                {whyRecommended[slug] && (
                  <p className="text-xs text-gold-800 bg-gold-50 px-3 py-1.5 rounded-lg mt-3 italic">
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
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Settings</h1>
        <p className="text-navy/50 mt-1 text-sm">Manage your account</p>
      </header>

      <Card hover={false} className="p-6">
        <h3 className="text-sm font-semibold text-navy/40 uppercase tracking-wider mb-4">Profile</h3>
        <dl className="space-y-4">
          <div>
            <dt className="block text-xs text-navy/40 mb-1">Full Name</dt>
            <dd className="font-medium text-navy">{name || "—"}</dd>
          </div>
          <div>
            <dt className="block text-xs text-navy/40 mb-1">Email</dt>
            <dd className="font-medium text-navy">{email}</dd>
          </div>
          <div>
            <dt className="block text-xs text-navy/40 mb-1">Account Type</dt>
            <dd className="font-medium text-navy">{typeLabels[userType] || userType}</dd>
          </div>
        </dl>
      </Card>

      <Card hover={false} className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-navy/40 uppercase tracking-wider">Actions</h3>
        <div className="space-y-3">
          <Link
            href="/assessment"
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal-50/30 transition-all text-sm font-medium text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <Pencil size={18} strokeWidth={1.5} className="text-teal" aria-hidden="true" />
            Retake Assessment
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-coral/30 hover:bg-coral-50/30 transition-all text-sm font-medium text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            <LogOut size={18} strokeWidth={1.5} aria-hidden="true" />
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
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-coral text-white text-sm font-medium hover:bg-coral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              >
                Delete My Account
              </button>
            </div>
          </Card>
        ) : (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs text-navy/30 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded"
          >
            Delete my account
          </button>
        )}
      </div>
    </div>
  );
}

