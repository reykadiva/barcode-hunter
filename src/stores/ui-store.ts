import { create } from 'zustand';

export interface UIStoreState {
  readonly isInitialized: boolean;
}

export const useUIStore = create<UIStoreState>(() => ({
  isInitialized: false,
}));