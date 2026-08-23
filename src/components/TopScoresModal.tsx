import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types/game';
import { getLeaderboard, resetLeaderboard } from '../utils/leaderboard';
import { Trophy, Medal, X, RefreshCw, Award, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface TopScoresModalProps {
  onClose: () => void;
  highlightId?: string;
  onResetLeaderboard?: () => void;
}

export const TopScoresModal: React.FC<TopScoresModalProps> = ({
  onClose,
  highlightId,
  onResetLeaderboard
}) => {
  const { t, language } = useLanguage();
  const { isDay } = useTheme();
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);

  useEffect(() => {
    setScores(getLeaderboard());
  }, []);

  useEffect(() => {
    if (isConfirmingReset) {
      const timer = setTimeout(() => setIsConfirmingReset(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmingReset]);

  const handleResetClick = () => {
    if (!isConfirmingReset) {
      setIsConfirmingReset(true);
      return;
    }
    const emptyList = resetLeaderboard();
    setScores(emptyList);
    setIsConfirmingReset(false);
    onResetLeaderboard?.();
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
            isDay
              ? 'bg-gradient-to-tr from-[#d4af37] to-[#fef08a] text-[#2c2017] border border-[#b8860b]'
              : 'bg-gradient-to-tr from-[#eab308] to-[#fef08a] text-[#0d0907] border border-[#d4af37]'
          }`}
          title="#1 Champion"
        >
          <Trophy className="w-3.5 h-3.5" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
            isDay
              ? 'bg-gradient-to-tr from-[#9ca3af] to-[#e5e7eb] text-[#2c2017] border border-[#9ca3af]'
              : 'bg-gradient-to-tr from-[#9ca3af] to-[#f3f4f6] text-[#0d0907] border border-[#d1d5db]'
          }`}
          title="#2 Master"
        >
          <Medal className="w-3.5 h-3.5" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
            isDay
              ? 'bg-gradient-to-tr from-[#b45309] to-[#fcd34d] text-[#2c2017] border border-[#b45309]'
              : 'bg-gradient-to-tr from-[#b45309] to-[#fbbf24] text-[#0d0907] border border-[#d97706]'
          }`}
          title="#3 Adept"
        >
          <Award className="w-3.5 h-3.5" />
        </div>
      );
    }
    return (
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-semibold border ${
          isDay
            ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#8c6508]'
            : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37]/80'
        }`}
      >
        #{rank}
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/85' : 'bg-[#0d0907]/90'
      }`}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-2xl border-2 p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-b from-[#fcf9f2] to-[#f4ebe0] border-[#b8860b]/40 text-[#2c2017] shadow-[0_10px_40px_rgba(184,134,11,0.25)]'
            : 'bg-gradient-to-b from-[#18110b] to-[#0a0705] border-[#d4af37]/40 text-[#d4af37] shadow-[0_10px_40px_rgba(0,0,0,0.9)]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full border transition-all ${
            isDay
              ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#634e3f] hover:text-[#2c2017] hover:bg-[#b8860b]/20'
              : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37]/70 hover:text-[#d4af37] hover:bg-[#d4af37]/20'
          }`}
          title={t.close}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center pb-3 border-b border-inherit/20 mb-3">
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2 shadow-inner ${
              isDay ? 'border-[#b8860b] bg-[#ede4d4]' : 'border-[#d4af37] bg-[#1a140f]'
            }`}
          >
            <Trophy className={`w-5 h-5 ${isDay ? 'text-[#8c6508]' : 'text-[#d4af37]'}`} />
          </div>
          <h2 className="text-base sm:text-lg font-cinzel font-bold tracking-[0.2em] uppercase">
            {t.topScores}
          </h2>
          <p className={`text-[11px] font-serif italic mt-0.5 ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/70'}`}>
            {t.leaderboardSubtitle}
          </p>
        </div>

        {/* Scores List Header */}
        <div
          className={`grid grid-cols-12 gap-1 px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider mb-2 border ${
            isDay
              ? 'bg-[#ede4d4]/60 border-[#b8860b]/20 text-[#8c6508]'
              : 'bg-[#1a140f]/60 border-[#d4af37]/20 text-[#d4af37]/70'
          }`}
        >
          <span className="col-span-2 text-center">{t.rank}</span>
          <span className="col-span-5 text-left">{t.disciple}</span>
          <span className="col-span-3 text-right">{t.score}</span>
          <span className="col-span-2 text-center">{t.turnReached}</span>
        </div>

        {/* Scores List Body */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-[220px]">
          {scores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center space-y-2.5 px-4 my-auto">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center opacity-40 ${
                  isDay ? 'border-[#b8860b] bg-[#ede4d4]' : 'border-[#d4af37] bg-[#1a140f]'
                }`}
              >
                <Trophy className="w-6 h-6 opacity-60" />
              </div>
              <span className="text-xs font-cinzel font-semibold tracking-wider opacity-85">{t.noScoresYet}</span>
              <span className={`text-[11px] font-serif italic max-w-xs ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/60'}`}>
                {language === 'pt'
                  ? 'Jogue os 10 Giros ou o Modo Infinito para registrar suas primeiras pontuações sagradas!'
                  : 'Play the 10 Turns or Infinite Mode to record your first sacred scores!'}
              </span>
            </div>
          ) : (
            scores.map((entry, index) => {
              const rank = index + 1;
              const isHighlighted = highlightId === entry.id;

              return (
                <div
                  key={entry.id || index}
                  className={`grid grid-cols-12 gap-1 items-center px-3 py-2 rounded-xl border text-xs transition-all ${
                    isHighlighted
                      ? isDay
                        ? 'bg-[#b8860b]/25 border-[#b8860b] shadow-[0_0_12px_rgba(184,134,11,0.3)] ring-1 ring-[#b8860b]'
                        : 'bg-[#d4af37]/25 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] ring-1 ring-[#d4af37]'
                      : isDay
                      ? 'bg-[#fcf9f2] border-[#b8860b]/20 hover:border-[#b8860b]/50 hover:bg-[#ede4d4]/50'
                      : 'bg-[#120c08] border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:bg-[#1a140f]/70'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 flex items-center justify-center">
                    {getRankBadge(rank)}
                  </div>

                  {/* Name + Date */}
                  <div className="col-span-5 flex flex-col overflow-hidden text-left pl-1">
                    <span
                      className={`font-serif font-bold text-xs truncate ${
                        rank <= 3
                          ? isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]'
                          : isDay ? 'text-[#4a3b32]' : 'text-[#d4af37]/90'
                      }`}
                    >
                      {entry.name}
                    </span>
                    <span className={`text-[8px] font-mono opacity-50 truncate ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]'}`}>
                      {entry.date}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="col-span-3 text-right font-mono font-bold text-xs tracking-wider">
                    <span className={rank === 1 ? (isDay ? 'text-[#8c6508]' : 'text-[#fef08a]') : ''}>
                      {entry.score.toLocaleString()}
                    </span>
                  </div>

                  {/* Turn */}
                  <div className="col-span-2 text-center font-cinzel text-[10px] font-semibold">
                    <span
                      className={`px-1.5 py-0.5 rounded border ${
                        isDay
                          ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#8c6508]'
                          : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37]'
                      }`}
                    >
                      {entry.turn === 999 || entry.turn === 0 ? '∞' : entry.turn >= 10 ? 'X' : entry.turn}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 mt-2 border-t border-inherit/20 flex items-center justify-between">
          {scores.length > 0 ? (
            <button
              onClick={handleResetClick}
              type="button"
              className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg border transition-all flex items-center space-x-1.5 ${
                isConfirmingReset
                  ? 'bg-rose-500/20 border-rose-500 text-rose-500 animate-pulse font-bold'
                  : isDay
                  ? 'border-[#b8860b]/25 text-[#634e3f] opacity-60 hover:opacity-100 hover:border-[#b8860b]'
                  : 'border-[#d4af37]/25 text-[#f5deb3] opacity-60 hover:opacity-100 hover:border-[#d4af37]'
              }`}
              title="Reset scores"
            >
              {isConfirmingReset ? (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                  <span>{language === 'pt' ? 'Confirmar Limpeza?' : 'Confirm Clear?'}</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>{language === 'pt' ? 'Limpar Recordes' : 'Clear Scores'}</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-[9px] font-mono opacity-40 uppercase tracking-wider">
              {language === 'pt' ? '0 Recordes' : '0 Entries'}
            </div>
          )}

          <button
            onClick={onClose}
            className={`px-5 py-2 font-cinzel font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all ${
              isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#2c2017] hover:text-[#f8f4eb] border border-[#b8860b]/40 shadow-sm'
                : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border border-[#d4af37]/40 shadow-sm'
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

