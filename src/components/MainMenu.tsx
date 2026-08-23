import React, { useState, useEffect } from 'react';
import { GameStats } from '../types/game';
import { Play, Sparkles, Music, BookOpen, Lock, Trophy, Eye, RefreshCw, Quote, Compass, Calendar, Clock, Flame, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { MAIN_PAGE_QUOTES, getRandomQuote } from '../data/quotes';
import { soundEngine } from '../audio/soundEngine';
import {
  getDailyChallengeConfig,
  getDailyChallengeRecord,
  isTodayDailyCompleted,
  getTimeUntilNextDailyChallenge,
  formatDisplayDate,
  getTodayDateKey
} from '../utils/dailyChallenge';
import { getTopLeaderboardScore } from '../utils/leaderboard';

interface MainMenuProps {
  stats: GameStats;
  onSelectTurn: (turnId: number) => void;
  onStartEndless: () => void;
  onStartDaily: () => void;
  onOpenMeditate: () => void;
  onOpenSoundLab: () => void;
  onOpenGospelLore: () => void;
  onOpenTopScores: () => void;
  onOpenTour: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  stats,
  onSelectTurn,
  onStartEndless,
  onStartDaily,
  onOpenMeditate,
  onOpenSoundLab,
  onOpenGospelLore,
  onOpenTopScores,
  onOpenTour
}) => {
  const [selectedTab, setSelectedTab] = useState<'HOME' | 'TURNS'>('HOME');
  const { language, t, turnsConfig } = useLanguage();
  const { isDay } = useTheme();

  // Daily challenge data
  const [dailyCountdown, setDailyCountdown] = useState(() => getTimeUntilNextDailyChallenge().formatted);
  const [dailyRecord, setDailyRecord] = useState(() => getDailyChallengeRecord());
  const [isDailyDone, setIsDailyDone] = useState(() => isTodayDailyCompleted());
  const [dailyConfig, setDailyConfig] = useState(() => getDailyChallengeConfig());

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeUntilNextDailyChallenge();
      setDailyCountdown(remaining.formatted);
      // Check if day changed
      const todayKey = getTodayDateKey();
      if (todayKey !== dailyConfig.dateKey) {
        setDailyConfig(getDailyChallengeConfig(todayKey));
        setIsDailyDone(isTodayDailyCompleted());
        setDailyRecord(getDailyChallengeRecord());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dailyConfig.dateKey]);

  // Random quote index state initialized on component load
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * MAIN_PAGE_QUOTES.length)
  );
  const [isRotating, setIsRotating] = useState(false);

  const currentQuoteObj = MAIN_PAGE_QUOTES[quoteIndex];
  const currentQuote = currentQuoteObj
    ? language === 'pt'
      ? currentQuoteObj.pt
      : currentQuoteObj.en
    : t.dudeQuote;

  const currentSpeaker = currentQuoteObj
    ? language === 'pt'
      ? (currentQuoteObj.speakerPt || t.speakerDude)
      : (currentQuoteObj.speakerEn || t.speakerDude)
    : t.speakerDude;

  const handleShuffleQuote = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isRotating) return;
    setIsRotating(true);

    try {
      const vowels: ('I' | 'E' | 'O' | 'U' | 'A')[] = ['I', 'E', 'O', 'U', 'A'];
      const randomVowel = vowels[quoteIndex % vowels.length];
      soundEngine.playIEOUAVowel(randomVowel);
    } catch {
      // Audio fallback
    }

    const { index } = getRandomQuote(language, quoteIndex);
    setQuoteIndex(index);
    setTimeout(() => setIsRotating(false), 300);
  };

  // Dedicated FULL SCREEN view for 10 Turns when selectedTab === 'TURNS'
  if (selectedTab === 'TURNS') {
    return (
      <div
        className={`relative w-full max-w-xl min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-x-hidden overflow-y-auto box-border transition-colors duration-300 ${
          isDay
            ? 'bg-[#f8f4eb] text-[#2c2017] border-x-2 sm:border-x-4 border-[#ede4d4]'
            : 'bg-[#0d0907] text-[#d4af37] border-x-2 sm:border-x-4 border-[#1a140f]'
        }`}
      >
        {/* Background Geometric Grid & Concentric Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-geometric-grid" />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] border rounded-full ${
              isDay ? 'border-[#b8860b]/15' : 'border-[#d4af37]/10'
            }`}
          />
        </div>

        {/* Top Controls & Navigation Bar */}
        <div className="relative z-10 w-full flex items-center justify-between mb-3 pb-3 border-b border-inherit/20">
          <button
            onClick={() => setSelectedTab('HOME')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-serif font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#2c2017] hover:text-[#f8f4eb] border-[#b8860b]/40 shadow-sm'
                : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/40 shadow-sm'
            }`}
          >
            <span>←</span>
            <span>{t.backToHome}</span>
          </button>

          <div className="flex items-center space-x-2">
            <span
              className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/40 text-[#8c6508] shadow-xs'
                  : 'bg-[#1a140f]/90 border-[#d4af37]/40 text-[#d4af37] shadow-xs'
              }`}
            >
              v1.2
            </span>
            <ThemeSelector compact />
            <LanguageSelector compact />
          </div>
        </div>

        {/* Top Title Zone */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mb-4">
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-cinzel font-bold tracking-[0.15em] sm:tracking-[0.25em] uppercase ${
              isDay
                ? 'text-[#2c2017] drop-shadow-[0_0_12px_rgba(184,134,11,0.2)]'
                : 'text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            {t.tenTurnsTitle}
          </h1>
          <p
            className={`text-[10px] sm:text-xs font-serif tracking-[0.15em] sm:tracking-[0.2em] mt-1 uppercase ${
              isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]/80'
            }`}
          >
            {t.tenTurnsHeaderSubtitle}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 mt-2 px-3 py-1 rounded-full border text-[10.5px] font-mono shadow-inner border-inherit/20 bg-inherit/40">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>
              {language === 'pt'
                ? `Progresso: ${stats.unlockedTurn || 1}/10 Desbloqueados • ${stats.turnsCompleted?.length || 0}/10 Concluídos`
                : `Progress: ${stats.unlockedTurn || 1}/10 Unlocked • ${stats.turnsCompleted?.length || 0}/10 Cleared`}
            </span>
          </div>
        </div>

        {/* Quick Play Banner for Current Unlocked Turn */}
        <div className="relative z-10 w-full mb-4">
          <div
            className={`w-full rounded-2xl border p-3.5 sm:p-4 transition-all shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDay
                ? 'bg-gradient-to-r from-[#f8f4eb] via-[#ede4d4] to-[#f8f4eb] border-[#b8860b]/60 shadow-[0_4px_18px_rgba(184,134,11,0.15)]'
                : 'bg-gradient-to-r from-[#18110b] via-[#120c08] to-[#18110b] border-[#d4af37]/60 shadow-[0_4px_22px_rgba(0,0,0,0.8)]'
            }`}
          >
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg font-cinzel font-bold shrink-0 shadow-inner ${
                  isDay ? 'bg-[#ede4d4] border-[#b8860b] text-[#8c6508]' : 'bg-[#1a140f] border-[#d4af37] text-[#d4af37]'
                }`}
              >
                {turnsConfig[stats.unlockedTurn || 1]?.bgSymbol || '◎'}
              </div>
              <div>
                <div className="text-[10px] font-serif uppercase tracking-widest opacity-80">
                  {t.continueCampaign} • {turnsConfig[stats.unlockedTurn || 1]?.subtitle}
                </div>
                <div className="text-sm font-cinzel font-bold truncate">
                  {turnsConfig[stats.unlockedTurn || 1]?.title}
                </div>
                <div className="text-[10px] font-mono opacity-70">
                  {t.layerLabel}: {turnsConfig[stats.unlockedTurn || 1]?.layer}
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTurn(stats.unlockedTurn || 1)}
              className={`w-full sm:w-auto px-5 py-2.5 font-cinzel font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
                isDay
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.35)]'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.45)]'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.playTurn} {stats.unlockedTurn || 1}</span>
            </button>
          </div>
        </div>

        {/* 10 Turns Full-Screen Grid */}
        <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {Object.values(turnsConfig).map(turn => {
            const isUnlocked = turn.id <= (stats.unlockedTurn || 1);
            const isCompleted = stats.turnsCompleted?.includes(turn.id);
            const isCurrent = turn.id === (stats.unlockedTurn || 1);

            return (
              <button
                key={turn.id}
                disabled={!isUnlocked}
                onClick={() => onSelectTurn(turn.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                  isUnlocked
                    ? isCurrent
                      ? isDay
                        ? 'bg-[#fcf8f2] border-[#b8860b] shadow-[0_0_14px_rgba(184,134,11,0.25)] hover:bg-[#b8860b]/15 text-[#2c2017] cursor-pointer'
                        : 'bg-[#18110b] border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:bg-[#d4af37]/15 text-[#d4af37] cursor-pointer'
                      : isDay
                      ? 'bg-[#ede4d4] border-[#b8860b]/40 hover:border-[#b8860b] hover:bg-[#b8860b]/10 text-[#2c2017] cursor-pointer'
                      : 'bg-[#1a140f] border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-[#d4af37] cursor-pointer'
                    : isDay
                    ? 'bg-[#e5dbc8]/30 border-[#b8860b]/10 text-[#634e3f]/40 opacity-45 cursor-not-allowed'
                    : 'bg-[#0a0705]/50 border-[#d4af37]/10 text-[#d4af37]/30 opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Top Row: Subtitle + Symbol + Status */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border border-inherit/30"
                      style={{ color: isUnlocked ? turn.themeColor : undefined }}
                    >
                      {turn.bgSymbol}
                    </span>
                    <span
                      className={`text-[11px] font-serif font-bold tracking-wider ${
                        isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]'
                      }`}
                    >
                      {turn.subtitle}
                    </span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{t.turnStatusCompleted}</span>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/40 animate-pulse">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>{t.playTurn}</span>
                    </div>
                  ) : !isUnlocked ? (
                    <div className="flex items-center space-x-1 text-[9px] font-mono opacity-60">
                      <Lock className="w-3 h-3" />
                      <span>{t.turnStatusLocked}</span>
                    </div>
                  ) : null}
                </div>

                {/* Title */}
                <div
                  className={`text-xs sm:text-sm font-cinzel font-bold leading-tight ${
                    isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
                  }`}
                >
                  {turn.title}
                </div>

                {/* Dimension Layer badge */}
                <div
                  className={`text-[9.5px] font-mono mt-1 uppercase tracking-wider ${
                    isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/75'
                  }`}
                >
                  {t.layerLabel}: <span className="font-semibold">{turn.layer}</span>
                </div>

                {/* Quote snippet / description */}
                <div
                  className={`text-[10px] font-serif italic line-clamp-1 mt-1.5 opacity-80 ${
                    isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'
                  }`}
                >
                  "{turn.quote}"
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Back Button */}
        <div className="relative z-10 w-full flex justify-center pb-4">
          <button
            onClick={() => setSelectedTab('HOME')}
            className={`px-6 py-2 rounded-full border text-xs font-serif font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#2c2017] hover:text-[#f8f4eb] border-[#b8860b]/40 shadow-sm'
                : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/40 shadow-sm'
            }`}
          >
            ← {t.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-lg min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-x-hidden overflow-y-auto box-border transition-colors duration-300 ${
        isDay
          ? 'bg-[#f8f4eb] text-[#2c2017] border-x-2 sm:border-x-4 border-[#ede4d4]'
          : 'bg-[#0d0907] text-[#d4af37] border-x-2 sm:border-x-4 border-[#1a140f]'
      }`}
    >
      {/* Background Geometric Grid & Concentric Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-geometric-grid" />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] border rounded-full ${
            isDay ? 'border-[#b8860b]/15' : 'border-[#d4af37]/10'
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] border rounded-full ${
            isDay ? 'border-[#b8860b]/15' : 'border-[#d4af37]/10'
          }`}
        />
      </div>

      {/* Header / Brand Zone */}
      <header
        className={`relative z-10 w-full flex flex-col items-center text-center mt-2 border-b pb-4 ${
          isDay ? 'border-[#b8860b]/20' : 'border-[#d4af37]/30'
        }`}
      >
        {/* Controls top bar */}
        <div className="w-full flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5">
            <span
              className={`text-[9.5px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/40 text-[#8c6508] shadow-xs'
                  : 'bg-[#1a140f]/90 border-[#d4af37]/40 text-[#d4af37] shadow-xs'
              }`}
            >
              v1.2
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeSelector compact />
            <LanguageSelector compact />
          </div>
        </div>

        <div className="flex flex-col items-center mb-1">
          <img
            src="/icon.png"
            alt="Abide Spiral Emblem"
            referrerPolicy="no-referrer"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.35)] object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-cinzel font-light tracking-[0.15em] sm:tracking-[0.3em] uppercase break-words max-w-full px-2 ${
            isDay
              ? 'text-[#2c2017] drop-shadow-[0_0_12px_rgba(184,134,11,0.2)]'
              : 'text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'
          }`}
        >
          {t.appTitle}
        </h1>
        <h2
          className={`text-[10px] sm:text-xs font-serif tracking-[0.15em] sm:tracking-[0.3em] mt-1 uppercase flex items-center justify-center space-x-2 ${
            isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]/80'
          }`}
        >
          <span>{t.appSubtitle}</span>
        </h2>
        <p className={`text-xs font-serif italic mt-1 ${isDay ? 'text-[#634e3f]' : 'text-[#d4af37]/60'}`}>
          {t.tagline}
        </p>
      </header>

      {/* Thinner Sacred Quote Strip & Quick Shuffle */}
      <div className="relative z-10 w-full flex flex-col items-center my-2 sm:my-2.5">
        <div
          onClick={handleShuffleQuote}
          title={language === 'pt' ? 'Clique para alternar citação' : 'Click to shuffle quote'}
          className={`relative w-full max-w-md rounded-xl border px-3.5 py-2 sm:py-2.5 transition-all duration-300 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-2.5 shadow-sm ${
            isDay
              ? 'bg-[#ede4d4]/80 hover:bg-[#ede4d4] border-[#b8860b]/40 shadow-[0_2px_12px_rgba(184,134,11,0.08)] hover:border-[#b8860b]/70'
              : 'bg-[#140e0a]/80 hover:bg-[#18110b] border-[#d4af37]/40 shadow-[0_2px_14px_rgba(0,0,0,0.5)] hover:border-[#d4af37]/70'
          }`}
        >
          <Quote
            className={`w-3.5 h-3.5 shrink-0 opacity-50 transition-transform group-hover:scale-110 ${
              isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
            }`}
          />

          <div className="flex-1 text-center min-w-0 px-1">
            <p
              className={`text-xs sm:text-[12.5px] font-serif italic leading-snug transition-all duration-200 ${
                isRotating ? 'opacity-25 scale-98' : 'opacity-100 scale-100'
              } ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]'}`}
            >
              {currentQuote}
              <span
                className={`inline-block not-italic text-[9.5px] font-mono uppercase tracking-wider ml-1.5 opacity-75 ${
                  isDay ? 'text-[#8c6508]' : 'text-[#d4af37]'
                }`}
              >
                — {currentSpeaker}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleShuffleQuote}
            className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
              isDay
                ? 'bg-[#f4ebe0] hover:bg-[#b8860b] text-[#8c6508] hover:text-[#f8f4eb] border-[#b8860b]/30 shadow-xs'
                : 'bg-[#1e150f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/30 shadow-xs'
            }`}
            title={language === 'pt' ? 'Nova citação' : 'Shuffle quote'}
          >
            <RefreshCw
              className={`w-3 h-3 ${isRotating ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`}
            />
          </button>
        </div>

        {/* High Score Badge & Top 10 Button */}
        <div className="flex items-center space-x-2 mt-2.5">
          <div
            className={`flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-full border shadow-sm ${
              isDay
                ? 'bg-[#ede4d4] text-[#2c2017] border-[#b8860b]/30'
                : 'bg-[#1a140f] text-[#d4af37] border-[#d4af37]/30'
            }`}
          >
            <Trophy className={`w-3.5 h-3.5 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
            <span className="tracking-widest">
              {t.bestScore}: {getTopLeaderboardScore().toString().padStart(6, '0')}
            </span>
          </div>

          <button
            onClick={onOpenTopScores}
            type="button"
            className={`flex items-center space-x-1.5 text-xs font-cinzel font-bold tracking-wider px-3 py-1.5 rounded-full border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#8c6508] hover:text-[#f8f4eb] border-[#b8860b]/40 shadow-[0_0_10px_rgba(184,134,11,0.15)]'
                : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
            }`}
            title={t.topScores}
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>{t.topScoresBtn}</span>
          </button>
        </div>
      </div>

      {/* Navigation & Mode Zone (HOME) */}
      <div className="relative z-10 w-full space-y-4">
        <div className="flex flex-col space-y-3">
          {/* 2 Primary Game Modes: 10 Turns & Infinite Mode horizontally side-by-side */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Mode 1: 10 Turns Story Mode (Golden Background) -> Opens Full Screen 10 Turns View */}
            <button
              onClick={() => setSelectedTab('TURNS')}
              className={`relative group p-2.5 sm:p-3.5 font-cinzel font-bold text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center shadow-lg border cursor-pointer ${
                isDay
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] border-[#b8860b] shadow-[0_0_20px_rgba(184,134,11,0.35)]'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.45)]'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-0.5 sm:mb-1">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                <span className="text-xs sm:text-sm truncate">{t.tenTurnsBtn}</span>
              </div>
              <span className="text-[8.5px] sm:text-[9px] font-serif italic normal-case tracking-normal opacity-90 leading-tight">
                {t.playTurn} {stats.unlockedTurn || 1} • {language === 'pt' ? '10 Giros' : '10 Turns'}
              </span>
            </button>

            {/* Mode 2: Endless Random Infinite Mode */}
            <button
              onClick={onStartEndless}
              className={`relative group p-2.5 sm:p-3.5 font-cinzel font-bold text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center shadow-lg border cursor-pointer ${
                isDay
                  ? 'bg-gradient-to-br from-[#f8f4eb] via-[#ede4d4] to-[#e6d7c3] border-[#b8860b]/60 text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.2)] hover:border-[#b8860b]'
                  : 'bg-gradient-to-br from-[#1a140f] via-[#120c08] to-[#0a0705] border-[#d4af37]/60 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:border-[#d4af37]'
              }`}
            >
              <div className="flex items-center space-x-1 mb-0.5 sm:mb-1">
                <span className="text-sm sm:text-base font-bold select-none leading-none">∞</span>
                <span className="text-xs sm:text-sm truncate">{t.endlessBtn}</span>
              </div>
              <span className={`text-[8.5px] sm:text-[9px] font-serif italic normal-case tracking-normal leading-tight ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'}`}>
                {language === 'pt' ? 'Sem Fim • Infinito' : 'Endless • Score Attack'}
              </span>
            </button>
          </div>

          {/* Mode 3: Daily Challenge System Banner */}
          <div
            className={`w-full rounded-2xl border p-3.5 sm:p-4 transition-all duration-300 relative overflow-hidden shadow-md ${
              isDay
                ? 'bg-gradient-to-br from-[#fcf9f2] via-[#f7f0e4] to-[#ede4d4] border-[#b8860b]/50 shadow-[0_4px_18px_rgba(184,134,11,0.12)]'
                : 'bg-gradient-to-br from-[#160f0a] via-[#100b07] to-[#0a0705] border-[#d4af37]/50 shadow-[0_4px_22px_rgba(0,0,0,0.7)]'
            }`}
          >
            {/* Header row: Title + Status */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center text-sm shadow-sm ${
                    isDay
                      ? 'bg-[#ede4d4] border-[#b8860b]/40 text-[#b8860b]'
                      : 'bg-[#1e150f] border-[#d4af37]/40 text-[#d4af37]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-cinzel font-bold uppercase tracking-wider">
                      {t.dailyChallenge}
                    </span>
                    <span className="text-[10px] opacity-70">
                      • {formatDisplayDate(dailyConfig.dateKey, language)}
                    </span>
                  </div>
                  <p className={`text-[10.5px] font-serif italic line-clamp-1 ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/75'}`}>
                    {language === 'pt' ? dailyConfig.titlePt : dailyConfig.titleEn}
                  </p>
                </div>
              </div>

              {/* Streak Counter Badge */}
              <div
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border shadow-inner shrink-0 ${
                  dailyRecord.currentStreak > 0
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/40'
                    : isDay
                    ? 'bg-[#ede4d4] text-[#8c6508] border-[#b8860b]/30'
                    : 'bg-[#18110c] text-[#d4af37]/70 border-[#d4af37]/30'
                }`}
                title={`${dailyRecord.currentStreak} ${t.daysStreak}`}
              >
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{dailyRecord.currentStreak} {t.daysStreak}</span>
              </div>
            </div>

            {/* Modifier / Config details */}
            <div
              className={`w-full p-2 rounded-xl border text-[10.5px] flex items-center justify-between mb-3 ${
                isDay
                  ? 'bg-[#f4ebe0]/80 border-[#b8860b]/25 text-[#2c2017]'
                  : 'bg-[#140e0a]/80 border-[#d4af37]/25 text-[#d4af37]'
              }`}
            >
              <div className="flex items-center space-x-1.5 min-w-0 pr-2">
                <Zap className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#fef08a] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold truncate text-[10px] font-cinzel uppercase tracking-wider text-[#b8860b] dark:text-[#fef08a]">
                    {language === 'pt' ? dailyConfig.modifierNamePt : dailyConfig.modifierNameEn}
                  </span>
                  <span className="text-[9.5px] font-serif opacity-80 truncate">
                    {language === 'pt' ? dailyConfig.modifierDescPt : dailyConfig.modifierDescEn}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                +{dailyConfig.bonusScore.toLocaleString()} {t.dailyBonusScore}
              </div>
            </div>

            {/* Action row: Play Button + Timer countdown */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1.5 text-[10px] font-mono opacity-85">
                <Clock className="w-3 h-3 text-[#d4af37]" />
                <span className="font-serif uppercase tracking-wider text-[9px] opacity-75">{t.nextChallengeIn}:</span>
                <span className="font-bold text-[#b8860b] dark:text-[#fef08a]">{dailyCountdown}</span>
              </div>

              <button
                onClick={onStartDaily}
                className={`px-4 py-2 font-cinzel font-bold text-[11px] tracking-wider uppercase rounded-xl transition-all flex items-center space-x-1.5 shadow-md active:scale-95 cursor-pointer ${
                  isDailyDone
                    ? isDay
                      ? 'bg-emerald-700/15 hover:bg-emerald-700/25 border border-emerald-600 text-emerald-800'
                      : 'bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500 text-emerald-300'
                    : isDay
                    ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_12px_rgba(184,134,11,0.3)]'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                }`}
              >
                {isDailyDone ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.replayDaily}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.playDaily}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Select Turn Browser Button */}
          <button
            onClick={() => setSelectedTab('TURNS')}
            className={`w-full py-2.5 border font-serif font-medium text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/40 text-[#2c2017] hover:bg-[#b8860b]/15'
                : 'bg-[#1a140f] border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
            <span>{t.selectTurn}</span>
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              onClick={onOpenTour}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border rounded-xl transition-all text-center cursor-pointer ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                  : 'bg-[#1a140f]/80 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Compass className={`w-4 h-4 mb-1 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span className="text-[10px] font-serif tracking-wider uppercase">{t.tourMenuBtn}</span>
            </button>
            <button
              onClick={onOpenMeditate}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border rounded-xl transition-all text-center cursor-pointer ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                  : 'bg-[#1a140f]/80 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Sparkles className={`w-4 h-4 mb-1 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span className="text-[10px] font-serif tracking-wider uppercase">{t.meditate}</span>
            </button>
            <button
              onClick={onOpenSoundLab}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border rounded-xl transition-all text-center cursor-pointer ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                  : 'bg-[#1a140f]/80 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Music className={`w-4 h-4 mb-1 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span className="text-[10px] font-serif tracking-wider uppercase">{t.soundLab}</span>
            </button>
            <button
              onClick={onOpenGospelLore}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border rounded-xl transition-all text-center cursor-pointer ${
                isDay
                  ? 'bg-[#ede4d4]/90 border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                  : 'bg-[#1a140f]/80 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <BookOpen className={`w-4 h-4 mb-1 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span className="text-[10px] font-serif tracking-wider uppercase">{t.theGospel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Copyright / Lore Note */}
      <footer
        className={`relative z-10 w-full flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-4 text-[10px] font-serif tracking-[0.2em] uppercase ${
          isDay ? 'text-[#8c6508]/75' : 'text-[#d4af37]/70'
        }`}
      >
        <span>© {t.subHeader}</span>
        <span>•</span>
        <span className="font-mono font-bold tracking-normal px-1.5 py-0.5 rounded border border-current/30 text-[9.5px]">v1.2</span>
        <span>•</span>
        <a
          href={`mailto:samuel.tiem@proton.me?subject=${encodeURIComponent(language === 'pt' ? 'Evangelho das Dimenúveis - Abida' : 'Gospel of the Dimenuous - Abide')}`}
          className={`hover:underline transition-colors ${
            isDay ? 'hover:text-[#2c2017]' : 'hover:text-white'
          }`}
          title="samuel.tiem@proton.me"
        >
          {t.contact}
        </a>
      </footer>
    </div>
  );
};
