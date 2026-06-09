"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Dictionary } from "@/locales/types";
import { en as enDict } from "@/locales/en";
import { zh as zhDict } from "@/locales/zh";

export type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: {
    <R>(selector: (dict: Dictionary) => R): R;
    <T extends React.ReactNode>(en: T, zh: T): T;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");

  // Keep HTML lang attribute in sync with state
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = ((arg1: any, arg2?: any): any => {
    if (typeof arg1 === "function") {
      const dict = language === "en" ? enDict : zhDict;
      return arg1(dict);
    }
    return language === "en" ? arg1 : arg2;
  }) as {
    <R>(selector: (dict: Dictionary) => R): R;
    <T extends React.ReactNode>(en: T, zh: T): T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
