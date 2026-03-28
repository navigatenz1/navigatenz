"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = locales[locale];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-navy/60 hover:text-navy transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
        aria-label="Change language"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.729-3.56" /></svg>
        <span className="hidden sm:inline">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          {(Object.entries(locales) as [string, { flag: string; name: string }][]).map(
            ([key, { flag, name }]) => (
              <button
                key={key}
                onClick={() => { setLocale(key as "en" | "hi" | "zh"); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  locale === key ? "text-teal bg-teal-50 font-medium" : "text-navy/70 hover:bg-gray-50"
                }`}
              >
                <span>{flag}</span>
                <span>{name}</span>
                {locale === key && (
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="ml-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                )}
              </button>
            )
          )}
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-[10px] text-navy/30">{t.language.switchNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
