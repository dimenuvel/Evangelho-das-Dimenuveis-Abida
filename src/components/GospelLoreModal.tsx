import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface GospelLoreModalProps {
  onClose: () => void;
}

export const GospelLoreModal: React.FC<GospelLoreModalProps> = ({ onClose }) => {
  const { t, turnsConfig } = useLanguage();
  const { isDay } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl select-none overflow-y-auto transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`relative w-full max-w-xl max-h-[85vh] rounded-2xl border-2 p-6 flex flex-col space-y-5 overflow-y-auto transition-all ${
          isDay
            ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_60px_rgba(184,134,11,0.2)]'
            : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_60px_rgba(212,175,55,0.25)]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b pb-3 shrink-0 ${
            isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
          }`}
        >
          <div className={`flex items-center space-x-2 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
            <BookOpen className="w-5 h-5" />
            <h2 className="text-sm font-cinzel font-bold tracking-[0.25em] uppercase">{t.gospelTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full border transition-all ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#8c6508] hover:bg-[#b8860b]/20'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Doctrine */}
        <div className={`space-y-3 text-xs font-serif leading-relaxed ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]/90'}`}>
          <div
            className={`p-3 border rounded-xl italic font-medium text-center ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/40 text-[#8c6508]'
                : 'bg-[#1a140f] border-[#d4af37]/40 text-[#d4af37]'
            }`}
          >
            {t.gospelCoreQuote}
          </div>

          <p>{t.gospelIntro}</p>

          {/* 10 Dimenuous List */}
          <div className="space-y-2 pt-2">
            <span
              className={`text-[10px] font-serif font-bold uppercase tracking-[0.25em] block ${
                isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
              }`}
            >
              {t.sevenLayersTitle}
            </span>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(turnsConfig).map(turn => (
                <div
                  key={turn.id}
                  className={`p-2.5 border rounded-xl ${
                    isDay ? 'bg-[#ede4d4] border-[#b8860b]/20' : 'bg-[#1a140f] border-[#d4af37]/20'
                  }`}
                >
                  <span className={`font-cinzel font-bold block text-[11px] ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
                    {turn.subtitle} — {turn.title} ({turn.layer})
                  </span>
                  <span className={`text-[11px] font-serif ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
                    {turn.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Symbols */}
          <div className="pt-2 space-y-2">
            <span
              className={`text-[10px] font-serif font-bold uppercase tracking-[0.25em] block ${
                isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
              }`}
            >
              {t.sacredSymbolsTitle}
            </span>

            <div
              className={`p-3 border rounded-xl space-y-2 text-[11px] ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/30 text-[#2c2017]'
                  : 'bg-[#1a140f]/90 border-[#d4af37]/30 text-[#f5deb3]/80'
              }`}
            >
              <p>
                <strong className={`font-cinzel ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
                  {t.symbolRugTitle}:
                </strong>{' '}
                {t.symbolRugDesc}
              </p>
              <p>
                <strong className={`font-cinzel ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
                  {t.symbolBallTitle}:
                </strong>{' '}
                {t.symbolBallDesc}
              </p>
              <p>
                <strong className={`font-cinzel ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
                  {t.symbolVowelsTitle}:
                </strong>{' '}
                {t.symbolVowelsDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-3 text-center shrink-0 border-t ${isDay ? 'border-[#b8860b]/20' : 'border-[#d4af37]/20'}`}>
          <button
            onClick={onClose}
            className={`px-6 py-2.5 font-cinzel font-bold text-xs uppercase tracking-[0.25em] rounded-xl hover:opacity-90 transition-all ${
              isDay
                ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                : 'bg-gradient-to-r from-[#d4af37] to-[#f5deb3] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            {t.understoodAndAbide}
          </button>
        </div>
      </div>
    </div>
  );
};
