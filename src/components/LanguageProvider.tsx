"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { Language, translations } from '../lib/translations';



interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}



const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('fifa-lang') as Language;
    if (savedLang && ['en', 'es', 'fr', 'hi', 'bn', 'ja', 'zh', 'pt', 'de', 'ko', 'sv', 'no', 'da', 'fi'].includes(savedLang)) {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
    } else {
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fifa-lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    if (!mounted) return translations['en'][key] || key; // Default to English during SSR
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
