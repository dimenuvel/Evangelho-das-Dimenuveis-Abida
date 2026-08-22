import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Music, Play, Square } from 'lucide-react';
import { soundEngine, Vowel } from '../audio/soundEngine';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface SoundLabModalProps {
  onClose: () => void;
}

export const SoundLabModal: React.FC<SoundLabModalProps> = ({ onClose }) => {
  const vowels: Vowel[] = ['I', 'E', 'O', 'U', 'A'];
  const [activeTurnDrone, setActiveTurnDrone] = useState<number | null>(null);
  const [activeVowelSeq, setActiveVowelSeq] = useState<number>(0);
  const { t, turnsConfig } = useLanguage();
  const { isDay } = useTheme();

  const vowelDescriptions: Record<Vowel, string> = {
    I: t.vowelDescI,
    E: t.vowelDescE,
    O: t.vowelDescO,
    U: t.vowelDescU,
    A: t.vowelDescA
  };

  useEffect(() => {
    return () => {
      soundEngine.stopAmbientDrone();
    };
  }, []);

  const handleVowelClick = (vowel: Vowel, index: number) => {
    const nextStep = (activeVowelSeq % 5) + 1;
    setActiveVowelSeq(nextStep);
    soundEngine.playIEOUAVowel(vowel, nextStep);
    if (nextStep === 5) {
      setTimeout(() => {
        soundEngine.playIEOUASequenceComplete();
      }, 300);
    }
  };

  const handleToggleDrone = (turnId: number) => {
    if (activeTurnDrone === turnId) {
      soundEngine.stopAmbientDrone();
      setActiveTurnDrone(null);
    } else {
      soundEngine.startAmbientDrone(turnId);
      setActiveTurnDrone(turnId);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl select-none overflow-y-auto transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`relative w-full max-w-xl max-h-[90vh] rounded-2xl border-2 p-6 flex flex-col space-y-5 overflow-y-auto transition-all ${
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
            <Music className="w-5 h-5" />
            <h2 className="text-sm font-cinzel font-bold tracking-[0.25em] uppercase">{t.soundLabTitle}</h2>
          </div>
          <button
            onClick={() => {
              soundEngine.stopAmbientDrone();
              onClose();
            }}
            className={`p-1.5 rounded-full border transition-all ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#8c6508] hover:bg-[#b8860b]/20'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className={`text-xs font-serif italic leading-relaxed ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
          {t.soundLabSubtitle}
        </p>

        {/* IEOUA Vowels Interactive Pads */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-serif uppercase tracking-[0.25em] font-semibold ${
                isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
              }`}
            >
              {t.vowelSynthesisTitle}
            </span>
            <span className={`text-[10px] font-mono ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/60'}`}>
              {t.vowelStep} {activeVowelSeq} / 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {vowels.map((vowel, idx) => (
              <button
                key={vowel}
                onClick={() => handleVowelClick(vowel, idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all active:scale-95 shadow-md group ${
                  idx < activeVowelSeq
                    ? isDay
                      ? 'bg-[#b8860b]/20 border-[#b8860b] text-[#2c2017] shadow-[0_0_12px_rgba(184,134,11,0.3)]'
                      : 'bg-[#d4af37]/25 border-[#d4af37] text-[#f5deb3] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : isDay
                    ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                    : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/15'
                }`}
              >
                <span className="text-xl font-cinzel font-bold group-hover:scale-110 transition-transform">{vowel}</span>
                <span className={`text-[9px] mt-1 font-mono ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'}`}>
                  {vowelDescriptions[vowel].split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => soundEngine.playIEOUASequenceComplete()}
              className={`text-[10px] font-serif uppercase tracking-widest hover:underline flex items-center space-x-1 ${
                isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
              }`}
            >
              <Sparkles className={`w-3 h-3 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.testFullHarmony}</span>
            </button>
          </div>
        </div>

        {/* Ten Turns Ambient Soundscapes Preview */}
        <div className={`space-y-2 pt-2 border-t ${isDay ? 'border-[#b8860b]/20' : 'border-[#d4af37]/20'}`}>
          <span
            className={`text-[10px] font-serif uppercase tracking-[0.25em] font-semibold block ${
              isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
            }`}
          >
            {t.turnsSoundscapesTitle}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
            {Object.values(turnsConfig).map(turn => {
              const isPlaying = activeTurnDrone === turn.id;
              return (
                <button
                  key={turn.id}
                  onClick={() => handleToggleDrone(turn.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                    isPlaying
                      ? isDay
                        ? 'bg-[#b8860b]/25 border-[#b8860b] text-[#2c2017] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                        : 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5deb3] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : isDay
                      ? 'bg-[#ede4d4] border-[#b8860b]/20 text-[#2c2017] hover:bg-[#b8860b]/10'
                      : 'bg-[#1a140f] border-[#d4af37]/20 text-[#d4af37]/80 hover:bg-[#d4af37]/10'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className={`text-[10px] font-mono font-bold ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
                      {turn.subtitle} — {turn.layer}
                    </span>
                    <span className="text-xs font-cinzel font-semibold truncate">
                      {turn.title}
                    </span>
                  </div>

                  <div
                    className={`shrink-0 p-1.5 rounded-lg border ${
                      isDay ? 'bg-[#f8f4eb] border-[#b8860b]/40' : 'bg-[#0d0907] border-[#d4af37]/40'
                    }`}
                  >
                    {isPlaying ? (
                      <Square className={`w-3.5 h-3.5 fill-current ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
                    ) : (
                      <Play className={`w-3.5 h-3.5 fill-current ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gameplay Synthesizer Effects */}
        <div className={`space-y-2 pt-2 border-t ${isDay ? 'border-[#b8860b]/20' : 'border-[#d4af37]/20'}`}>
          <span
            className={`text-[10px] font-serif uppercase tracking-[0.25em] font-semibold block ${
              isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
            }`}
          >
            {t.gameplaySynthTitle}
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs font-serif">
            <button
              onClick={() => soundEngine.playPaddleHit(1.0)}
              className={`flex items-center space-x-2 p-2.5 border rounded-xl transition-all ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/10'
                  : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Volume2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.rugBounce}</span>
            </button>

            <button
              onClick={() => soundEngine.playPinStrike()}
              className={`flex items-center space-x-2 p-2.5 border rounded-xl transition-all ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/10'
                  : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Sparkles className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.pinStrike}</span>
            </button>

            <button
              onClick={() => soundEngine.playAbideActivation()}
              className={`flex items-center space-x-2 p-2.5 border rounded-xl transition-all ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/10'
                  : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Sparkles className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.abideChord}</span>
            </button>

            <button
              onClick={() => soundEngine.playVoidTrigger()}
              className={`flex items-center space-x-2 p-2.5 border rounded-xl transition-all ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/10'
                  : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Volume2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.voidDip}</span>
            </button>
          </div>
        </div>

        <div className="pt-2 text-center shrink-0">
          <button
            onClick={() => {
              soundEngine.stopAmbientDrone();
              onClose();
            }}
            className={`px-6 py-2.5 font-cinzel font-bold text-xs uppercase tracking-[0.25em] rounded-xl hover:opacity-90 transition-all ${
              isDay
                ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                : 'bg-gradient-to-r from-[#d4af37] to-[#f5deb3] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            {t.returnToGame}
          </button>
        </div>
      </div>
    </div>
  );
};
