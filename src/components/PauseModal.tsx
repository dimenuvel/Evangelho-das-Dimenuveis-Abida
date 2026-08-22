import React from 'react';
import { Play, RotateCcw, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface PauseModalProps {
  onResume: () => void;
  onRestartTurn: () => void;
  onReturnToMenu: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  vibrationEnabled?: boolean;
  onToggleVibration?: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestartTurn,
  onReturnToMenu
}) => {
  const { t } = useLanguage();
  const { isDay } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl select-none transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/80' : 'bg-[#0d0907]/90'
      }`}
    >
      <div
        className={`relative w-full max-w-xs rounded-2xl border-2 p-6 flex flex-col space-y-4 text-center transition-all ${
          isDay
            ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_50px_rgba(184,134,11,0.2)]'
            : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.25)]'
        }`}
      >
        <h2
          className={`text-sm font-cinzel font-bold tracking-[0.25em] uppercase ${
            isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
          }`}
        >
          {t.pausedTitle}
        </h2>

        <p className={`text-xs font-serif italic ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
          {t.pausedQuote}
        </p>

        <div className="flex flex-col space-y-2 pt-2">
          <button
            onClick={onResume}
            className={`flex items-center justify-center space-x-2 py-3 font-cinzel font-bold text-xs uppercase tracking-[0.25em] rounded-xl hover:opacity-90 transition-all ${
              isDay
                ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                : 'bg-gradient-to-r from-[#d4af37] to-[#f5deb3] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.resumeTurn}</span>
          </button>

          <button
            onClick={onRestartTurn}
            className={`flex items-center justify-center space-x-2 py-2.5 border font-serif font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.restartTurn}</span>
          </button>

          <button
            onClick={onReturnToMenu}
            className={`flex items-center justify-center space-x-2 py-2.5 border font-serif font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.mainMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
