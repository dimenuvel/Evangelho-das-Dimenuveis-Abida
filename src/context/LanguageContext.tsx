import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Language, TranslationSchema, translations } from '../i18n/translations';
import { getTurnsConfig, getCutscene } from '../data/turns';
import { TurnConfig, Cutscene } from '../types/game';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  turnsConfig: Record<number, TurnConfig>;
  getCutsceneForTurn: (turnId: number) => Cutscene | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = 'abide_game_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'pt') {
        return saved;
      }
      const navLang = navigator.language || '';
      if (navLang.startsWith('pt')) {
        return 'pt';
      }
    } catch {
      // Fallback to English
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useMemo(() => translations[language] || translations.en, [language]);
  const turnsConfig = useMemo(() => getTurnsConfig(language), [language]);

  const getCutsceneForTurn = useCallback((turnId: number) => {
    return getCutscene(turnId, language);
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    turnsConfig,
    getCutsceneForTurn
  }), [language, setLanguage, t, turnsConfig, getCutsceneForTurn]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
