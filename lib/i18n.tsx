"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "@/messages/en.json";
import hi from "@/messages/hi.json";
import zh from "@/messages/zh.json";

type Messages = typeof en;
type Locale = "en" | "hi" | "zh";

const messages: Record<Locale, Messages> = { en, hi, zh };

const localeLabels: Record<Locale, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "English" },
  hi: { flag: "🇮🇳", name: "हिन्दी" },
  zh: { flag: "🇨🇳", name: "中文" },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
  locales: typeof localeLabels;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
  locales: localeLabels,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("navigatenz-lang") as Locale | null;
    if (saved && messages[saved]) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("navigatenz-lang", l);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: messages[locale], locales: localeLabels }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
