import { useState, useEffect, useCallback } from 'react';
import { GameStats, Cutscene } from './types/game';
import { soundEngine } from './audio/soundEngine';
import { MainMenu } from './components/MainMenu';
import { CanvasGame } from './components/CanvasGame';
import { HUD } from './components/HUD';
import { DudeCutscene } from './components/DudeCutscene';
import { TurnXEnding } from './components/TurnXEnding';
import { MeditateModal } from './components/MeditateModal';
import { SoundLabModal } from './components/SoundLabModal';
import { GospelLoreModal } from './components/GospelLoreModal';
import { PauseModal } from './components/PauseModal';
import { RotateCcw, Home } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';

type GameState = 'MENU' | 'CUTSCENE' | 'PLAYING' | 'TURN_X_ENDING' | 'GAME_OVER';
type ModalState = 'NONE' | 'MEDITATE' | 'SOUND_LAB' | 'GOSPEL_LORE';

const LOCAL_STORAGE_KEY = 'abide_ten_turns_stats_v1';

export default function App() {
  const { t, turnsConfig, getCutsceneForTurn } = useLanguage();
  const { isDay } = useTheme();

  // Game Stats & Storage
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      highScore: 0,
      unlockedTurn: 1,
      turnsCompleted: [],
      totalAbideSeconds: 0,
      strikes: 0,
      ieouaCompleted: 0
    };
  });

  // Save Stats
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }, [stats]);

  // Primary App States
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [modalState, setModalState] = useState<ModalState>('NONE');
  const [currentTurnId, setCurrentTurnId] = useState<number>(1);

  // Active Gameplay Variables
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [abideMeter, setAbideMeter] = useState(20);
  const [isAbideMode, setIsAbideMode] = useState(false);

  // Pause & Settings
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Sync Audio Engine state when game is paused or unpaused
  useEffect(() => {
    if (gameState === 'PLAYING') {
      if (isPaused) {
        soundEngine.pause();
      } else {
        soundEngine.resume();
      }
    }
  }, [isPaused, gameState]);

  // Active Cutscene
  const [activeCutscene, setActiveCutscene] = useState<Cutscene | null>(null);

  // Toggle Mute
  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  // Handle Level Select / Start Game
  const handleSelectTurn = useCallback((turnId: number) => {
    setCurrentTurnId(turnId);
    setLives(3);
    setAbideMeter(20);
    setIsAbideMode(false);
    setIsPaused(false);

    // Check if turn has a cutscene
    const cs = getCutsceneForTurn(turnId);
    if (cs) {
      setActiveCutscene(cs);
      setGameState('CUTSCENE');
    } else {
      setGameState('PLAYING');
    }
  }, [getCutsceneForTurn]);

  // Cutscene Finished
  const handleCutsceneComplete = useCallback(() => {
    setActiveCutscene(null);
    setGameState('PLAYING');
  }, []);

  // Handle Score Update
  const handleScoreUpdate = useCallback((newScore: number) => {
    setScore(newScore);
    setStats(prev => {
      if (newScore > prev.highScore) {
        return { ...prev, highScore: newScore };
      }
      return prev;
    });
  }, []);

  // Handle Abide Meter Update
  const handleAbideUpdate = useCallback((action: number | ((prev: number) => number)) => {
    setAbideMeter(prev => {
      const nextVal = typeof action === 'function' ? action(prev) : action;
      return Math.max(0, Math.min(100, nextVal));
    });
  }, []);

  // Trigger Abide Mode when meter fills up
  useEffect(() => {
    if (abideMeter >= 100 && !isAbideMode) {
      setIsAbideMode(true);
      soundEngine.playAbideActivation();
      const timer = setTimeout(() => {
        setIsAbideMode(false);
        setAbideMeter(30);
      }, 12000); // 12s Abide Mode
      return () => clearTimeout(timer);
    }
  }, [abideMeter, isAbideMode]);

  // Turn Complete Handler (Turns 1 - 9)
  const handleTurnComplete = useCallback(() => {
    soundEngine.playAbideActivation();

    setStats(prev => {
      const nextUnlocked = Math.max(prev.unlockedTurn, currentTurnId + 1);
      const completed = Array.from(new Set([...prev.turnsCompleted, currentTurnId]));
      return {
        ...prev,
        unlockedTurn: Math.min(10, nextUnlocked),
        turnsCompleted: completed
      };
    });

    if (currentTurnId < 10) {
      handleSelectTurn(currentTurnId + 1);
    } else {
      setGameState('TURN_X_ENDING');
    }
  }, [currentTurnId, handleSelectTurn]);

  // Turn X Center Trigger Handler
  const handleTurnXComplete = useCallback(() => {
    setGameState('TURN_X_ENDING');
  }, []);

  // Game Over Handler
  const handleGameOver = useCallback(() => {
    setGameState('GAME_OVER');
  }, []);

  const currentTurnConfig = turnsConfig[currentTurnId] || turnsConfig[1];

  return (
    <div
      className={`w-full max-w-full h-screen flex flex-col items-center justify-center font-serif overflow-x-hidden overflow-y-hidden select-none transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb] text-[#2c2017]' : 'bg-[#0d0907] text-[#d4af37]'
      }`}
    >
      {/* 1. MAIN MENU STATE */}
      {gameState === 'MENU' && (
        <MainMenu
          stats={stats}
          onSelectTurn={handleSelectTurn}
          onOpenMeditate={() => setModalState('MEDITATE')}
          onOpenSoundLab={() => setModalState('SOUND_LAB')}
          onOpenGospelLore={() => setModalState('GOSPEL_LORE')}
        />
      )}

      {/* 2. CUTSCENE STATE */}
      {gameState === 'CUTSCENE' && activeCutscene && (
        <DudeCutscene
          cutscene={activeCutscene}
          onComplete={handleCutsceneComplete}
        />
      )}

      {/* 3. PLAYING GAME STATE */}
      {gameState === 'PLAYING' && (
        <div
          className={`relative w-full h-full flex flex-col items-center justify-start pt-1 sm:pt-2.5 pb-2 px-2 max-w-lg mx-auto border-x-2 overflow-hidden transition-colors duration-300 ${
            isDay ? 'bg-[#f8f4eb] border-[#ede4d4]' : 'bg-[#0d0907] border-[#1a140f]'
          }`}
        >
          <div className="w-full max-w-[480px] flex flex-col items-center justify-start space-y-1.5 flex-1 min-h-0">
            <HUD
              turnConfig={currentTurnConfig}
              lives={lives}
              score={score}
              abideMeter={abideMeter}
              isAbideMode={isAbideMode}
              isMuted={isMuted}
              isPaused={isPaused}
              vibrationEnabled={vibrationEnabled}
              onToggleMute={handleToggleMute}
              onTogglePause={() => setIsPaused(prev => !prev)}
              onToggleVibration={() => setVibrationEnabled(prev => !prev)}
            />

            <CanvasGame
              turnConfig={currentTurnConfig}
              lives={lives}
              score={score}
              abideMeter={abideMeter}
              onScoreUpdate={handleScoreUpdate}
              onLivesUpdate={setLives}
              onAbideUpdate={handleAbideUpdate}
              onTurnComplete={handleTurnComplete}
              onTurnXComplete={handleTurnXComplete}
              onGameOver={handleGameOver}
              isPaused={isPaused}
              isAbideMode={isAbideMode}
              setIsAbideMode={setIsAbideMode}
              vibrationEnabled={vibrationEnabled}
            />
          </div>

          {/* Pause Modal */}
          {isPaused && (
            <PauseModal
              onResume={() => setIsPaused(false)}
              onRestartTurn={() => {
                setIsPaused(false);
                handleSelectTurn(currentTurnId);
              }}
              onReturnToMenu={() => {
                setIsPaused(false);
                setGameState('MENU');
              }}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              vibrationEnabled={vibrationEnabled}
              onToggleVibration={() => setVibrationEnabled(prev => !prev)}
            />
          )}
        </div>
      )}

      {/* 4. TURN X ENDING CINEMATIC */}
      {gameState === 'TURN_X_ENDING' && (
        <TurnXEnding
          onFinish={() => setGameState('MENU')}
        />
      )}

      {/* 5. GAME OVER STATE */}
      {gameState === 'GAME_OVER' && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl transition-colors duration-300 ${
            isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
          }`}
        >
          <div
            className={`w-full max-w-xs rounded-2xl border-2 p-6 flex flex-col items-center text-center space-y-4 shadow-2xl transition-all ${
              isDay
                ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_50px_rgba(184,134,11,0.2)]'
                : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.25)]'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                isDay ? 'border-[#b8860b] bg-[#ede4d4]' : 'border-[#d4af37] bg-[#1a140f]'
              }`}
            >
              <span className="text-2xl filter contrast-125">🧘‍♂️</span>
            </div>
            <h2
              className={`text-sm font-cinzel font-bold tracking-[0.25em] uppercase ${
                isDay ? 'text-[#2c2017]' : 'text-[#d4af37]'
              }`}
            >
              {t.gameOverTitle}
            </h2>
            <p className={`text-xs font-serif italic leading-relaxed ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
              {t.gameOverQuote}
            </p>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => handleSelectTurn(currentTurnId)}
                className={`w-full py-3 font-cinzel font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2 ${
                  isDay
                    ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#f5deb3] text-[#0d0907] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.tryAgain} {currentTurnId}</span>
              </button>

              <button
                onClick={() => setGameState('MENU')}
                className={`w-full py-2.5 border font-serif font-semibold text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  isDay
                    ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/15'
                    : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t.returnToMenu}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OPTIONAL MODALS */}
      {modalState === 'MEDITATE' && <MeditateModal onClose={() => setModalState('NONE')} />}
      {modalState === 'SOUND_LAB' && <SoundLabModal onClose={() => setModalState('NONE')} />}
      {modalState === 'GOSPEL_LORE' && <GospelLoreModal onClose={() => setModalState('NONE')} />}
    </div>
  );
}
