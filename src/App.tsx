import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameStats, Cutscene, GameMode, TurnConfig, TurnId, DailyChallengeConfig } from './types/game';
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
import { GameOverModal } from './components/GameOverModal';
import { TopScoresModal } from './components/TopScoresModal';
import { TourModal } from './components/TourModal';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { getDailyChallengeConfig, saveDailyChallengeCompletion } from './utils/dailyChallenge';
import { getTopLeaderboardScore } from './utils/leaderboard';

type GameState = 'MENU' | 'CUTSCENE' | 'PLAYING' | 'TURN_X_ENDING' | 'GAME_OVER';
type ModalState = 'NONE' | 'MEDITATE' | 'SOUND_LAB' | 'GOSPEL_LORE' | 'TOP_SCORES' | 'TOUR';

const LOCAL_STORAGE_KEY = 'abide_ten_turns_stats_v1';
const FIRST_RUN_TOUR_KEY = 'abide_first_run_tour_seen_v1';

const ENDLESS_PALETTES = [
  { theme: '#8b5cf6', accent: '#fbbf24' },
  { theme: '#3b82f6', accent: '#38bdf8' },
  { theme: '#10b981', accent: '#6ee7b7' },
  { theme: '#ef4444', accent: '#fca5a5' },
  { theme: '#f59e0b', accent: '#fef08a' },
  { theme: '#a855f7', accent: '#e9d5ff' },
  { theme: '#ec4899', accent: '#fbcfe8' },
  { theme: '#06b6d4', accent: '#67e8f9' },
];

