import { create } from 'zustand';

export interface SettingsStoreState {
  readonly isInitialized: boolean;
}

export const useSettingsStore = create<SettingsStoreState>(() => ({
  isInitialized: false,
}));