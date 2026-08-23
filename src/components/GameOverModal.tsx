import React, { useState, useEffect } from 'react';
import { RotateCcw, Home, Trophy, Sparkles, Check, Calendar, Flame, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getLastPlayerName, isTopScore, saveLeaderboardScore } from '../utils/leaderboard';
import { getTimeUntilNextDailyChallenge, getDailyChallengeRecord } from '../utils/dailyChallenge';

interface GameOverModalProps {
  score: number;
  turnId: number;
  gameMode?: 'TURNS' | 'ENDLESS' | 'DAILY';
  isDailyWin?: boolean;
  bonusAwarded?: number;
  onTryAgain: () => void;
  onReturnToMenu: () => void;
  onOpenTopScores: (savedId?: string) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  turnId,
  gameMode = 'TURNS',
  isDailyWin = false,
  bonusAwarded = 0,
  onTryAgain,
  onReturnToMenu,
  onOpenTopScores
}) => {
  const { t, language } = useLanguage();
  const { isDay } = useTheme();

  const [playerName, setPlayerName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [savedEntryId, setSavedEntryId] = useState<string | undefined>(undefined);
  const [isTopTen, setIsTopTen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(() => getTimeUntilNextDailyChallenge().formatted);
  const [dailyRecord, setDailyRecord] = useState(() => getDailyChallengeRecord());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilNextDailyChallenge().formatted);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lastName = getLastPlayerName();
    if (lastName) {
      setPlayerName(lastName);
    } else {
      setPlayerName(language === 'pt' ? 'Discípulo' : 'The Disciple');
    }
    setIsTopTen(isTopScore(score));
    setDailyRecord(getDailyChallengeRecord());
  }, [score, language]);

  const handleSaveScore = (autoNavigateToTopScores: boolean = false) => {
    if (isSaved) {
      if (autoNavigateToTopScores) onOpenTopScores(savedEntryId);
      return;
    }

    const trimmed = playerName.trim() || (language === 'pt' ? 'Discípulo' : 'The Disciple');
    const result = saveLeaderboardScore(trimmed, score, gameMode === 'DAILY' ? 777 : turnId);
    const createdId = result.entries.find(e => e.score === Math.floor(score) && e.name === trimmed)?.id;
    
    setIsSaved(true);
    setSavedEntryId(createdId);

    if (autoNavigateToTopScores) {
      onOpenTopScores(createdId);
    }
  };

  const handleTryAgainClick = () => {
    if (!isSaved && score > 0) {
      handleSaveScore(false);
    }
    onTryAgain();
  };

  const handleReturnToMenuClick = () => {
    if (!isSaved && score > 0) {
      handleSaveScore(false);
    }
    onReturnToMenu();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-2xl border-2 p-6 flex flex-col items-center text-center space-y-4 shadow-2xl transition-all ${
          isDay
            ? 'bg-[#fcf9f2] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_50px_rgba(184,134,11,0.25)]'
            : 'bg-[#120c08] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.35)]'
        }`}
      >
        {/* Sacred Bowling Ball or Daily Icon */}
        <div
          className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-inner ${
            isDay ? 'border-[#b8860b] bg-[#ede4d4]' : 'border-[#d4af37] bg-[#1a140f]'
          }`}
        >
          <span className="text-2xl filter contrast-125 select-none">
            {gameMode === 'DAILY' ? (isDailyWin ? '⚡' : '✨') : '🎳'}
          </span>
        </div>

        <div>
          <h2
            className={`text-sm font-cinzel font-bold tracking-[0.25em] uppercase ${
              isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
            }`}
          >
            {gameMode === 'DAILY'
              ? (isDailyWin ? t.dailyChallengeVictory : t.dailyChallenge)
              : t.gameOverTitle}
          </h2>
          <p className={`text-[11px] font-serif italic mt-1 leading-relaxed ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
            {gameMode === 'DAILY'
              ? (isDailyWin
                  ? (language === 'pt' ? 'O alinhamento cósmico diário foi completado com maestria!' : 'Today’s sacred alignment was completed with mastery!')
                  : (language === 'pt' ? 'A Espiral convida a tentar novamente hoje.' : 'The Spiral invites another attempt today.'))
              : t.gameOverQuote}
          </p>
        </div>

        {/* Daily Bonus Awarded Banner if Daily Challenge Win */}
        {gameMode === 'DAILY' && bonusAwarded > 0 && (
          <div
            className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-cinzel font-bold uppercase tracking-wider animate-pulse ${
              isDay
                ? 'bg-[#b8860b]/15 text-[#8c6508] border-[#b8860b]/40 shadow-[0_0_12px_rgba(184,134,11,0.2)]'
                : 'bg-[#d4af37]/20 text-[#fef08a] border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>+{bonusAwarded.toLocaleString()} {t.dailyBonusScore}</span>
          </div>
        )}

        {/* Score & Turn Summary Banner */}
        <div
          className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-around font-mono text-xs shadow-inner ${
            isDay
              ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017]'
              : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37]'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-widest opacity-60">{t.score}</span>
            <span className="font-bold text-sm text-[#b8860b] dark:text-[#fef08a]">
              {score.toLocaleString()}
            </span>
          </div>
          <div className="h-6 w-px bg-inherit/30" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-widest opacity-60">
              {gameMode === 'ENDLESS' ? t.endlessBtn : gameMode === 'DAILY' ? t.dailyStreak : t.turnLabel}
            </span>
            <span className="font-bold text-sm flex items-center space-x-1">
              {gameMode === 'DAILY' ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                  <span>{dailyRecord.currentStreak} {t.daysStreak}</span>
                </>
              ) : gameMode === 'ENDLESS' || turnId === 999 ? (
                '∞'
              ) : turnId >= 10 ? (
                'X'
              ) : (
                turnId
              )}
            </span>
          </div>
        </div>

        {/* Daily Countdown Box when in Daily Mode */}
        {gameMode === 'DAILY' && (
          <div
            className={`w-full py-1.5 px-3 rounded-lg border text-[10px] font-mono flex items-center justify-between ${
              isDay
                ? 'bg-[#f5ede0] border-[#b8860b]/20 text-[#634e3f]'
                : 'bg-[#18110c] border-[#d4af37]/20 text-[#d4af37]/80'
            }`}
          >
            <span className="flex items-center space-x-1 font-serif uppercase tracking-wider text-[9px]">
              <Clock className="w-3 h-3 text-[#d4af37]" />
              <span>{t.nextChallengeIn}:</span>
            </span>
            <span className="font-bold text-xs text-[#b8860b] dark:text-[#fef08a]">
              {countdown}
            </span>
          </div>
        )}

        {/* Top 10 Celebration Badge */}
        {isTopTen && (
          <div
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-widest uppercase border animate-pulse ${
              isDay
                ? 'bg-[#b8860b]/15 text-[#8c6508] border-[#b8860b]/40'
                : 'bg-[#d4af37]/15 text-[#fef08a] border-[#d4af37]/40'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>{t.newHighScore}</span>
          </div>
        )}

        {/* Name Input Box for Sacred High Score Record */}
        <div className="w-full space-y-1.5 text-left">
          <label className={`text-[10px] font-serif uppercase tracking-widest font-semibold block ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
            {t.enterYourName}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              maxLength={20}
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder={t.namePlaceholder}
              className={`flex-1 px-3 py-2 text-xs font-serif rounded-xl border outline-none transition-all ${
                isDay
                  ? 'bg-[#fcf9f2] border-[#b8860b]/40 text-[#2c2017] focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]'
                  : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]'
              }`}
            />
            <button
              onClick={() => handleSaveScore(true)}
              type="button"
              className={`px-3 py-2 rounded-xl border text-[10px] font-cinzel font-bold uppercase tracking-wider transition-all flex items-center space-x-1 ${
                isSaved
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : isDay
                  ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#2c2017] hover:text-[#f8f4eb] border-[#b8860b]/40'
                  : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/40'
              }`}
              title={isSaved ? t.savedToLeaderboard : t.saveScore}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">OK</span>
                </>
              ) : (
                <>
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{t.saveScore}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2 pt-1">
          <button
            onClick={handleTryAgainClick}
            className={`w-full py-3 font-cinzel font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
              isDay
                ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>
              {gameMode === 'DAILY'
                ? t.replayDaily
                : gameMode === 'ENDLESS'
                ? t.tryAgain
                : `${t.tryAgain} ${turnId}`}
            </span>
          </button>

          <button
            onClick={() => onOpenTopScores(savedEntryId)}
            className={`w-full py-2.5 border font-cinzel font-semibold text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
            }`}
          >
            <Trophy className={`w-3.5 h-3.5 ${isDay ? 'text-[#8c6508]' : 'text-[#d4af37]'}`} />
            <span>{t.viewTopScores}</span>
          </button>

          <button
            onClick={handleReturnToMenuClick}
            className={`w-full py-2 border font-serif font-semibold text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 opacity-80 hover:opacity-100 cursor-pointer ${
              isDay
                ? 'border-[#b8860b]/20 text-[#634e3f] hover:bg-[#b8860b]/10'
                : 'border-[#d4af37]/20 text-[#d4af37]/70 hover:bg-[#d4af37]/10'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.returnToMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