export default function App() {
  const { language, t, turnsConfig, getCutsceneForTurn } = useLanguage();
  const { isDay } = useTheme();

  // Game Stats & Storage
  const [stats, setStats] = useState<GameStats>(() => {
    const topScore = getTopLeaderboardScore();
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          highScore: topScore
        };
      }
    } catch {
      // Fallback
    }
    return {
      highScore: topScore,
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

  // Handle Leaderboard Reset
  const handleResetLeaderboard = useCallback(() => {
    setStats(prev => ({
      ...prev,
      highScore: 0
    }));
  }, []);

  // Primary App States
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [modalState, setModalState] = useState<ModalState>('NONE');
  const [gameMode, setGameMode] = useState<GameMode>('TURNS');
  const [currentTurnId, setCurrentTurnId] = useState<number>(1);
  const [wave, setWave] = useState<number>(1);
  const [highlightScoreId, setHighlightScoreId] = useState<string | undefined>(undefined);

  // Daily Challenge State
  const [dailyConfig, setDailyConfig] = useState<DailyChallengeConfig>(() => getDailyChallengeConfig());
  const [isDailyWin, setIsDailyWin] = useState<boolean>(false);
  const [dailyBonusAwarded, setDailyBonusAwarded] = useState<number>(0);

  // Auto-open Tour on first run if not seen yet
  useEffect(() => {
    try {
      const tourSeen = localStorage.getItem(FIRST_RUN_TOUR_KEY);
      if (!tourSeen) {
        setModalState('TOUR');
      }
    } catch {
      // Ignore
    }
  }, []);

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

  // Handle Level Select / Start 10 Turns Game
  const handleSelectTurn = useCallback((turnId: number, isFreshStart: boolean = false) => {
    setGameMode('TURNS');
    setCurrentTurnId(turnId);
    setLives(3);
    setAbideMeter(20);
    setIsAbideMode(false);
    setIsPaused(false);
    setIsDailyWin(false);
    setDailyBonusAwarded(0);
    if (isFreshStart) {
      setScore(0);
    }

    // Check if turn has a cutscene
    const cs = getCutsceneForTurn(turnId);
    if (cs) {
      setActiveCutscene(cs);
      setGameState('CUTSCENE');
    } else {
      setGameState('PLAYING');
    }
  }, [getCutsceneForTurn]);

  // Handle Start Endless Game
  const handleStartEndless = useCallback(() => {
    setGameMode('ENDLESS');
    setWave(1);
    setScore(0);
    setLives(3);
    setAbideMeter(20);
    setIsAbideMode(false);
    setIsPaused(false);
    setIsDailyWin(false);
    setDailyBonusAwarded(0);
    setGameState('PLAYING');
  }, []);

  // Handle Start Daily Challenge
  const handleStartDaily = useCallback(() => {
    const conf = getDailyChallengeConfig();
    setDailyConfig(conf);
    setGameMode('DAILY');
    setScore(0);
    setLives(3);
    setAbideMeter(conf.modifier === 'GOLDEN_ZEN' ? 50 : 20);
    setIsAbideMode(false);
    setIsPaused(false);
    setIsDailyWin(false);
    setDailyBonusAwarded(0);
    setGameState('PLAYING');
  }, []);

  // Handle Daily Challenge Win
  const handleDailyChallengeComplete = useCallback((finalScore: number, bonusScore: number) => {
    saveDailyChallengeCompletion(finalScore, bonusScore);
    setIsDailyWin(true);
    setDailyBonusAwarded(bonusScore);
    setGameState('GAME_OVER');
  }, []);

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
      handleSelectTurn(currentTurnId + 1, false);
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

  // Dynamic Endless Config
  const endlessTurnConfig: TurnConfig = useMemo(() => {
    const palette = ENDLESS_PALETTES[(wave - 1) % ENDLESS_PALETTES.length];
    return {
      id: 1 as TurnId,
      title: language === 'pt' ? `DIMENSÃO CÓSMICA ${wave}` : `COSMIC DIMENSION ${wave}`,
      subtitle: language === 'pt' ? `MODO INFINITO` : `ENDLESS MODE`,
      layer: 'INFINITO',
      description: language === 'pt' ? 'Ondas sem fim da Espiral Cósmica.' : 'Endless waves of the Cosmic Spiral.',
      themeColor: palette.theme,
      accentColor: palette.accent,
      ballSpeed: Math.min(8.5, 4.8 + (wave - 1) * 0.25),
      bgSymbol: '∞',
      quote: language === 'pt' ? 'A Espiral não tem começo nem fim.' : 'The Spiral has no beginning and no end.'
    };
  }, [wave, language]);

  // Dynamic Daily Config
  const dailyTurnConfig: TurnConfig = useMemo(() => {
    return {
      id: 777 as TurnId,
      title: language === 'pt' ? dailyConfig.titlePt : dailyConfig.titleEn,
      subtitle: language === 'pt' ? dailyConfig.subtitlePt : dailyConfig.subtitleEn,
      layer: language === 'pt' ? 'DESAFIO DIÁRIO' : 'DAILY CHALLENGE',
      description: language === 'pt' ? dailyConfig.descriptionPt : dailyConfig.descriptionEn,
      themeColor: dailyConfig.themeColor,
      accentColor: dailyConfig.accentColor,
      ballSpeed: dailyConfig.ballSpeed,
      bgSymbol: dailyConfig.bgSymbol,
      quote: language === 'pt' ? dailyConfig.modifierDescPt : dailyConfig.modifierDescEn
    };
  }, [dailyConfig, language]);

  const activeTurnConfig =
    gameMode === 'DAILY'
      ? dailyTurnConfig
      : gameMode === 'ENDLESS'
      ? endlessTurnConfig
      : turnsConfig[currentTurnId] || turnsConfig[1];

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
          onSelectTurn={(turnId) => handleSelectTurn(turnId, true)}
          onStartEndless={handleStartEndless}
          onStartDaily={handleStartDaily}
          onOpenMeditate={() => setModalState('MEDITATE')}
          onOpenSoundLab={() => setModalState('SOUND_LAB')}
          onOpenGospelLore={() => setModalState('GOSPEL_LORE')}
          onOpenTopScores={() => {
            setHighlightScoreId(undefined);
            setModalState('TOP_SCORES');
          }}
          onOpenTour={() => setModalState('TOUR')}
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
          className={`relative w-full h-full flex flex-col items-center justify-start pt-1 sm:pt-2 pb-1.5 px-2 max-w-xl mx-auto border-x-2 overflow-hidden transition-colors duration-300 ${
            isDay ? 'bg-[#f8f4eb] border-[#ede4d4]' : 'bg-[#0d0907] border-[#1a140f]'
          }`}
        >
          <div className="w-full max-w-[500px] flex flex-col items-center justify-start space-y-1 flex-1 min-h-0">
            <HUD
              turnConfig={activeTurnConfig}
              lives={lives}
              score={score}
              abideMeter={abideMeter}
              isAbideMode={isAbideMode}
              isMuted={isMuted}
              isPaused={isPaused}
              gameMode={gameMode}
              wave={wave}
              vibrationEnabled={vibrationEnabled}
              onToggleMute={handleToggleMute}
              onTogglePause={() => setIsPaused(prev => !prev)}
              onToggleVibration={() => setVibrationEnabled(prev => !prev)}
            />
            <CanvasGame
              turnConfig={activeTurnConfig}
              lives={lives}
              score={score}
              abideMeter={abideMeter}
              gameMode={gameMode}
              dailyConfig={dailyConfig}
              wave={wave}
              onWaveChange={setWave}
              onScoreUpdate={handleScoreUpdate}
              onLivesUpdate={setLives}
              onAbideUpdate={handleAbideUpdate}
              onTurnComplete={handleTurnComplete}
              onTurnXComplete={handleTurnXComplete}
              onDailyChallengeComplete={handleDailyChallengeComplete}
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
                if (gameMode === 'DAILY') {
                  handleStartDaily();
                } else if (gameMode === 'ENDLESS') {
                  handleStartEndless();
                } else {
                  handleSelectTurn(currentTurnId, true);
                }
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
          onFinish={() => setGameState('GAME_OVER')}
        />
      )}

      {/* 5. GAME OVER / END GAME STATE */}
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          score={score}
          turnId={gameMode === 'DAILY' ? 777 : gameMode === 'ENDLESS' ? 999 : currentTurnId}
          gameMode={gameMode}
          isDailyWin={isDailyWin}
          bonusAwarded={dailyBonusAwarded}
          onTryAgain={() => {
            if (gameMode === 'DAILY') {
              handleStartDaily();
            } else if (gameMode === 'ENDLESS') {
              handleStartEndless();
            } else {
              handleSelectTurn(currentTurnId, true);
            }
          }}
          onReturnToMenu={() => setGameState('MENU')}
          onOpenTopScores={(savedId) => {
            setHighlightScoreId(savedId);
            setModalState('TOP_SCORES');
          }}
        />
      )}

      {/* OPTIONAL MODALS */}
      {modalState === 'MEDITATE' && <MeditateModal onClose={() => setModalState('NONE')} />}
      {modalState === 'SOUND_LAB' && <SoundLabModal onClose={() => setModalState('NONE')} />}
      {modalState === 'GOSPEL_LORE' && <GospelLoreModal onClose={() => setModalState('NONE')} />}
      {modalState === 'TOP_SCORES' && (
        <TopScoresModal
          highlightId={highlightScoreId}
          onClose={() => setModalState('NONE')}
          onResetLeaderboard={handleResetLeaderboard}
        />
      )}
      {modalState === 'TOUR' && <TourModal onClose={() => setModalState('NONE')} />}
    </div>
  );
}

