"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Route,
  CheckSquare,
  Wrench,
  MoreHorizontal,
  GraduationCap,
  BookOpen,
  Settings,
  X,
} from "lucide-react";

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

const primary = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "pathway", label: "Pathway", icon: Route },
  { id: "modules", label: "Modules", icon: CheckSquare },
  { id: "tools", label: "Tools", icon: Wrench },
];

const overflow = [
  { id: "universities", label: "Universities", icon: GraduationCap },
  { id: "guides", label: "Guides for You", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileTabBar({ active, onSelect }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const overflowActive = overflow.some((o) => o.id === active);

  return (
    <>
      <nav
        aria-label="Dashboard sections"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_-4px_rgba(27,42,74,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {primary.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:bg-soft ${
                    isActive ? "text-teal" : "text-navy/50"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
                  {label}
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-haspopup="menu"
              aria-expanded={sheetOpen}
              className={`w-full flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:bg-soft ${
                overflowActive ? "text-teal" : "text-navy/50"
              }`}
            >
              <MoreHorizontal size={20} strokeWidth={overflowActive ? 2.25 : 1.75} aria-hidden="true" />
              More
            </button>
          </li>
        </ul>
      </nav>

      {sheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="More sections"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            ref={sheetRef}
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl p-4 shadow-xl animate-fade-in-up"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-navy">More</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
                className="p-2 rounded-lg text-navy/50 hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <ul className="space-y-1">
              {overflow.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(id);
                        setSheetOpen(false);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                        isActive ? "bg-soft text-teal" : "text-navy/70 hover:bg-soft"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
