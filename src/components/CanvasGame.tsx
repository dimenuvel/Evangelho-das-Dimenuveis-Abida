import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TurnConfig, Block, Particle, PowerUp, FloatingText, ElementType, TurnId } from '../types/game';
import { soundEngine } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface CanvasGameProps {
  turnConfig: TurnConfig;
  lives: number;
  score: number;
  abideMeter: number;
  onScoreUpdate: (newScore: number) => void;
  onLivesUpdate: (newLives: number) => void;
  onAbideUpdate: (newAbide: number | ((prev: number) => number)) => void;
  onTurnComplete: () => void;
  onTurnXComplete: () => void;
  onGameOver: () => void;
  isPaused: boolean;
  isAbideMode: boolean;
  setIsAbideMode: (val: boolean) => void;
  vibrationEnabled: boolean;
}

const GAME_WIDTH = 480;
const GAME_HEIGHT = 440;
const IEOUA_SEQ: Array<'I' | 'E' | 'O' | 'U' | 'A'> = ['I', 'E', 'O', 'U', 'A'];

export const CanvasGame: React.FC<CanvasGameProps> = ({
  turnConfig,
  lives,
  score,
  abideMeter,
  onScoreUpdate,
  onLivesUpdate,
  onAbideUpdate,
  onTurnComplete,
  onTurnXComplete,
  onGameOver,
  isPaused,
  isAbideMode,
  setIsAbideMode,
  vibrationEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDay } = useTheme();
  const { t, language } = useLanguage();

  // Gameplay state refs
  const paddleRef = useRef({
    x: GAME_WIDTH / 2 - 45,
    y: GAME_HEIGHT - 30,
    width: 90,
    height: 14,
    targetX: GAME_WIDTH / 2 - 45,
    speed: 0,
    lastX: GAME_WIDTH / 2 - 45
  });

  const ballRef = useRef({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - 46,
    vx: 3,
    vy: -4.5,
    radius: 8,
    stuck: true,
    trail: [] as Array<{ x: number; y: number; color: string; size: number }>,
    fireMode: false
  });

  const blocksRef = useRef<Block[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  
  // States & powerups
  const ieouaIndexRef = useRef<number>(0);
  const activeElementsRef = useRef<{ fire: number; air: number; water: number; earth: number }>({
    fire: 0,
    air: 0,
    water: 0,
    earth: 0
  });

  // Void trap states
  const voidInvertedControlsRef = useRef<number>(0); // remaining frames
  const voidMessageRef = useRef<string | null>(null);

  // Turn X state
  const turnXEnteredCenterRef = useRef<boolean>(false);
  const turnXCenterOrbRef = useRef<{ x: number; y: number; radius: number; pulse: number }>({
    x: GAME_WIDTH / 2,
    y: 145,
    radius: 26,
    pulse: 0
  });

  // UI / HUD state
  const [ieouaDisplay, setIeouaDisplay] = useState<string[]>([]);
  const [activeWarning, setActiveWarning] = useState<string | null>(null);

  // Trigger vibration if supported
  const triggerHaptic = useCallback((ms: number = 25) => {
    if (vibrationEnabled && typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {
        // Ignore haptic errors
      }
    }
  }, [vibrationEnabled]);

  const stateRef = useRef({
    score,
    lives,
    isAbideMode,
    isDay,
    turnConfig,
    language,
    onScoreUpdate,
    onLivesUpdate,
    onAbideUpdate,
    onTurnComplete,
    onTurnXComplete,
    onGameOver,
    triggerHaptic
  });

  useEffect(() => {
    stateRef.current = {
      score,
      lives,
      isAbideMode,
      isDay,
      turnConfig,
      language,
      onScoreUpdate,
      onLivesUpdate,
      onAbideUpdate,
      onTurnComplete,
      onTurnXComplete,
      onGameOver,
      triggerHaptic
    };
  });

  // Spawn floating text on canvas
  const addFloatingText = (text: string, x: number, y: number, color: string = '#fbbf24', fontSize: number = 18) => {
    floatingTextsRef.current.push({
      id: Math.random().toString(),
      x,
      y,
      text,
      color,
      alpha: 1.0,
      fontSize,
      vy: -1.2
    });
  };

  // Build Blocks for Turn
  const initTurnBlocks = useCallback(() => {
    const turnId = turnConfig.id;
    const blocks: Block[] = [];
    const rows = turnId === 1 ? 3 : turnId === 10 ? 3 : 4;
    const cols = 7;
    const blockWidth = 56;
    const blockHeight = 16;
    const startX = (GAME_WIDTH - (cols * (blockWidth + 6) - 6)) / 2;
    const startY = 45;

    let idCounter = 0;

    if (turnId === 10) {
      // Turn X: Circle of bricks around central Golden Core
      const centerX = GAME_WIDTH / 2;
      const centerY = 145;
      const numRings = 2;
      const radiusStep = 32;

      for (let r = 1; r <= numRings; r++) {
        const radius = r * radiusStep + 20;
        const count = r * 8;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const bx = centerX + Math.cos(angle) * radius - blockWidth / 2;
          const by = centerY + Math.sin(angle) * radius - blockHeight / 2;

          blocks.push({
            id: `b_tx_${idCounter++}`,
            x: bx,
            y: by,
            width: blockWidth,
            height: blockHeight,
            type: 'normal',
            hitsRequired: 1,
            hitsTaken: 0,
            color: '#fbbf24',
            glowColor: 'rgba(251, 191, 36, 0.6)',
            visible: true
          });
        }
      }
      blocksRef.current = blocks;
      return;
    }

    // Standard & Theme-specific block layout
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Skip some slots for organic cosmic geometry
        if ((r + c) % 2 === 1 && turnId === 1) continue;
        if (r === 0 && (c === 0 || c === cols - 1) && turnId !== 5) continue;

        const bx = startX + c * (blockWidth + 6);
        const by = startY + r * (blockHeight + 5);

        let type: Block['type'] = 'normal';
        let hitsRequired = 1;
        let color = turnConfig.themeColor;
        let glowColor = turnConfig.accentColor;
        let visible = true;
        let elementType: ElementType | undefined;

        if (turnId === 2 && Math.random() < 0.4) {
          type = 'invisible'; // Eye that sees
          visible = false;
        } else if (turnId === 3) {
          type = 'energy'; // Pulsing energy drift
        } else if (turnId === 4) {
          type = 'connected'; // Heart connected
        } else if (turnId === 5 && r < 2) {
          type = 'armored';
          hitsRequired = 2;
          color = '#ea580c';
        } else if (turnId === 6) {
          type = 'element';
          const elems: ElementType[] = ['FIRE', 'AIR', 'WATER', 'EARTH'];
          elementType = elems[(r + c) % 4];
          color = elementType === 'FIRE' ? '#ef4444' : elementType === 'AIR' ? '#38bdf8' : elementType === 'WATER' ? '#3b82f6' : '#10b981';
        } else if (turnId === 7 && Math.random() < 0.25) {
          type = 'void_illusion'; // Fake void brick
          color = '#a855f7';
        }

        blocks.push({
          id: `b_${r}_${c}_${idCounter++}`,
          x: bx,
          y: by,
          width: blockWidth,
          height: blockHeight,
          type,
          elementType,
          hitsRequired,
          hitsTaken: 0,
          color,
          glowColor,
          visible,
          originalX: bx,
          originalY: by,
          dx: (c % 2 === 0 ? 1 : -1) * 0.8
        });
      }
    }

    // Add Bowling Pin Formations in select turns (2, 4, 6, 8)
    if ([2, 4, 6, 8].includes(turnId)) {
      const pinWidth = 16;
      const pinHeight = 22;
      const pinX = GAME_WIDTH / 2;
      const pinY = 40;

      // Triangle of 6 pins
      const pinPositions = [
        { x: pinX, y: pinY },
        { x: pinX - 14, y: pinY - 16 },
        { x: pinX + 14, y: pinY - 16 },
        { x: pinX - 28, y: pinY - 32 },
        { x: pinX, y: pinY - 32 },
        { x: pinX + 28, y: pinY - 32 }
      ];

      pinPositions.forEach((pos, idx) => {
        blocks.push({
          id: `pin_${idx}`,
          x: pos.x - pinWidth / 2,
          y: pos.y - pinHeight / 2,
          width: pinWidth,
          height: pinHeight,
          type: 'pin',
          hitsRequired: 1,
          hitsTaken: 0,
          color: '#ffffff',
          glowColor: 'rgba(251, 191, 36, 0.8)',
          visible: true,
          isPin: true
        });
      });
    }

    blocksRef.current = blocks;
  }, [turnConfig.id]);

  // Init Game State on Turn Mount
  useEffect(() => {
    initTurnBlocks();
    soundEngine.startAmbientDrone(turnConfig.id);

    // Reset paddle & ball
    paddleRef.current.x = GAME_WIDTH / 2 - 45;
    paddleRef.current.targetX = GAME_WIDTH / 2 - 45;
    ballRef.current.stuck = true;
    ballRef.current.x = GAME_WIDTH / 2;
    ballRef.current.y = GAME_HEIGHT - 46;
    ballRef.current.fireMode = false;

    // Reset Turn X center
    turnXEnteredCenterRef.current = false;

    return () => {
      soundEngine.stopAmbientDrone();
    };
  }, [turnConfig.id, initTurnBlocks]);

  // Release Ball Handler
  const launchBall = useCallback(() => {
    if (ballRef.current.stuck) {
      ballRef.current.stuck = false;
      const speed = turnConfig.ballSpeed;
      const angle = (Math.random() * 0.4 - 0.2) - Math.PI / 2; // slight angle upwards
      ballRef.current.vx = speed * Math.cos(angle);
      ballRef.current.vy = speed * Math.sin(angle);
      soundEngine.playPaddleHit(1.0);
    }
  }, [turnConfig.ballSpeed]);

  // Controls Event Listeners (Mouse / Touch / Keyboard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        const step = activeElementsRef.current.air > 0 ? 30 : 20;
        const dir = voidInvertedControlsRef.current > 0 ? 1 : -1;
        paddleRef.current.targetX = Math.max(0, paddleRef.current.targetX + step * dir);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        const step = activeElementsRef.current.air > 0 ? 30 : 20;
        const dir = voidInvertedControlsRef.current > 0 ? -1 : 1;
        paddleRef.current.targetX = Math.min(GAME_WIDTH - paddleRef.current.width, paddleRef.current.targetX + step * dir);
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        launchBall();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, launchBall]);

  // Canvas Mouse / Touch Move Handler
  const handlePointerMove = (clientX: number) => {
    if (isPaused || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const canvasX = (clientX - rect.left) * scaleX;

    let targetX = canvasX - paddleRef.current.width / 2;

    if (voidInvertedControlsRef.current > 0) {
      // Inverted void control!
      targetX = GAME_WIDTH - targetX - paddleRef.current.width;
    }

    paddleRef.current.targetX = Math.max(0, Math.min(GAME_WIDTH - paddleRef.current.width, targetX));
  };

  // Main Canvas Render Loop
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!isPaused) {
        // --- 1. UPDATE GAME PHYSICS & LOGIC --- //

        // Active Element timers decay
        if (activeElementsRef.current.fire > 0) activeElementsRef.current.fire--;
        if (activeElementsRef.current.air > 0) activeElementsRef.current.air--;
        if (activeElementsRef.current.water > 0) activeElementsRef.current.water--;
        if (activeElementsRef.current.earth > 0) activeElementsRef.current.earth--;

        if (voidInvertedControlsRef.current > 0) voidInvertedControlsRef.current--;

        // Update Paddle size based on Abide Mode / Water Element
        const baseWidth = stateRef.current.isAbideMode ? 130 : activeElementsRef.current.water > 0 ? 120 : 90;
        paddleRef.current.width += (baseWidth - paddleRef.current.width) * 0.1;

        // Smooth paddle motion
        const p = paddleRef.current;
        p.speed = p.targetX - p.x;
        p.x += p.speed * 0.25;

        // Check frantic excessive motion penalty
        if (Math.abs(p.speed) > 28 && !ballRef.current.stuck) {
          stateRef.current.onAbideUpdate(prev => Math.max(0, prev - 0.05));
        }

        const b = ballRef.current;

        if (b.stuck) {
          b.x = p.x + p.width / 2;
          b.y = p.y - b.radius - 2;
        } else {
          // Move ball
          b.x += b.vx;
          b.y += b.vy;

          // Ball Trail
          b.trail.unshift({
            x: b.x,
            y: b.y,
            color: stateRef.current.isAbideMode ? '#fbbf24' : stateRef.current.turnConfig.accentColor,
            size: b.radius
          });
          if (b.trail.length > 12) b.trail.pop();

          // Wall Collisions
          if (b.x - b.radius <= 0) {
            b.x = b.radius;
            b.vx = Math.abs(b.vx);
            soundEngine.playPaddleHit(0.5);
          } else if (b.x + b.radius >= GAME_WIDTH) {
            b.x = GAME_WIDTH - b.radius;
            b.vx = -Math.abs(b.vx);
            soundEngine.playPaddleHit(0.5);
          }

          if (b.y - b.radius <= 0) {
            b.y = b.radius;
            b.vy = Math.abs(b.vy);
            soundEngine.playPaddleHit(0.6);
          }

          // Bottom Loss OR Earth Protection Grid
          if (b.y + b.radius >= GAME_HEIGHT) {
            if (activeElementsRef.current.earth > 0) {
              // Earth barrier save!
              b.vy = -Math.abs(b.vy);
              activeElementsRef.current.earth = 0; // consumed
              addFloatingText('EARTH PROTECTS', b.x, GAME_HEIGHT - 30, '#10b981', 20);
              soundEngine.playPowerUp('EARTH');
              stateRef.current.triggerHaptic(50);
            } else {
              // Ball Lost!
              soundEngine.playBallLost();
              stateRef.current.onLivesUpdate(stateRef.current.lives - 1);
              stateRef.current.onAbideUpdate(prev => Math.max(0, prev - 25));
              stateRef.current.triggerHaptic(100);

              if (stateRef.current.lives - 1 <= 0) {
                stateRef.current.onGameOver();
              } else {
                b.stuck = true;
                b.x = p.x + p.width / 2;
                b.y = p.y - b.radius - 2;
              }
            }
          }

          // Paddle Collision
          if (
            b.y + b.radius >= p.y &&
            b.y - b.radius <= p.y + p.height &&
            b.x + b.radius >= p.x &&
            b.x - b.radius <= p.x + p.width &&
            b.vy > 0
          ) {
            b.y = p.y - b.radius;

            // Hit angle relative to center of rug
            const hitPos = (b.x - (p.x + p.width / 2)) / (p.width / 2);
            const maxAngle = (60 * Math.PI) / 180;
            const angle = hitPos * maxAngle;
            const currentSpeed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);

            b.vx = currentSpeed * Math.sin(angle);
            b.vy = -currentSpeed * Math.cos(angle);

            soundEngine.playPaddleHit(Math.abs(hitPos) + 0.8);
            stateRef.current.triggerHaptic(15);

            // Abide meter gain on good paddle bounce
            stateRef.current.onAbideUpdate(prev => Math.min(100, prev + 3));

            // Floating "ABIDE/ABIDA" message check
            if (Math.random() < 0.15) {
              addFloatingText(stateRef.current.language === 'pt' ? 'O TAPETE ABIDA' : 'THE RUG ABIDES', p.x + p.width / 2 - 40, p.y - 15, '#fbbf24', 14);
            }
          }

          // --- BLOCK COLLISIONS --- //
          const blocks = blocksRef.current;
          let activePinsCount = 0;
          let remainingNormalBlocks = 0;

          blocks.forEach(block => {
            if (block.isPin && block.visible) activePinsCount++;
            if (!block.isPin && block.visible) remainingNormalBlocks++;

            if (!block.visible) return;

            // Turn II: Vision - reveal invisible blocks when ball approaches!
            if (block.type === 'invisible' && !block.visible) {
              const dist = Math.hypot(b.x - (block.x + block.width / 2), b.y - (block.y + block.height / 2));
              if (dist < 110) block.visible = true;
            }

            // AABB Collision check
            if (
              b.x + b.radius >= block.x &&
              b.x - b.radius <= block.x + block.width &&
              b.y + b.radius >= block.y &&
              b.y - b.radius <= block.y + block.height
            ) {
              // Void Illusion check
              if (block.type === 'void_illusion') {
                block.visible = false;
                soundEngine.playVoidTrigger();
                addFloatingText('ILLUSION', block.x, block.y, '#c084fc', 16);
                stateRef.current.onAbideUpdate(prev => Math.max(0, prev - 10));

                if (Math.random() < 0.5) {
                  voidInvertedControlsRef.current = 240; // 4 seconds inverted
                  setActiveWarning(stateRef.current.language === 'pt' ? 'RECONHEÇA O PADRÃO' : 'RECOGNIZE THE PATTERN');
                  setTimeout(() => setActiveWarning(null), 3000);
                }
                return;
              }

              // Normal / Armored / Pin hit
              block.hitsTaken++;
              soundEngine.playBlockHit(1 + block.hitsTaken * 0.2);

              if (block.isPin) {
                soundEngine.playPinStrike();
                stateRef.current.triggerHaptic(40);
                addFloatingText('STRIKE!', block.x, block.y, '#fbbf24', 20);
                stateRef.current.onScoreUpdate(stateRef.current.score + 150);
                stateRef.current.onAbideUpdate(prev => Math.min(100, prev + 10));
              }

              if (block.hitsTaken >= block.hitsRequired) {
                block.visible = false;
                stateRef.current.onScoreUpdate(stateRef.current.score + 100);

                // Spawn particles
                for (let i = 0; i < 8; i++) {
                  particlesRef.current.push({
                    x: block.x + block.width / 2,
                    y: block.y + block.height / 2,
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    size: Math.random() * 4 + 2,
                    color: block.glowColor,
                    alpha: 1.0,
                    decay: 0.03
                  });
                }

                // Elemental PowerUp drop check
                if (block.type === 'element' && block.elementType) {
                  powerUpsRef.current.push({
                    id: Math.random().toString(),
                    x: block.x + block.width / 2,
                    y: block.y + block.height / 2,
                    vy: 2.2,
                    type: block.elementType,
                    size: 14
                  });
                }

                // IEOUA Chain Sequence advancement
                const currVowel = IEOUA_SEQ[ieouaIndexRef.current];
                if (currVowel) {
                  soundEngine.playIEOUAVowel(currVowel, ieouaIndexRef.current + 1);
                  addFloatingText(currVowel, block.x + block.width / 2, block.y, '#38bdf8', 22);

                  const nextSeq = [...ieouaDisplay, currVowel];
                  setIeouaDisplay(nextSeq);
                  ieouaIndexRef.current++;

                  if (ieouaIndexRef.current >= IEOUA_SEQ.length) {
                    // IEOUA Sequence Completed!
                    ieouaIndexRef.current = 0;
                    setIeouaDisplay([]);
                    addFloatingText('I E O U A  HARMONY', GAME_WIDTH / 2 - 80, 200, '#fbbf24', 24);
                    stateRef.current.onScoreUpdate(stateRef.current.score + 500);
                    stateRef.current.onAbideUpdate(prev => Math.min(100, prev + 25));
                    soundEngine.playIEOUASequenceComplete();
                  }
                }
              }

              // Bounce velocity response (unless in Fire Mode)
              if (!b.fireMode && activeElementsRef.current.fire === 0) {
                // Determine collision side
                const overlapLeft = (b.x + b.radius) - block.x;
                const overlapRight = (block.x + block.width) - (b.x - b.radius);
                const overlapTop = (b.y + b.radius) - block.y;
                const overlapBottom = (block.y + block.height) - (b.y - b.radius);

                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                  b.vx = -b.vx;
                } else {
                  b.vy = -b.vy;
                }
              }
            }
          });

          // Check Strike bonus if all pins cleared
          if ([2, 4, 6, 8].includes(stateRef.current.turnConfig.id) && activePinsCount === 0 && blocks.some(bl => bl.isPin)) {
            addFloatingText(stateRef.current.language === 'pt' ? 'ABIDA — STRIKE PERFEITO' : 'ABIDE — PERFECT STRIKE', GAME_WIDTH / 2 - 90, 180, '#fbbf24', 22);
            stateRef.current.onScoreUpdate(stateRef.current.score + 1000);
            stateRef.current.onAbideUpdate(prev => Math.min(100, prev + 30));
          }

          // Check Turn Completion condition (except Turn X)
          if (stateRef.current.turnConfig.id !== 10 && remainingNormalBlocks === 0) {
            stateRef.current.onTurnComplete();
          }

          // --- TURN X: RETURN TO CENTER LOGIC --- //
          if (stateRef.current.turnConfig.id === 10 && !turnXEnteredCenterRef.current) {
            const center = turnXCenterOrbRef.current;
            const distToCenter = Math.hypot(b.x - center.x, b.y - center.y);

            center.pulse += 0.05;

            if (distToCenter <= center.radius) {
              // Ball entered center spiral!
              turnXEnteredCenterRef.current = true;
              b.vx = 0;
              b.vy = 0;
              b.x = center.x;
              b.y = center.y;
              soundEngine.playAbideActivation();
              stateRef.current.onTurnXComplete();
            }
          }
        }

        // --- UPDATE POWERUPS --- //
        powerUpsRef.current.forEach((pw, idx) => {
          pw.y += pw.vy;
          // Catch with paddle
          if (
            pw.y + pw.size >= p.y &&
            pw.x >= p.x &&
            pw.x <= p.x + p.width
          ) {
            soundEngine.playPowerUp(pw.type);
            addFloatingText(`${pw.type} ELEMENT`, pw.x, pw.y, '#38bdf8', 16);

            if (pw.type === 'FIRE') activeElementsRef.current.fire = 300; // 5s
            if (pw.type === 'AIR') activeElementsRef.current.air = 300;
            if (pw.type === 'WATER') activeElementsRef.current.water = 300;
            if (pw.type === 'EARTH') activeElementsRef.current.earth = 600;

            powerUpsRef.current.splice(idx, 1);
          } else if (pw.y > GAME_HEIGHT) {
            powerUpsRef.current.splice(idx, 1);
          }
        });

        // --- UPDATE PARTICLES --- //
        particlesRef.current.forEach((part, idx) => {
          part.x += part.vx;
          part.y += part.vy;
          part.alpha -= part.decay;
          if (part.alpha <= 0) particlesRef.current.splice(idx, 1);
        });

        // --- UPDATE FLOATING TEXTS --- //
        floatingTextsRef.current.forEach((ft, idx) => {
          ft.y += ft.vy;
          ft.alpha -= 0.02;
          if (ft.alpha <= 0) floatingTextsRef.current.splice(idx, 1);
        });
      }

      // --- 2. RENDER CANVAS SCENE --      // Background Clear
      ctx.fillStyle = stateRef.current.isDay ? '#f5efe6' : '#09080e'; // Warm serene linen or deep mystical obsidian
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Render Ambient Cosmic Stars & Sacred Geometry Grid
      ctx.strokeStyle = stateRef.current.isDay ? 'rgba(184, 134, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < GAME_WIDTH; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.stroke();
      }

      // Background Golden Spiral Pattern
      ctx.save();
      ctx.translate(GAME_WIDTH / 2, GAME_HEIGHT / 2);
      ctx.strokeStyle = stateRef.current.isAbideMode
        ? (stateRef.current.isDay ? 'rgba(184, 134, 11, 0.3)' : 'rgba(251, 191, 36, 0.15)')
        : (stateRef.current.isDay ? 'rgba(184, 134, 11, 0.12)' : 'rgba(139, 92, 246, 0.06)');
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        const angle = 0.1 * i;
        const r = 2 * angle;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Earth Barrier Grid if active
      if (activeElementsRef.current.earth > 0) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, GAME_HEIGHT - 6);
        ctx.lineTo(GAME_WIDTH, GAME_HEIGHT - 6);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Turn X Central Golden Spiral Core
      if (stateRef.current.turnConfig.id === 10) {
        const center = turnXCenterOrbRef.current;
        ctx.save();
        ctx.translate(center.x, center.y);

        const glowRad = center.radius + Math.sin(center.pulse) * 8;
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, glowRad + 20);
        grad.addColorStop(0, '#fbbf24');
        grad.addColorStop(0.5, '#f59e0b');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, glowRad + 20, 0, Math.PI * 2);
        ctx.fill();

        // Inner golden spiral icon
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 80; i++) {
          const a = 0.15 * i + center.pulse;
          const r = 0.4 * i;
          ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
        }
        ctx.stroke();

        ctx.restore();
      }

      // Render Blocks & Bowling Pins
      blocksRef.current.forEach(block => {
        if (!block.visible) return;

        ctx.save();
        ctx.fillStyle = block.color;
        ctx.shadowColor = block.glowColor;
        ctx.shadowBlur = stateRef.current.isAbideMode ? 15 : 8;

        if (block.isPin) {
          // Render Sacred Geometric Bowling Pin
          ctx.beginPath();
          ctx.arc(block.x + block.width / 2, block.y + 6, 5, 0, Math.PI * 2); // Pin head
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(block.x + block.width / 2 - 4, block.y + 8);
          ctx.lineTo(block.x + block.width / 2 + 4, block.y + 8);
          ctx.lineTo(block.x + block.width, block.y + block.height);
          ctx.lineTo(block.x, block.y + block.height);
          ctx.closePath();
          ctx.fill();

          // Red stripe
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(block.x + 3, block.y + 12, block.width - 6, 3);
        } else {
          // Render Runic Brick
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ffffff33';
          ctx.beginPath();
          ctx.roundRect(block.x, block.y, block.width, block.height, 4);
          ctx.fill();
          ctx.stroke();

          // Armored rune indicator
          if (block.type === 'armored') {
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(block.hitsRequired - block.hitsTaken === 2 ? 'ᛟ' : 'ᛉ', block.x + block.width / 2, block.y + 15);
          }
        }
        ctx.restore();
      });

      // Render Falling PowerUps
      powerUpsRef.current.forEach(pw => {
        ctx.save();
        ctx.fillStyle = pw.type === 'FIRE' ? '#ef4444' : pw.type === 'AIR' ? '#38bdf8' : pw.type === 'WATER' ? '#3b82f6' : '#10b981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(pw.x, pw.y, pw.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px bold sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pw.type[0], pw.x, pw.y);
        ctx.restore();
      });

      // Render Ball Trail
      const b = ballRef.current;
      b.trail.forEach((tr, i) => {
        ctx.save();
        const alpha = (1 - i / b.trail.length) * 0.5;
        ctx.fillStyle = tr.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.size * (1 - i / (b.trail.length * 1.5)), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Glowing Bowling Ball (Awareness)
      ctx.save();
      const ballGrad = ctx.createRadialGradient(
        b.x - 2,
        b.y - 2,
        1,
        b.x,
        b.y,
        b.radius
      );
      if (stateRef.current.isAbideMode) {
        ballGrad.addColorStop(0, '#ffffff');
        ballGrad.addColorStop(0.5, '#fbbf24');
        ballGrad.addColorStop(1, '#d97706');
      } else {
        ballGrad.addColorStop(0, '#ffffff');
        ballGrad.addColorStop(0.6, stateRef.current.turnConfig.themeColor);
        ballGrad.addColorStop(1, '#1e1b4b');
      }

      ctx.fillStyle = ballGrad;
      ctx.shadowColor = stateRef.current.isAbideMode ? '#fbbf24' : stateRef.current.turnConfig.accentColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Finger holes
      ctx.fillStyle = '#00000088';
      ctx.beginPath();
      ctx.arc(b.x - 2, b.y - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(b.x + 2, b.y - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(b.x, b.y + 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Paddle (The Rug)
      const p = paddleRef.current;
      ctx.save();
      ctx.shadowColor = stateRef.current.isAbideMode ? '#fbbf24' : 'rgba(139, 92, 246, 0.6)';
      ctx.shadowBlur = stateRef.current.isAbideMode ? 20 : 10;

      // Base Carpet Body
      const rugGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.width, p.y);
      rugGrad.addColorStop(0, '#7c2d12');  // Deep ruby red
      rugGrad.addColorStop(0.5, '#b45309'); // Antique amber gold
      rugGrad.addColorStop(1, '#7c2d12');

      ctx.fillStyle = rugGrad;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 4);
      ctx.fill();

      // Golden Woven Fringe at Edges
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(p.x - 3, p.y + 2, 3, p.height - 4);
      ctx.fillRect(p.x + p.width, p.y + 2, 3, p.height - 4);

      // Central Golden Spiral Rug Motif
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const rugCenterX = p.x + p.width / 2;
      const rugCenterY = p.y + p.height / 2;
      for (let i = 0; i < 20; i++) {
        const a = 0.3 * i;
        const r = 0.3 * i;
        ctx.lineTo(rugCenterX + r * Math.cos(a), rugCenterY + r * Math.sin(a));
      }
      ctx.stroke();
      ctx.restore();

      // Render Particles
      particlesRef.current.forEach(part => {
        ctx.save();
        ctx.fillStyle = part.color;
        ctx.globalAlpha = part.alpha;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Floating Texts
      floatingTextsRef.current.forEach(ft => {
        ctx.save();
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = ft.alpha;
        ctx.font = `bold ${ft.fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div className="relative w-full max-w-[480px] flex flex-col items-center select-none touch-none">
      {/* Top Header Bar with IEOUA and Active Warnings */}
      <div className="w-full flex items-center justify-between px-1 mb-1.5 min-h-[28px] z-20">
        {/* IEOUA Sequence Indicator Badge */}
        <div
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs tracking-wider font-mono ${
            isDay
              ? 'bg-[#ede4d4]/90 border-[#b8860b]/40 text-[#2c2017]'
              : 'bg-black/60 border-amber-500/30 text-amber-300'
          }`}
        >
          <span className={`text-[10px] ${isDay ? 'text-[#634e3f]' : 'text-gray-400'}`}>IEOUA:</span>
          {IEOUA_SEQ.map((vowel, idx) => (
            <span
              key={idx}
              className={
                ieouaDisplay.includes(vowel)
                  ? isDay
                    ? 'text-[#b8860b] font-bold drop-shadow-[0_0_8px_rgba(184,134,11,0.8)]'
                    : 'text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                  : isDay
                  ? 'text-[#b8860b]/30'
                  : 'text-gray-600'
              }
            >
              {vowel}
            </span>
          ))}
        </div>

        {/* Active Warning Overlay Banner */}
        {activeWarning && (
          <div
            className={`px-3 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-full shadow-lg backdrop-blur-sm animate-pulse ${
              isDay
                ? 'bg-[#ede4d4]/90 border border-[#b8860b]/50 text-[#8c6508]'
                : 'bg-purple-950/90 border border-purple-500/50 text-purple-200'
            }`}
          >
            {activeWarning}
          </div>
        )}
      </div>

      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        onClick={launchBall}
        onMouseMove={e => handlePointerMove(e.clientX)}
        onTouchMove={e => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
        }}
        className={`w-full max-w-[480px] h-auto aspect-[480/440] max-h-[82vh] rounded-2xl border cursor-crosshair touch-none transition-colors duration-300 ${
          isDay
            ? 'border-[#b8860b]/30 shadow-[0_0_40px_rgba(184,134,11,0.15)] bg-[#f5efe6]'
            : 'border-amber-500/20 shadow-[0_0_40px_rgba(139,92,246,0.15)] bg-black'
        }`}
      />
    </div>
  );
};
