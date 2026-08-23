import { DailyChallengeConfig, DailyModifier, DailyChallengeRecord } from '../types/game';

// Local storage keys
export const DAILY_RECORD_KEY = 'abide_daily_challenge_record_v1';

// Seeded PRNG (Mulberry32)
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Convert YYYY-MM-DD into a numerical hash seed
function hashDateString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash) + 12345;
}

// Get today's local date string YYYY-MM-DD
export function getTodayDateKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date for UI display
export function formatDisplayDate(dateKey: string, lang: 'en' | 'pt'): string {
  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateKey;
  }
}

const MODIFIERS: {
  type: DailyModifier;
  nameEn: string;
  namePt: string;
  descEn: string;
  descPt: string;
}[] = [
  {
    type: 'SOLAR_SURGE',
    nameEn: 'Solar Surge',
    namePt: 'Surto Solar',
    descEn: 'Blazing speed with Fire element surges & +50% combo points.',
    descPt: 'Velocidade flamejante com surtos de Fogo e +50% de pontos em combos.'
  },
  {
    type: 'HARMONIC_VOWELS',
    nameEn: 'Harmonic Resonance',
    namePt: 'Ressonância Harmônica',
    descEn: 'Vowel stones yield 1,000 sacred points and instantaneous Abide gauge.',
    descPt: 'Pedras vocálicas concedem 1.000 pontos sagrados e carga instantânea de Abida.'
  },
  {
    type: 'PIN_CASCADE',
    nameEn: 'Cosmic Bowling Strike',
    namePt: 'Strike Cósmico',
    descEn: 'Sacred pin formations award explosive multipliers on every direct strike.',
    descPt: 'Formações de pinos sagrados concedem multiplicadores explosivos em cada strike.'
  },
  {
    type: 'AETHER_FLOW',
    nameEn: 'Aether & Water Flow',
    namePt: 'Fluxo de Éter e Água',
    descEn: 'Expanded cosmic Rug with perpetual elemental water shields.',
    descPt: 'Tapete cósmico expandido com escudos perpétuos do elemento Água.'
  },
  {
    type: 'VOID_MYSTERY',
    nameEn: 'Void Mirage',
    namePt: 'Miragem do Vazio',
    descEn: 'Illusory void blocks transform into massive +350 bonus scores upon dispel.',
    descPt: 'Blocos ilusórios do Vazio transformam-se em +350 pontos de bônus ao serem dissipados.'
  },
  {
    type: 'GOLDEN_ZEN',
    nameEn: 'Golden Abide Awakening',
    namePt: 'Despertar Dourado de Abida',
    descEn: 'Begin with 50% Abide charge & extended golden transcendence aura.',
    descPt: 'Inicie com 50% do medidor de Abida e aura dourada de transcendência estendida.'
  }
];

const THEME_PALETTES = [
  { theme: '#f59e0b', accent: '#fef08a', bgSymbol: '☀️' },
  { theme: '#8b5cf6', accent: '#c084fc', bgSymbol: '🌀' },
  { theme: '#10b981', accent: '#6ee7b7', bgSymbol: '🌿' },
  { theme: '#ec4899', accent: '#fbcfe8', bgSymbol: '✨' },
  { theme: '#3b82f6', accent: '#93c5fd', bgSymbol: '💧' },
  { theme: '#ef4444', accent: '#fca5a5', bgSymbol: '🔥' },
  { theme: '#14b8a6', accent: '#99f6e4', bgSymbol: '⚡' }
];

const TITLES = [
  { en: 'The Solar Alignment', pt: 'O Alinhamento Solar', subEn: 'TEMPLE OF LIGHT', subPt: 'TEMPLO DA LUZ' },
  { en: 'Spiral of the Seventh Cloud', pt: 'Espiral da Sétima Nuvem', subEn: 'DIMENOUVOUS CONCORD', subPt: 'CONCÓRDIA DAS DIMENÚVEIS' },
  { en: 'Prism of Void & Fire', pt: 'Prisma de Vazio e Fogo', subEn: 'ELEMENTAL CRUCIBLE', subPt: 'CRADLE ELEMENTAL' },
  { en: 'The Abiding Harmony', pt: 'A Harmonia Abidante', subEn: 'VOWEL FORMANT SANCTUM', subPt: 'SANTUÁRIO DAS VOGAIS' },
  { en: 'Sanctuary of Cosmic Pins', pt: 'Santuário dos Pinos Cósmicos', subEn: 'BOWLING ALLEY OF DESTINY', subPt: 'PISTA DO DESTINO' },
  { en: 'Vortex of the Still Mind', pt: 'Vórtice da Mente Serena', subEn: 'TRANQUIL CENTER', subPt: 'CENTRO TRANQUILO' },
  { en: 'Gateway of Golden Aether', pt: 'Portal do Éter Dourado', subEn: 'THE CELESTIAL RUG', subPt: 'O TAPETE CELESTE' }
];

