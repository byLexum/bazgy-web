"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Language } from "./dictionaries";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof dictionaries)["tr"];
};

type SchedulableProject = {
  detail?: {
    employer?: string;
    duration?: string;
    startDate?: string;
  };
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "baz-language";
const IDTM_EMPLOYER = "İstanbul Dünya Ticaret Merkezi A.Ş.";

function applyIdtmSchedule(
  projects: SchedulableProject[],
  duration: string,
  startDate: string
) {
  const idtm = projects.find((project) =>
    project.detail?.employer?.startsWith(IDTM_EMPLOYER)
  );

  if (!idtm?.detail) return;

  idtm.detail.duration = duration;
  idtm.detail.startDate = startDate;
}

applyIdtmSchedule(dictionaries.tr.projects.items, "365 Gün", "Kasım 2026");
applyIdtmSchedule(dictionaries.en.projects.items, "365 Days", "November 2026");

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "tr" || stored === "en") {
        setLanguageState(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  };

  const toggleLanguage = () => setLanguage(language === "tr" ? "en" : "tr");

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: dictionaries[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
