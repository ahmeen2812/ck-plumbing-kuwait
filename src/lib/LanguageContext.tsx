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

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale = "ar",
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [, startTransition] = useTransition();

  const applyLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `ck_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("ck_preferred_locale", newLocale);
    } catch {
      // Storage unavailable or disabled
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

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

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