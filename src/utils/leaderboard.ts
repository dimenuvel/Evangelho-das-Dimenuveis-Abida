import { LeaderboardEntry } from '../types/game';

const LEADERBOARD_KEY = 'abide_sacred_top10_scores_v2';
const LEGACY_LEADERBOARD_KEY = 'abide_sacred_top10_scores_v1';
const LAST_PLAYER_NAME_KEY = 'abide_last_player_name_v1';

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, 10);
      }
    }

    // Clean legacy key if it existed with default scores
    if (localStorage.getItem(LEGACY_LEADERBOARD_KEY)) {
      localStorage.removeItem(LEGACY_LEADERBOARD_KEY);
    }
  } catch {
    // Fallback
  }
  return [];
}

export function getLastPlayerName(): string {
  try {
    return localStorage.getItem(LAST_PLAYER_NAME_KEY) || '';
  } catch {
    return '';
  }
}

export function saveLastPlayerName(name: string): void {
  try {
    localStorage.setItem(LAST_PLAYER_NAME_KEY, name.trim());
  } catch {
    // Ignore
  }
}

export function isTopScore(score: number): boolean {
  if (score <= 0) return false;
  const current = getLeaderboard();
  if (current.length < 10) return true;
  return score > current[current.length - 1].score;
}

export function saveLeaderboardScore(
  name: string,
  score: number,
  turn: number
): { entries: LeaderboardEntry[]; rank: number } {
  const cleanName = (name.trim() || 'The Disciple').slice(0, 20);
  saveLastPlayerName(cleanName);

  const current = getLeaderboard();
  const today = new Date().toISOString().split('T')[0];

  const newEntry: LeaderboardEntry = {
    id: `score_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: cleanName,
    score: Math.max(0, Math.floor(score)),
    turn: Math.max(1, turn),
    date: today
  };

  const combined = [...current, newEntry];
  combined.sort((a, b) => b.score - a.score);
  const top10 = combined.slice(0, 10);

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
  } catch {
    // Storage quota or error
  }

  const rank = top10.findIndex(e => e.id === newEntry.id) + 1;

  return { entries: top10, rank };
}

export function resetLeaderboard(): LeaderboardEntry[] {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
    localStorage.removeItem(LEGACY_LEADERBOARD_KEY);
  } catch {
    // Ignore
  }
  return [];
}

