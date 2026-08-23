export type TurnId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GameMode = 'TURNS' | 'ENDLESS' | 'DAILY';

export type LayerName = 
  | 'SILENCE'
  | 'VISION'
  | 'MIND'
  | 'HEART'
  | 'WILL'
  | 'ENERGY'
  | 'MATTER'
  | 'VOID'
  | 'RETURN'
  | 'PERSPECTIVE'
  | 'CENTER';

export type ElementType = 'FIRE' | 'AIR' | 'WATER' | 'EARTH';

export interface TurnConfig {
  id: TurnId;
  title: string;
  subtitle: string;
  layer: string;
  description: string;
  themeColor: string;
  accentColor: string;
  ballSpeed: number;
  bgSymbol: string;
  quote: string;
}

export type BlockType = 
  | 'normal'
  | 'invisible'
  | 'armored'
  | 'energy'
  | 'element'
  | 'void_illusion'
  | 'connected'
  | 'pin'
  | 'center_core';

export interface Block {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: BlockType;
  elementType?: ElementType;
  hitsRequired: number;
  hitsTaken: number;
  color: string;
  glowColor: string;
  visible: boolean;
  connectedTo?: string[];
  pulseOffset?: number;
  originalX?: number;
  originalY?: number;
  dx?: number;
  dy?: number;
  isPin?: boolean;
  layerIndex?: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape?: 'circle' | 'star' | 'spiral' | 'vowel' | 'spark' | 'ring';
  text?: string;
  rotation?: number;
  vRot?: number;
}

export interface PowerUp {
  id: string;
  x: number;
  y: number;
  vy: number;
  type: ElementType;
  size: number;
}

export interface DialogueLine {
  speaker: 'THE DUDE' | 'DISCIPLE' | 'THE STRANGER' | 'THE GOSPEL';
  text: string;
  avatarStyle?: string;
}

export interface Cutscene {
  turnId: TurnId;
  lines: DialogueLine[];
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  fontSize: number;
  vy: number;
}

export interface GameStats {
  highScore: number;
  unlockedTurn: number;
  turnsCompleted: number[];
  totalAbideSeconds: number;
  strikes: number;
  ieouaCompleted: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  turn: number;
  date: string;
}

export type DailyModifier =
  | 'SOLAR_SURGE'
  | 'HARMONIC_VOWELS'
  | 'PIN_CASCADE'
  | 'AETHER_FLOW'
  | 'VOID_MYSTERY'
  | 'GOLDEN_ZEN';

export interface DailyChallengeConfig {
  dateKey: string;
  seed: number;
  titleEn: string;
  titlePt: string;
  subtitleEn: string;
  subtitlePt: string;
  descriptionEn: string;
  descriptionPt: string;
  modifier: DailyModifier;
  modifierNameEn: string;
  modifierNamePt: string;
  modifierDescEn: string;
  modifierDescPt: string;
  bonusScore: number;
  themeColor: string;
  accentColor: string;
  ballSpeed: number;
  bgSymbol: string;
  brickFormation: 'MANDALA' | 'PYRAMID' | 'VORTEX' | 'TEMPLE' | 'COSMIC_CROSS';
}

export interface DailyChallengeRecord {
  lastCompletedDateKey: string | null;
  currentStreak: number;
  maxStreak: number;
  totalCompleted: number;
  history: Record<string, {
    completedAt: string;
    score: number;
    bonusAwarded: number;
  }>;
}
