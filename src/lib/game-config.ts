export enum GameMode {
  GUEST = 'guest',
  ARASHU = 'arashu',
}

export const GAME_CONFIG = {
  xp: {
    scanExisting: 10,
    scanNew: 25,
    registerProduct: 50,
  },
  cooldowns: {
    scanSameBarcodeSeconds: 15,
    registerProductSeconds: 10,
    deleteProductSeconds: 5,
  },
  ui: {
    xpPopupDurationMs: 1500,
    achievementPopupDurationMs: 4000,
    toastDurationMs: 3000,
    animationBounceDelayMs: 100,
  },
  levelFormula: (level: number): number => {
    return (level - 1) * 150 + 100;
  },
  dailyMissionsCount: 4,
};
