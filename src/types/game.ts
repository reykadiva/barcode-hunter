export interface MissionProgress {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
}

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
}