const FORMATIONS: ('MANDALA' | 'PYRAMID' | 'VORTEX' | 'TEMPLE' | 'COSMIC_CROSS')[] = [
  'MANDALA',
  'PYRAMID',
  'VORTEX',
  'TEMPLE',
  'COSMIC_CROSS'
];

// Generate deterministic challenge for any date string
export function getDailyChallengeConfig(dateKey?: string): DailyChallengeConfig {
  const key = dateKey || getTodayDateKey();
  const seed = hashDateString(key);
  const rand = mulberry32(seed);

  const titleIdx = Math.floor(rand() * TITLES.length);
  const modIdx = Math.floor(rand() * MODIFIERS.length);
  const paletteIdx = Math.floor(rand() * THEME_PALETTES.length);
  const formationIdx = Math.floor(rand() * FORMATIONS.length);

  const titleObj = TITLES[titleIdx];
  const modObj = MODIFIERS[modIdx];
  const palObj = THEME_PALETTES[paletteIdx];
  const formation = FORMATIONS[formationIdx];

  const ballSpeed = 5.2 + rand() * 1.2; // 5.2 to 6.4

  return {
    dateKey: key,
    seed,
    titleEn: titleObj.en,
    titlePt: titleObj.pt,
    subtitleEn: titleObj.subEn,
    subtitlePt: titleObj.subPt,
    descriptionEn: `Clear today's sacred ${formation.toLowerCase()} configuration to claim the daily bonus.`,
    descriptionPt: `Limpe a configuração sagrada de ${formation.toLowerCase()} de hoje para conquistar o bônus diário.`,
    modifier: modObj.type,
    modifierNameEn: modObj.nameEn,
    modifierNamePt: modObj.namePt,
    modifierDescEn: modObj.descEn,
    modifierDescPt: modObj.descPt,
    bonusScore: 2500,
    themeColor: palObj.theme,
    accentColor: palObj.accent,
    ballSpeed: Math.round(ballSpeed * 10) / 10,
    bgSymbol: palObj.bgSymbol,
    brickFormation: formation
  };
}

// Get user's daily challenge records and streak
export function getDailyChallengeRecord(): DailyChallengeRecord {
  try {
    const raw = localStorage.getItem(DAILY_RECORD_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          lastCompletedDateKey: parsed.lastCompletedDateKey || null,
          currentStreak: Number(parsed.currentStreak) || 0,
          maxStreak: Number(parsed.maxStreak) || 0,
          totalCompleted: Number(parsed.totalCompleted) || 0,
          history: parsed.history || {}
        };
      }
    }
  } catch {
    // Ignore error
  }

  return {
    lastCompletedDateKey: null,
    currentStreak: 0,
    maxStreak: 0,
    totalCompleted: 0,
    history: {}
  };
}

// Check if today is completed
export function isTodayDailyCompleted(): boolean {
  const record = getDailyChallengeRecord();
  const today = getTodayDateKey();
  return record.lastCompletedDateKey === today;
}

// Save Daily Challenge completion
export function saveDailyChallengeCompletion(score: number, bonusScore: number = 2500): DailyChallengeRecord {
  const record = getDailyChallengeRecord();
  const today = getTodayDateKey();
  const nowIso = new Date().toISOString();

  let streak = record.currentStreak;

  // Check if today was already completed
  if (record.lastCompletedDateKey !== today) {
    // Check if yesterday was completed to increment streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (record.lastCompletedDateKey === yesterdayKey) {
      streak += 1;
    } else {
      streak = 1;
    }

    record.totalCompleted += 1;
  }

  record.lastCompletedDateKey = today;
  record.currentStreak = streak;
  record.maxStreak = Math.max(record.maxStreak, streak);

  const existing = record.history[today];
  record.history[today] = {
    completedAt: nowIso,
    score: existing ? Math.max(existing.score, Math.floor(score)) : Math.floor(score),
    bonusAwarded: bonusScore
  };

  try {
    localStorage.setItem(DAILY_RECORD_KEY, JSON.stringify(record));
  } catch {
    // Storage quota
  }

  return record;
}

// Get time remaining until next daily challenge reset (Midnight local time)
export function getTimeUntilNextDailyChallenge(): {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  totalMs: number;
} {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Next 00:00:00 local time

  const diffMs = Math.max(0, midnight.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    hours,
    minutes,
    seconds,
    formatted,
    totalMs: diffMs
  };
}
