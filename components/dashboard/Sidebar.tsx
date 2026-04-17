"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Route,
  CheckSquare,
  GraduationCap,
  Wrench,
  BookOpen,
  Settings,
  LogOut,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "pathway", label: "My Pathway", icon: Route },
  { id: "modules", label: "Modules", icon: CheckSquare },
  { id: "universities", label: "Universities", icon: GraduationCap },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "guides", label: "Guides for You", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
  profileName: string;
  profileEmail: string;
  modulesDone: number;
  modulesTotal: number;
  onSignOut: () => Promise<void>;
}

export default function Sidebar({
  active,
  onSelect,
  profileName,
  profileEmail,
  modulesDone,
  modulesTotal,
  onSignOut,
}: Props) {
  const router = useRouter();
  const firstInitial = (profileName || profileEmail || "U")[0]?.toUpperCase();

  return (
    <aside
      aria-label="Dashboard navigation"
      className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0"
    >
      {/* Profile block */}
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {firstInitial}
          </div>
          <div className="min-w-0">
            <p className="text-navy font-semibold text-sm truncate">{profileName || "Your account"}</p>
            <p className="text-navy/40 text-xs truncate">{profileEmail}</p>
          </div>
        </div>
      </div>

      <div className="mx-5 border-t border-gray-100" aria-hidden="true" />

      {/* Nav */}
      <nav aria-label="Primary" className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-current={isActive ? "page" : undefined}
              className={`group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-soft text-teal shadow-sm"
                  : "text-navy/60 hover:text-navy hover:bg-soft/60"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="flex-1 text-left">{label}</span>
              {id === "modules" && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                    isActive ? "bg-white text-teal" : "bg-gray-100 text-navy/50"
                  }`}
                  aria-label={`${modulesDone} of ${modulesTotal} modules complete`}
                >
                  {modulesDone}/{modulesTotal}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Help + Sign out footer */}
      <div className="p-3 border-t border-gray-100 space-y-0.5">
        <Link
          href="/guides"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-navy/50 hover:text-navy hover:bg-soft/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          <HelpCircle size={18} strokeWidth={1.75} aria-hidden="true" />
          Need help?
        </Link>
        <button
          type="button"
          onClick={async () => {
            await onSignOut();
            router.push("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-navy/50 hover:text-coral hover:bg-coral-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          <LogOut size={18} strokeWidth={1.75} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
