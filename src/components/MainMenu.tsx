import React, { useState } from 'react';
import { GameStats } from '../types/game';
import { Play, Sparkles, Music, BookOpen, Lock, Trophy, Eye, RefreshCw, Quote, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { MAIN_PAGE_QUOTES, getRandomQuote } from '../data/quotes';
import { soundEngine } from '../audio/soundEngine';

interface MainMenuProps {
  stats: GameStats;
  onSelectTurn: (turnId: number) => void;
  onStartEndless: () => void;
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
  onOpenMeditate,
  onOpenSoundLab,
  onOpenGospelLore,
  onOpenTopScores,
  onOpenTour
}) => {
  const [selectedTab, setSelectedTab] = useState<'HOME' | 'TURNS'>('HOME');
  const { language, t, turnsConfig } = useLanguage();
  const { isDay } = useTheme();

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
        <div className="w-full flex items-center justify-end mb-3">
          <div className="flex items-center space-x-2">
            <ThemeSelector compact />
            <LanguageSelector compact />
          </div>
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
          className={`text-[10px] sm:text-xs font-serif tracking-[0.15em] sm:tracking-[0.3em] mt-1 uppercase ${
            isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]/80'
          }`}
        >
          {t.appSubtitle}
        </h2>
        <p className={`text-xs font-serif italic mt-1 ${isDay ? 'text-[#634e3f]' : 'text-[#d4af37]/60'}`}>
          {t.tagline}
        </p>
      </header>

      {/* Prettier Sacred Wisdom Quote Card & Interactive Generator */}
      <div className="relative z-10 w-full flex flex-col items-center my-3 sm:my-4">
        <div
          onClick={() => handleShuffleQuote()}
          title={language === 'pt' ? 'Clique para gerar nova citação' : 'Click to generate new quote'}
          className={`relative w-full max-w-md rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] overflow-hidden ${
            isDay
              ? 'bg-gradient-to-b from-[#fbf8f2] via-[#f5ede0] to-[#eee2cf] border-[#b8860b]/40 shadow-[0_6px_24px_rgba(184,134,11,0.15)] hover:border-[#b8860b]/80 hover:shadow-[0_8px_30px_rgba(184,134,11,0.25)]'
              : 'bg-gradient-to-b from-[#18110b] via-[#120c08] to-[#0a0705] border-[#d4af37]/40 shadow-[0_6px_32px_rgba(0,0,0,0.8)] hover:border-[#d4af37]/80 hover:shadow-[0_8px_36px_rgba(212,175,55,0.2)]'
          }`}
        >
          {/* Subtle Corner Accents */}
          <span className={`absolute top-2 left-2 text-[10px] select-none ${isDay ? 'text-[#b8860b]/40' : 'text-[#d4af37]/40'}`}>✧</span>
          <span className={`absolute top-2 right-2 text-[10px] select-none ${isDay ? 'text-[#b8860b]/40' : 'text-[#d4af37]/40'}`}>✧</span>
          <span className={`absolute bottom-2 left-2 text-[10px] select-none ${isDay ? 'text-[#b8860b]/40' : 'text-[#d4af37]/40'}`}>✧</span>
          <span className={`absolute bottom-2 right-2 text-[10px] select-none ${isDay ? 'text-[#b8860b]/40' : 'text-[#d4af37]/40'}`}>✧</span>

          {/* Background Decorative Mandala Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className={`w-40 h-40 border rounded-full rotate-45 ${isDay ? 'border-[#b8860b]' : 'border-[#d4af37]'}`} />
            <div className={`absolute w-28 h-28 border rounded-full ${isDay ? 'border-[#b8860b]' : 'border-[#d4af37]'}`} />
          </div>

          {/* Background Subtle Watermark Quote Mark */}
          <Quote
            className={`absolute right-4 bottom-3 w-16 h-16 pointer-events-none opacity-[0.06] ${
              isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
            }`}
          />

          {/* Header Bar within Card */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-inherit/20">
            {/* Avatar & Title */}
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center shadow-inner transition-transform group-hover:rotate-12 ${
                  isDay
                    ? 'border-[#b8860b] bg-[#f8f4eb] text-[#8c6508]'
                    : 'border-[#d4af37] bg-[#0d0907] text-[#d4af37]'
                }`}
              >
                <span className="text-sm select-none">🎳</span>
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={`text-[10px] font-cinzel font-bold tracking-[0.2em] uppercase ${
                    isDay ? 'text-[#8c6508]' : 'text-[#d4af37]'
                  }`}
                >
                  {language === 'pt' ? 'Sabedoria do Tapete' : 'Rug Wisdom'}
                </span>
                <span
                  className={`text-[8px] font-mono tracking-widest uppercase ${
                    isDay ? 'text-[#634e3f]/70' : 'text-[#f5deb3]/50'
                  }`}
                >
                  {language === 'pt' ? 'Versículo' : 'Verse'} {quoteIndex + 1}/{MAIN_PAGE_QUOTES.length}
                </span>
              </div>
            </div>

            {/* Quote Generator Action Button */}
            <button
              onClick={handleShuffleQuote}
              type="button"
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
                isDay
                  ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#2c2017] hover:text-[#f8f4eb] border-[#b8860b]/40 shadow-sm'
                  : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/40 shadow-sm'
              }`}
              title={language === 'pt' ? 'Gerar nova citação' : 'Generate new quote'}
            >
              <RefreshCw
                className={`w-3 h-3 ${isRotating ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`}
              />
              <span className="hidden xs:inline sm:inline">
                {language === 'pt' ? 'Gerar' : 'Generate'}
              </span>
            </button>
          </div>

          {/* Quote Body with Graceful Animation */}
          <div className="py-2 px-1 sm:px-3 text-center min-h-[64px] flex flex-col items-center justify-center">
            <p
              className={`text-xs sm:text-sm font-serif italic leading-relaxed transition-all duration-300 ${
                isRotating ? 'opacity-20 scale-98 translate-y-0.5' : 'opacity-100 scale-100 translate-y-0'
              } ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]'}`}
            >
              {currentQuote}
            </p>
          </div>

          {/* Card Footer: Speaker Attribution & Interactive Cue */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-inherit/15 text-[9px] font-mono">
            <span
              className={`uppercase tracking-[0.15em] flex items-center space-x-1 ${
                isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/80'
              }`}
            >
              <span>—</span>
              <span>{currentSpeaker}</span>
            </span>
            <span
              className={`tracking-wider italic transition-opacity opacity-50 group-hover:opacity-100 flex items-center space-x-1 ${
                isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/60'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>{language === 'pt' ? 'Toque para alternar' : 'Tap to shuffle'}</span>
            </span>
          </div>
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
            <span className="tracking-widest">{t.bestScore}: {stats.highScore.toString().padStart(6, '0')}</span>
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

      {/* Navigation Tabs (HOME vs TEN TURNS SELECT) */}
      <div className="relative z-10 w-full space-y-4">
        {selectedTab === 'HOME' ? (
          <div className="flex flex-col space-y-3">
            {/* 2 Primary Game Modes: 10 Turns & Infinite Mode side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Mode 1: 10 Turns Story Mode (Golden Background) */}
              <button
                onClick={() => onSelectTurn(stats.unlockedTurn || 1)}
                className={`relative group p-3.5 font-cinzel font-bold text-xs tracking-[0.2em] uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center shadow-lg border ${
                  isDay
                    ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] border-[#b8860b] shadow-[0_0_20px_rgba(184,134,11,0.35)]'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Play className="w-4 h-4 fill-current" />
                  <span className="text-sm">{t.tenTurnsBtn}</span>
                </div>
                <span className="text-[9px] font-serif italic normal-case tracking-normal opacity-90">
                  {t.playTurn} {stats.unlockedTurn || 1} • {language === 'pt' ? 'História' : 'Campaign'}
                </span>
              </button>

              {/* Mode 2: Endless Random Infinite Mode */}
              <button
                onClick={onStartEndless}
                className={`relative group p-3.5 font-cinzel font-bold text-xs tracking-[0.2em] uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center shadow-lg border ${
                  isDay
                    ? 'bg-gradient-to-br from-[#f8f4eb] via-[#ede4d4] to-[#e6d7c3] border-[#b8860b]/60 text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.2)] hover:border-[#b8860b]'
                    : 'bg-gradient-to-br from-[#1a140f] via-[#120c08] to-[#0a0705] border-[#d4af37]/60 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:border-[#d4af37]'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="text-base font-bold select-none leading-none">∞</span>
                  <span className="text-sm">{t.endlessBtn}</span>
                </div>
                <span className={`text-[9px] font-serif italic normal-case tracking-normal ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'}`}>
                  {language === 'pt' ? 'Sem Fim • Modos Aleatórios' : 'Endless • Score Attack'}
                </span>
              </button>
            </div>

            {/* Select Turn Browser Button */}
            <button
              onClick={() => setSelectedTab('TURNS')}
              className={`w-full py-2.5 border font-serif font-medium text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 ${
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
        ) : (
          /* Level Select Grid */
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-serif font-semibold uppercase tracking-[0.2em] ${
                  isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'
                }`}
              >
                {t.tenTurnsTitle}
              </span>
              <button
                onClick={() => setSelectedTab('HOME')}
                className={`text-[10px] font-mono underline ${
                  isDay ? 'text-[#634e3f] hover:text-[#2c2017]' : 'text-[#f5deb3]/80 hover:text-[#d4af37]'
                }`}
              >
                {t.backToHome}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {Object.values(turnsConfig).map(turn => {
                const isUnlocked = turn.id <= (stats.unlockedTurn || 1);
                const isCompleted = stats.turnsCompleted?.includes(turn.id);
                return (
                  <button
                    key={turn.id}
                    disabled={!isUnlocked}
                    onClick={() => onSelectTurn(turn.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isUnlocked
                        ? isDay
                          ? 'bg-[#ede4d4] border-[#b8860b]/40 hover:border-[#b8860b] hover:bg-[#b8860b]/15 text-[#2c2017] cursor-pointer'
                          : 'bg-[#1a140f] border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-[#d4af37] cursor-pointer'
                        : isDay
                        ? 'bg-[#e5dbc8]/40 border-[#b8860b]/10 text-[#634e3f]/40 opacity-40 cursor-not-allowed'
                        : 'bg-[#0a0705]/50 border-[#d4af37]/10 text-[#d4af37]/30 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-serif font-bold ${
                          isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]'
                        }`}
                      >
                        {turn.subtitle}
                      </span>
                      {!isUnlocked ? (
                        <Lock className={`w-3 h-3 ${isDay ? 'text-[#b8860b]/40' : 'text-[#d4af37]/30'}`} />
                      ) : isCompleted ? (
                        <Sparkles className={`w-3 h-3 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
                      ) : null}
                    </div>
                    <span
                      className={`text-xs font-cinzel font-semibold mt-1 truncate ${
                        isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
                      }`}
                    >
                      {turn.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono mt-1 uppercase ${
                        isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/60'
                      }`}
                    >
                      {t.layerLabel}: {turn.layer}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Copyright / Lore Note */}
      <footer
        className={`relative z-10 w-full flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-4 text-[10px] font-serif tracking-[0.2em] uppercase ${
          isDay ? 'text-[#8c6508]/70' : 'text-[#d4af37]/60'
        }`}
      >
        <span>© {t.subHeader}</span>
        <span>•</span>
        <span>v1.0</span>
        <span>•</span>
        <a
          href={`mailto:samuel.tiem@proton.me?subject=${encodeURIComponent('Evangelho das Dimenúveis - Abida')}`}
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
