"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { contentAr } from "@/content/ar";
import { contentEn } from "@/content/en";

export type Locale = "ar" | "en";

interface LanguageContextType {
  locale: Locale;
  isRtl: boolean;
  content: typeof contentAr;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ck_preferred_locale") as Locale | null;
      if (saved === "ar" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const applyLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("ck_preferred_locale", newLocale);
      document.cookie = `ck_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage unavailable
    }
  };

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      applyLocale(newLocale);
    });
  };

  const toggleLocale = () => {
    const next = locale === "ar" ? "en" : "ar";
    setLocale(next);
  };

  const isRtl = locale === "ar";
  const content = locale === "ar" ? contentAr : contentEn;

  return (
    <LanguageContext.Provider value={{ locale, isRtl, content, toggleLocale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}