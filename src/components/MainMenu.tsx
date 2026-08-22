import React, { useState } from 'react';
import { GameStats } from '../types/game';
import { Play, Sparkles, Music, BookOpen, Lock, Trophy, Eye, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { MAIN_PAGE_QUOTES, getRandomQuote } from '../data/quotes';

interface MainMenuProps {
  stats: GameStats;
  onSelectTurn: (turnId: number) => void;
  onOpenMeditate: () => void;
  onOpenSoundLab: () => void;
  onOpenGospelLore: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  stats,
  onSelectTurn,
  onOpenMeditate,
  onOpenSoundLab,
  onOpenGospelLore
}) => {
  const [selectedTab, setSelectedTab] = useState<'HOME' | 'TURNS'>('HOME');
  const { language, t, turnsConfig } = useLanguage();
  const { isDay } = useTheme();

  // Random quote index state initialized on component load
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * MAIN_PAGE_QUOTES.length)
  );
  const [isRotating, setIsRotating] = useState(false);

  const currentQuote = MAIN_PAGE_QUOTES[quoteIndex]
    ? language === 'pt'
      ? MAIN_PAGE_QUOTES[quoteIndex].pt
      : MAIN_PAGE_QUOTES[quoteIndex].en
    : t.dudeQuote;

  const handleShuffleQuote = () => {
    setIsRotating(true);
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

      {/* Center Artwork: The Cosmic Bowling Alley & The Dude */}
      <div className="relative z-10 w-full flex flex-col items-center my-4">
        <div
          className={`relative w-full max-w-sm aspect-[16/10] rounded-2xl border p-4 shadow-xl flex items-center justify-center overflow-hidden transition-all ${
            isDay
              ? 'bg-[#f0e8d8] border-[#b8860b]/30 shadow-[0_4px_30px_rgba(184,134,11,0.15)]'
              : 'bg-[#0a0705] border-[#d4af37]/30 shadow-[0_0_40px_rgba(0,0,0,0.9)]'
          }`}
        >
          {/* Background Geometry */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div
              className={`w-48 h-48 border rounded-full flex items-center justify-center rotate-45 ${
                isDay ? 'border-[#b8860b]' : 'border-[#d4af37]'
              }`}
            >
              <div
                className={`w-36 h-36 border rounded-full ${
                  isDay ? 'border-[#b8860b]' : 'border-[#d4af37]'
                }`}
              />
            </div>
          </div>

          {/* The Dude Frame */}
          <div
            onClick={handleShuffleQuote}
            title={language === 'pt' ? 'Gerar nova citação' : 'Generate new quote'}
            className={`relative z-10 flex items-center space-x-3.5 px-4 py-3 rounded-xl border shadow-lg cursor-pointer group hover:scale-[1.01] active:scale-95 transition-all ${
              isDay
                ? 'bg-[#e5dbc8]/90 border-[#b8860b]/40 text-[#2c2017] hover:border-[#b8860b]/70'
                : 'bg-[#1a140f]/90 border-[#d4af37]/40 text-[#f5deb3] hover:border-[#d4af37]/70'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full border p-0.5 flex items-center justify-center shrink-0 ${
                isDay ? 'border-[#b8860b] bg-[#f8f4eb]' : 'border-[#d4af37] bg-[#0d0907]'
              }`}
            >
              <span className="text-xl filter contrast-125 select-none">🧔</span>
            </div>
            <div className="text-left flex-1 min-w-0 pr-1">
              <p
                className={`text-xs font-serif italic leading-snug transition-opacity duration-300 ${
                  isRotating ? 'opacity-30' : 'opacity-100'
                } ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]'}`}
              >
                {currentQuote}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span
                  className={`text-[9px] font-mono uppercase tracking-[0.2em] block ${
                    isDay ? 'text-[#b8860b]' : 'text-[#d4af37]/60'
                  }`}
                >
                  {t.speakerDude}
                </span>
                <span className="flex items-center space-x-1 text-[9px] font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                  <RefreshCw
                    className={`w-2.5 h-2.5 ${isRotating ? 'animate-spin' : ''} ${
                      isDay ? 'text-[#8c6508]' : 'text-[#d4af37]'
                    }`}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* High Score Badge */}
        <div
          className={`flex items-center space-x-2 mt-3 text-xs font-mono px-4 py-1.5 rounded border ${
            isDay
              ? 'bg-[#ede4d4] text-[#2c2017] border-[#b8860b]/30'
              : 'bg-[#1a140f] text-[#d4af37] border-[#d4af37]/30'
          }`}
        >
          <Trophy className={`w-3.5 h-3.5 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
          <span className="tracking-widest">{t.bestScore}: {stats.highScore.toString().padStart(6, '0')}</span>
        </div>
      </div>

      {/* Navigation Tabs (HOME vs TEN TURNS SELECT) */}
      <div className="relative z-10 w-full space-y-4">
        {selectedTab === 'HOME' ? (
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => onSelectTurn(stats.unlockedTurn || 1)}
              className={`w-full py-3.5 font-cinzel font-bold text-sm tracking-[0.25em] uppercase rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg ${
                isDay
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_20px_rgba(184,134,11,0.3)]'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.playTurn} {stats.unlockedTurn || 1}</span>
            </button>

            <button
              onClick={() => setSelectedTab('TURNS')}
              className={`w-full py-3 border font-serif font-medium text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/40 text-[#2c2017] hover:bg-[#b8860b]/15'
                  : 'bg-[#1a140f] border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
              }`}
            >
              <Eye className={`w-4 h-4 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`} />
              <span>{t.selectTurn}</span>
            </button>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={onOpenMeditate}
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all text-center ${
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
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all text-center ${
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
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all text-center ${
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
