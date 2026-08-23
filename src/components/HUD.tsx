import React from 'react';
import { TurnConfig } from '../types/game';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';

interface HUDProps {
  turnConfig: TurnConfig;
  lives: number;
  score: number;
  abideMeter: number;
  isAbideMode: boolean;
  isMuted: boolean;
  isPaused: boolean;
  gameMode?: 'TURNS' | 'ENDLESS';
  wave?: number;
  vibrationEnabled?: boolean;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onToggleVibration?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  turnConfig,
  lives,
  score,
  abideMeter,
  isAbideMode,
  isMuted,
  isPaused,
  gameMode = 'TURNS',
  wave = 1,
  onToggleMute,
  onTogglePause
}) => {
  const { t } = useLanguage();
  const { isDay } = useTheme();

  return (
    <div className="w-full max-w-[500px] flex flex-col space-y-1.5 mb-1 px-1 select-none">
      {/* Top HUD Bar */}
      <div
        className={`flex items-center justify-between backdrop-blur-md px-4 py-2.5 rounded-2xl border transition-all ${
          isDay
            ? 'bg-[#f8f4eb]/90 border-[#b8860b]/30 text-[#2c2017] shadow-[0_4px_20px_rgba(184,134,11,0.15)]'
            : 'bg-[#0d0907]/90 border-[#d4af37]/30 text-[#d4af37] shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Left: Layer / Turn title */}
        <div className="flex flex-col min-w-0 max-w-[180px] justify-center">
          <span
            className={`text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] leading-tight flex items-center space-x-1 ${
              isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/70'
            }`}
          >
            {gameMode === 'ENDLESS' ? (
              <>
                <span className="font-bold text-xs">∞</span>
                <span>{t.endlessTitle} • {t.wave} {wave}</span>
              </>
            ) : (
              <span>{turnConfig.subtitle} — {t.layerLabel} {turnConfig.layer}</span>
            )}
          </span>
          <span
            className={`text-xs sm:text-sm font-cinzel font-semibold tracking-wide leading-snug whitespace-normal break-words ${
              isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
            }`}
          >
            {turnConfig.title}
          </span>
        </div>

        {/* Center: ABIDE Meter */}
        <div className="flex flex-col items-center flex-1 mx-3">
          <span
            className={`text-[10px] font-serif tracking-[0.2em] uppercase transition-all ${
              isAbideMode
                ? isDay
                  ? 'text-[#b8860b] font-bold drop-shadow-[0_0_8px_rgba(184,134,11,0.8)] animate-pulse'
                  : 'text-[#f5deb3] font-bold drop-shadow-[0_0_8px_rgba(212,175,55,0.9)] animate-pulse'
                : isDay
                ? 'text-[#634e3f]'
                : 'text-[#d4af37]/80'
            }`}
          >
            {t.abideMeter}
          </span>
          <div
            className={`w-full max-w-[120px] h-2 border mt-1 overflow-hidden rounded-full p-[1px] ${
              isDay ? 'bg-[#ede4d4] border-[#b8860b]/30' : 'bg-[#1a140f] border-[#d4af37]/30'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isAbideMode
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] shadow-[0_0_12px_rgba(184,134,11,0.9)]'
                  : isDay
                  ? 'bg-gradient-to-r from-[#10b981] to-[#b8860b]'
                  : 'bg-gradient-to-r from-[#8b5cf6] to-[#d4af37]'
              }`}
              style={{ width: `${Math.min(100, abideMeter)}%` }}
            />
          </div>
        </div>

        {/* Right: Score & Lives */}
        <div className="flex flex-col items-end">
          <span
            className={`text-[10px] font-serif uppercase tracking-[0.2em] ${
              isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/70'
            }`}
          >
            {t.score}
          </span>
          <span
            className={`text-sm font-mono font-bold tracking-wider ${
              isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
            }`}
          >
            {score.toString().padStart(6, '0')}
          </span>
          <div className="flex gap-1.5 mt-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < lives
                    ? isDay
                      ? 'bg-[#b8860b] shadow-[0_0_6px_#b8860b]'
                      : 'bg-[#d4af37] shadow-[0_0_6px_#d4af37]'
                    : isDay
                    ? 'border border-[#b8860b]/30 bg-transparent'
                    : 'border border-[#d4af37]/30 bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex items-center justify-between px-1 text-xs">
        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-serif italic tracking-wider ${
              isDay ? 'text-[#634e3f]' : 'text-[#d4af37]/60'
            }`}
          >
            {t.rugAbides}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <LanguageSelector compact />
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-lg border transition-all ${
              !isMuted
                ? isDay
                  ? 'bg-[#b8860b]/15 border-[#b8860b]/50 text-[#b8860b]'
                  : 'bg-[#d4af37]/15 border-[#d4af37]/50 text-[#d4af37]'
                : isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/20 text-[#634e3f]/50'
                : 'bg-[#1a140f] border-[#d4af37]/10 text-[#d4af37]/40'
            }`}
            title="Toggle Sound"
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onTogglePause}
            className={`p-1.5 rounded-lg border transition-all ${
              isDay
                ? 'bg-[#b8860b]/20 border-[#b8860b]/50 text-[#2c2017] hover:bg-[#b8860b]/30'
                : 'bg-[#d4af37]/20 border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/30'
            }`}
            title="Pause Game"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Bottom Spiral Progress Bar across Ten Turns - only shown in 10 TURNS Story mode */}
      {gameMode === 'TURNS' && (
        <div
          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl border text-[10px] ${
            isDay
              ? 'bg-[#f8f4eb]/80 border-[#b8860b]/20 text-[#2c2017]'
              : 'bg-[#0d0907]/80 border-[#d4af37]/20 text-[#d4af37]'
          }`}
        >
          {Array.from({ length: 10 }).map((_, idx) => {
            const turnNum = idx + 1;
            const isCurrent = turnNum === turnConfig.id;
            const isPassed = turnNum < turnConfig.id;
            return (
              <div key={turnNum} className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? isDay
                        ? 'bg-[#b8860b] border border-[#f8f4eb] shadow-[0_0_8px_#b8860b] scale-125'
                        : 'bg-[#d4af37] border border-[#f5deb3] shadow-[0_0_8px_#d4af37] scale-125'
                      : isPassed
                      ? isDay
                        ? 'bg-[#b8860b]/50 border border-[#b8860b]/70'
                        : 'bg-[#d4af37]/40 border border-[#d4af37]/60'
                      : isDay
                      ? 'bg-[#ede4d4] border border-[#b8860b]/20 opacity-40'
                      : 'bg-[#1a140f] border border-[#d4af37]/20 opacity-40'
                  }`}
                >
                  {isCurrent && <div className={`w-1 h-1 rounded-full ${isDay ? 'bg-[#f8f4eb]' : 'bg-[#0d0907]'}`} />}
                </div>
                <span
                  className={`mt-0.5 text-[9px] font-mono ${
                    isCurrent
                      ? isDay ? 'text-[#b8860b] font-bold' : 'text-[#d4af37] font-bold'
                      : isPassed
                      ? isDay ? 'text-[#b8860b]' : 'text-[#d4af37]/70'
                      : isDay ? 'text-[#8c6508]/40' : 'text-[#d4af37]/30'
                  }`}
                >
                  {turnNum}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
