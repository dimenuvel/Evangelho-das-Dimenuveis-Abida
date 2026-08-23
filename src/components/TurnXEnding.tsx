import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface TurnXEndingProps {
  onFinish: () => void;
}

export const TurnXEnding: React.FC<TurnXEndingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const { t } = useLanguage();
  const { isDay } = useTheme();

  const lines = [
    t.endingLine1,
    t.endingLine2,
    t.endingLine3,
    t.endingLine4,
    t.endingLine5
  ];

  useEffect(() => {
    soundEngine.playAbideActivation();
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < lines.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb] text-[#2c2017]' : 'bg-[#0d0907] text-[#d4af37]'
      }`}
    >
      {/* Background Pulsing Golden Spiral & Geometric Balance Grid */}
      <div className="absolute inset-0 bg-geometric-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div
          className={`w-[500px] h-[500px] rounded-full border-2 animate-spin-slow flex items-center justify-center ${
            isDay ? 'border-[#b8860b]/40' : 'border-[#d4af37]/40'
          }`}
        >
          <div
            className={`w-[350px] h-[350px] rounded-full border flex items-center justify-center ${
              isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
            }`}
          >
            <div
              className={`w-[200px] h-[200px] rounded-full border ${
                isDay ? 'border-[#b8860b]/20' : 'border-[#d4af37]/20'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Text Sequences */}
      <div className="relative z-10 max-w-xl text-center space-y-8">
        {lines.slice(0, step + 1).map((text, idx) => (
          <p
            key={idx}
            className={`font-cinzel tracking-[0.3em] text-lg md:text-2xl transition-all duration-1000 uppercase ${
              idx === step
                ? isDay
                  ? 'text-[#2c2017] scale-105 drop-shadow-[0_0_15px_rgba(184,134,11,0.6)] font-bold'
                  : 'text-[#f5deb3] scale-105 drop-shadow-[0_0_20px_rgba(212,175,55,0.9)] font-bold'
                : isDay
                ? 'text-[#8c6508]/50 opacity-60'
                : 'text-[#d4af37]/50 opacity-60'
            }`}
          >
            {text}
          </p>
        ))}

        {step === lines.length - 1 && (
          <div className="pt-10 animate-fade-in">
            <button
              onClick={onFinish}
              className={`px-8 py-3.5 font-cinzel font-bold text-xs uppercase tracking-[0.3em] rounded-xl hover:scale-105 transition-all ${
                isDay
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_25px_rgba(184,134,11,0.4)]'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] shadow-[0_0_30px_rgba(212,175,55,0.5)]'
              }`}
            >
              {t.enterBowlingAlley}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
