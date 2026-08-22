import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '', compact = false }) => {
  const { language, setLanguage } = useLanguage();
  const { isDay } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const currentFlag = language === 'pt' ? '🇧🇷' : '🇺🇸';
  const currentLabel = language === 'pt' ? 'PT' : 'EN';
  const fullLabel = language === 'pt' ? 'Português' : 'English';

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center space-x-1.5 border rounded-lg px-2 py-1 text-xs font-cinzel font-bold transition-all active:scale-95 ${
          isDay
            ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/20'
            : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 shadow-[0_0_8px_rgba(212,175,55,0.2)]'
        } ${className}`}
        title={`Idioma / Language: ${fullLabel}`}
      >
        <span className="text-sm leading-none select-none">{currentFlag}</span>
        <span className="text-[10px] tracking-wider uppercase">{currentLabel}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 border rounded-xl px-3 py-1.5 text-xs font-cinzel font-bold tracking-wider transition-all active:scale-95 ${
        isDay
          ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/20'
          : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
      } ${className}`}
      title={`Idioma / Language: ${fullLabel}`}
    >
      <span className="text-base leading-none select-none">{currentFlag}</span>
      <span>{fullLabel}</span>
    </button>
  );
};
