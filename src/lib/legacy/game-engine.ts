import type { MissionProgress, GameAchievement } from '@/types';

// Predefined list of all achievements in the game
export const GAME_ACHIEVEMENTS: GameAchievement[] = [
  {
    id: 'first_scan',
    title: 'First Contact',
    description: 'Scan your very first barcode',
    emoji: '📡',
  },
  {
    id: 'scan_10',
    title: 'Barcodian Hunter',
    description: 'Scan 10 barcodes in total',
    emoji: '🏹',
  },
  {
    id: 'scan_50',
    title: 'Master Tracker',
    description: 'Scan 50 barcodes in total',
    emoji: '🕵️',
  },
  {
    id: 'first_register',
    title: 'Product Creator',
    description: 'Register your first product to the database',
    emoji: '🛠️',
  },
  {
    id: 'register_10',
    title: 'Factory Owner',
    description: 'Register 10 products to the database',
    emoji: '🏭',
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach Player Level 5',
    emoji: '🌟',
  },
  {
    id: 'level_10',
    title: 'Legendary Hunter',
    description: 'Reach Player Level 10',
    emoji: '👑',
  },
  {
    id: 'streak_3',
    title: 'Loyal Hunter',
    description: 'Maintain a 3-day daily scan streak',
    emoji: '🔥',
  },
];

// Mission Template definition
interface MissionPayload {
  category?: string;
  [key: string]: unknown;
}

interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  target: number;
  xpReward: number;
  evaluator: (actionType: string, payload: MissionPayload) => boolean;
}

const MISSION_TEMPLATES: MissionTemplate[] = [
  {
    id: 'scan_any',
    title: 'Daily Scanner',
    description: 'Scan 5 barcodes of any product',
    target: 5,
    xpReward: 50,
    evaluator: (actionType) => actionType === 'scan',
  },
  {
    id: 'register_any',
    title: 'New Discoveries',
    description: 'Register 3 new products to the database',
    target: 3,
    xpReward: 100,
    evaluator: (actionType) => actionType === 'register',
  },
  {
    id: 'scan_drink',
    title: 'Stay Hydrated',
    description: 'Scan a product in the Drink or Dairy category',
    target: 1,
    xpReward: 40,
    evaluator: (actionType, payload) =>
      actionType === 'scan' &&
      (payload.category?.toLowerCase() === 'drink' || payload.category?.toLowerCase() === 'dairy'),
  },
  {
    id: 'scan_snack',
    title: 'Snack Break',
    description: 'Scan a product in the Snack, Candy, or Biscuit category',
    target: 1,
    xpReward: 40,
    evaluator: (actionType, payload) =>
      actionType === 'scan' &&
      ['snack', 'candy', 'biscuit'].includes(payload.category?.toLowerCase() || ''),
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Scan any product between 5:00 AM and 9:00 AM',
    target: 1,
    xpReward: 30,
    evaluator: (actionType) => {
      if (actionType !== 'scan') return false;
      const hour = new Date().getHours();
      return hour >= 5 && hour < 9;
    },
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Scan any product between 8:00 PM and 11:59 PM',
    target: 1,
    xpReward: 30,
    evaluator: (actionType) => {
      if (actionType !== 'scan') return false;
      const hour = new Date().getHours();
      return hour >= 20 && hour < 24;
    },
  },
];

/**
 * Generate a consistent set of 4 daily missions based on a date seed string.
 * This guarantees the player gets the exact same missions on a given calendar day.
 */
export function generateDailyMissions(dateStr: string): MissionProgress[] {
  // Hash the dateStr to get a deterministic index selector
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }

  const selectedTemplates: MissionTemplate[] = [];
  const templatesCopy = [...MISSION_TEMPLATES];

  // Deterministically select 4 unique templates
  for (let k = 0; k < 4; k++) {
    const idx = Math.abs((hash + k) * 31) % templatesCopy.length;
    selectedTemplates.push(templatesCopy[idx]);
    templatesCopy.splice(idx, 1);
  }

  return selectedTemplates.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    target: t.target,
    current: 0,
    xpReward: t.xpReward,
    completed: false,
  }));
}

/**
 * Evaluates active daily missions against a new game action.
 * Returns the updated missions list and the cumulative XP awarded for newly completed missions.
 */
export function evaluateMissions(
  missions: MissionProgress[],
  actionType: string,
  payload: MissionPayload
): { updatedMissions: MissionProgress[]; xpEarned: number } {
  let xpEarned = 0;

  const updatedMissions = missions.map((mission) => {
    if (mission.completed) return mission;

    const template = MISSION_TEMPLATES.find((t) => t.id === mission.id);
    if (!template) return mission;

    const isMatch = template.evaluator(actionType, payload);
    if (!isMatch) return mission;

    const nextCurrent = Math.min(mission.target, mission.current + 1);
    const newlyCompleted = nextCurrent === mission.target;

    if (newlyCompleted) {
      xpEarned += mission.xpReward;
    }

    return {
      ...mission,
      current: nextCurrent,
      completed: newlyCompleted,
    };
  });

  return { updatedMissions, xpEarned };
}

/**
 * Checks if the player has met any conditions for unlocking new achievements.
 * Returns the IDs of any newly unlocked achievements.
 */
export function checkNewAchievements(
  playerState: {
    scanHistory: string[];
    registeredBarcodes: string[];
    level: number;
    streak: number;
    unlockedAchievements: string[];
  }
): string[] {
  const newUnlocks: string[] = [];
  const unlocked = new Set(playerState.unlockedAchievements);

  const check = (id: string, condition: boolean) => {
    if (condition && !unlocked.has(id)) {
      newUnlocks.push(id);
    }
  };

  const totalScans = playerState.scanHistory.length;
  const totalRegisters = playerState.registeredBarcodes.length;

  check('first_scan', totalScans >= 1);
  check('scan_10', totalScans >= 10);
  check('scan_50', totalScans >= 50);

  check('first_register', totalRegisters >= 1);
  check('register_10', totalRegisters >= 10);

  check('level_5', playerState.level >= 5);
  check('level_10', playerState.level >= 10);

  check('streak_3', playerState.streak >= 3);

  return newUnlocks;
}
