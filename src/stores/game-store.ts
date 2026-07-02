import { create } from 'zustand';

export interface GameStoreState {
  readonly isInitialized: boolean;
}

export const useGameStore = create<GameStoreState>(() => ({
  isInitialized: false,
}));