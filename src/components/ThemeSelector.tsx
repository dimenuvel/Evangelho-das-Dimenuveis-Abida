import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeSelectorProps {
  className?: string;
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '', compact = false }) => {
  const { toggleTheme, isDay } = useTheme();
  const { t } = useLanguage();
  const currentLabel = isDay ? t.dayTheme : t.nightTheme;

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center space-x-1.5 border rounded-lg px-2 py-1 text-xs font-cinzel font-bold transition-all active:scale-95 ${
          isDay
            ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/20'
            : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 shadow-[0_0_8px_rgba(212,175,55,0.2)]'
        } ${className}`}
        title={`${t.themeMode}: ${currentLabel}`}
      >
        {isDay ? (
          <Sun className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
        )}
        <span className="text-[10px] tracking-wider uppercase">{currentLabel}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center space-x-2 border rounded-xl px-3 py-1.5 text-xs font-cinzel font-bold tracking-wider transition-all active:scale-95 ${
        isDay
          ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/20'
          : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
      } ${className}`}
      title={`${t.themeMode}: ${currentLabel}`}
    >
      {isDay ? (
        <Sun className="w-4 h-4 text-[#b8860b] shrink-0" />
      ) : (
        <Moon className="w-4 h-4 text-[#d4af37] shrink-0" />
      )}
      <span>{currentLabel}</span>
    </button>
  );
};
