import React, { useState } from 'react';
import { Cutscene } from '../types/game';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface DudeCutsceneProps {
  cutscene: Cutscene;
  onComplete: () => void;
}

export const DudeCutscene: React.FC<DudeCutsceneProps> = ({ cutscene, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const { t, getCutsceneForTurn } = useLanguage();
  const { isDay } = useTheme();

  const localizedCutscene = getCutsceneForTurn(cutscene.turnId) || cutscene;
  const currentLine = localizedCutscene.lines[currentLineIndex] || cutscene.lines[currentLineIndex];

  const handleNext = () => {
    if (currentLineIndex < localizedCutscene.lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const isDude = currentLine.speaker === 'THE DUDE';
  const isDisciple = currentLine.speaker === 'DISCIPLE';
  const isStranger = currentLine.speaker === 'THE STRANGER';

  const getSpeakerDisplayName = (speaker: string) => {
    if (speaker === 'THE DUDE') return t.speakerDude;
    if (speaker === 'DISCIPLE') return t.speakerDisciple;
    if (speaker === 'THE STRANGER') return t.speakerStranger;
    return speaker;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl select-none transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`relative w-full max-w-lg rounded-2xl border-2 p-6 flex flex-col space-y-6 transition-all ${
          isDay
            ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_50px_rgba(184,134,11,0.2)]'
            : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.25)]'
        }`}
      >
        {/* Header Badge */}
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Sparkles className={`w-4 h-4 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
            <span
              className={`text-xs font-cinzel font-bold uppercase tracking-[0.25em] ${
                isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
              }`}
            >
              {t.reflectionsTitle}
            </span>
          </div>
          <span className={`text-xs font-mono ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'}`}>
            {currentLineIndex + 1} / {localizedCutscene.lines.length}
          </span>
        </div>

        {/* Character Portrait & Dialogue Box */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 min-h-[160px]">
          {/* Avatar Graphic */}
          <div
            className={`relative shrink-0 w-24 h-24 rounded-2xl border-2 p-2 flex items-center justify-center shadow-lg ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/40 text-[#2c2017]'
                : 'bg-[#1a140f] border-[#d4af37]/40 text-[#d4af37]'
            }`}
          >
            {isDude && (
              <div className="text-center">
                <span className="text-4xl filter contrast-125">🧔</span>
                <span
                  className={`block text-[9px] font-cinzel mt-1 uppercase font-bold tracking-widest ${
                    isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
                  }`}
                >
                  {t.speakerDude}
                </span>
              </div>
            )}
            {isDisciple && (
              <div className="text-center">
                <span className="text-4xl filter contrast-125">🧘</span>
                <span
                  className={`block text-[9px] font-cinzel mt-1 uppercase font-bold tracking-widest ${
                    isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]'
                  }`}
                >
                  {t.speakerDisciple}
                </span>
              </div>
            )}
            {isStranger && (
              <div className="text-center">
                <span className="text-4xl filter contrast-125 select-none animate-pulse">🌀</span>
                <span
                  className={`block text-[9px] font-cinzel mt-1 uppercase font-bold tracking-widest ${
                    isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
                  }`}
                >
                  {t.speakerStranger}
                </span>
              </div>
            )}
          </div>

          {/* Dialogue Text */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className={`text-xs font-cinzel font-bold tracking-[0.25em] uppercase mb-1 ${
                isDay ? 'text-[#b8860b]' : isDude ? 'text-[#d4af37]' : isDisciple ? 'text-[#f5deb3]' : 'text-[#d4af37]'
              }`}
            >
              {getSpeakerDisplayName(currentLine.speaker)}
            </span>
            <p className={`text-sm md:text-base font-serif leading-relaxed italic ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]/90'}`}>
              "{currentLine.text}"
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-5 py-2.5 font-cinzel font-bold text-xs uppercase tracking-[0.25em] rounded-xl hover:opacity-90 transition-all active:scale-95 ${
              isDay
                ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                : 'bg-gradient-to-r from-[#d4af37] to-[#f5deb3] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            <span>{currentLineIndex === localizedCutscene.lines.length - 1 ? t.abideAndContinue : t.next}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
